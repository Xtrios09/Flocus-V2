import { Bell, Settings, User, Target, CheckSquare, Music, BarChart3, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { XPBar } from '@/components/gamification/XPBar';
import { CoinDisplay } from '@/components/gamification/CoinDisplay';
import { ThemeToggle } from './ThemeToggle';
import { useAppStore } from '@/stores/useAppStore';

const NAV_ITEMS = [
  { path: '/', icon: Target, label: 'Timer' },
  { path: '/todos', icon: CheckSquare, label: 'Tasks' },
  { path: '/analytics', icon: BarChart3, label: 'Stats' },
  { path: '/music', icon: Music, label: 'Music' },
  { path: '/shop', icon: ShoppingBag, label: 'Shop' },
];

export function AppHeader() {
  const {
    profile,
    toggleNotificationsPanel,
    toggleSettingsPanel,
    toggleProfilePanel,
  } = useAppStore();
  const [location] = useLocation();
  
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">F</span>
            </div>
            <h1 className="font-bold text-xl hidden sm:block">Flocus</h1>
          </div>
        </div>
        
        {/* Desktop Navigation - hidden on mobile */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            
            return (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  size="sm"
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>
        
        {/* Center - XP Bar (hidden on mobile and medium screens) */}
        <div className="hidden xl:flex flex-1 max-w-md">
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
