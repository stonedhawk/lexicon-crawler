import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from './useGameStore';
import { createStartingDeck } from '../utils/scoring';

describe('Shop & Economy Logic', () => {
  beforeEach(() => {
    // Reset store before each test
    useGameStore.setState({
      gold: 100,
      masterDeck: createStartingDeck(),
      removalCostLevel: 0, // 0 = 50, 1 = 75, 2 = 100
      appState: 'shop'
    });
  });

  it('allows removing a card from the master deck for 50 gold initially', () => {
    const store = useGameStore.getState();
    const initialDeckSize = store.masterDeck.length;
    const cardToRemove = store.masterDeck[0];

    // Assuming we have a removeCard function in the store
    store.removeCardFn(cardToRemove);

    const updatedStore = useGameStore.getState();
    expect(updatedStore.gold).toBe(50); // 100 - 50
    expect(updatedStore.masterDeck.length).toBe(initialDeckSize - 1);
    expect(updatedStore.removalCostLevel).toBe(1); // Next cost is 75
    // Ensure the card is actually gone
    expect(updatedStore.masterDeck.find(c => c.uniqueId === cardToRemove.uniqueId)).toBeUndefined();
  });

  it('scales cost up to 75 on the second removal and prevents removal if broke', () => {
    const store = useGameStore.getState();
    const cardToRemove1 = store.masterDeck[0];
    const cardToRemove2 = store.masterDeck[1];

    store.removeCardFn(cardToRemove1); // Costs 50. Gold is 50.
    
    // Now gold is 50, next cost is 75. Should fail.
    useGameStore.getState().removeCardFn(cardToRemove2);
    
    const updatedStore = useGameStore.getState();
    expect(updatedStore.gold).toBe(50); // Still 50
    expect(updatedStore.removalCostLevel).toBe(1); // Still 1
  });
});
