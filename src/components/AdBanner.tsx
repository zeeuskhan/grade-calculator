import React, { useEffect, useRef } from 'react';

export const AdBanner = () => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adContainerRef.current) {
      // Clear container
      adContainerRef.current.innerHTML = '';
      
      const script1 = document.createElement('script');
      script1.type = 'text/javascript';
      script1.innerHTML = `
        atOptions = {
          'key' : '6b6777c4248ba9b31f1a7f8087ca4b49',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;
      
      const script2 = document.createElement('script');
      script2.type = 'text/javascript';
      script2.src = "//www.highperformanceformat.com/6b6777c4248ba9b31f1a7f8087ca4b49/invoke.js";
      
      adContainerRef.current.appendChild(script1);
      adContainerRef.current.appendChild(script2);
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-full min-h-[90px] py-6 overflow-hidden bg-white/30">
      <div ref={adContainerRef} className="ad-wrapper w-full max-w-[728px]" />
    </div>
  );
};
