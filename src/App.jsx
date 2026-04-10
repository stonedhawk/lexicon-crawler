import React, { useEffect } from 'react';
import { useGameStore } from './store/useGameStore';
import { loadDictionary } from './utils/dictionary';

function App() {
  const { 
    dictionaryLoaded, setDictionaryLoaded, 
    hand, drawHand, selectedLetters,
    selectLetter, deselectLetter, submitWord,
    score, lastWordStatus, resetSelection
  } = useGameStore();

  useEffect(() => {
    loadDictionary().then(() => {
      setDictionaryLoaded();
      drawHand();
    });
  }, []);

  if (!dictionaryLoaded) {
    return <div className="h-screen w-screen flex items-center justify-center bg-zinc-900 text-white font-sans text-xl">Loading Lexicon...</div>;
  }

  return (
    <div className="h-screen w-screen bg-zinc-900 text-white flex flex-col p-8 font-sans">
      <div className="flex justify-between items-center mb-8 bg-zinc-800 p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold tracking-widest text-emerald-400">LEXICON CRAWLER</h1>
        <div className="text-xl">Score: <span className="font-bold text-yellow-400">{score}</span></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-12">
        {/* Play Area */}
        <div className="flex flex-col items-center space-y-4">
          <div className="text-zinc-400 mb-2 uppercase tracking-widest text-sm">Drafted Word</div>
          <div className={`flex space-x-2 h-20 min-w-[200px] p-4 rounded-xl border-2 transition-colors duration-300 ${lastWordStatus === 'invalid' ? 'border-red-500 bg-red-500/10' : lastWordStatus === 'valid' ? 'border-emerald-500 bg-emerald-500/10' : 'border-zinc-700 bg-zinc-800'}`}>
            {selectedLetters.map((l) => (
              <LetterBox key={l.uniqueId} letter={l} onClick={() => deselectLetter(l)} />
            ))}
            {selectedLetters.length === 0 && <div className="text-zinc-600 m-auto font-medium">Draft a word...</div>}
          </div>
          
          <div className="flex space-x-4 mt-6">
            <button 
              onClick={resetSelection}
              className="px-6 py-2 rounded bg-zinc-700 hover:bg-zinc-600 font-bold transition-all cursor-pointer"
            >
              CLEAR
            </button>
            <button 
              onClick={submitWord}
              className="px-8 py-2 rounded bg-emerald-600 hover:bg-emerald-500 font-bold text-white transition-all cursor-pointer shadow-[0_0_15px_rgba(5,150,105,0.4)]"
            >
              SUBMIT
            </button>
          </div>
          
          {lastWordStatus === 'invalid' && (
            <div className="text-red-400 font-bold animate-pulse text-lg tracking-widest pt-4">INVALID WORD!</div>
          )}
          {lastWordStatus === 'valid' && (
            <div className="text-emerald-400 font-bold animate-pulse text-lg tracking-widest pt-4">NICE!</div>
          )}
        </div>

        {/* Hand Area */}
        <div className="flex flex-col items-center pt-12">
          <div className="text-zinc-400 mb-4 uppercase tracking-widest text-sm">Your Hand</div>
          <div className="flex space-x-3">
            {hand.map((l) => (
              <LetterBox key={l.uniqueId} letter={l} onClick={() => selectLetter(l)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LetterBox({ letter, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="relative flex items-center justify-center w-14 h-16 bg-zinc-200 text-zinc-900 font-bold text-3xl rounded-md cursor-pointer hover:-translate-y-1 hover:bg-white transition-transform shadow-md select-none"
    >
      {letter.id}
      <span className="absolute bottom-1 right-1 text-xs font-semibold text-zinc-600">{letter.score}</span>
    </div>
  );
}

export default App;
