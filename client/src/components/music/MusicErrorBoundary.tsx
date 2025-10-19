import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class MusicErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Music player error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Card className="p-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="p-3 bg-destructive/10 rounded-full">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Music Player Error</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {this.state.error?.message || 'Something went wrong with the music player'}
              </p>
              <Button onClick={this.handleReset} variant="outline">
                Retry
              </Button>
            </div>
          </div>
        </Card>
      );
    }

    return this.props.children;
  }
}
