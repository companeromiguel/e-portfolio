'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050805] via-[#0a120e] to-[#060a08] px-4">
      <div className="text-center space-y-6">
        <h2 className="text-4xl font-bold text-white/90">Something went wrong!</h2>
        <p className="text-slate-300/70">We encountered an unexpected error.</p>
        <button
          onClick={reset}
          className="glass-card px-8 py-4 text-lg text-white/90 hover:bg-white/10 transition-all duration-300 inline-block"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
