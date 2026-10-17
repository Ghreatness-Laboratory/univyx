-- Univyx Student Email Domain Verification & Multi-Provider Auth Migration
-- 003_student_auth_and_domains.sql

-- 1. APPROVED UNIVERSITY DOMAINS TABLE
-- Seeded with placeholders ONLY as requested ("Do not guess domains. I will add the real ones.")
CREATE TABLE IF NOT EXISTS public.approved_university_domains (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    university_id UUID REFERENCES public.universities(id) ON DELETE CASCADE,
    domain TEXT NOT NULL UNIQUE,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_approved_domains_domain ON public.approved_university_domains(domain) WHERE active = TRUE;
CREATE INDEX IF NOT EXISTS idx_approved_domains_uni_id ON public.approved_university_domains(university_id);

-- Enable RLS on approved_university_domains
ALTER TABLE public.approved_university_domains ENABLE ROW LEVEL SECURITY;

-- Everyone can read active domains for validation queries
CREATE POLICY "Public read active approved domains"
    ON public.approved_university_domains
    FOR SELECT
    USING (active = TRUE);

-- Only admins / service role can insert or modify domains
CREATE POLICY "Admin manage approved domains"
    ON public.approved_university_domains
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'superadmin')
        )
    );

-- 2. SEED PLACEHOLDER DOMAINS ONLY (No guessing)
-- Placeholders correspond to approved private universities
INSERT INTO public.approved_university_domains (university_id, domain, active)
SELECT 
    u.id, 
    'student.placeholder-' || lower(u.code) || '.edu', 
    TRUE
FROM public.universities u
ON CONFLICT (domain) DO NOTHING;

-- 3. EXTEND PROFILES TABLE WITH STUDENT VERIFICATION & EMAIL STATUS
ALTER TABLE public.profiles
    ADD COLUMN IF NOT EXISTS student_verified BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS student_email TEXT,
    ADD COLUMN IF NOT EXISTS student_verified_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS email_verified BOOLEAN NOT NULL DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_profiles_student_verified ON public.profiles(student_verified);
CREATE INDEX IF NOT EXISTS idx_profiles_student_email ON public.profiles(student_email);

-- 4. SECURE SERVER FUNCTIONS FOR DOMAIN CHECK & VERIFICATION
-- Checks if an email address belongs to an active approved private university domain
CREATE OR REPLACE FUNCTION public.check_student_domain(p_email TEXT)
RETURNS TABLE (
    is_approved BOOLEAN,
    university_id UUID,
    university_name TEXT,
    university_short_name TEXT,
    matched_domain TEXT
) LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    v_clean_email TEXT;
    v_domain TEXT;
BEGIN
    v_clean_email := lower(trim(p_email));
    v_domain := split_part(v_clean_email, '@', 2);

    IF v_domain IS NULL OR v_domain = '' THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, NULL::TEXT, NULL::TEXT, NULL::TEXT;
        RETURN;
    END IF;

    RETURN QUERY
    SELECT 
        TRUE AS is_approved,
        aud.university_id,
        u.name AS university_name,
        u.short_name AS university_short_name,
        aud.domain AS matched_domain
    FROM public.approved_university_domains aud
    JOIN public.universities u ON u.id = aud.university_id
    WHERE aud.domain = v_domain
      AND aud.active = TRUE
    LIMIT 1;

    -- If no record matched above, return false
    IF NOT FOUND THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, NULL::TEXT, NULL::TEXT, v_domain;
    END IF;
END;
$$;

-- Secure function to set student verified status upon successful OTP/Link confirmation
-- Prevents client-side tampering
CREATE OR REPLACE FUNCTION public.verify_student_email(
    p_user_id UUID,
    p_student_email TEXT
)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    v_domain_check RECORD;
BEGIN
    -- Verify the caller is the user themselves or an admin
    IF auth.uid() <> p_user_id AND NOT EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    ) THEN
        RETURN jsonb_build_object('success', false, 'error', 'Unauthorized operation');
    END IF;

    -- Check domain approval on server
    SELECT * INTO v_domain_check FROM public.check_student_domain(p_student_email);

    IF NOT v_domain_check.is_approved THEN
        RETURN jsonb_build_object(
            'success', false, 
            'error', 'This email isn''t from a supported private university. Use your school email or sign in another way.'
        );
    END IF;

    -- Update user profile with student verification
    UPDATE public.profiles
    SET 
        student_verified = TRUE,
        student_email = lower(trim(p_student_email)),
        student_verified_at = NOW(),
        university_id = COALESCE(v_domain_check.university_id, university_id),
        updated_at = NOW()
    WHERE id = p_user_id;

    RETURN jsonb_build_object(
        'success', true,
        'university_id', v_domain_check.university_id,
        'university_name', v_domain_check.university_name,
        'student_verified', true
    );
END;
$$;

-- 5. ROW LEVEL SECURITY ENFORCEMENT ON PROFILES
-- Ensure users cannot manually alter student_verified, verification_tier, or roles directly from client UPDATE
CREATE OR REPLACE FUNCTION public.enforce_profile_update_security()
RETURNS TRIGGER AS $$
BEGIN
    -- Only allow admins/service role to modify protected fields directly
    IF auth.uid() IS NOT NULL AND NOT EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    ) THEN
        -- Revert unauthorized changes to protected columns
        NEW.student_verified := OLD.student_verified;
        NEW.student_email := OLD.student_email;
        NEW.student_verified_at := OLD.student_verified_at;
        NEW.verification_tier := OLD.verification_tier;
        NEW.is_verified := OLD.is_verified;
        NEW.verified_at := OLD.verified_at;
        NEW.verified_by := OLD.verified_by;
        NEW.role := OLD.role;
    END IF;

    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_enforce_profile_security ON public.profiles;
CREATE TRIGGER trigger_enforce_profile_security
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.enforce_profile_update_security();

-- 6. PREVENT UNVERIFIED POSTING TRIGGER
-- Requirement 5: Email verification required for email and password signups before posting.
CREATE OR REPLACE FUNCTION public.check_user_can_post()
RETURNS TRIGGER AS $$
DECLARE
    v_profile RECORD;
BEGIN
    SELECT is_verified, student_verified, email_verified, role 
    INTO v_profile 
    FROM public.profiles 
    WHERE id = NEW.author_id;

    -- Admins/superadmins exempt
    IF v_profile.role IN ('admin', 'superadmin', 'moderator') THEN
        RETURN NEW;
    END IF;

    -- Must have email_verified or student_verified
    IF NOT COALESCE(v_profile.email_verified, FALSE) AND NOT COALESCE(v_profile.student_verified, FALSE) THEN
        RAISE EXCEPTION 'Email verification required before posting. Please verify your email to participate.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_check_can_post ON public.posts;
CREATE TRIGGER trigger_check_can_post
    BEFORE INSERT ON public.posts
    FOR EACH ROW
    EXECUTE FUNCTION public.check_user_can_post();
