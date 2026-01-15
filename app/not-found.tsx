import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050805] via-[#0a120e] to-[#060a08] px-4">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-bold text-white/90">404</h1>
        <h2 className="text-3xl font-bold text-white/80">Page Not Found</h2>
        <p className="text-slate-300/70 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/"
          className="glass-card px-8 py-4 text-lg text-white/90 hover:bg-white/10 transition-all duration-300 inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
