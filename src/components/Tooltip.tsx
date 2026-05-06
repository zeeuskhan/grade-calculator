import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
}

export const Tooltip = ({ content, children, className }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className={`relative inline-flex items-center ${className || ''}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ left: '50%', transform: 'translateX(-50%)' }}
            className="absolute z-[100] bottom-full mb-3 w-max max-w-[200px] px-4 py-2.5 bg-slate-900 dark:bg-slate-800 text-white text-[11px] leading-relaxed font-bold rounded-xl shadow-2xl pointer-events-none border border-slate-700/50"
          >
            {content}
            <div 
              className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-900 dark:border-t-slate-800" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
