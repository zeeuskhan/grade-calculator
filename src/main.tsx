import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safety guard for 'Cannot set property fetch of #<Window> which has only a getter' error
// This common error occurs when a library tries to polyfill or wrap fetch in a protected environment.
// We provide a setter to satisfy assignments that would otherwise throw.
try {
  if (typeof window !== 'undefined') {
    const descriptor = Object.getOwnPropertyDescriptor(window, 'fetch');
    if (descriptor && !descriptor.set && (descriptor.configurable || descriptor.writable === undefined)) {
      const originalFetch = window.fetch;
      let currentFetch = originalFetch;
      try {
        Object.defineProperty(window, 'fetch', {
          get: () => currentFetch,
          set: (v) => { 
            currentFetch = v;
            console.warn('window.fetch was reassigned');
          },
          configurable: true,
          enumerable: true
        });
      } catch (e) {
        // Fallback: if we can't use defineProperty, we might be stuck, 
        // but often this happens because it's already been redefined or is native.
      }
    }
  }
} catch (e) {}

// Global error listeners to silence benign/unavoidable third-party ad script errors (like adblock triggers)
// and uninformative CORS-masked cross-origin "Script error." notifications that bubble up in sandboxed iframes.
try {
  if (typeof window !== 'undefined') {
    // 1. Classical window.onerror handler (returning true prevents browser error reporting)
    const originalOnError = window.onerror;
    window.onerror = function (message, source, lineno, colno, error) {
      const msg = String(message || '');
      const src = String(source || '');
      
      // Silence if it is a generic CORS-masked "Script error" or from third-party ad scripts
      if (
        msg.includes('Script error') || 
        msg === 'Script error.' ||
        !src ||
        src.includes('endedstrung') || 
        src.includes('highperformanceformat') ||
        src.includes('invoke.js')
      ) {
        console.warn('Silenced cross-origin / third-party script error via window.onerror:', msg, 'at', src);
        return true; // Prevents the error from bubbling up and triggering environment failure
      }
      
      if (originalOnError) {
        return originalOnError.apply(this, arguments as any);
      }
      return false;
    };

    // 2. Modern addEventListener for capturing phase error handling
    window.addEventListener('error', (event) => {
      const msg = event.message || '';
      const url = event.filename || '';
      if (
        msg.includes('Script error.') || 
        msg.includes('Script error') ||
        url.includes('endedstrung') || 
        url.includes('highperformanceformat') ||
        url.includes('invoke.js') ||
        !url
      ) {
        event.preventDefault();
        event.stopPropagation();
        console.warn('Silenced external/cross-origin script error via EventListener:', msg, 'at', url);
      }
    }, true);

    // 3. Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason;
      if (reason) {
        const reasonStr = String(reason.message || reason);
        if (
          reasonStr.includes('endedstrung') || 
          reasonStr.includes('highperformanceformat') ||
          reasonStr.includes('invoke.js') ||
          reasonStr.includes('Script error')
        ) {
          event.preventDefault();
          event.stopPropagation();
          console.warn('Silenced external promise rejection:', reasonStr);
        }
      }
    }, true);
  }
} catch (e) {}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
