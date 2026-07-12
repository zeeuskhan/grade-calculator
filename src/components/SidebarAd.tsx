import React, { useLayoutEffect, useRef } from 'react';

interface SidebarAdProps {
  side: 'left' | 'right';
}

export const SidebarAd = ({ side }: SidebarAdProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (adContainerRef.current) {
      adContainerRef.current.innerHTML = '';
      
      const script1 = document.createElement('script');
      script1.type = 'text/javascript';
      script1.innerHTML = `
        window.atOptions = {
          'key' : '8a88a488fc0002bebafce38bde5ddaf7',
          'format' : 'iframe',
          'height' : 600,
          'width' : 160,
          'params' : {}
        };
      `;
      
      const script2 = document.createElement('script');
      script2.type = 'text/javascript';
      script2.src = "https://www.highperformanceformat.com/8a88a488fc0002bebafce38bde5ddaf7/invoke.js";
      
      adContainerRef.current.appendChild(script1);
      adContainerRef.current.appendChild(script2);
    }
  }, []);

  return (
    <div className={`hidden xl:block sticky top-24 h-[600px] w-[160px] ${side === 'left' ? 'mr-4' : 'ml-4'} shrink-0`}>
      <div 
        ref={adContainerRef} 
        className="w-[160px] h-[600px] bg-indigo-50/30 rounded-lg overflow-hidden border border-indigo-100 flex items-center justify-center relative"
      >
        <span className="text-[10px] font-black text-indigo-200 uppercase tracking-widest absolute top-2">Advertisement</span>
      </div>
    </div>
  );
};
