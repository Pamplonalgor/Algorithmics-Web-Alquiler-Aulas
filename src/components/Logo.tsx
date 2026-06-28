import Link from "next/link";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export default function Logo({ className = "", iconOnly = false }: LogoProps) {
  return (
    <Link href="/" className={`group flex flex-row items-center gap-3 ${className}`}>
      {/* Stylized 'A' with the IA Spark (4-pointed star) */}
      <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-cobalt to-brand-purple p-1.5 shadow-lg shadow-brand-cobalt/20 group-hover:rotate-3 transition-all duration-300">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="20 15 85 85" 
          className="w-full h-full text-white"
        >
          <path 
            d="M 30 80 A 8 8 0 0 0 45 86 L 57.8 54 L 69 54 L 69 50 L 59.4 50 L 65 36 C 67 31 72 26 78 25 C 68 15 56 15 50 30 Z" 
            fill="currentColor" 
          />
          <path 
            d="M 83 37 Q 83 52 93 52 Q 83 52 83 67 Q 83 52 73 52 Q 83 52 83 37 Z" 
            fill="currentColor" 
          />
        </svg>
      </div>
      {!iconOnly && (
        <span className="text-xl font-semibold tracking-tight text-white leading-none">
          adimentech
        </span>
      )}
    </Link>
  );
}
