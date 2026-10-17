import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import {
  Upload,
  Link as LinkIcon,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Camera,
  ShieldAlert
} from 'lucide-react';
import { UserAvatar } from './UserAvatar';

interface AvatarEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (newAvatarUrl: string | null) => void;
}

export const AvatarEditorModal: React.FC<AvatarEditorModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const {
    currentUser,
    uploadAvatarImage,
    uploadAvatarFromUrl,
    removeAvatarImage,
    profilePictureMethod,
    showToast
  } = useApp();

  const isBlocked = Boolean(currentUser?.avatarUploadBlocked || currentUser?.avatar_upload_blocked);
  const currentAvatarUrl = currentUser?.avatarUrl || currentUser?.avatar_url || null;

  // Active tab in modal: 'file' or 'url' (based on profilePictureMethod)
  const defaultTab = profilePictureMethod === 'url' ? 'url' : 'file';
  const [activeTab, setActiveTab] = useState<'file' | 'url'>(defaultTab);

  // File upload & crop states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // URL mode states
  const [urlInput, setUrlInput] = useState('');

  // Status & error states
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sync tab with admin setting
  useEffect(() => {
    if (profilePictureMethod === 'url') {
      setActiveTab('url');
    } else if (profilePictureMethod === 'upload') {
      setActiveTab('file');
    }
  }, [profilePictureMethod]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSelectedFile(null);
      setImageSrc(null);
      setZoom(1);
      setPan({ x: 0, y: 0 });
      setUrlInput('');
    }
  }, [isOpen]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Check size: max 2MB
    const MAX_SIZE = 2 * 1024 * 1024; // 2MB
    if (file.size > MAX_SIZE) {
      setError('Image must be under 2MB');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // 2. Check file type: JPG, PNG or WebP
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      setError('Only JPG, PNG or WebP');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setSelectedFile(file);

    // Read and load image for square crop
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
      setZoom(1);
      setPan({ x: 0, y: 0 });
    };
    reader.readAsDataURL(file);
  };

  // Dragging to pan the image in square crop view
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageSrc) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!imageSrc || !e.touches[0]) return;
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX - pan.x,
      y: e.touches[0].clientY - pan.y
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !e.touches[0]) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Produce 512x512 cropped canvas and upload
  const handleSaveCropped = async () => {
    if (!imageSrc) return;
    setIsProcessing(true);
    setError(null);

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageSrc;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error('Failed to render source image'));
      });

      // Canvas dimensions 512x512 as requested
      const TARGET_SIZE = 512;
      const canvas = document.createElement('canvas');
      canvas.width = TARGET_SIZE;
      canvas.height = TARGET_SIZE;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Canvas rendering context unavailable');
      }

      // Fill background in case of transparent PNG/WebP
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, TARGET_SIZE, TARGET_SIZE);

      // Cropper container visual size is 240px
      const CROP_CONTAINER_SIZE = 240;
      const scaleFactor = TARGET_SIZE / CROP_CONTAINER_SIZE;

      // Center of canvas
      ctx.save();
      ctx.translate(TARGET_SIZE / 2, TARGET_SIZE / 2);

      // Apply zoom & pan scaled to 512
      ctx.translate(pan.x * scaleFactor, pan.y * scaleFactor);
      ctx.scale(zoom, zoom);

      // Calculate aspect-fill draw coordinates
      const minDim = Math.min(img.width, img.height);
      const drawWidth = (img.width / minDim) * TARGET_SIZE;
      const drawHeight = (img.height / minDim) * TARGET_SIZE;

      ctx.drawImage(
        img,
        -drawWidth / 2,
        -drawHeight / 2,
        drawWidth,
        drawHeight
      );

      ctx.restore();

      // Convert to JPEG (512x512) - strips EXIF and location data automatically!
      const finalDataUrl = canvas.toDataURL('image/jpeg', 0.92);

      // Send to server upload method
      const res = await uploadAvatarImage(finalDataUrl);

      if (!res.success) {
        setError(res.error || 'Failed to upload image. Please try again.');
        setIsProcessing(false);
        return;
      }

      showToast('Profile picture updated successfully');
      if (onSave) onSave(res.avatarUrl || finalDataUrl);
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred while cropping the image');
    } finally {
      setIsProcessing(false);
    }
  };

  // URL mode submit
  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanUrl = urlInput.trim();
    if (!cleanUrl) {
      setError('Please enter a valid image URL');
      return;
    }

    if (!cleanUrl.startsWith('https://')) {
      setError('Only secure https:// links are supported');
      return;
    }

    setIsProcessing(true);
    try {
      const res = await uploadAvatarFromUrl(cleanUrl);
      if (!res.success) {
        setError(res.error || 'Failed to fetch image from URL. Ensure it is a valid image under 2MB.');
        setIsProcessing(false);
        return;
      }

      showToast('Profile picture updated from URL');
      if (onSave) onSave(res.avatarUrl || cleanUrl);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Could not load image from link');
    } finally {
      setIsProcessing(false);
    }
  };

  // Remove photo -> reset to default initials avatar
  const handleRemovePhoto = async () => {
    if (!currentAvatarUrl) return;
    setIsProcessing(true);
    setError(null);
    try {
      await removeAvatarImage();
      showToast('Profile picture removed. Reverted to initials avatar.');
      if (onSave) onSave(null);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to remove photo');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-sm card-theme shadow-2xl overflow-hidden rounded-[14px] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-3.5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-accent" strokeWidth={1.5} />
            <h3 className="text-[13px] font-bold text-text">Profile Picture</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-text-muted hover:text-text rounded-full hover:bg-accent-soft/40 transition-colors touch-target-44 flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto space-y-3.5 flex-1 text-xs">
          {/* Blocked Uploads Banner */}
          {isBlocked && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[12px]">Upload Restricted</p>
                <p className="text-[11px] leading-snug mt-0.5 text-rose-400">
                  Your account has been restricted from updating or uploading a profile picture by campus moderation.
                </p>
              </div>
            </div>
          )}

          {/* Current Avatar & Status */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-bg border border-border">
            <UserAvatar
              src={imageSrc || currentAvatarUrl}
              name={currentUser?.fullName || currentUser?.full_name || 'Scholar'}
              size="lg"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-[12px] text-text truncate">
                  {currentUser?.fullName || currentUser?.full_name}
                </span>
                {currentUser?.avatarStatus && (
                  <span
                    className={`text-[9.5px] uppercase font-bold px-1.5 py-0.5 rounded leading-none ${
                      currentUser.avatarStatus === 'approved'
                        ? 'bg-success/15 text-success'
                        : currentUser.avatarStatus === 'flagged' || currentUser.avatarStatus === 'reported'
                        ? 'bg-amber-500/15 text-amber-500'
                        : 'bg-rose-500/15 text-rose-500'
                    }`}
                  >
                    {currentUser.avatarStatus}
                  </span>
                )}
              </div>
              <p className="text-[10.5px] text-text-muted truncate mt-0.5">
                {currentAvatarUrl ? 'Custom photo active' : 'Default initials avatar'}
              </p>
            </div>
          </div>

          {/* Method Tabs if 'both' is allowed */}
          {!isBlocked && profilePictureMethod === 'both' && (
            <div className="flex items-center rounded-xl bg-bg p-1 border border-border">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('file');
                  setError(null);
                }}
                className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'file'
                    ? 'bg-surface text-text shadow-xs font-bold'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                <Upload className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Upload File</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('url');
                  setError(null);
                }}
                className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'url'
                    ? 'bg-surface text-text shadow-xs font-bold'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Image URL</span>
              </button>
            </div>
          )}

          {/* Mode 1: File Upload & Square Crop */}
          {!isBlocked && activeTab === 'file' && (
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileSelect}
                className="hidden"
                id="avatar-file-input"
              />

              {!imageSrc ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border hover:border-accent rounded-[14px] p-6 text-center cursor-pointer transition-colors bg-bg/50 hover:bg-accent-soft/20 flex flex-col items-center justify-center gap-2 group"
                >
                  <div className="w-10 h-10 rounded-full bg-accent-soft text-accent flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Upload className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="font-bold text-[12px] text-text block">
                      Choose an image
                    </span>
                    <span className="text-[10.5px] text-text-muted block mt-0.5">
                      JPG, PNG or WebP, maximum 2MB
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-text-muted">
                    <span className="font-medium text-text">Crop & Zoom</span>
                    <span>Drag to reposition</span>
                  </div>

                  {/* Square Cropper Viewport (240px square with circular guide mask) */}
                  <div
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className="relative w-[240px] h-[240px] mx-auto rounded-[14px] overflow-hidden bg-black cursor-grab active:cursor-grabbing border border-border flex items-center justify-center select-none"
                  >
                    <img
                      ref={imageRef}
                      src={imageSrc}
                      alt="Crop target"
                      draggable={false}
                      style={{
                        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                        transition: isDragging ? 'none' : 'transform 100ms ease-out'
                      }}
                      className="max-w-none pointer-events-none"
                    />

                    {/* Circular crop boundary overlay */}
                    <div className="absolute inset-0 pointer-events-none rounded-[14px] ring-1 ring-white/20">
                      <div className="w-full h-full rounded-full border-2 border-dashed border-white/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]" />
                    </div>
                  </div>

                  {/* Zoom Slider Controls */}
                  <div className="flex items-center gap-2 px-1">
                    <ZoomOut className="w-3.5 h-3.5 text-text-muted shrink-0" strokeWidth={1.5} />
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.05}
                      value={zoom}
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      className="flex-1 accent-accent cursor-pointer h-1.5 bg-border rounded-lg"
                      aria-label="Zoom photo"
                    />
                    <ZoomIn className="w-3.5 h-3.5 text-text-muted shrink-0" strokeWidth={1.5} />
                    <button
                      type="button"
                      onClick={() => {
                        setZoom(1);
                        setPan({ x: 0, y: 0 });
                      }}
                      title="Reset crop"
                      className="p-1 text-text-muted hover:text-text rounded-md cursor-pointer ml-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mode 2: Direct Image URL */}
          {!isBlocked && activeTab === 'url' && (
            <form onSubmit={handleUrlSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-text block mb-1">
                  Direct HTTPS Image Link
                </label>
                <div className="relative">
                  <input
                    type="url"
                    placeholder="https://example.com/avatar.jpg"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="w-full text-[12px] px-3 py-2 rounded-xl bg-bg border border-border text-text placeholder:text-text-muted focus:outline-none focus:border-accent"
                    required
                  />
                </div>
                <p className="text-[10.5px] text-text-muted mt-1 leading-normal">
                  Server fetches the image, verifies it is under 2MB, and securely stores a copy in Univyx avatars storage. Never hotlinks external domains.
                </p>
              </div>

              <button
                type="submit"
                disabled={isProcessing || !urlInput.trim()}
                className="btn-primary-gradient w-full py-2 px-4 rounded-full text-white text-[11px] font-bold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>Verifying & Saving Image...</span>
                  </>
                ) : (
                  <span>Fetch & Save Photo</span>
                )}
              </button>
            </form>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center gap-2 text-[11px] font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-border flex items-center justify-between gap-2 bg-bg/50">
          <div>
            {currentAvatarUrl && !isBlocked && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                disabled={isProcessing}
                className="h-7 px-2.5 text-[11px] font-medium text-rose-500 hover:bg-rose-500/10 rounded-full transition-colors cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Remove photo</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="h-7 px-3 text-[11px] font-medium text-text-muted hover:text-text rounded-full transition-colors cursor-pointer"
            >
              Cancel
            </button>

            {!isBlocked && activeTab === 'file' && imageSrc && (
              <button
                type="button"
                onClick={handleSaveCropped}
                disabled={isProcessing}
                className="h-7 px-4 rounded-full btn-primary-gradient text-white text-[11px] font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
              >
                {isProcessing && <Loader2 className="w-3 h-3 animate-spin text-white" />}
                <span>{isProcessing ? 'Saving...' : 'Save Photo'}</span>
              </button>
            )}

            {!isBlocked && activeTab === 'file' && !imageSrc && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="h-7 px-3.5 rounded-full btn-primary-gradient text-white text-[11px] font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                Change photo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarEditorModal;
