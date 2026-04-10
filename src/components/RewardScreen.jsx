import React from 'react';
import { useGameStore } from '../store/useGameStore';
import LetterCard from './LetterCard';

export default function RewardScreen() {
  const { rewardOptions, selectReward, skipReward } = useGameStore();

  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-12">
      <h2 className="text-4xl font-bold text-amber-400 tracking-widest drop-shadow-xl">VICTORY</h2>
      <p className="text-zinc-400 uppercase tracking-widest text-sm">Draft 1 new letter for your deck</p>
      
      <div className="flex space-x-12 mt-8">
        {rewardOptions.map(option => (
          <LetterCard 
            key={option.uniqueId} 
            letter={option} 
            size="large" 
            onClick={() => selectReward(option)} 
            className="hover:border-amber-400 hover:shadow-amber-500/50"
          />
        ))}
      </div>

      <button onClick={skipReward} className="px-6 py-2 text-zinc-500 hover:text-white transition-colors underline decoration-zinc-700 underline-offset-4 mt-12 cursor-pointer uppercase text-sm tracking-widest font-bold">Skip Reward</button>
    </div>
  );
}
