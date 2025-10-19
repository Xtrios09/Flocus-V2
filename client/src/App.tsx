import { useEffect, useState } from 'react';
import { Switch, Route } from 'wouter';
import { queryClient } from './lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppHeader } from '@/components/layout/AppHeader';
import { MobileNav } from '@/components/layout/MobileNav';
import { SettingsPanel } from '@/components/panels/SettingsPanel';
import { NotificationsPanel } from '@/components/panels/NotificationsPanel';
import { ProfilePanel } from '@/components/panels/ProfilePanel';
import { LevelUpModal } from '@/components/gamification/LevelUpModal';
import { useAppStore } from '@/stores/useAppStore';
import { initializeProfile } from '@/lib/localStorage';
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts';
import HomePage from '@/pages/HomePage';
import TodosPage from '@/pages/TodosPage';
import AnalyticsPage from '@/pages/AnalyticsPage';
import MusicPage from '@/pages/MusicPage';
import ShopPage from '@/pages/ShopPage';
import NotFound from '@/pages/not-found';

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/todos" component={TodosPage} />
      <Route path="/analytics" component={AnalyticsPage} />
      <Route path="/music" component={MusicPage} />
      <Route path="/shop" component={ShopPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { profile, setProfile, theme } = useAppStore();
  const [levelUpModal, setLevelUpModal] = useState<{ open: boolean; level: number; coins: number }>({
    open: false,
    level: 1,
    coins: 0,
  });
  
  // Keyboard shortcuts
  useKeyboardShortcuts();
  
  // Initialize profile on mount
  useEffect(() => {
    if (!profile) {
      const initialProfile = initializeProfile();
      setProfile(initialProfile);
    }
  }, [profile, setProfile]);
  
  // Apply theme on mount and when it changes
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);
  
  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <AppHeader />
          
          <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
            <Router />
          </main>
          
          <MobileNav />
          
          {/* Panels */}
          <SettingsPanel />
          <NotificationsPanel />
          <ProfilePanel />
          
          {/* Level Up Modal */}
          <LevelUpModal
            open={levelUpModal.open}
            onClose={() => setLevelUpModal({ ...levelUpModal, open: false })}
            newLevel={levelUpModal.level}
            coinsEarned={levelUpModal.coins}
          />
          
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
