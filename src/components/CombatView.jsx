import React, { useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { findPossibleWords } from '../utils/dictionary';
import Enemy from './Enemy';
import LetterCard from './LetterCard';
import { Shuffle } from 'lucide-react';

export default function CombatView() {
  const { 
    hand, deck, discard, selectedLetters, selectLetter, deselectLetter, 
    submitWord, resetSelection, lastWordStatus, combatLog,
    enemyInfo, playerHp, fullReset, streak, shuffleHand
  } = useGameStore();

  const isGameOver = playerHp === 0;
  const isCombatOver = enemyInfo?.hp === 0;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isGameOver || isCombatOver) return;
      
      const key = e.key.toUpperCase();
      
      if (key === 'ENTER') {
        submitWord();
      } else if (key === 'BACKSPACE') {
        if (selectedLetters.length > 0) {
          deselectLetter(selectedLetters[selectedLetters.length - 1]);
        }
      } else if (key === ' ' || e.code === 'Space') {
        e.preventDefault(); // Stop native page scrolling down
        shuffleHand();
      } else if (/^[A-Z]$/.test(key)) {
        const availableLetter = hand.find(l => l.id === key);
        if (availableLetter) {
          selectLetter(availableLetter);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hand, selectedLetters, isGameOver, isCombatOver, submitWord, deselectLetter, selectLetter]);

  const combinedHand = useMemo(() => [...hand, ...selectedLetters], [hand, selectedLetters]);
  const hints = useMemo(() => findPossibleWords(combinedHand), [combinedHand]);

  return (
    <div className="flex-1 flex flex-col w-full max-w-5xl mx-auto h-full relative">
      <div className="flex-1 flex px-8">
        {/* Left Side: Enemy */}
        <div className="flex-1 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-zinc-800 p-8">
           {isGameOver ? (
             <div className="flex flex-col items-center">
                 <div className="text-3xl sm:text-4xl text-rose-500 font-bold uppercase tracking-widest text-center mb-8 drop-shadow-xl">Game Over<br/><span className="text-sm text-zinc-500">You ran out of ink.</span></div>
                 <button onClick={fullReset} className="px-6 py-3 sm:px-8 bg-rose-600 text-white rounded-lg font-bold uppercase tracking-widest hover:bg-rose-500 hover:scale-105 transition-all shadow-[0_0_20px_rgba(225,29,72,0.4)]">Restart Run</button>
             </div>
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
      <div className="flex-shrink-0 bg-zinc-800/40 border-t border-zinc-700/80 flex flex-col items-center justify-center py-8 px-6 rounded-b-3xl relative mt-4 shadow-inner">
        {!isGameOver && (
          <>
            {/* Draft Area */}
            <div className="text-zinc-500 mb-2 uppercase tracking-widest text-xs font-bold text-center">Drafted Word</div>
            <div className={`flex flex-wrap gap-2 min-h-[96px] items-center justify-center w-full max-w-[280px] sm:max-w-none p-4 rounded-xl border-2 transition-all duration-300 ${lastWordStatus === 'invalid' ? 'border-red-500 bg-red-500/10' : lastWordStatus === 'valid' ? 'border-emerald-500 bg-emerald-500/10' : 'border-zinc-700 bg-zinc-900 shadow-inner'}`}>
              <AnimatePresence mode="popLayout">
                {selectedLetters.map((l) => (
                  <LetterCard key={l.uniqueId} letter={l} onClick={() => deselectLetter(l)} />
                ))}
              </AnimatePresence>
              {selectedLetters.length === 0 && <div className="text-zinc-600 font-medium text-sm">Draft a word...</div>}
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-8 mb-4">
              <button onClick={resetSelection} className="px-6 py-2 rounded-lg bg-zinc-700/80 hover:bg-zinc-600 font-bold transition-all cursor-pointer text-sm tracking-widest text-zinc-300">CLEAR</button>
              
              <div className="relative group flex items-center">
                <button onClick={shuffleHand} className="px-5 py-2 flex items-center justify-center rounded-lg bg-zinc-700/80 hover:bg-zinc-600 font-bold transition-all cursor-pointer text-sm text-zinc-300 group-hover:bg-zinc-600">
                  <Shuffle size={18} className="group-hover:rotate-180 transition-transform duration-300 text-indigo-400" />
                </button>
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 border border-zinc-700 text-zinc-400 text-[10px] font-bold px-2 py-1 rounded shadow-lg pointer-events-none z-50">
                  SPACEBAR
                </div>
              </div>

              <button 
                onClick={submitWord}
                className="px-8 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-bold text-white transition-all cursor-pointer shadow-[0_0_15px_rgba(5,150,105,0.4)] tracking-widest text-sm"
              >
                SUBMIT
              </button>
            </div>

            {/* Hand Area with Draw/Discard counts */}
            <div className="flex flex-col items-center w-full max-w-4xl pt-6">
              
              {/* Dynamic Hints Bar */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-5 mb-8 text-[10px] sm:text-[11px] font-bold text-zinc-500 uppercase tracking-widest border border-zinc-800/80 py-2 px-6 rounded-full shadow-inner bg-zinc-950/50">
                <div className="text-zinc-600 mr-1 sm:mr-0">Hints:</div>
                <div className={hints[3] > 0 ? "text-amber-400/80" : ""}>3L: {hints[3]}</div>
                <div className={hints[4] > 0 ? "text-amber-400" : ""}>4L: {hints[4]}</div>
                <div className={hints[5] > 0 ? "text-emerald-400" : ""}>5L: {hints[5]}</div>
                <div className={hints[6] > 0 ? "text-emerald-500" : ""}>6L: {hints[6]}</div>
                <div className={hints[7] > 0 ? "text-rose-400" : ""}>7L: {hints[7]}</div>
              </div>

              {/* Flex Grid for Draw / Hand / Discard */}
              <div className="flex items-center justify-between w-full px-2 sm:px-4">
                 
                 <div className="flex flex-col items-center justify-center bg-zinc-900/50 p-2 sm:p-4 rounded-xl border border-zinc-800/50 min-w-16 sm:min-w-24">
                    <div className="text-zinc-500 font-bold text-[8px] sm:text-[10px] tracking-widest uppercase mb-1 sm:mb-2">Draw</div>
                    <div className="text-xl sm:text-3xl text-zinc-300 font-black">{deck.length}</div>
                 </div>

                 <div className="flex flex-wrap justify-center gap-2 px-2 sm:px-8 flex-1 min-h-[85px]">
                   <AnimatePresence>
                     {hand.map((l) => (
                       <LetterCard key={l.uniqueId} letter={l} onClick={() => selectLetter(l)} />
                     ))}
                   </AnimatePresence>
                 </div>

                 <div className="flex flex-col items-center justify-center bg-zinc-900/50 p-2 sm:p-4 rounded-xl border border-zinc-800/50 min-w-16 sm:min-w-24">
                    <div className="text-zinc-500 font-bold text-[8px] sm:text-[10px] tracking-widest uppercase mb-1 sm:mb-2">Discard</div>
                    <div className="text-xl sm:text-3xl text-zinc-300 font-black">{discard.length}</div>
                 </div>

              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
