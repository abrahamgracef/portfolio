import React from 'react';
import TerminalSchematic from './TerminalSchematic';

export default function Hero() {
  return (
    <section className="w-full border-b border-black py-12 sm:py-20 bg-[#FAFAF9]">
      <div className="fluid-container flex flex-col gap-8">
        {/* Metadata Strip */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#525252]">
          <span className="border border-black px-2 py-0.5 bg-white font-semibold text-black">
            LOC: 12.9716° N, 77.5946° E
          </span>
          <span className="hidden sm:inline-block">{'//'}</span>
          <span className="font-semibold text-black">Abraham Grace</span>
          <span className="hidden sm:inline-block">{'//'}</span>
          <span className="hidden sm:inline-block">ROLE: SOFTWARE DEVELOPER</span>
          <span className="hidden sm:inline-block">{'//'}</span>
          <span className="text-[#0055FF] font-semibold">STATUS: AVAILABLE</span>
          <span className="hidden md:inline-block">{'//'}</span>
          <span className="hidden md:inline-block text-[#737373]">SPEC_ID: AG-SYS-2026</span>
        </div>

        {/* Display Typography & Hero Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex flex-col gap-6 min-w-0">
            <h1 className="font-display font-black text-[clamp(3rem,6vw,5.5rem)] tracking-tight uppercase text-black leading-none">
              SOFTWARE<br />DEVELOPER
            </h1>

            <p className="max-w-2xl font-sans text-base sm:text-lg text-[#525252] leading-relaxed">
              Building backend systems, APIs and practical software products. Specializing in Java and Spring Boot, while actively learning TypeScript and JavaScript to build full-stack web applications.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs">
              <a
                href="#work"
                className="border border-black px-5 py-3 bg-black text-white hover:bg-[#0055FF] hover:border-[#0055FF] transition-all"
              >
                EXPLORE WORK ↓
              </a>
              <a
                href="#contact"
                className="border border-black px-5 py-3 bg-white text-black hover:bg-[#0055FF] hover:text-white hover:border-[#0055FF] transition-all"
              >
                INITIATE CONTACT ↗
              </a>
            </div>
          </div>

          {/* Terminal Workstation Schematic */}
          <div className="lg:col-span-7 w-full min-w-0">
            <div className="hidden md:block w-full">
              <TerminalSchematic />
            </div>
            {/* Mobile Simplified Terminal */}
            <div className="md:hidden w-full border border-black bg-white p-4 sm:p-6 font-mono text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2 mb-4 text-[#737373] text-[10px] border-b border-black/15 pb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0055FF]"></span>
                <span className="font-bold">TERMINAL-WS-01 // MOBILE_VIEW</span>
              </div>
              <div className="space-y-2">
                <div className="text-[#0055FF] font-bold break-all">ag@workstation:~$ <span className="text-black">kairoku init</span></div>
                <div className="text-[#525252] flex justify-between"><span>[SYS:01] Booting...</span> <span className="text-[#0055FF] font-bold">[OK]</span></div>
                <div className="text-[#525252] flex justify-between"><span>[SYS:02] Engine sync...</span> <span className="text-[#0055FF] font-bold">[OK]</span></div>
                <div className="text-[#525252] flex justify-between"><span>[SYS:03] Cluster pods...</span> <span className="text-[#0055FF] font-bold">[ONLINE]</span></div>
              </div>
              <div className="text-[#0055FF] font-bold mt-6 flex items-center gap-1 break-all">
                ag@workstation:~$ <span className="text-black">sys-status</span>
                <span className="animate-terminal-cursor text-sm">█</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
