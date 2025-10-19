import { Bell, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { XPBar } from '@/components/gamification/XPBar';
import { CoinDisplay } from '@/components/gamification/CoinDisplay';
import { ThemeToggle } from './ThemeToggle';
import { useAppStore } from '@/stores/useAppStore';

export function AppHeader() {
  const {
    profile,
    toggleNotificationsPanel,
    toggleSettingsPanel,
    toggleProfilePanel,
  } = useAppStore();
  
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">P</span>
            </div>
            <h1 className="font-bold text-xl hidden sm:block">Pomodoro</h1>
          </div>
        </div>
        
        {/* Center - XP Bar (hidden on mobile) */}
        <div className="hidden lg:flex flex-1 max-w-md">
          {profile && (
            <XPBar level={profile.level} xp={profile.xp} compact />
          )}
        </div>
        
        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Coins */}
          {profile && <CoinDisplay coins={profile.coins} />}
          
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Notifications */}
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleNotificationsPanel}
            data-testid="button-notifications"
          >
            <Bell className="w-5 h-5" />
          </Button>
          
          {/* Settings */}
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleSettingsPanel}
            className="hidden sm:flex"
            data-testid="button-settings"
          >
            <Settings className="w-5 h-5" />
          </Button>
          
          {/* Profile */}
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleProfilePanel}
            data-testid="button-profile"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
