import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Swords, ShoppingCart, Skull } from 'lucide-react';

export default function MapNode() {
  const { floor, startEncounter, enterShop } = useGameStore();

  const nodes = [
    { f: 1, type: 'combat', label: 'Basic Encounter', icon: Swords, color: 'text-zinc-400' },
    { f: 2, type: 'combat', label: 'Basic Encounter', icon: Swords, color: 'text-zinc-400' },
    { f: 3, type: 'shop', label: 'Merchant', icon: ShoppingCart, color: 'text-yellow-400' },
    { f: 4, type: 'elite', label: 'Elite Encounter', icon: Skull, color: 'text-purple-400' },
    { f: 5, type: 'boss', label: 'Boss Encounter', icon: Skull, color: 'text-rose-500' },
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
                 onClick={() => node.type === 'shop' ? enterShop() : startEncounter(node.type)}
                 className="flex flex-col items-center justify-center p-8 bg-zinc-800 rounded-xl border-2 border-zinc-700 hover:border-emerald-500 hover:bg-zinc-700 transition-all cursor-pointer w-56 h-56 group shadow-xl hover:shadow-emerald-500/20"
               >
                 <node.icon size={64} className={`${node.color} mb-4 group-hover:scale-110 transition-transform`} />
                 <span className="font-bold tracking-widest uppercase mt-4 text-zinc-300 group-hover:text-white transition-colors">{node.label}</span>
               </button>
            ))}
          </div>
      ) : (
          <div className="text-4xl font-bold text-emerald-400 mt-12 animate-pulse drop-shadow-[0_0_20px_rgba(52,211,153,0.8)]">YOU BEAT THE CRAWL!</div>
      )}
    </div>
  );
}
