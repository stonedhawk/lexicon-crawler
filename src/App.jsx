import React, { useEffect } from 'react';
import { useGameStore } from './store/useGameStore';
import { loadDictionary } from './utils/dictionary';
import TopBar from './components/TopBar';
import CombatView from './components/CombatView';
import RewardScreen from './components/RewardScreen';
import MapNode from './components/MapNode';
import Shop from './components/Shop';

function App() {
  const { dictionaryLoaded, setDictionaryLoaded, appState } = useGameStore();

  useEffect(() => {
    loadDictionary().then(() => {
      setDictionaryLoaded();
    });
  }, []);

  if (!dictionaryLoaded) {
    return <div className="h-screen w-screen flex items-center justify-center bg-zinc-950 text-white font-sans text-xl tracking-widest">LOADING LEXICON...</div>;
  }

  return (
    <div className="h-screen w-screen bg-zinc-950 text-white flex flex-col p-4 font-sans overflow-hidden overflow-y-auto">
      <TopBar />
      <div className="flex-1 flex flex-col relative w-full h-full">
        {appState === 'map' && <MapNode />}
        {appState === 'combat' && <CombatView />}
        {appState === 'reward' && <RewardScreen />}
        {appState === 'shop' && <Shop />}
      </div>
    </div>
  );
}

export default App;
