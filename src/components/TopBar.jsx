import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Heart, Coins, GitCommit } from 'lucide-react';

export default function TopBar() {
  const { playerHp, playerMaxHp, gold, floor } = useGameStore();
  
  return (
    <div className="flex justify-between items-center w-full max-w-4xl mx-auto p-4 bg-zinc-800 rounded-xl shadow-lg border border-zinc-700/50 mb-8">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-rose-400 font-bold">
          <Heart fill="currentColor" strokeWidth={0} />
          <span className="text-xl">{playerHp} / {playerMaxHp}</span>
        </div>
        <div className="flex items-center space-x-2 text-yellow-500 font-bold">
          <Coins fill="currentColor" strokeWidth={0} />
          <span className="text-xl">{gold}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 text-indigo-400 font-bold uppercase tracking-widest text-sm">
        <GitCommit />
        <span>Floor {floor}</span>
      </div>
    </div>
  );
}
