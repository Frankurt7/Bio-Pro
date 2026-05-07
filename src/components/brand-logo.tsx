import { motion } from 'motion/react';

export const BrandLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-brand-cyan/20 blur-[6px] rounded-full"
      />
      <svg viewBox="0 0 100 100" className="w-full h-full text-brand-cyan relative z-10" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        {/* Abstract Geometric Figure / DNA Helix Style */}
        <path d="M50 5 L50 95" strokeDasharray="2 10" opacity="0.3" />
        <path d="M30 30 C30 30 50 40 50 50 C50 60 70 70 70 70" strokeWidth="8" />
        <path d="M70 30 C70 30 50 40 50 50 C50 60 30 70 30 70" strokeWidth="8" />
        <circle cx="50" cy="50" r="10" fill="currentColor" />
        <path d="M50 15 L35 25 M50 15 L65 25" />
        <path d="M50 85 L35 75 M50 85 L65 75" />
      </svg>
    </div>
  );
};
