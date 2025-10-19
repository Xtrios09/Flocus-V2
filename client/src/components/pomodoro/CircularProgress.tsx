interface CircularProgressProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  timeDisplay: string;
}

export function CircularProgress({
  progress,
  size = 300,
  strokeWidth = 12,
  timeDisplay,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted opacity-20"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-primary transition-all duration-300"
          style={{
            filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.4))',
          }}
        />
      </svg>
      
      {/* Time Display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="font-mono text-6xl font-bold" data-testid="text-timer-display">
            {timeDisplay}
          </div>
        </div>
      </div>
    </div>
  );
}
