export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
      <div className="text-5xl mb-4 animate-bounce">🍄</div>
      <div className="w-20 h-20 border-4 border-[#F6AFCF]/20 border-t-[#F6AFCF] rounded-full animate-spin"></div>
      <p className="mt-8 text-lg text-[#F6AFCF] font-semibold animate-pulse">
        Loading Sweet Psilocybe...
      </p>
    </div>
  );
}
