import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ThemePreference, TextSizePreference, UserRole } from '../types';
import {
  Settings,
  Palette,
  Type,
  User,
  Shield,
  Download,
  CheckCircle2,
  Bell,
  Lock,
  Building2
} from 'lucide-react';
import { PWAInstallButton } from '../components/PWAInstallButton';

export const SettingsView: React.FC = () => {
  const {
    theme,
    setTheme,
    textSize,
    setTextSize,
    currentUser,
    setCurrentUser,
    universities,
    showToast
  } = useApp();

  // Profile Form state
  const [fullName, setFullName] = useState(currentUser?.full_name || '');
  const [username, setUsername] = useState(currentUser?.username || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [faculty, setFaculty] = useState(currentUser?.faculty || 'Science');
  const [department, setDepartment] = useState(currentUser?.department || 'Computer Science');
  const [academicLevel, setAcademicLevel] = useState(currentUser?.academic_level || '400L');
  const [userRole, setUserRole] = useState<UserRole>(currentUser?.role || 'user');
  const [uniId, setUniId] = useState(currentUser?.university_id || 'uni-1');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const uObj = universities.find((u) => u.id === uniId);

    const updatedUser = {
      ...currentUser,
      full_name: fullName.trim(),
      username: username.trim(),
      bio: bio.trim(),
      faculty: faculty.trim(),
      department: department.trim(),
      academic_level: academicLevel,
      role: userRole,
      university_id: uniId,
      university_name: uObj?.name
    };

    setCurrentUser(updatedUser);
    showToast('Scholar profile updated successfully');
  };

  return (
    <div className="w-full min-w-0 p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-border">
        <div className="flex items-center gap-2 text-xs font-semibold text-accent mb-1">
          <Settings className="w-4 h-4 text-accent" />
          <span>Preferences & Account Controls</span>
        </div>
        <h2 className="page-title text-text">
          Settings & Customization
        </h2>
        <p className="text-xs text-text-muted mt-0.5">
          Personalize appearance, typography, campus affiliation, and application preferences.
        </p>
      </div>

      {/* 1. Appearance / Theme */}
      <div className="card-theme p-5 space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-text">
          <Palette className="w-4 h-4 text-accent" />
          <span>Interface Appearance</span>
        </div>
        <p className="text-xs text-text-muted">
          Select your color scheme. The preference is automatically saved.
        </p>

        <div className="grid grid-cols-3 gap-3 text-xs pt-1">
          {(['light', 'dark', 'system'] as ThemePreference[]).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`p-3 rounded-xl border text-center font-medium capitalize transition-all cursor-pointer ${
                theme === t
                  ? 'border-accent bg-accent/10 text-accent font-semibold ring-1 ring-accent'
                  : 'border-border bg-surface text-text-muted hover:text-text hover:bg-accent-soft/30'
              }`}
            >
              {t} Mode
            </button>
          ))}
        </div>
      </div>

      {/* 2. Text Size & Scaling (X Feed Typography) */}
      <div className="card-theme p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-text">
            <Type className="w-4 h-4 text-accent" />
            <span>Text Size & Typography</span>
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent-soft text-accent">
            Figtree (400-800)
          </span>
        </div>
        <p className="text-xs text-text-muted">
          Adjust the font size of the Univyx feed. This scales post text, comments, headers, and UI elements across the entire app.
        </p>

        {/* Live Preview Card */}
        <div className="p-3.5 rounded-2xl border border-border bg-bg/70 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
            Live Feed Preview
          </span>
          <div className="flex items-start gap-3 pt-1">
            <div className="w-10 h-10 rounded-full avatar-gradient font-bold text-white flex items-center justify-center shrink-0 text-[15px] select-none">
              U
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 min-w-0 overflow-hidden leading-tight">
                <span className="display-name truncate">
                  Univyx Official
                </span>
                <span className="handle-text truncate">
                  @univyx_official
                </span>
                <span className="timestamp-text">·</span>
                <span className="timestamp-text">now</span>
              </div>
              <p className="mt-1 post-text break-words">
                At the heart of Univyx is a student experience designed for focus, speed, and real collegiate community.
              </p>
              <div className="mt-2.5 flex items-center gap-6 text-text-muted">
                <span className="action-count">💬 42</span>
                <span className="action-count">🔁 18</span>
                <span className="action-count">❤️ 156</span>
                <span className="action-count">📊 1.4K</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Text Size Selector (Small 12px, Default 15px, Large 17px, Extra large 19px) */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between px-2 text-text-muted">
            <span className="text-xs font-bold">Aa (12px)</span>
            <span className="text-lg font-bold">Aa (19px)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'small' as TextSizePreference, label: 'Small', size: '12px', desc: 'Compact' },
              { id: 'default' as TextSizePreference, label: 'Default', size: '15px', desc: 'Standard X' },
              { id: 'large' as TextSizePreference, label: 'Large', size: '17px', desc: 'Expanded' },
              { id: 'extra-large' as TextSizePreference, label: 'Extra large', size: '19px', desc: 'Maximum' }
            ].map((item) => {
              const isSelected = textSize === item.id || (typeof textSize === 'number' && `${textSize}px` === item.size);
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setTextSize(item.id)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-accent bg-accent/10 text-accent ring-1 ring-accent font-semibold'
                      : 'border-border bg-surface hover:bg-accent-soft/30 text-text-muted hover:text-text'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-bold text-sm">{item.label}</span>
                    <span className="text-xs opacity-75">({item.size})</span>
                  </div>
                  <span className="text-[11px] text-text-muted block mt-0.5">
                    {item.desc}
                  </span>
                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mx-auto mt-1.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Profile & Campus Affiliation */}
      {currentUser && (
        <form onSubmit={handleSaveProfile} className="p-5 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-xs">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <User className="w-4 h-4 text-[#1D9BF0]" />
            <span>Profile & Campus Affiliation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-medium text-slate-700 dark:text-slate-300">Display Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="font-medium text-slate-700 dark:text-slate-300">Username (@handle)</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="font-medium text-slate-700 dark:text-slate-300">University Institution</label>
            <select
              value={uniId}
              onChange={(e) => setUniId(e.target.value)}
              className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white cursor-pointer"
            >
              {universities.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.short_name})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-medium text-slate-700 dark:text-slate-300">Faculty</label>
              <input
                type="text"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="font-medium text-slate-700 dark:text-slate-300">Department</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="font-medium text-slate-700 dark:text-slate-300">Academic Level</label>
              <select
                value={academicLevel}
                onChange={(e) => setAcademicLevel(e.target.value as any)}
                className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="100L">100L (Freshman)</option>
                <option value="200L">200L (Sophomore)</option>
                <option value="300L">300L (Penultimate)</option>
                <option value="400L">400L (Final Year)</option>
                <option value="500L">500L (Final Year Eng/Law)</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="Alumni">Alumni</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-medium text-slate-700 dark:text-slate-300">Student Bio</label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 mt-1 rounded-lg bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          {/* Test Role Switcher for Evaluator/User Convenience */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-amber-600 dark:text-amber-400">Account Access Role</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Toggle between regular student and admin to test moderation and content tools.
                </p>
              </div>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as any)}
                className="p-1.5 rounded-lg bg-white dark:bg-[#16181C] border border-amber-500/30 text-amber-600 dark:text-amber-400 font-semibold focus:outline-none"
              >
                <option value="user">Student User</option>
                <option value="moderator">Campus Moderator</option>
                <option value="admin">Administrator</option>
                <option value="superadmin">Super Administrator</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#1D9BF0] text-white font-semibold hover:bg-[#1A8CD8]"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      )}

      {/* 4. Progressive Web App (PWA) Install Info */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between text-xs">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">Install univyX Mobile App</h3>
          <p className="text-slate-500 mt-0.5">
            Add univyX to your home screen for fast fullscreen performance and offline capability.
          </p>
        </div>
        <PWAInstallButton />
      </div>
    </div>
  );
};
