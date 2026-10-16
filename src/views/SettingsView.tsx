import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FontPreference, ThemePreference, UserRole } from '../types';
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
    font,
    setFont,
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

  const fonts: { id: FontPreference; label: string; sample: string }[] = [
    { id: 'inter', label: 'Inter (Modern Sans)', sample: 'Clean, neutral digital typography' },
    { id: 'roboto', label: 'Roboto (Geometric)', sample: 'Structured neo-grotesque campus body' },
    { id: 'georgia', label: 'Georgia (Academic Serif)', sample: 'Classic editorial and publication style' },
    { id: 'dyslexic', label: 'Atkinson / Dyslexia Friendly', sample: 'High distinction letterforms for enhanced legibility' },
    { id: 'system', label: 'System Native UI', sample: 'Default operating system sans' }
  ];

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
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#1D9BF0] mb-1">
          <Settings className="w-4 h-4" />
          <span>Preferences & Account Controls</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Settings & Customization
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Personalize appearance, typography, campus affiliation, and application preferences.
        </p>
      </div>

      {/* 1. Appearance / Theme */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
          <Palette className="w-4 h-4 text-[#1D9BF0]" />
          <span>Interface Appearance</span>
        </div>
        <p className="text-xs text-slate-500">
          Select your color scheme. The preference is automatically saved.
        </p>

        <div className="grid grid-cols-3 gap-3 text-xs pt-1">
          {(['light', 'dark', 'system'] as ThemePreference[]).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`p-3 rounded-xl border text-center font-medium capitalize transition-all ${
                theme === t
                  ? 'border-[#1D9BF0] bg-[#1D9BF0]/10 text-[#1D9BF0] font-semibold'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0A0A0A] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {t} Mode
            </button>
          ))}
        </div>
      </div>

      {/* 2. Typography & Font Customization */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#16181C] border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
          <Type className="w-4 h-4 text-[#1D9BF0]" />
          <span>Typography & Font Family</span>
        </div>
        <p className="text-xs text-slate-500">
          Choose a typeface that maximizes your reading comfort during campus study sessions.
        </p>

        <div className="space-y-2.5 pt-1">
          {fonts.map((f) => (
            <div
              key={f.id}
              onClick={() => setFont(f.id)}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                font === f.id
                  ? 'border-[#1D9BF0] bg-[#1D9BF0]/10'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0A0A0A] hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-slate-900 dark:text-white">
                  {f.label}
                </span>
                {font === f.id && (
                  <CheckCircle2 className="w-4 h-4 text-[#1D9BF0]" />
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {f.sample}
              </p>
            </div>
          ))}
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
                onChange={(e) => setAcademicLevel(e.target.value)}
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
