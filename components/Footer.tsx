import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-black bg-[#FAFAF9] font-mono text-xs text-black">
      {/* Top Grid Info */}
      <div className="fluid-container py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Identity */}
        <div className="space-y-2">
          <div className="text-[10px] tracking-widest text-[#737373] uppercase">{'// DEVELOPER'}</div>
          <div className="font-display text-base font-bold tracking-tight uppercase">
            Abraham Grace
          </div>
          <div className="text-xs text-[#525252]">
            Software Developer &amp; Systems Engineer
          </div>
        </div>

        {/* Col 2: Stack Summary */}
        <div className="space-y-2">
          <div className="text-[10px] tracking-widest text-[#737373] uppercase">{'// ARCHITECTURE STACK'}</div>
          <div className="text-xs space-y-1 text-[#525252]">
            <div>Engine: Next.js (App Router) + TS</div>
            <div>Styling: Tailwind CSS (Design Tokens)</div>
            <div>Motion: Pure CSS Keyframes (0-JS Libs)</div>
          </div>
        </div>

        {/* Col 3: Direct Contact */}
        <div className="space-y-2">
          <div className="text-[10px] tracking-widest text-[#737373] uppercase">{'// DIRECT TRANSMISSION'}</div>
          <div>
            <a
              href="mailto:contact@abrahamgracef.dev"
              className="text-[#525252] hover:text-[#0055FF] transition-colors"
            >
              contact@abrahamgracef.dev
            </a>
          </div>
          <div className="text-[11px] text-[#737373]">
            Location: Remote / Global
          </div>
        </div>

        {/* Col 4: Telemetry Status */}
        <div className="space-y-2">
          <div className="text-[10px] tracking-widest text-[#737373] uppercase">{'// SYSTEM TELEMETRY'}</div>
          <div className="inline-flex items-center gap-2 border border-black px-2.5 py-1.5 bg-white">
            <span className="w-2 h-2 rounded-full bg-[#0055FF] animate-pulse-dot" />
            <span className="tracking-widest text-[11px] font-semibold text-black uppercase select-none">
              {'SYSTEM // ONLINE'}
            </span>
          </div>
          <div className="text-[10px] text-[#737373]">
            {'LATENCY: 12ms // BUFFER: 100%'}
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-black/10 py-4">
        <div className="fluid-container flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#737373]">
          <div>
            &copy; {new Date().getFullYear()} Abraham Grace. ALL RIGHTS RESERVED.
          </div>
          <div>
            SPECIFICATION_ID: AG-PORTFOLIO-2026
          </div>
        </div>
      </div>
    </footer>
  );
}
