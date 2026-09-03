export default function Loading() {
  return (
    <div className="min-h-screen bg-[#07090e] p-8 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet border-t-transparent shadow-lg shadow-violet/30" />
        <p className="text-xs font-bold text-mist uppercase tracking-widest animate-pulse">
          Loading PromptWorld Engine...
        </p>
      </div>
    </div>
  );
}