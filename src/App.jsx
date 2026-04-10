import React, { useEffect } from 'react';
import { useGameStore } from './store/useGameStore';
import { loadDictionary } from './utils/dictionary';
import TopBar from './components/TopBar';
import CombatView from './components/CombatView';

function App() {
  const { dictionaryLoaded, setDictionaryLoaded, startEncounter } = useGameStore();

  useEffect(() => {
    loadDictionary().then(() => {
      setDictionaryLoaded();
      startEncounter();
    });
  }, []);

  if (!dictionaryLoaded) {
    return <div className="h-screen w-screen flex items-center justify-center bg-zinc-950 text-white font-sans text-xl tracking-widest">LOADING LEXICON...</div>;
  }

  return (
    <div className="h-screen w-screen bg-zinc-950 text-white flex flex-col p-4 font-sans overflow-hidden">
      <TopBar />
      <CombatView />
    </div>
  );
}

export default App;
