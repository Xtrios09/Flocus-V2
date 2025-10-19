import { Card } from '@/components/ui/card';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { Target, Clock, Flame, TrendingUp } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { format, subDays, startOfDay } from 'date-fns';

export function Dashboard() {
  const { profile } = useAppStore();
  const sessions = useLiveQuery(() => db.sessions.toArray(), []) || [];
  const todos = useLiveQuery(() => db.todos.toArray(), []) || [];
  
  // Calculate stats
  const completedTodos = todos.filter(t => t.completed).length;
  const totalHours = Math.floor((profile?.totalFocusMinutes || 0) / 60);
  const totalMinutes = (profile?.totalFocusMinutes || 0) % 60;
  
  // Last 7 days session data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    return startOfDay(date).toISOString();
  });
  
  const sessionsByDay = last7Days.map(day => {
    const dayStart = new Date(day);
    const dayEnd = new Date(dayStart);
    dayEnd.setHours(23, 59, 59, 999);
    
    return sessions.filter(s => {
      const sessionDate = new Date(s.completedAt);
      return sessionDate >= dayStart && sessionDate <= dayEnd;
    }).length;
  });
  
  // Category breakdown
  const categoryData = todos.reduce((acc, todo) => {
    if (todo.completed) {
      acc[todo.category] = (acc[todo.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  const pieData = Object.entries(categoryData).map(([category, count], index) => ({
    id: index,
    value: count,
    label: category,
  }));
  
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-md">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sessions</p>
              <p className="text-2xl font-bold" data-testid="text-total-sessions">
                {profile?.totalSessions || 0}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-success/10 rounded-md">
              <Clock className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Focus Time</p>
              <p className="text-2xl font-bold" data-testid="text-focus-time">
                {totalHours}h {totalMinutes}m
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gold/10 rounded-md">
              <Flame className="w-6 h-6 text-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-bold" data-testid="text-current-streak">
                {profile?.currentStreak || 0} days
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-md">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tasks Done</p>
              <p className="text-2xl font-bold" data-testid="text-tasks-completed">
                {completedTodos}
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sessions Bar Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Sessions This Week</h3>
          <div className="h-64">
            {sessionsByDay.some(count => count > 0) ? (
              <BarChart
                xAxis={[{
                  scaleType: 'band',
                  data: last7Days.map(d => format(new Date(d), 'EEE')),
                }]}
                series={[{
                  data: sessionsByDay,
                  label: 'Sessions',
                  color: 'hsl(var(--primary))',
                }]}
                height={250}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No sessions this week yet
              </div>
            )}
          </div>
        </Card>
        
        {/* Category Pie Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Tasks by Category</h3>
          <div className="h-64 flex items-center justify-center">
            {pieData.length > 0 ? (
              <PieChart
                series={[{
                  data: pieData,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30 },
                }]}
                height={250}
                margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
              />
            ) : (
              <div className="text-muted-foreground">
                No completed tasks yet
              </div>
            )}
          </div>
        </Card>
      </div>
      
      {/* Activity Heatmap */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Activity Heatmap</h3>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }, (_, i) => {
            const date = subDays(new Date(), 34 - i);
            const dayStart = startOfDay(date);
            const dayEnd = new Date(dayStart);
            dayEnd.setHours(23, 59, 59, 999);
            
            const count = sessions.filter(s => {
              const sessionDate = new Date(s.completedAt);
              return sessionDate >= dayStart && sessionDate <= dayEnd;
            }).length;
            
            const intensity = count === 0 ? 0 : Math.min(4, Math.ceil(count / 2));
            
            return (
              <div
                key={i}
                className={`aspect-square rounded-sm ${
                  intensity === 0 ? 'bg-muted' :
                  intensity === 1 ? 'bg-primary/20' :
                  intensity === 2 ? 'bg-primary/40' :
                  intensity === 3 ? 'bg-primary/60' :
                  'bg-primary'
                }`}
                title={`${format(date, 'MMM d')}: ${count} sessions`}
              />
            );
          })}
        </div>
        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-muted rounded-sm" />
            <div className="w-4 h-4 bg-primary/20 rounded-sm" />
            <div className="w-4 h-4 bg-primary/40 rounded-sm" />
            <div className="w-4 h-4 bg-primary/60 rounded-sm" />
            <div className="w-4 h-4 bg-primary rounded-sm" />
          </div>
          <span>More</span>
        </div>
      </Card>
    </div>
  );
}
