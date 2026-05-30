import React, { useEffect, useRef } from 'react';

export const AdBanner = () => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = adContainerRef.current;
    if (!container) return;

    // Clear any previous scripts in this container to prevent duplicate loads
    const existingScripts = container.querySelectorAll('script');
    existingScripts.forEach((s) => s.remove());

    // Explicitly bind atOptions to the global window object before loading script
    (window as any).atOptions = {
      'key': '6b6777c4248ba9b31f1a7f8087ca4b49',
      'format': 'iframe',
      'height': 90,
      'width': 728,
      'params': {}
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://endedstrung.com/6b6777c4248ba9b31f1a7f8087ca4b49/invoke.js';
    script.async = true;

    container.appendChild(script);

    return () => {
      // Clean up the scripts on component unmount
      if (container) {
        const injectedScripts = container.querySelectorAll('script');
        injectedScripts.forEach((s) => s.remove());
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-full min-h-[110px] py-4 overflow-hidden bg-white/30 dark:bg-transparent print:hidden px-4">
      <div 
        ref={adContainerRef} 
        className="ad-wrapper w-full max-w-[728px] min-h-[90px] bg-indigo-50/20 dark:bg-indigo-900/10 rounded-xl flex items-center justify-center relative border border-indigo-50/50 dark:border-indigo-900/20"
      >
        <span className="text-[10px] font-black text-indigo-300 dark:text-indigo-700 uppercase tracking-widest absolute top-1">Advertisement</span>
      </div>
    </div>
  );
};
