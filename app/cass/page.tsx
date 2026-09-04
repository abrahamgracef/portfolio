'use client';

import { useState } from 'react';

const PASSCODE = '7337';

export default function CassPage() {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSCODE) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 font-mono">
      <div className="w-full max-w-md">
        {/* Status bar */}
        <div className="flex items-center gap-2 border border-black dark:border-white px-3 py-1.5 bg-[#F4F4F2] dark:bg-[#262626] mb-6">
          <span className="w-2 h-2 rounded-full bg-[#0055FF] animate-pulse-dot" />
          <span className="tracking-widest text-[11px] font-semibold text-black dark:text-white uppercase select-none">
            {'AUTH // RESTRICTED'}
          </span>
          <span className="ml-auto text-[#737373] dark:text-[#A3A3A3] text-[10px] tracking-widest uppercase">
            SEC_v0.1
          </span>
        </div>

        <div className="border border-black dark:border-white bg-white dark:bg-[#1A1A1A]">
          {!unlocked ? (
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="px-4 py-3 border-b border-black/20 dark:border-white/20 bg-[#F4F4F2] dark:bg-[#262626]">
                <h1 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">
                  Restricted Document
                </h1>
              </div>

              <div className="flex flex-col gap-4 p-5">
                <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                  Enter the access passcode to unlock and download the document.
                </p>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[10px] tracking-widest uppercase text-[#737373] dark:text-[#A3A3A3]">
                    Passcode
                  </span>
                  <input
                    type="password"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="••••"
                    className="w-full px-3 py-2 border border-black dark:border-white bg-transparent text-sm text-black dark:text-white placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#0055FF]"
                    autoComplete="off"
                  />
                </label>

                {error && (
                  <div className="flex items-center gap-2 border border-red-500/50 px-3 py-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <p className="text-xs text-red-500 uppercase tracking-widest">
                      Access denied — try again
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full px-4 py-2.5 bg-[#0055FF] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#0044CC] transition-colors"
                >
                  Access
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col">
              <div className="px-4 py-3 border-b border-black/20 dark:border-white/20 bg-[#F4F4F2] dark:bg-[#262626]">
                <h1 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">
                  Access Granted
                </h1>
              </div>

              <div className="flex flex-col gap-4 p-5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <p className="text-xs text-green-600 dark:text-green-400 uppercase tracking-widest">
                    Authorization verified
                  </p>
                </div>

                <a
                  href="/24d7d82f26b79cc6.pdf"
                  download
                  className="w-full text-center px-4 py-2.5 bg-[#0055FF] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#0044CC] transition-colors"
                >
                  Download Document
                </a>
              </div>
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-[10px] tracking-widest uppercase text-[#737373] dark:text-[#A3A3A3]">
          {'Unauthorized access is prohibited'}
        </p>
      </div>
    </div>
  );
}
