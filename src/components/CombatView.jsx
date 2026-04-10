import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import Enemy from './Enemy';
import LetterCard from './LetterCard';

export default function CombatView() {
  const { 
    hand, deck, discard, selectedLetters, selectLetter, deselectLetter, 
    submitWord, resetSelection, lastWordStatus, combatLog,
    enemyInfo, playerHp
  } = useGameStore();

  const isGameOver = playerHp === 0;

  return (
    <div className="flex-1 flex flex-col w-full max-w-5xl mx-auto h-full relative">
      <div className="flex-1 flex px-8">
        {/* Left Side: Enemy */}
        <div className="flex-1 flex items-center justify-center border-r border-zinc-800">
           {isGameOver ? (
             <div className="text-4xl text-rose-500 font-bold uppercase tracking-widest text-center">Game Over<br/><span className="text-sm text-zinc-500">You ran out of ink.</span></div>
           ) : (
             <Enemy />
           )}
        </div>

        {/* Right Side: Combat Log */}
        <div className="flex-1 flex flex-col p-8 justify-end">
           <div className="bg-zinc-800/30 rounded-xl p-4 h-64 overflow-y-auto flex flex-col-reverse border border-zinc-800">
             {combatLog.slice().reverse().map((log, i) => (
                <div key={i} className={`mb-2 text-sm ${i === 0 ? 'text-zinc-200 font-bold' : 'text-zinc-500'}`}>
                  {log}
                </div>
             ))}
           </div>
        </div>
      </div>

      {/* Bottom Area: Hand and Submission */}
      <div className="h-72 bg-zinc-800/50 border-t border-zinc-700 flex flex-col items-center justify-center p-6 rounded-b-3xl relative">
        {!isGameOver && (
          <>
            {/* Draft Area */}
            <div className="text-zinc-400 mb-2 uppercase tracking-widest text-xs font-bold">Drafted Word</div>
            <div className={`flex space-x-2 h-24 items-center min-w-[250px] p-4 rounded-xl border-2 transition-colors duration-300 ${lastWordStatus === 'invalid' ? 'border-red-500 bg-red-500/10' : lastWordStatus === 'valid' ? 'border-emerald-500 bg-emerald-500/10' : 'border-zinc-700 bg-zinc-900 shadow-inner'}`}>
              <AnimatePresence>
                {selectedLetters.map((l) => (
                  <LetterCard key={l.uniqueId} letter={l} onClick={() => deselectLetter(l)} />
                ))}
              </AnimatePresence>
              {selectedLetters.length === 0 && <div className="text-zinc-600 m-auto font-medium text-sm">Draft a word...</div>}
            </div>

            <div className="flex space-x-4 mt-6">
              <button onClick={resetSelection} className="px-6 py-2 rounded bg-zinc-700 hover:bg-zinc-600 font-bold transition-all cursor-pointer text-sm">CLEAR</button>
              <button 
                onClick={submitWord}
                className="px-8 py-2 rounded bg-emerald-600 hover:bg-emerald-500 font-bold text-white transition-all cursor-pointer shadow-[0_0_15px_rgba(5,150,105,0.4)] tracking-widest"
              >
                SUBMIT
              </button>
            </div>

            {/* Hand Area with Draw/Discard counts */}
            <div className="flex flex-col items-center pt-8 w-full">
              <div className="absolute left-8 bottom-8 flex flex-col space-y-1">
                 <div className="text-zinc-400 font-bold text-sm tracking-widest uppercase mb-1">Draw Pile</div>
                 <div className="text-4xl text-zinc-100 font-black">{deck.length}</div>
              </div>

              <div className="flex space-x-4 min-h-20">
                <AnimatePresence>
                  {hand.map((l) => (
                    <LetterCard key={l.uniqueId} letter={l} onClick={() => selectLetter(l)} />
                  ))}
                </AnimatePresence>
              </div>

              <div className="absolute right-8 bottom-8 flex flex-col items-end space-y-1">
                 <div className="text-zinc-400 font-bold text-sm tracking-widest uppercase mb-1">Discard</div>
                 <div className="text-4xl text-zinc-100 font-black">{discard.length}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
