'use client';

import React, { useState } from 'react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 'contact@abrahamgracef.dev';

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  return (
    <section id="contact" className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAFAF9]">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex items-center justify-between border-b border-black/15 pb-4 font-mono text-xs">
          <span className="font-bold text-[#0055FF] tracking-wider uppercase">
            {'04 // INITIATE TRANSMISSION'}
          </span>
          <span className="text-[#737373] text-[11px] uppercase">
            CHANNEL: DIRECT_EMAIL
          </span>
        </div>

        <div className="border border-black p-8 sm:p-12 bg-white flex flex-col items-start gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#737373] uppercase">
              STATUS: AVAILABLE FOR ENGAGEMENT
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-bold uppercase tracking-tight text-black">
              READY TO COLLABORATE ON PRODUCTION SYSTEMS?
            </h3>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#525252] max-w-2xl leading-relaxed">
            Available for software engineering roles, technical architecture consulting, and high-impact engineering projects. Transmission channels are monitored continuously.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 border border-black px-6 py-3 bg-[#0055FF] text-white uppercase tracking-wider hover:bg-[#0040CC] transition-all"
            >
              TRANSMIT VIA MAIL [contact@abrahamgracef.dev] ↗
            </a>

            <button
              onClick={handleCopy}
              type="button"
              className="inline-flex items-center gap-2 border border-black px-4 py-3 bg-white text-black uppercase tracking-wider hover:bg-[#F4F4F2] transition-all"
            >
              {copied ? '✓ COPIED TO CLIPBOARD // 200 OK' : 'COPY EMAIL TO CLIPBOARD'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
