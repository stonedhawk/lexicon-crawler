import React, { useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { findPossibleWords } from '../utils/dictionary';
import Enemy from './Enemy';
import LetterCard from './LetterCard';

export default function CombatView() {
  const { 
    hand, deck, discard, selectedLetters, selectLetter, deselectLetter, 
    submitWord, resetSelection, lastWordStatus, combatLog,
    enemyInfo, playerHp, fullReset, streak
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
        <div className="flex-1 flex items-center justify-center border-r border-zinc-800">
           {isGameOver ? (
             <div className="flex flex-col items-center">
                 <div className="text-4xl text-rose-500 font-bold uppercase tracking-widest text-center mb-8 drop-shadow-xl">Game Over<br/><span className="text-sm text-zinc-500">You ran out of ink.</span></div>
                 <button onClick={fullReset} className="px-8 py-3 bg-rose-600 text-white rounded-lg font-bold uppercase tracking-widest hover:bg-rose-500 hover:scale-105 transition-all shadow-[0_0_20px_rgba(225,29,72,0.4)]">Restart Run</button>
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
                 <div className="text-zinc-500 font-bold text-xs tracking-widest uppercase mb-1">Draw Pile</div>
                 <div className="text-3xl text-zinc-300 font-black">{deck.length}</div>
              </div>

              {/* Dynamic Hints Bar */}
              <div className="flex gap-4 mb-8 text-[11px] font-bold text-zinc-500 uppercase tracking-widest border border-zinc-800/80 p-3 rounded-xl shadow-inner bg-zinc-900/50">
                <div className="text-zinc-600 mr-2">Available Words:</div>
                <div className={hints[3] > 0 ? "text-amber-400/80" : ""}>3-Let: {hints[3]}</div>
                <div className={hints[4] > 0 ? "text-amber-400" : ""}>4-Let: {hints[4]}</div>
                <div className={hints[5] > 0 ? "text-emerald-400" : ""}>5-Let: {hints[5]}</div>
                <div className={hints[6] > 0 ? "text-emerald-500" : ""}>6-Let: {hints[6]}</div>
                <div className={hints[7] > 0 ? "text-rose-400" : ""}>7-Let: {hints[7]}</div>
              </div>

              <div className="flex space-x-4 min-h-20">
                <AnimatePresence>
                  {hand.map((l) => (
                    <LetterCard key={l.uniqueId} letter={l} onClick={() => selectLetter(l)} />
                  ))}
                </AnimatePresence>
              </div>

              <div className="absolute right-8 bottom-8 flex flex-col items-end space-y-1">
                 <div className="text-zinc-500 font-bold text-xs tracking-widest uppercase mb-1">Discard</div>
                 <div className="text-3xl text-zinc-300 font-black">{discard.length}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
