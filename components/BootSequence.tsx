'use client';

import React, { useEffect, useState } from 'react';

interface BootSequenceProps {
  onComplete?: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [bootStatus, setBootStatus] = useState<'INITIALIZING' | 'LOADING_MODULES' | 'VERIFYING_SYSTEMS' | 'READY'>('INITIALIZING');
  const [isBooted, setBooted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setBooted(true);
      if (onComplete) onComplete();
      return;
    }

    const t1 = setTimeout(() => {
      setBootStatus('LOADING_MODULES');
      setProgress(45);
    }, 200);

    const t2 = setTimeout(() => {
      setBootStatus('VERIFYING_SYSTEMS');
      setProgress(85);
    }, 450);

    const t3 = setTimeout(() => {
      setBootStatus('READY');
      setProgress(100);
    }, 700);

    const t4 = setTimeout(() => {
      setBooted(true);
      if (onComplete) onComplete();
    }, 850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  if (isBooted) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAFAF9] font-mono text-xs text-black select-none pointer-events-auto transition-opacity duration-300"
      aria-label="System Boot Sequence"
    >
      <div className="w-full max-w-md p-6 border border-black bg-white shadow-none space-y-4 mx-4">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-black/20 pb-2 text-[10px] text-[#737373]">
          <span>AG_SYS // BOOT_LOADER_v2.6</span>
          <span className="text-[#0055FF] font-bold">{progress}%</span>
        </div>

        {/* Status Line */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0055FF] animate-pulse-dot" />
            <span className="font-semibold text-black uppercase">
              {bootStatus === 'READY' ? 'INTERFACE // READY' : `SYSTEM INITIALIZING... [${bootStatus}]`}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 border border-black bg-[#F4F4F2] overflow-hidden">
            <div 
              className="h-full bg-[#0055FF] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Diagnostics Subtitle */}
        <div className="text-[10px] text-[#525252] flex justify-between border-t border-black/10 pt-2">
          <span>MEM: 100% NOMINAL</span>
          <span>BUS: ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
