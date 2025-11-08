import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
      <div className="max-w-2xl">
        <div className="text-8xl mb-8 animate-bounce">🍄</div>
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">404</h1>
        <p className="text-2xl text-[#F6AFCF] mb-4 font-semibold">Lost in the Mycelium</p>
        <p className="text-lg text-gray-400 mb-8 leading-relaxed">
          Looks like you&apos;ve wandered off the path. The spore you&apos;re looking for 
          doesn&apos;t seem to exist in our network.
        </p>
        <Link 
          href="/"
          className="inline-block px-10 py-4 text-base font-semibold bg-[#F6AFCF] text-[#0B0B0B] rounded-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(246,175,207,0.4)] active:translate-y-0"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
