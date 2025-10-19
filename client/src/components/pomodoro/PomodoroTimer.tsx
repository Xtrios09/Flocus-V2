import { useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/stores/useAppStore';
import { CircularProgress } from './CircularProgress';
import confetti from 'canvas-confetti';

export function PomodoroTimer() {
  const {
    timerState,
    timerSettings,
    setTimerState,
    startTimer,
    pauseTimer,
    resetTimer,
    profile,
    updateProfile,
    toggleSettingsPanel,
    focusMode,
    toggleFocusMode,
  } = useAppStore();
  
  const intervalRef = useRef<number | null>(null);
  
  // Sync timer with settings when they change (only if not running)
  useEffect(() => {
    if (!timerState.isRunning && timerState.type === 'work') {
      const newTotalTime = timerSettings.workDuration * 60;
      if (timerState.totalTime !== newTotalTime) {
        setTimerState({
          timeRemaining: newTotalTime,
          totalTime: newTotalTime,
        });
      }
    }
  }, [timerSettings.workDuration, timerState.isRunning, timerState.type]);
  
  // Timer logic
  useEffect(() => {
    if (timerState.isRunning && timerState.timeRemaining > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimerState({
          timeRemaining: Math.max(0, timerState.timeRemaining - 1)
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      // Timer completed
      if (timerState.timeRemaining === 0 && timerState.isRunning) {
        handleTimerComplete();
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState.isRunning, timerState.timeRemaining]);
  
  const handleTimerComplete = async () => {
    // Celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    // Play sound (if enabled)
    if (timerSettings.soundEnabled) {
      const audio = new Audio('/timer-complete.mp3');
      audio.play().catch(() => {});
    }
    
    // Save session and award XP/coins
    if (profile && timerState.type === 'work') {
      const { completeSession } = await import('@/lib/gamification');
      const result = await completeSession(
        profile,
        'work',
        timerSettings.workDuration,
        undefined,
        undefined
      );
      
      updateProfile(result.updatedProfile);
      
      // Show browser notification if enabled
      if (timerSettings.notificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
        new Notification('Pomodoro Complete!', {
          body: `Great work! You earned ${result.session.coinsEarned} coins and ${result.session.xpEarned} XP`,
          icon: '/favicon.ico',
        });
      }
    }
    
    // Switch to next type
    const isWorkSession = timerState.type === 'work';
    const nextSession = isWorkSession ? timerState.currentSession + 1 : timerState.currentSession;
    const shouldBeLongBreak = nextSession % timerSettings.sessionsUntilLongBreak === 0;
    
    let nextType: 'work' | 'break' | 'longBreak';
    let nextDuration: number;
    
    if (isWorkSession) {
      nextType = shouldBeLongBreak ? 'longBreak' : 'break';
      nextDuration = shouldBeLongBreak ? timerSettings.longBreakDuration : timerSettings.breakDuration;
    } else {
      nextType = 'work';
      nextDuration = timerSettings.workDuration;
    }
    
    const newTotalTime = nextDuration * 60;
    
    setTimerState({
      isRunning: false,
      timeRemaining: newTotalTime,
      totalTime: newTotalTime,
      currentSession: nextSession,
      type: nextType,
    });
    
    // Auto-start if enabled
    if (
      (isWorkSession && timerSettings.autoStartBreaks) ||
      (!isWorkSession && timerSettings.autoStartWork)
    ) {
      setTimeout(() => startTimer(), 1000);
    }
  };
  
  const handleStart = () => {
    startTimer();
  };
  
  const handlePause = () => {
    pauseTimer();
  };
  
  const handleReset = () => {
    resetTimer();
    setTimerState({
      timeRemaining: timerSettings.workDuration * 60,
      totalTime: timerSettings.workDuration * 60,
      type: 'work',
    });
  };
  
  const handlePresetChange = (workMin: number, breakMin: number) => {
    if (timerState.isRunning) return;
    
    // Update timer settings first
    const { updateTimerSettings } = useAppStore.getState();
    updateTimerSettings({
      workDuration: workMin,
      breakDuration: breakMin,
    });
    
    // Then update the current timer state
    const newTotalTime = workMin * 60;
    setTimerState({
      timeRemaining: newTotalTime,
      totalTime: newTotalTime,
      type: 'work',
    });
  };
  
  // Format time display
  const minutes = Math.floor(timerState.timeRemaining / 60);
  const seconds = timerState.timeRemaining % 60;
  const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  // Calculate progress percentage
  const progress = ((timerState.totalTime - timerState.timeRemaining) / timerState.totalTime) * 100;
  
  return (
    <Card className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Focus Timer</h2>
          <p className="text-sm text-muted-foreground">
            {timerState.type === 'work' ? 'Focus Time' : timerState.type === 'longBreak' ? 'Long Break' : 'Short Break'}
          </p>
        </div>
        <div className="flex gap-2">
          {focusMode && (
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleFocusMode}
              data-testid="button-exit-focus-mode"
              title="Exit Focus Mode"
            >
              <Eye className="w-5 h-5" />
            </Button>
          )}
          {!focusMode && (
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleSettingsPanel}
              data-testid="button-timer-settings"
            >
              <Settings className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Circular Progress Timer */}
      <div className="flex justify-center py-8">
        <CircularProgress
          progress={progress}
          size={300}
          strokeWidth={12}
          timeDisplay={timeDisplay}
        />
      </div>
      
      {/* Session Counter */}
      <div className="flex justify-center">
        <Badge variant="outline" className="text-sm" data-testid="text-session-count">
          Session {timerState.currentSession}
        </Badge>
      </div>
      
      {/* Control Buttons */}
      <div className="flex justify-center gap-4">
        {!timerState.isRunning ? (
          <Button
            size="lg"
            onClick={handleStart}
            className="min-w-32"
            data-testid="button-timer-start"
          >
            <Play className="w-5 h-5 mr-2" />
            Start
          </Button>
        ) : (
          <Button
            size="lg"
            onClick={handlePause}
            variant="secondary"
            className="min-w-32"
            data-testid="button-timer-pause"
          >
            <Pause className="w-5 h-5 mr-2" />
            Pause
          </Button>
        )}
        <Button
          size="lg"
          variant="outline"
          onClick={handleReset}
          data-testid="button-timer-reset"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>
      
      {/* Preset Chips */}
      {!focusMode && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePresetChange(25, 5)}
            disabled={timerState.isRunning}
            data-testid="button-preset-25-5"
          >
            25/5
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePresetChange(50, 10)}
            disabled={timerState.isRunning}
            data-testid="button-preset-50-10"
          >
            50/10
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePresetChange(15, 3)}
            disabled={timerState.isRunning}
            data-testid="button-preset-15-3"
          >
            15/3
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePresetChange(45, 15)}
            disabled={timerState.isRunning}
            data-testid="button-preset-45-15"
          >
            45/15
          </Button>
        </div>
      )}
    </Card>
  );
}
