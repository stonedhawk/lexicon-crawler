import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { Swords } from 'lucide-react';

export default function Enemy() {
  const { enemyInfo } = useGameStore();

  if (!enemyInfo) return null;

  const hpPercentage = (enemyInfo.hp / enemyInfo.maxHp) * 100;

  return (
    <div className="flex flex-col items-center p-6 sm:p-8 bg-zinc-800/80 rounded-2xl border border-zinc-700 shadow-2xl relative w-full sm:w-64 max-w-full">
      {/* Intent Banner */}
      <div className="absolute -top-5 sm:-top-6 bg-zinc-900 border border-rose-900 px-3 py-1 sm:px-4 sm:py-2 rounded-full shadow-lg flex items-center space-x-2 text-rose-400 font-bold animate-pulse text-sm sm:text-base">
        <Swords size={20} />
        <span>Attack {enemyInfo.intent?.value || 0}</span>
      </div>

      <motion.div 
        key={enemyInfo.hp} 
        initial={{ x: 0 }}
        animate={{ x: [0, -10, 10, -10, 10, 0] }}
        transition={{ duration: 0.4 }}
        className="text-7xl sm:text-8xl mb-4 drop-shadow-xl select-none"
      >
        {enemyInfo.sprite}
      </motion.div>
      <h2 className="text-lg sm:text-xl font-bold tracking-wider mb-2 text-zinc-100 uppercase">{enemyInfo.name}</h2>
      
      {/* HP Bar */}
      <div className="w-full h-4 bg-zinc-900 rounded-full overflow-hidden border border-zinc-700 relative">
        <div 
          className="h-full bg-rose-500 transition-all duration-500 ease-out"
          style={{ width: `${hpPercentage}%` }}
        />
      </div>
      <div className="text-sm font-bold text-zinc-400 mt-2">{enemyInfo.hp} / {enemyInfo.maxHp} HP</div>
    </div>
  );
}
