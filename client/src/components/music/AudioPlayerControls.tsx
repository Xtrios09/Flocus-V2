import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Repeat,
  Repeat1,
  Shuffle,
} from 'lucide-react';
import { useMusicStore } from '@/stores/useMusicStore';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function AudioPlayerControls() {
  const {
    currentTrack,
    isPlaying,
    volume,
    repeat,
    shuffle,
    setIsPlaying,
    setVolume,
    setRepeat,
    toggleShuffle,
    nextTrack,
    previousTrack,
  } = useMusicStore();

  const { currentTime, duration, buffered, seek } = useMusicPlayer();

  const handlePlayPause = () => {
    if (!currentTrack) return;
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    seek(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const toggleRepeat = () => {
    if (repeat === 'none') setRepeat('all');
    else if (repeat === 'all') setRepeat('one');
    else setRepeat('none');
  };

  const toggleMute = () => {
    setVolume(volume > 0 ? 0 : 70);
  };

  if (!currentTrack) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          <p className="text-sm">No track selected</p>
          <p className="text-xs mt-1">Choose a playlist to start playing</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-4">
      {/* Current Track Info */}
      <div className="flex items-center gap-4">
        {currentTrack.thumbnailUrl && (
          <img
            src={currentTrack.thumbnailUrl}
            alt={currentTrack.title}
            className="w-16 h-16 rounded object-cover"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{currentTrack.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
          <p className="text-xs text-muted-foreground capitalize">{currentTrack.provider}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <Slider
          value={[currentTime]}
          onValueChange={handleSeek}
          max={duration || 100}
          step={0.1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleShuffle}
          className={shuffle ? 'text-primary' : ''}
        >
          <Shuffle className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="outline" onClick={previousTrack}>
          <SkipBack className="w-4 h-4" />
        </Button>
        <Button size="icon" onClick={handlePlayPause} disabled={!currentTrack}>
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>
        <Button size="icon" variant="outline" onClick={nextTrack}>
          <SkipForward className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleRepeat}
          className={repeat !== 'none' ? 'text-primary' : ''}
        >
          {repeat === 'one' ? (
            <Repeat1 className="w-4 h-4" />
          ) : (
            <Repeat className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3">
        <Button size="icon" variant="ghost" onClick={toggleMute}>
          {volume === 0 ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </Button>
        <Slider
          value={[volume]}
          onValueChange={handleVolumeChange}
          max={100}
          step={1}
          className="flex-1"
        />
        <span className="text-sm text-muted-foreground w-10 text-right">{volume}%</span>
      </div>
    </Card>
  );
}
