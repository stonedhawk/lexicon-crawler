import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Coins, Trash2, ArrowRight } from 'lucide-react';

export default function Shop() {
  const { masterDeck, gold, removalCostLevel, removeCardFn, leaveShop } = useGameStore();

  const currentCostMap = [50, 75, 100];
  const currentCost = currentCostMap[Math.min(removalCostLevel, 2)];
  
  return (
    <div className="flex-1 flex flex-col items-center p-8 space-y-8 w-full max-w-5xl mx-auto h-full overflow-y-auto">
      <div className="flex justify-between items-center w-full">
         <h2 className="text-4xl font-bold tracking-widest text-yellow-400 flex items-center drop-shadow-lg"><Coins className="mr-4" size={40}/> MERCHANT</h2>
         <button onClick={leaveShop} className="flex flex-col items-center px-6 py-2 bg-zinc-800 rounded-xl hover:bg-zinc-700 font-bold border border-zinc-700 group cursor-pointer transition-colors shadow-lg shadow-zinc-900/50">
            <span className="text-zinc-400 group-hover:text-white uppercase tracking-widest text-sm mb-1 transition-colors">Leave</span>
            <ArrowRight size={20} className="text-zinc-500 group-hover:text-amber-400 transition-colors" />
         </button>
      </div>

      <div className="w-full bg-zinc-800/50 rounded-2xl p-8 border border-zinc-700 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
           <h3 className="text-2xl font-bold text-rose-400 flex items-center tracking-widest uppercase"><Trash2 className="mr-3"/> Remove Card</h3>
           <div className={`px-6 py-2 font-black rounded-full border-2 tracking-widest ${gold >= currentCost ? 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400' : 'border-red-500/50 bg-red-500/10 text-red-500'}`}>
              Cost: {currentCost} Gold
           </div>
        </div>
        
        <p className="text-zinc-400 mb-8 uppercase tracking-widest text-sm font-bold">Click a letter to permanently remove it from your master deck.</p>

        <div className="flex flex-wrap gap-4 max-h-[400px] overflow-y-auto p-6 bg-zinc-900 border border-zinc-800 rounded-xl shadow-inner scrollbar-hide">
           {masterDeck.map(card => (
              <div 
                key={card.uniqueId} 
                onClick={() => removeCardFn(card)}
                className={`relative flex items-center justify-center w-16 h-20 bg-zinc-200 text-zinc-900 font-bold text-4xl rounded-md cursor-[crosshair] transition-all shadow-md select-none border-b-4 border-zinc-300 ${gold >= currentCost ? 'hover:-translate-y-2 hover:bg-rose-300 hover:border-rose-400 hover:shadow-rose-500/50' : 'opacity-50 cursor-not-allowed grayscale'}`}
              >
                {card.id}
                <span className="absolute bottom-1 right-1 text-xs font-bold text-zinc-600">{card.score}</span>
              </div>
           ))}
           {masterDeck.length === 0 && <div className="text-zinc-600 m-auto font-medium">Your deck is empty...</div>}
        </div>
      </div>
    </div>
  );
}
