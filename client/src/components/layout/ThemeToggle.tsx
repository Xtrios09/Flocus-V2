import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppStore } from '@/stores/useAppStore';
import type { ThemeType } from '@shared/schema';

const THEME_OPTIONS: { value: ThemeType; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'cyberpunk', label: 'Cyberpunk' },
  { value: 'nature', label: 'Nature' },
  { value: 'minimal', label: 'Minimal' },
];

export function ThemeToggle() {
  const { theme, setTheme, profile } = useAppStore();
  
  const availableThemes = THEME_OPTIONS.filter(
    t => profile?.unlockedThemes.includes(t.value)
  );
  
  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
    if (profile) {
      // This will be handled by the store
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" data-testid="button-theme-toggle">
          <Palette className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableThemes.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleThemeChange(option.value)}
            className={theme === option.value ? 'bg-accent' : ''}
            data-testid={`theme-option-${option.value}`}
          >
            {option.label}
            {theme === option.value && ' ✓'}
          </DropdownMenuItem>
        ))}
        {availableThemes.length < THEME_OPTIONS.length && (
          <DropdownMenuItem disabled className="text-xs text-muted-foreground">
            Unlock more themes in the shop
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
