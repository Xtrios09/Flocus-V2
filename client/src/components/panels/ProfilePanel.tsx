import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Trophy, Target, Clock, Flame } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { XPBar } from '@/components/gamification/XPBar';
import { useState } from 'react';

export function ProfilePanel() {
  const {
    profilePanelOpen,
    toggleProfilePanel,
    profile,
    updateProfile,
  } = useAppStore();
  
  const [name, setName] = useState(profile?.name || '');
  
  const handleSave = () => {
    if (name.trim()) {
      updateProfile({ name: name.trim() });
      toggleProfilePanel();
    }
  };
  
  if (!profile) return null;
  
  const totalHours = Math.floor(profile.totalFocusMinutes / 60);
  const totalMinutes = profile.totalFocusMinutes % 60;
  
  return (
    <Sheet open={profilePanelOpen} onOpenChange={toggleProfilePanel}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 py-6">
          {/* Avatar and Name */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                {profile.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-2 w-full">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-testid="input-profile-name"
              />
            </div>
            
            <Button onClick={handleSave} className="w-full" data-testid="button-save-profile">
              Save Changes
            </Button>
          </div>
          
          {/* XP Progress */}
          <Card className="p-4">
            <XPBar level={profile.level} xp={profile.xp} />
          </Card>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sessions</p>
                  <p className="text-xl font-bold">{profile.totalSessions}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-md">
                  <Clock className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Focus Time</p>
                  <p className="text-xl font-bold">{totalHours}h {totalMinutes}m</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gold/10 rounded-md">
                  <Flame className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Streak</p>
                  <p className="text-xl font-bold">{profile.currentStreak} days</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Trophy className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Best Streak</p>
                  <p className="text-xl font-bold">{profile.longestStreak} days</p>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Unlocked Items */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Unlocked Themes</h4>
              <div className="flex gap-2 flex-wrap">
                {profile.unlockedThemes.map((theme) => (
                  <Badge key={theme} variant="outline">
                    {theme}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
