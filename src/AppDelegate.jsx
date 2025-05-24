import { useEffect } from 'react';

class AppDelegate {
  static instance = null;
  
  constructor() {
    if (AppDelegate.instance) {
      return AppDelegate.instance;
    }
    AppDelegate.instance = this;
    this.initialize();
  }

  initialize() {
    this.setupErrorHandling();
    this.setupPerformanceMonitoring();
  }

  setupErrorHandling() {
    window.onerror = (message, source, lineno, colno, error) => {
      console.error('Global error:', { message, source, lineno, colno, error });
      // Add your error reporting service here
    };

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      // Add your error reporting service here
    });
  }

  setupPerformanceMonitoring() {
    if ('performance' in window && 'memory' in window.performance) {
      setInterval(() => {
        const memory = window.performance.memory;
        if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
          console.warn('High memory usage detected');
        }
      }, 10000);
    }
  }

  handleAppStateChange(state) {
    console.log('App state changed:', state);
    // Handle app state changes (active, background, inactive)
  }
}

export function useAppDelegate() {
  useEffect(() => {
    const appDelegate = new AppDelegate();
    
    // Handle visibility change
    const handleVisibilityChange = () => {
      appDelegate.handleAppStateChange(document.visibilityState);
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}

export default AppDelegate;