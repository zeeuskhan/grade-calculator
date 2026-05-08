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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
