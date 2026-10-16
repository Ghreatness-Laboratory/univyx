-- Univyx Verification System Migration (002_verification_system.sql)
-- Two-tier verification: Blue (automated at 1,000 followers) and Gold (admin-granted official accounts)

-- 1. EXTEND PROFILES TABLE WITH VERIFICATION COLUMNS
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS verification_tier TEXT NOT NULL DEFAULT 'none' 
    CHECK (verification_tier IN ('none', 'blue', 'gold')),
  ADD COLUMN IF NOT EXISTS verified_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS verified_by TEXT, -- Admin user ID or 'system'
  ADD COLUMN IF NOT EXISTS verification_source TEXT DEFAULT 'auto' 
    CHECK (verification_source IN ('auto', 'manual')),
  ADD COLUMN IF NOT EXISTS verification_locked BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS followers_count INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS following_count INTEGER NOT NULL DEFAULT 0;

-- 2. VERIFICATION AUDIT LOG TABLE
CREATE TABLE IF NOT EXISTS public.verification_audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    old_tier TEXT NOT NULL CHECK (old_tier IN ('none', 'blue', 'gold')),
    new_tier TEXT NOT NULL CHECK (new_tier IN ('none', 'blue', 'gold')),
    admin_id TEXT NOT NULL, -- Admin UUID or 'system'
    reason TEXT NOT NULL CHECK (char_length(trim(reason)) > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for speedy user audit history inspection
CREATE INDEX IF NOT EXISTS idx_verification_audit_log_user_id ON public.verification_audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_verification_audit_log_created_at ON public.verification_audit_log(created_at DESC);

-- 3. MAINTAIN FOLLOWERS & FOLLOWING COUNTS VIA TRIGGER ON FOLLOWS TABLE
CREATE OR REPLACE FUNCTION public.handle_follow_count_sync()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        -- Increment followers_count of followed profile
        UPDATE public.profiles
        SET followers_count = followers_count + 1,
            updated_at = NOW()
        WHERE id = NEW.following_id;

        -- Increment following_count of follower
        UPDATE public.profiles
        SET following_count = following_count + 1,
            updated_at = NOW()
        WHERE id = NEW.follower_id;

        RETURN NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        -- Decrement followers_count of followed profile (do not drop below 0)
        UPDATE public.profiles
        SET followers_count = GREATEST(0, followers_count - 1),
            updated_at = NOW()
        WHERE id = OLD.following_id;

        -- Decrement following_count of follower
        UPDATE public.profiles
        SET following_count = GREATEST(0, following_count - 1),
            updated_at = NOW()
        WHERE id = OLD.follower_id;

        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_sync_follow_counts ON public.follows;
CREATE TRIGGER trigger_sync_follow_counts
    AFTER INSERT OR DELETE ON public.follows
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_follow_count_sync();

-- 4. AUTOMATED BLUE TICK TRIGGER ON REACHING 1,000 FOLLOWERS
-- Rule:
-- When followers_count >= 1,000 and verification_tier = 'none' and verification_locked = false:
--   Set tier to blue, record verified_at = now(), verified_by = 'system', verification_source = 'auto'
--   Send in-app notification to the user.
--   Log to verification_audit_log.
-- Rule:
--   Do NOT automatically remove a tick if followers later drop below 1,000. Only an admin can revoke it.
CREATE OR REPLACE FUNCTION public.handle_auto_blue_tick_verification()
RETURNS TRIGGER AS $$
DECLARE
    notification_msg TEXT;
BEGIN
    -- Check if qualifying for auto blue tick
    IF NEW.followers_count >= 1000 
       AND OLD.followers_count < 1000 
       AND NEW.verification_tier = 'none' 
       AND NEW.verification_locked = FALSE THEN
       
        NEW.verification_tier := 'blue';
        NEW.is_verified := TRUE;
        NEW.verified_at := NOW();
        NEW.verified_by := 'system';
        NEW.verification_source := 'auto';

        -- Send user notification
        notification_msg := 'Congratulations! You''ve reached 1,000 followers and automatically earned your Univyx Blue Tick!';
        INSERT INTO public.notifications (user_id, actor_id, type, content, is_read, created_at)
        VALUES (NEW.id, NULL, 'announcement', notification_msg, FALSE, NOW());

        -- Log in verification audit log
        INSERT INTO public.verification_audit_log (user_id, old_tier, new_tier, admin_id, reason, created_at)
        VALUES (
            NEW.id,
            'none',
            'blue',
            'system',
            'Automated promotion: Reached 1,000 collegiate follower milestone',
            NOW()
        );
    END IF;

    -- Note: We explicitly do NOT revoke the tick if followers drop below 1,000.
    -- Once earned, only an authorized admin can revoke or adjust verification.

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_auto_blue_tick ON public.profiles;
CREATE TRIGGER trigger_auto_blue_tick
    BEFORE UPDATE OF followers_count ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_auto_blue_tick_verification();

-- 5. ADMIN VERIFICATION MANAGEMENT SECURE FUNCTION
-- Admins can grant Gold, grant Blue manually, change tier, or revoke.
-- A non-empty reason is strictly required for auditability.
CREATE OR REPLACE FUNCTION public.admin_set_verification_tier(
    target_user_id UUID,
    new_tier TEXT,
    reason TEXT
)
RETURNS JSONB AS $$
DECLARE
    caller_role TEXT;
    caller_id UUID;
    target_profile RECORD;
    prev_tier TEXT;
BEGIN
    caller_id := auth.uid();
    
    -- Verify caller is an admin or superadmin
    SELECT role INTO caller_role FROM public.profiles WHERE id = caller_id;
    IF caller_role NOT IN ('admin', 'superadmin') THEN
        RAISE EXCEPTION 'Access Denied: Only Univyx administrators can adjust verification tiers.';
    END IF;

    -- Validate target tier
    IF new_tier NOT IN ('none', 'blue', 'gold') THEN
        RAISE EXCEPTION 'Invalid verification tier: %. Allowed values are none, blue, or gold.', new_tier;
    END IF;

    -- Validate required reason
    IF reason IS NULL OR trim(reason) = '' THEN
        RAISE EXCEPTION 'A valid, non-empty reason is strictly required to adjust verification.';
    END IF;

    -- Fetch target profile
    SELECT * INTO target_profile FROM public.profiles WHERE id = target_user_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'User profile not found.';
    END IF;

    prev_tier := target_profile.verification_tier;

    -- Update target profile
    UPDATE public.profiles
    SET verification_tier = new_tier,
        is_verified = (new_tier <> 'none'),
        verified_at = (CASE WHEN new_tier <> 'none' THEN NOW() ELSE NULL END),
        verified_by = caller_id::TEXT,
        verification_source = 'manual',
        verification_locked = TRUE, -- Lock tier to prevent automated changes from overriding admin decision
        updated_at = NOW()
    WHERE id = target_user_id;

    -- Record in audit log
    INSERT INTO public.verification_audit_log (user_id, old_tier, new_tier, admin_id, reason, created_at)
    VALUES (target_user_id, prev_tier, new_tier, caller_id::TEXT, reason, NOW());

    -- Send informative notification to user
    IF new_tier = 'gold' THEN
        INSERT INTO public.notifications (user_id, actor_id, type, content, is_read, created_at)
        VALUES (target_user_id, caller_id, 'announcement', 'Your account has been officially granted the Univyx Gold Tick by administration.', FALSE, NOW());
    ELSIF new_tier = 'blue' THEN
        INSERT INTO public.notifications (user_id, actor_id, type, content, is_read, created_at)
        VALUES (target_user_id, caller_id, 'announcement', 'Your account has been granted the Univyx Blue Tick by administration.', FALSE, NOW());
    ELSE
        INSERT INTO public.notifications (user_id, actor_id, type, content, is_read, created_at)
        VALUES (target_user_id, caller_id, 'announcement', 'Your verification status has been updated by administration: ' || reason, FALSE, NOW());
    END IF;

    RETURN jsonb_build_object(
        'success', TRUE,
        'user_id', target_user_id,
        'old_tier', prev_tier,
        'new_tier', new_tier,
        'reason', reason
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- Regular users are strictly prevented from writing verification columns.
-- Direct updates to verification columns are blocked via trigger or column permissions.
CREATE OR REPLACE FUNCTION public.prevent_client_verification_tampering()
RETURNS TRIGGER AS $$
DECLARE
    caller_role TEXT;
BEGIN
    -- Allow postgres/service_role and security definer functions
    IF current_user IN ('postgres', 'service_role') THEN
        RETURN NEW;
    END IF;

    -- If caller is regular user, ensure verification fields cannot be altered
    IF (NEW.verification_tier IS DISTINCT FROM OLD.verification_tier OR
        NEW.verified_at IS DISTINCT FROM OLD.verified_at OR
        NEW.verified_by IS DISTINCT FROM OLD.verified_by OR
        NEW.verification_source IS DISTINCT FROM OLD.verification_source OR
        NEW.verification_locked IS DISTINCT FROM OLD.verification_locked OR
        NEW.is_verified IS DISTINCT FROM OLD.is_verified) THEN
        
        -- Check if caller is admin
        SELECT role INTO caller_role FROM public.profiles WHERE id = auth.uid();
        IF caller_role NOT IN ('admin', 'superadmin') THEN
            RAISE EXCEPTION 'Access Denied: Verification fields are server-managed and cannot be altered directly.';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_prevent_verification_tampering ON public.profiles;
CREATE TRIGGER trigger_prevent_verification_tampering
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.prevent_client_verification_tampering();

-- Enable RLS on verification_audit_log
ALTER TABLE public.verification_audit_log ENABLE ROW LEVEL SECURITY;

-- Admins can view all verification audit logs
CREATE POLICY "Admins can view verification audit logs"
    ON public.verification_audit_log
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'superadmin')
        )
    );

-- Users can view audit records related to their own account
CREATE POLICY "Users can view own verification audit records"
    ON public.verification_audit_log
    FOR SELECT
    USING (user_id = auth.uid());
