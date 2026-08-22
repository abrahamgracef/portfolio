import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAFAF9] border-b border-black font-mono text-xs">
      <div className="fluid-container py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Identity / Moniker (and Mobile Status) */}
        <div className="flex w-full md:w-auto items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="font-display font-bold text-sm tracking-wider uppercase text-black hover:text-[#0055FF] transition-colors"
            >
              ABRAHAM GRACE
            </Link>
            <span className="hidden sm:inline-block text-[#737373] text-[10px] tracking-widest uppercase border border-black/20 px-1.5 py-0.5 bg-[#F4F4F2]">
              SPEC_v2.6
            </span>
          </div>

          {/* Mobile Status Indicator */}
          <div className="flex md:hidden items-center gap-2 border border-black px-2 py-0.5 bg-white">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0055FF] animate-pulse-dot" />
            <span className="tracking-widest text-[9px] font-semibold text-black uppercase select-none">
              SYS_ON
            </span>
          </div>
        </div>

        {/* Center: Technical Navigation */}
        <nav className="flex items-center gap-5 sm:gap-8 w-full md:w-auto overflow-x-auto justify-between md:justify-center pb-1 md:pb-0 no-scrollbar">
          <a href="#work" className="text-black hover:text-[#0055FF] tracking-wider uppercase transition-colors shrink-0">
            WORK
          </a>
          <a href="#stack" className="text-black hover:text-[#0055FF] tracking-wider uppercase transition-colors shrink-0">
            STACK
          </a>
          <a href="#about" className="text-black hover:text-[#0055FF] tracking-wider uppercase transition-colors shrink-0">
            ABOUT
          </a>
          <a href="#contact" className="text-black hover:text-[#0055FF] tracking-wider uppercase transition-colors shrink-0">
            CONTACT
          </a>
        </nav>

        {/* Right: System Status Indicator (Desktop) */}
        <div className="hidden md:flex items-center gap-2 border border-black px-2.5 py-1 bg-white">
          <span className="w-2 h-2 rounded-full bg-[#0055FF] animate-pulse-dot" />
          <span className="tracking-widest text-[11px] font-semibold text-black uppercase select-none">
            {'SYSTEM // ONLINE'}
          </span>
        </div>
      </div>
    </header>
  );
}
