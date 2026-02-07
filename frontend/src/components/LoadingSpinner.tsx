export default function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center h-40 gap-4">
      {/* Outer Rotating Square */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-2 border-white/20"></div>
        <div className="absolute inset-0 border-2 border-acid border-t-transparent border-l-transparent animate-spin"></div>
      </div>
      
      {/* Blinking Text */}
      <div className="font-mono text-acid text-sm animate-pulse tracking-widest">
        SYSTEM_LOADING...
      </div>
    </div>
  );
}