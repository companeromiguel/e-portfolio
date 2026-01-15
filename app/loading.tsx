export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050805] via-[#0a120e] to-[#060a08]">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto"></div>
        <p className="text-slate-300/70 text-lg">Loading...</p>
      </div>
    </div>
  );
}
