import React from 'react';

export default function AboutEducation() {
  return (
    <section id="about" className="w-full border-b border-black dark:border-white py-16 sm:py-20 bg-[#FAFAF9] dark:bg-[#0A0A0A]">
      <div className="fluid-container flex flex-col gap-8">
        <div className="flex items-center justify-between border-b border-black/15 dark:border-white/15 pb-4 font-mono text-xs">
          <span className="font-bold text-[#0055FF] tracking-wider uppercase">
            {'03 // ENGINEERING BIOGRAPHY & ACADEMICS'}
          </span>
          <span className="text-[#737373] dark:text-[#A3A3A3] text-[11px] uppercase">
            DOSSIER_ID: AG-BIO-2026
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-12 border border-black dark:border-white p-6 sm:p-8 bg-white dark:bg-[#1A1A1A] space-y-4">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-black dark:text-white">
              ENGINEERING PHILOSOPHY
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              I approach software engineering as an exact discipline combining architectural rigor, mathematical clarity, and industrial design aesthetics. Building production software requires not just functional code, but resilient infrastructure, predictable data flows, and maintainable systems designed to endure.
            </p>
            <p className="font-sans text-sm sm:text-base text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              Specializing in backend engineering with Java and Spring Boot, I focus on delivering robust APIs, scalable architectures, and practical software products. I learn by building and understanding how systems behave beyond the code.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
