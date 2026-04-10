import React from 'react';
import { useGameStore } from '../store/useGameStore';

export default function RewardScreen() {
  const { rewardOptions, selectReward, skipReward } = useGameStore();

  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-12">
      <h2 className="text-4xl font-bold text-amber-400 tracking-widest drop-shadow-xl">VICTORY</h2>
      <p className="text-zinc-400 uppercase tracking-widest text-sm">Draft 1 new letter for your deck</p>
      
      <div className="flex space-x-12 mt-8">
        {rewardOptions.map(option => (
          <div 
            key={option.uniqueId} 
            onClick={() => selectReward(option)}
            className="w-32 h-44 bg-zinc-800 text-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center border-2 border-zinc-700 hover:border-amber-500 hover:scale-105 transition-all cursor-pointer group"
          >
            <div className="text-7xl font-bold group-hover:text-amber-400 transition-colors drop-shadow-md select-none">{option.id}</div>
            <div className="text-sm mt-6 text-zinc-400 font-bold scoreboard">Score: {option.score}</div>
          </div>
        ))}
      </div>

      <button onClick={skipReward} className="px-6 py-2 text-zinc-500 hover:text-white transition-colors underline decoration-zinc-700 underline-offset-4 mt-12 cursor-pointer uppercase text-sm tracking-widest font-bold">Skip Reward</button>
    </div>
  );
}
