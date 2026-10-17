import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { BottomNav } from './components/BottomNav';
import { SideDrawer } from './components/SideDrawer';
import { ComposerModal } from './components/ComposerModal';
import { Toast } from './components/Toast';
import { OfflineIndicator } from './components/OfflineIndicator';
import { WelcomeAuthModal } from './components/WelcomeAuthModal';

import { HomeView } from './views/HomeView';
import { EntertainmentView } from './views/EntertainmentView';
import { AcademicsView } from './views/AcademicsView';
import { ArenaView } from './views/ArenaView';
import { StoreView } from './views/StoreView';
import { AdminLoginView } from './views/AdminLoginView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { SettingsView } from './views/SettingsView';
import { ProfileView } from './views/ProfileView';
import { NotificationsView } from './views/NotificationsView';
import { SearchView } from './views/SearchView';
import { AboutView } from './views/AboutView';
import { PrivacyView } from './views/PrivacyView';

export const App: React.FC = () => {
  const { activeTab } = useApp();

  const isAdminRoute = activeTab === 'admin_login' || activeTab === 'admin_panel' || activeTab === 'admin';

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'entertainment':
        return <EntertainmentView />;
      case 'academics':
        return <AcademicsView />;
      case 'arena':
        return <ArenaView />;
      case 'store':
        return <StoreView />;
      case 'admin_login':
        return <AdminLoginView />;
      case 'admin_panel':
      case 'admin':
        return <AdminDashboardView />;
      case 'settings':
        return <SettingsView />;
      case 'profile':
      case 'bookmarks':
        return <ProfileView />;
      case 'notifications':
        return <NotificationsView />;
      case 'search':
        return <SearchView />;
      case 'about':
        return <AboutView />;
      case 'privacy':
        return <PrivacyView />;
      default:
        return <HomeView />;
    }
  };

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-bg text-text flex flex-col font-sans transition-colors duration-150">
        <Header />
        <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6">
          {renderActiveView()}
        </main>
        <Toast />
        <OfflineIndicator />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col font-sans transition-colors duration-150 selection:bg-accent/25 selection:text-accent">
      {/* Global Top Navigation Bar */}
      <Header />

      {/* Main 3-Column Layout Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex justify-center">
        {/* Left Sidebar (Desktop Navigation) */}
        <LeftSidebar />

        {/* Center Main Content Container */}
        <main className="flex-1 min-w-0 max-w-2xl border-x border-border pb-24 lg:pb-8 min-h-[calc(100vh-3.5rem)] bg-bg">
          {renderActiveView()}
        </main>

        {/* Right Sidebar (Desktop Contextual Widgets & Trends) */}
        <RightSidebar />
      </div>

      {/* Persistent Mobile 5-Item Bottom Navigation */}
      <BottomNav />

      {/* Modals & Overlays */}
      <SideDrawer />
      <ComposerModal />
      <WelcomeAuthModal />
      <Toast />
      <OfflineIndicator />
    </div>
  );
};
export default App;
