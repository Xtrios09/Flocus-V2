import { useEffect, useRef, useState } from 'react';
import { useMusicStore } from '@/stores/useMusicStore';

export function useMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);

  const {
    currentTrack,
    isPlaying,
    volume,
    repeat,
    nextTrack,
    setIsPlaying,
    setError,
  } = useMusicStore();

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      audioRef.current.addEventListener('ended', () => {
        if (repeat === 'one') {
          audioRef.current!.currentTime = 0;
          audioRef.current!.play().catch(err => setError(err.message));
        } else {
          nextTrack();
        }
      });

      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current!.currentTime);
      });

      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current!.duration);
      });

      audioRef.current.addEventListener('progress', () => {
        if (audioRef.current!.buffered.length > 0) {
          const bufferedEnd = audioRef.current!.buffered.end(audioRef.current!.buffered.length - 1);
          const duration = audioRef.current!.duration;
          setBuffered((bufferedEnd / duration) * 100);
        }
      });

      audioRef.current.addEventListener('error', (e) => {
        const error = audioRef.current!.error;
        let errorMessage = 'Failed to load audio';
        
        if (error) {
          switch (error.code) {
            case error.MEDIA_ERR_ABORTED:
              errorMessage = 'Playback aborted';
              break;
            case error.MEDIA_ERR_NETWORK:
              errorMessage = 'Network error while loading audio';
              break;
            case error.MEDIA_ERR_DECODE:
              errorMessage = 'Audio decoding error';
              break;
            case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
              errorMessage = 'Audio format not supported';
              break;
          }
        }
        
        setError(errorMessage);
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && currentTrack?.streamUrl) {
      if (currentTrack.provider === 'local' || currentTrack.provider === 'soundcloud') {
        audioRef.current.src = currentTrack.streamUrl;
        audioRef.current.load();
        
        if (isPlaying) {
          audioRef.current.play().catch(err => {
            console.error('Play error:', err);
            setError('Failed to play track: ' + err.message);
            setIsPlaying(false);
          });
        }
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error('Play error:', err);
          setError('Failed to play: ' + err.message);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return {
    audioRef,
    currentTime,
    duration,
    buffered,
    seek,
  };
}
