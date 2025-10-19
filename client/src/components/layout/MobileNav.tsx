import { Target, CheckSquare, Music, BarChart3, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

const NAV_ITEMS = [
  { path: '/', icon: Target, label: 'Timer', testId: 'nav-timer' },
  { path: '/todos', icon: CheckSquare, label: 'Tasks', testId: 'nav-todos' },
  { path: '/analytics', icon: BarChart3, label: 'Stats', testId: 'nav-analytics' },
  { path: '/music', icon: Music, label: 'Music', testId: 'nav-music' },
  { path: '/shop', icon: ShoppingBag, label: 'Shop', testId: 'nav-shop' },
];

export function MobileNav() {
  const [location] = useLocation();
  
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-around h-16 px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link key={item.path} href={item.path}>
              <Button
                variant="ghost"
                size="sm"
                className={`flex-col h-auto gap-1 ${isActive ? 'text-primary' : ''}`}
                data-testid={item.testId}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
