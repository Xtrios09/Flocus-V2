import { AudioPlayerControls } from '@/components/music/AudioPlayerControls';
import { ProviderSelector } from '@/components/music/ProviderSelector';
import { QueueDisplay } from '@/components/music/QueueDisplay';
import { MusicErrorBoundary } from '@/components/music/MusicErrorBoundary';
import { Card } from '@/components/ui/card';
import { Music2, AlertCircle } from 'lucide-react';
import { useMusicStore } from '@/stores/useMusicStore';

export default function MusicPage() {
  const { queue, error } = useMusicStore();

  return (
    <MusicErrorBoundary>
      <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Music</h1>
        <p className="text-muted-foreground">Focus better with ambient music</p>
      </div>
      
      <AudioPlayerControls />
      
      <div className="grid gap-6 lg:grid-cols-2">
        <ProviderSelector />
        {queue.length > 0 && (
          <QueueDisplay />
        )}
      </div>
      
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-md">
            <Music2 className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Why Music Helps Focus</h3>
            <p className="text-sm text-muted-foreground">
              Studies show that certain types of music can enhance concentration and productivity.
              Lo-fi beats, classical music, and nature sounds are particularly effective for deep work.
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Reduces external distractions</li>
              <li>Creates a consistent audio environment</li>
              <li>Triggers focused mental state</li>
              <li>Enhances mood and motivation</li>
            </ul>
          </div>
        </div>
      </Card>
      
      {error && (
        <Card className="p-4 bg-destructive/10 border-destructive/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Playback Error</p>
              <p className="text-xs text-muted-foreground mt-1">{error}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
    </MusicErrorBoundary>
  );
}
