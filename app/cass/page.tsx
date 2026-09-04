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
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-sm p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#111] shadow-sm">
        {!unlocked ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold">Restricted Document</h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Enter the passcode to access the document.
            </p>
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Passcode"
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#0055FF]"
              autoComplete="off"
            />
            {error && (
              <p className="text-sm text-red-500">Incorrect passcode. Try again.</p>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 rounded-lg bg-[#0055FF] text-white font-medium hover:opacity-90 transition"
            >
              Access
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="text-green-600 dark:text-green-400 font-medium">Access granted.</p>
            <a
              href="/24d7d82f26b79cc6.pdf"
              download
              className="w-full text-center px-4 py-2 rounded-lg bg-[#0055FF] text-white font-medium hover:opacity-90 transition"
            >
              Download cass.pdf
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
