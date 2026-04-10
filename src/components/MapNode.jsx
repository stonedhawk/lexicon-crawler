import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Swords, ShoppingCart, Skull } from 'lucide-react';

export default function MapNode() {
  const { floor, startEncounter, enterShop, fullReset } = useGameStore();

  const nodes = [
    { f: 1, type: 'combat', label: 'Basic Encounter', icon: Swords, color: 'text-zinc-400', eIdx: 0 },
    { f: 2, type: 'combat', label: 'Basic Encounter', icon: Swords, color: 'text-zinc-400', eIdx: 1 },
    { f: 3, type: 'combat', label: 'Basic Encounter', icon: Swords, color: 'text-zinc-400', eIdx: 2 },
    { f: 4, type: 'shop', label: 'Merchant', icon: ShoppingCart, color: 'text-yellow-400' },
    { f: 5, type: 'boss', label: 'Sector Boss', icon: Skull, color: 'text-rose-500', eIdx: 3 },
    { f: 6, type: 'combat', label: 'Basic Encounter', icon: Swords, color: 'text-zinc-400', eIdx: 4 },
    { f: 7, type: 'combat', label: 'Basic Encounter', icon: Swords, color: 'text-zinc-400', eIdx: 5 },
    { f: 8, type: 'combat', label: 'Basic Encounter', icon: Swords, color: 'text-zinc-400', eIdx: 6 },
    { f: 9, type: 'shop', label: 'Merchant', icon: ShoppingCart, color: 'text-yellow-400' },
    { f: 10, type: 'boss', label: 'Sector Boss', icon: Skull, color: 'text-rose-500', eIdx: 7 },
    { f: 11, type: 'combat', label: 'Basic Encounter', icon: Swords, color: 'text-zinc-400', eIdx: 8 },
    { f: 12, type: 'combat', label: 'Basic Encounter', icon: Swords, color: 'text-zinc-400', eIdx: 9 },
    { f: 13, type: 'combat', label: 'Basic Encounter', icon: Swords, color: 'text-zinc-400', eIdx: 10 },
    { f: 14, type: 'shop', label: 'Merchant', icon: ShoppingCart, color: 'text-yellow-400' },
    { f: 15, type: 'boss', label: 'Sector Boss', icon: Skull, color: 'text-rose-500', eIdx: 11 },
    { f: 16, type: 'combat', label: 'Basic Encounter', icon: Swords, color: 'text-zinc-400', eIdx: 12 },
    { f: 17, type: 'combat', label: 'Basic Encounter', icon: Swords, color: 'text-zinc-400', eIdx: 13 },
    { f: 18, type: 'combat', label: 'Basic Encounter', icon: Swords, color: 'text-zinc-400', eIdx: 14 },
    { f: 19, type: 'shop', label: 'Merchant', icon: ShoppingCart, color: 'text-yellow-400' },
    { f: 20, type: 'boss', label: 'Final Boss', icon: Skull, color: 'text-amber-500', eIdx: 15 },
  ];

  const currentOptions = nodes.filter(n => n.f === floor);
  
  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-12">
      <h2 className="text-4xl font-bold tracking-widest text-zinc-100">FLOOR {floor}</h2>
      
      {currentOptions.length > 0 ? (
          <div className="flex space-x-6">
            {currentOptions.map((node, i) => (
               <button 
                 key={i}
                 onClick={() => node.type === 'shop' ? enterShop() : startEncounter(node.type, node.eIdx)}
                 className="flex flex-col items-center justify-center p-8 bg-zinc-800 rounded-xl border-2 border-zinc-700 hover:border-emerald-500 hover:bg-zinc-700 transition-all cursor-pointer w-56 h-56 group shadow-xl hover:shadow-emerald-500/20"
               >
                 <node.icon size={64} className={`${node.color} mb-4 group-hover:scale-110 transition-transform`} />
                 <span className="font-bold tracking-widest uppercase mt-4 text-zinc-300 group-hover:text-white transition-colors">{node.label}</span>
               </button>
            ))}
          </div>
      ) : (
          <div className="flex flex-col items-center mt-12 animate-in fade-in zoom-in duration-1000">
             <div className="text-4xl font-bold text-emerald-400 mb-8 animate-pulse drop-shadow-[0_0_20px_rgba(52,211,153,0.8)]">YOU BEAT THE CRAWL!</div>
             <button onClick={fullReset} className="px-8 py-3 bg-emerald-600 text-white rounded-lg font-bold uppercase tracking-widest hover:bg-emerald-500 hover:scale-105 transition-all shadow-[0_0_20px_rgba(5,150,105,0.4)]">Play Again</button>
          </div>
      )}
    </div>
  );
}
