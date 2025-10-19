import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ACHIEVEMENTS } from '@/lib/achievements';
import { Trophy, Lock } from 'lucide-react';
import type { AchievementId } from '@shared/schema';

interface AchievementBadgesProps {
  unlockedAchievements: AchievementId[];
}

export function AchievementBadges({ unlockedAchievements }: AchievementBadgesProps) {
  const achievementList = Object.values(ACHIEVEMENTS);
  
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Achievements</h3>
          <Badge variant="outline" data-testid="text-achievement-progress">
            {unlockedAchievements.length}/{achievementList.length}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {achievementList.map((achievement) => {
            const isUnlocked = unlockedAchievements.includes(achievement.id);
            
            return (
              <div
                key={achievement.id}
                className={`group relative p-4 rounded-md border transition-all ${
                  isUnlocked
                    ? 'bg-card hover-elevate cursor-pointer'
                    : 'bg-muted/30 opacity-50 grayscale'
                }`}
                data-testid={`badge-achievement-${achievement.id}`}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  {isUnlocked ? (
                    <Trophy className="w-8 h-8 text-gold" />
                  ) : (
                    <Lock className="w-8 h-8 text-muted-foreground" />
                  )}
                  
                  <div>
                    <p className="font-semibold text-sm">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {achievement.description}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 text-xs">
                    <Badge variant="outline" className="text-xs">
                      +{achievement.xpReward} XP
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-gold/10 text-gold-foreground border-gold/20">
                      +{achievement.coinReward}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
