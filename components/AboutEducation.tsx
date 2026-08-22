import React from 'react';

export default function AboutEducation() {
  return (
    <section id="about" className="w-full border-b border-black py-16 sm:py-20 bg-[#FAFAF9]">
      <div className="fluid-container flex flex-col gap-8">
        <div className="flex items-center justify-between border-b border-black/15 pb-4 font-mono text-xs">
          <span className="font-bold text-[#0055FF] tracking-wider uppercase">
            {'03 // ENGINEERING BIOGRAPHY & ACADEMICS'}
          </span>
          <span className="text-[#737373] text-[11px] uppercase">
            DOSSIER_ID: AG-BIO-2026
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 border border-black p-6 sm:p-8 bg-white space-y-4">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-black">
              ENGINEERING PHILOSOPHY
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#525252] leading-relaxed">
              I approach software engineering as an exact discipline combining architectural rigor, mathematical clarity, and industrial design aesthetics. Building production software requires not just functional code, but resilient infrastructure, predictable data flows, and maintainable systems designed to endure.
            </p>
            <p className="font-sans text-sm sm:text-base text-[#525252] leading-relaxed">
              Specializing in backend engineering with Java and Spring Boot, I focus on delivering robust APIs, scalable architectures, and practical software products. I learn by building and understanding how systems behave beyond the code.
            </p>
          </div>

          <div className="lg:col-span-5 border border-black p-6 sm:p-8 bg-white space-y-4 font-mono">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-black font-sans">
              ACADEMIC CREDENTIALS
            </h3>
            <div className="space-y-3 pt-2">
              <div className="text-xs font-semibold text-black uppercase">
                VIT // INTEGRATED MASTER'S DEGREE
              </div>
              <div className="text-xs text-[#525252]">
                Focus: Software Engineering, Backend Architecture.
                <br />
                CGPA // 7.34
              </div>
              <div className="text-[11px] text-[#0055FF] font-semibold border-t border-black/10 pt-2">
                STATUS: CURRENTLY PURSUING // EXPECTED 2029
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
