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
    <section id="contact" className="w-full py-16 sm:py-20 bg-[#FAFAF9] dark:bg-[#0A0A0A]">
      <div className="fluid-container flex flex-col gap-8">
        <div className="flex items-center justify-between border-b border-black/15 dark:border-white/15 pb-4 font-mono text-xs">
          <span className="font-bold text-[#0055FF] tracking-wider uppercase">
            {'04 // INITIATE TRANSMISSION'}
          </span>
          <span className="text-[#737373] dark:text-[#A3A3A3] text-[11px] uppercase">
            CHANNEL: DIRECT_EMAIL
          </span>
        </div>

        <div className="border border-black dark:border-white p-8 sm:p-12 bg-white dark:bg-[#1A1A1A] flex flex-col items-start gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#737373] dark:text-[#A3A3A3] uppercase">
              STATUS: AVAILABLE FOR ENGAGEMENT
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-bold uppercase tracking-tight text-black dark:text-white">
              READY TO COLLABORATE ON PRODUCTION SYSTEMS?
            </h3>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#525252] dark:text-[#A3A3A3] max-w-2xl leading-relaxed">
            Available for software engineering roles, technical architecture consulting, and high-impact engineering projects. Transmission channels are monitored continuously.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 border border-black dark:border-white px-6 py-3 bg-[#0055FF] text-white uppercase tracking-wider hover:bg-[#0040CC] transition-all"
            >
              TRANSMIT VIA MAIL [contact@abrahamgracef.dev] ↗
            </a>

            <button
              onClick={handleCopy}
              type="button"
              className="inline-flex items-center gap-2 border border-black dark:border-white px-4 py-3 bg-white dark:bg-[#1A1A1A] text-black dark:text-white uppercase tracking-wider hover:bg-[#F4F4F2] dark:bg-[#262626] transition-all"
            >
              {copied ? '✓ COPIED TO CLIPBOARD // 200 OK' : 'COPY EMAIL TO CLIPBOARD'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
