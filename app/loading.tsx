export default function Loading() {
  return (
    <div className="min-h-screen bg-[#08090d] flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-orange-500 animate-spin" />
      <span className="mt-4 text-sm font-medium text-slate-400">Loading StarterOps Engine...</span>
    </div>
  );
}
