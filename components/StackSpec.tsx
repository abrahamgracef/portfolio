import React from 'react';

export default function StackSpec() {
  return (
    <section id="stack" className="w-full border-b border-black dark:border-white py-16 sm:py-20 bg-[#FAFAF9] dark:bg-[#0A0A0A]">
      <div className="fluid-container flex flex-col gap-8">
        <div className="flex items-center justify-between border-b border-black/15 dark:border-white/15 pb-4 font-mono text-xs">
          <span className="font-bold text-[#0055FF] tracking-wider uppercase">
            {'02 // TECHNICAL SPECIFICATIONS'}
          </span>
          <span className="text-[#737373] dark:text-[#A3A3A3] text-[11px] uppercase">
            SYS_TAXONOMY: BACKEND_SYSTEMS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-black dark:border-white p-6 bg-white dark:bg-[#1A1A1A] space-y-3 font-mono hover:border-[#0055FF] transition-colors">
            <div className="text-[10px] text-[#0055FF] font-bold uppercase">{'[01] LANGUAGES'}</div>
            <div className="text-sm font-semibold text-black dark:text-white">Java (Primary), TypeScript, JavaScript, SQL</div>
            <p className="text-xs text-[#525252] dark:text-[#A3A3A3] font-sans">Object-oriented design, strict typing, modern ECMAScript standards.</p>
          </div>

          <div className="border border-black dark:border-white p-6 bg-white dark:bg-[#1A1A1A] space-y-3 font-mono hover:border-[#0055FF] transition-colors">
            <div className="text-[10px] text-[#0055FF] font-bold uppercase">{'[02] BACKEND & RUNTIMES'}</div>
            <div className="text-sm font-semibold text-black dark:text-white">Spring Boot, Spring Security, Node.js</div>
            <p className="text-xs text-[#525252] dark:text-[#A3A3A3] font-sans">RESTful APIs, enterprise architecture, secure endpoints.</p>
          </div>

          <div className="border border-black dark:border-white p-6 bg-white dark:bg-[#1A1A1A] space-y-3 font-mono hover:border-[#0055FF] transition-colors">
            <div className="text-[10px] text-[#0055FF] font-bold uppercase">{'[03] DATABASE & CACHE'}</div>
            <div className="text-sm font-semibold text-black dark:text-white">PostgreSQL, Redis, Supabase, Prisma, Drizzle</div>
            <p className="text-xs text-[#525252] dark:text-[#A3A3A3] font-sans">Relational modeling, vector embeddings storage, low-latency caching layers.</p>
          </div>

          <div className="border border-black dark:border-white p-6 bg-white dark:bg-[#1A1A1A] space-y-3 font-mono hover:border-[#0055FF] transition-colors">
            <div className="text-[10px] text-[#0055FF] font-bold uppercase">{'[04] CLOUD & DEVOPS'}</div>
            <div className="text-sm font-semibold text-black dark:text-white">Docker, AWS, Vercel, CI/CD Actions, Linux</div>
            <p className="text-xs text-[#525252] dark:text-[#A3A3A3] font-sans">Containerized deployments, serverless functions, automated testing workflows.</p>
          </div>

          <div className="border border-black dark:border-white p-6 bg-white dark:bg-[#1A1A1A] space-y-3 font-mono hover:border-[#0055FF] transition-colors">
            <div className="text-[10px] text-[#0055FF] font-bold uppercase">{'[05] FRONTEND & INTERACTION'}</div>
            <div className="text-sm font-semibold text-black dark:text-white">React 18, Next.js App Router, Tailwind CSS, HTML5/CSS3</div>
            <p className="text-xs text-[#525252] dark:text-[#A3A3A3] font-sans">Server Components, responsive layouts, accessible UI systems, zero-heavy-lib animations.</p>
          </div>

          <div className="border border-black dark:border-white p-6 bg-white dark:bg-[#1A1A1A] space-y-3 font-mono hover:border-[#0055FF] transition-colors">
            <div className="text-[10px] text-[#0055FF] font-bold uppercase">{'[06] TOOLS & METHODOLOGIES'}</div>
            <div className="text-sm font-semibold text-black dark:text-white">Git, VS Code, Postman, Jest, Vitest, Architecture RFCs</div>
            <p className="text-xs text-[#525252] dark:text-[#A3A3A3] font-sans">Test-driven development, modular design, clean code standards, engineering documentation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
