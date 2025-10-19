import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Trophy, Lightbulb, Flame } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { formatDistanceToNow } from 'date-fns';

const DAILY_TIPS = [
  'Take a 5-minute walk during your breaks to refresh your mind.',
  'Drink water regularly to stay hydrated and focused.',
  'Try the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.',
  'Set clear goals for each Pomodoro session.',
  'Eliminate distractions before starting a focus session.',
  'Celebrate small wins to stay motivated!',
];

export function NotificationsPanel() {
  const {
    notificationsPanelOpen,
    toggleNotificationsPanel,
  } = useAppStore();
  
  const notifications = useLiveQuery(() => 
    db.notifications.orderBy('createdAt').reverse().limit(20).toArray(),
    []
  ) || [];
  
  const dailyTip = DAILY_TIPS[new Date().getDay() % DAILY_TIPS.length];
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'achievement': return <Trophy className="w-4 h-4" />;
      case 'level_up': return <Trophy className="w-4 h-4 text-gold" />;
      case 'streak': return <Flame className="w-4 h-4 text-gold" />;
      case 'tip': return <Lightbulb className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };
  
  return (
    <Sheet open={notificationsPanelOpen} onOpenChange={toggleNotificationsPanel}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-4 py-6">
          {/* Daily Tip */}
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex gap-3">
              <div className="p-2 bg-primary/10 rounded-md h-fit">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">Daily Tip</h4>
                <p className="text-sm text-muted-foreground mt-1">{dailyTip}</p>
              </div>
            </div>
          </Card>
          
          {/* Notifications List */}
          <div className="space-y-2">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`p-4 ${notification.read ? 'opacity-60' : ''}`}
                  data-testid={`notification-${notification.id}`}
                >
                  <div className="flex gap-3">
                    <div className="p-2 bg-accent rounded-md h-fit">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-sm">{notification.title}</h4>
                        {!notification.read && (
                          <Badge variant="default" className="text-xs shrink-0">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
          
          {notifications.length > 0 && (
            <Button
              variant="outline"
              className="w-full"
              onClick={async () => {
                await db.notifications.clear();
              }}
              data-testid="button-clear-notifications"
            >
              Clear All
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
