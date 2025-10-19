import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useAppStore } from '@/stores/useAppStore';

export function SettingsPanel() {
  const {
    settingsPanelOpen,
    toggleSettingsPanel,
    timerSettings,
    updateTimerSettings,
    focusMode,
    toggleFocusMode,
  } = useAppStore();
  
  return (
    <Sheet open={settingsPanelOpen} onOpenChange={toggleSettingsPanel}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 py-6">
          {/* Timer Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold">Timer Settings</h3>
            
            <div className="space-y-2">
              <Label htmlFor="work-duration">Work Duration (minutes)</Label>
              <Input
                id="work-duration"
                type="number"
                min="1"
                max="120"
                value={timerSettings.workDuration}
                onChange={(e) => updateTimerSettings({ workDuration: parseInt(e.target.value) || 25 })}
                data-testid="input-work-duration"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="break-duration">Break Duration (minutes)</Label>
              <Input
                id="break-duration"
                type="number"
                min="1"
                max="60"
                value={timerSettings.breakDuration}
                onChange={(e) => updateTimerSettings({ breakDuration: parseInt(e.target.value) || 5 })}
                data-testid="input-break-duration"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="long-break-duration">Long Break Duration (minutes)</Label>
              <Input
                id="long-break-duration"
                type="number"
                min="1"
                max="60"
                value={timerSettings.longBreakDuration}
                onChange={(e) => updateTimerSettings({ longBreakDuration: parseInt(e.target.value) || 15 })}
                data-testid="input-long-break-duration"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sessions-until-long-break">Sessions Until Long Break</Label>
              <Input
                id="sessions-until-long-break"
                type="number"
                min="1"
                max="10"
                value={timerSettings.sessionsUntilLongBreak}
                onChange={(e) => updateTimerSettings({ sessionsUntilLongBreak: parseInt(e.target.value) || 4 })}
                data-testid="input-sessions-until-long-break"
              />
            </div>
          </div>
          
          <Separator />
          
          {/* Auto-start Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold">Automation</h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-start-breaks">Auto-start Breaks</Label>
              <Switch
                id="auto-start-breaks"
                checked={timerSettings.autoStartBreaks}
                onCheckedChange={(checked) => updateTimerSettings({ autoStartBreaks: checked })}
                data-testid="switch-auto-start-breaks"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-start-work">Auto-start Work</Label>
              <Switch
                id="auto-start-work"
                checked={timerSettings.autoStartWork}
                onCheckedChange={(checked) => updateTimerSettings({ autoStartWork: checked })}
                data-testid="switch-auto-start-work"
              />
            </div>
          </div>
          
          <Separator />
          
          {/* Notifications and Sound */}
          <div className="space-y-4">
            <h3 className="font-semibold">Notifications & Sound</h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="sound-enabled">Sound Effects</Label>
              <Switch
                id="sound-enabled"
                checked={timerSettings.soundEnabled}
                onCheckedChange={(checked) => updateTimerSettings({ soundEnabled: checked })}
                data-testid="switch-sound-enabled"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications-enabled">Browser Notifications</Label>
              <Switch
                id="notifications-enabled"
                checked={timerSettings.notificationsEnabled}
                onCheckedChange={(checked) => updateTimerSettings({ notificationsEnabled: checked })}
                data-testid="switch-notifications-enabled"
              />
            </div>
          </div>
          
          <Separator />
          
          {/* Focus Mode */}
          <div className="space-y-4">
            <h3 className="font-semibold">Focus Mode</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="focus-mode">Enable Focus Mode</Label>
                <p className="text-sm text-muted-foreground">Hide distractions</p>
              </div>
              <Switch
                id="focus-mode"
                checked={focusMode}
                onCheckedChange={toggleFocusMode}
                data-testid="switch-focus-mode"
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
