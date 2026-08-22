import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full border border-black dark:border-white bg-white dark:bg-[#1A1A1A] p-8 space-y-6 font-mono text-center">
        <div className="text-xs text-[#0055FF] font-bold tracking-widest uppercase">
          {'[ERROR_CODE: 404]'}
        </div>
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-black dark:text-white">
          RESOURCE NOT FOUND
        </h2>
        <p className="font-sans text-xs text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
          The requested system node or telemetry endpoint does not exist on this server.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-black dark:border-white px-4 py-2 bg-[#FAFAF9] dark:bg-[#0A0A0A] text-black dark:text-white text-xs hover:bg-[#0055FF] hover:text-white hover:border-[#0055FF] transition-all uppercase"
          >
            RETURN TO ROOT NODE →
          </Link>
        </div>
      </div>
    </div>
  );
}
