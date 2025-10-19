import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { getProgressToNextLevel, getXPForLevel } from '@shared/schema';
import { Sparkles } from 'lucide-react';

interface XPBarProps {
  level: number;
  xp: number;
  compact?: boolean;
}

export function XPBar({ level, xp, compact = false }: XPBarProps) {
  const progress = getProgressToNextLevel(xp);
  const xpForNextLevel = getXPForLevel(level + 1);
  
  if (compact) {
    return (
      <div className="flex items-center gap-3 min-w-48">
        <Badge variant="outline" className="font-mono" data-testid="text-level">
          Lv {level}
        </Badge>
        <div className="flex-1">
          <Progress value={progress} className="h-2" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-semibold">Level {level}</span>
        </div>
        <span className="text-sm text-muted-foreground" data-testid="text-xp-progress">
          {progress}% to Level {level + 1}
        </span>
      </div>
      <div className="relative">
        <Progress value={progress} className="h-3" />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-primary-foreground mix-blend-difference">
          {xpForNextLevel - (xp % xpForNextLevel)} XP needed
        </div>
      </div>
    </div>
  );
}
