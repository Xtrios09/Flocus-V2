import { PomodoroTimer } from '@/components/pomodoro/PomodoroTimer';
import { TodoList } from '@/components/todos/TodoList';
import { MusicPlayer } from '@/components/music/MusicPlayer';
import { Card } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';

const DAILY_TIPS = [
  'Break large tasks into smaller, manageable Pomodoros',
  'Take regular breaks to maintain peak performance',
  'Stay hydrated during focus sessions',
  'Eliminate distractions before starting',
  'Review completed tasks at the end of each day',
];

export default function HomePage() {
  const dailyTip = DAILY_TIPS[new Date().getDay() % DAILY_TIPS.length];
  const { focusMode } = useAppStore();
  
  if (focusMode) {
    // In focus mode, show only the timer centered
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="max-w-2xl w-full">
          <PomodoroTimer />
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Daily Tip */}
      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="flex gap-3">
          <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-sm">Productivity Tip</h3>
            <p className="text-sm text-muted-foreground">{dailyTip}</p>
          </div>
        </div>
      </Card>
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timer - Full width on mobile, 2 cols on desktop */}
        <div className="lg:col-span-2">
          <PomodoroTimer />
        </div>
        
        {/* Music Player */}
        <div className="lg:col-span-1">
          <MusicPlayer />
        </div>
        
        {/* Todo List - Full width */}
        <div className="lg:col-span-3">
          <TodoList />
        </div>
      </div>
    </div>
  );
}
