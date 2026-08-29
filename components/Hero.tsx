import React, { useState, useEffect } from 'react';
import TerminalSchematic from './TerminalSchematic';

const PHRASES = [
  "I am a Software Developer",
  "I build backend systems",
  "I design REST APIs"
];

export default function Hero() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer = setTimeout(() => {
      const i = loopNum % PHRASES.length;
      const fullText = PHRASES[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    }, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section className="w-full border-b border-black dark:border-white py-12 sm:py-20 bg-[#FAFAF9] dark:bg-[#0A0A0A]">
      <div className="fluid-container flex flex-col gap-8">
        {/* Metadata Strip */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#525252] dark:text-[#A3A3A3]">
          <span className="border border-black dark:border-white px-2 py-0.5 bg-white dark:bg-[#1A1A1A] font-semibold text-black dark:text-white">
            LOC: 12.9716° N, 77.5946° E
          </span>
          <span className="hidden sm:inline-block">{'//'}</span>
          <span className="font-semibold text-black dark:text-white">Abraham Grace</span>
          <span className="hidden sm:inline-block">{'//'}</span>
          <span className="hidden sm:inline-block">ROLE: SOFTWARE DEVELOPER</span>
          <span className="hidden sm:inline-block">{'//'}</span>
          <span className="text-[#0055FF] font-semibold">STATUS: AVAILABLE</span>
          <span className="hidden md:inline-block">{'//'}</span>
          <span className="hidden md:inline-block text-[#737373] dark:text-[#A3A3A3]">SPEC_ID: AG-SYS-2026</span>
        </div>

        {/* Display Typography & Hero Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex flex-col gap-6 min-w-0">
            <div>
              <h1 className="font-display font-black text-[clamp(3rem,6vw,5.5rem)] tracking-tight uppercase text-black dark:text-white leading-none break-words">
                ABRAHAM<br />GRACE
              </h1>
              <div className="font-mono text-lg sm:text-xl lg:text-2xl text-[#0055FF] font-bold mt-3 sm:mt-4 flex flex-wrap items-center min-h-[56px] sm:min-h-[40px]">
                <span>&gt; {text}</span><span className="animate-pulse ml-1">_</span>
              </div>
            </div>

            <p className="max-w-2xl font-sans text-base sm:text-lg text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              Building backend systems, APIs and practical software products. Experienced in Java and Spring Boot, with production TypeScript, Node.js and Discord API work.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs">
              <a
                href="#work"
                className="border border-black dark:border-white px-5 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-[#0055FF] dark:hover:text-white hover:border-[#0055FF] transition-all"
              >
                EXPLORE WORK ↓
              </a>
              <a
                href="#contact"
                className="border border-black dark:border-white px-5 py-3 bg-white dark:bg-[#1A1A1A] text-black dark:text-white hover:bg-[#0055FF] hover:text-white hover:border-[#0055FF] transition-all"
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
            <div className="md:hidden w-full border border-black dark:border-white bg-white dark:bg-[#1A1A1A] p-4 sm:p-6 font-mono text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              <div className="flex items-center gap-2 mb-4 text-[#737373] dark:text-[#A3A3A3] text-[10px] border-b border-black/15 dark:border-white/15 pb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0055FF]"></span>
                <span className="font-bold">TERMINAL-WS-01 // MOBILE_VIEW</span>
              </div>
              <div className="space-y-2">
                <div className="text-[#0055FF] font-bold break-all">ag@workstation:~$ <span className="text-black dark:text-white">kairoku init</span></div>
                <div className="text-[#525252] dark:text-[#A3A3A3] flex justify-between"><span>[SYS:01] Booting...</span> <span className="text-[#0055FF] font-bold">[OK]</span></div>
                <div className="text-[#525252] dark:text-[#A3A3A3] flex justify-between"><span>[SYS:02] Engine sync...</span> <span className="text-[#0055FF] font-bold">[OK]</span></div>
                <div className="text-[#525252] dark:text-[#A3A3A3] flex justify-between"><span>[SYS:03] Cluster pods...</span> <span className="text-[#0055FF] font-bold">[ONLINE]</span></div>
              </div>
              <div className="text-[#0055FF] font-bold mt-6 flex items-center gap-1 break-all">
                ag@workstation:~$ <span className="text-black dark:text-white">sys-status</span>
                <span className="animate-terminal-cursor text-sm">█</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
