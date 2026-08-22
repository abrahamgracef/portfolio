import React from 'react';

export default function SelectedWork() {
  return (
    <section id="work" className="w-full border-b border-black py-16 sm:py-20 bg-[#FAFAF9]">
      <div className="fluid-container flex flex-col gap-8">
        {/* Section Header Strip */}
        <div className="flex items-center justify-between border-b border-black/15 pb-4 font-mono text-xs">
          <span className="font-bold text-[#0055FF] tracking-wider uppercase">
            {'01 // SELECTED WORK'}
          </span>
          <span className="text-[#737373] text-[11px] uppercase">
            PRJ_ID: KAIROKU-SYS
          </span>
        </div>

        {/* Featured Project Card: KAIROKU */}
        <div className="border border-black p-6 sm:p-8 bg-white space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#737373] uppercase">
                FEATURED ARCHITECTURE
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase tracking-tight text-black">
                KAIROKU
              </h2>
            </div>
            <span className="font-mono text-xs border border-black/20 px-2.5 py-1 bg-[#F4F4F2] text-[#0A0A0A] font-semibold">
              STATUS: PRODUCTION // STABLE
            </span>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#525252] max-w-3xl leading-relaxed">
            A Discord music platform focused on reliable playback, queue management and scalable bot infrastructure.
          </p>

          {/* Technical Architecture Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs border-t border-b border-black/10 py-4">
            <div className="space-y-1">
              <div className="text-[10px] text-[#737373] uppercase">ARCHITECTURE</div>
              <div className="font-semibold text-black">Microservices / Bot Infrastructure</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] text-[#737373] uppercase">API</div>
              <div className="font-semibold text-[#0055FF]">Discord API + Lavalink</div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] text-[#737373] uppercase">DATABASE</div>
              <div className="font-semibold text-black">PostgreSQL</div>
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div className="space-y-2 font-mono">
            <div className="text-[10px] text-[#737373] uppercase tracking-wider">TECHNOLOGY STACK</div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="border border-black px-2.5 py-1 bg-[#FAFAF9] text-black">Java</span>
              <span className="border border-black px-2.5 py-1 bg-[#FAFAF9] text-black">Spring Boot</span>
              <span className="border border-black px-2.5 py-1 bg-[#FAFAF9] text-black">Discord API</span>
              <span className="border border-black px-2.5 py-1 bg-[#FAFAF9] text-black">Lavalink</span>
              <span className="border border-black px-2.5 py-1 bg-[#FAFAF9] text-black">PostgreSQL</span>
              <span className="border border-black px-2.5 py-1 bg-[#FAFAF9] text-black">Docker</span>
            </div>
          </div>

          {/* CTA Action */}
          <div className="pt-2">
            <a
              href="https://kairoku.abrahamgracef.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-black px-5 py-2.5 bg-black text-white font-mono text-xs uppercase tracking-wider hover:bg-[#0055FF] hover:border-[#0055FF] transition-all group"
            >
              OPEN SYSTEM <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
