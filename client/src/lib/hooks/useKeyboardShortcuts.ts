import { useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';

export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const { timerState, startTimer, pauseTimer, toggleFocusMode } = useAppStore.getState();
      
      // Don't trigger shortcuts when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          if (timerState.isRunning) {
            pauseTimer();
          } else {
            startTimer();
          }
          break;
        case 'f':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            toggleFocusMode();
          }
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
}
