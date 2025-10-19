import { MusicPlayer } from '@/components/music/MusicPlayer';
import { Card } from '@/components/ui/card';
import { Music2 } from 'lucide-react';

export default function MusicPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Music</h1>
        <p className="text-muted-foreground">Focus better with ambient music</p>
      </div>
      
      <MusicPlayer />
      
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
    </div>
  );
}
