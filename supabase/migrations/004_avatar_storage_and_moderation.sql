-- ========================================================
-- Migration 004: Avatar Storage, Security, RLS and Moderation
-- ========================================================

-- 1. Add Avatar Columns to Profiles Table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS avatar_status TEXT NOT NULL DEFAULT 'approved' CHECK (avatar_status IN ('approved', 'flagged', 'reported', 'removed')),
ADD COLUMN IF NOT EXISTS avatar_updated_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS avatar_upload_blocked BOOLEAN NOT NULL DEFAULT FALSE;

-- Ensure users cannot modify their own avatar_status or avatar_upload_blocked via standard RLS
-- Profile update policy: normal users can update name, bio, etc., but only admins can change moderation fields.

-- 2. Create Avatars Storage Bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'avatars',
    'avatars',
    TRUE,
    2097152, -- 2MB in bytes
    ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
    file_size_limit = 2097152,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'],
    public = TRUE;

-- 3. Storage Row Level Security (RLS) on storage.objects

-- Allow users to insert an avatar ONLY inside their own user folder: avatars/{user_id}/avatar.{ext}
-- and ONLY if their avatar_upload_blocked is FALSE
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
    AND NOT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid()
        AND avatar_upload_blocked = TRUE
    )
);

-- Allow users to update only their own avatar file
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
    AND NOT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid()
        AND avatar_upload_blocked = TRUE
    )
)
WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete their own avatar, OR admins can delete any avatar
CREATE POLICY "Users and admins can delete avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'avatars'
    AND (
        (storage.foldername(name))[1] = auth.uid()::text
        OR EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid()
            AND role IN ('admin', 'superadmin', 'moderator')
        )
    )
);

-- Allow anyone (public/signed in) to read avatars
CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- 4. Avatar Audit Logs Table
CREATE TABLE IF NOT EXISTS public.avatar_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    admin_username TEXT NOT NULL,
    target_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    target_username TEXT NOT NULL,
    action TEXT NOT NULL CHECK (action IN ('approve', 'remove', 'remove_and_block', 'unblock')),
    reason TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.avatar_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view audit logs"
ON public.avatar_audit_logs FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid()
        AND role IN ('admin', 'superadmin')
    )
);

CREATE POLICY "Admins can insert audit logs"
ON public.avatar_audit_logs FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid()
        AND role IN ('admin', 'superadmin')
    )
);

-- 5. Avatar Reports Table
CREATE TABLE IF NOT EXISTS public.avatar_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    reporter_username TEXT NOT NULL,
    target_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    target_username TEXT NOT NULL,
    avatar_url TEXT NOT NULL,
    reason TEXT NOT NULL CHECK (reason IN ('nudity', 'violence', 'harassment', 'other')),
    details TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'dismissed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ
);

ALTER TABLE public.avatar_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can report avatars"
ON public.avatar_reports FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Admins can view and update avatar reports"
ON public.avatar_reports FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid()
        AND role IN ('admin', 'superadmin', 'moderator')
    )
);

-- 6. System Settings Table (Profile picture method: 'upload', 'url', 'both')
CREATE TABLE IF NOT EXISTS public.app_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read app settings"
ON public.app_settings FOR SELECT
TO public
USING (TRUE);

CREATE POLICY "Admins can modify app settings"
ON public.app_settings FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid()
        AND role IN ('admin', 'superadmin')
    )
);

INSERT INTO public.app_settings (key, value)
VALUES ('profile_picture_method', '"upload"'::jsonb)
ON CONFLICT (key) DO NOTHING;
