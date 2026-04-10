import React from 'react';
import { motion } from 'framer-motion';

export default function LetterCard({ letter, onClick, size = 'normal', className = "" }) {
  let dims = "w-14 h-16 text-3xl"; 
  if (size === 'large') dims = "w-32 h-44 text-7xl rounded-2xl border-b-8";
  if (size === 'shop') dims = "w-16 h-20 text-4xl";

  const variants = {
    initial: { opacity: 0, y: 20, scale: 0.8 },
    animate: { opacity: 1, y: 0, scale: 1 },
    hover: { scale: 1.05, y: -8 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      layoutId={letter.uniqueId}
      variants={variants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center ${dims} bg-zinc-200 text-zinc-900 font-black rounded-lg cursor-pointer shadow-lg select-none border-b-4 border-zinc-400 overflow-hidden group ${className}`}
    >
      <div className="z-10">{letter.id}</div>
      <span className="absolute bottom-1 right-2 text-[10px] font-black text-zinc-500 opacity-80 z-10">
        {letter.score}
      </span>
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
    </motion.div>
  );
}
