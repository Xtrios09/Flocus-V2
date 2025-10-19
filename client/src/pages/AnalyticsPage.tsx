import { Dashboard } from '@/components/analytics/Dashboard';
import { AchievementBadges } from '@/components/gamification/AchievementBadges';
import { useAppStore } from '@/stores/useAppStore';

export default function AnalyticsPage() {
  const { profile } = useAppStore();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track your productivity and progress</p>
      </div>
      
      <Dashboard />
      
      {profile && (
        <AchievementBadges unlockedAchievements={profile.unlockedAvatars as any || []} />
      )}
    </div>
  );
}
