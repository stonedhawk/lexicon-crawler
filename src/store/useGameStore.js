import { create } from 'zustand';
import { drawRandomLetter, calculateWordScore } from '../utils/scoring';
import { isValidWord } from '../utils/dictionary';

export const useGameStore = create((set, get) => ({
    hand: [],
    selectedLetters: [],
    dictionaryLoaded: false,
    score: 0,
    lastWordStatus: null, // 'valid' | 'invalid' | null

    setDictionaryLoaded: () => set({ dictionaryLoaded: true }),

    drawHand: () => {
        const newHand = Array.from({ length: 7 }, drawRandomLetter);
        set({ hand: newHand, selectedLetters: [], lastWordStatus: null });
    },

    selectLetter: (letterItem) => {
        set((state) => {
            if (state.hand.find(l => l.uniqueId === letterItem.uniqueId)) {
                return {
                    hand: state.hand.filter(l => l.uniqueId !== letterItem.uniqueId),
                    selectedLetters: [...state.selectedLetters, letterItem]
                };
            }
            return state;
        });
    },

    deselectLetter: (letterItem) => {
        set((state) => {
            if (state.selectedLetters.find(l => l.uniqueId === letterItem.uniqueId)) {
                return {
                    selectedLetters: state.selectedLetters.filter(l => l.uniqueId !== letterItem.uniqueId),
                    hand: [...state.hand, letterItem]
                };
            }
            return state;
        });
    },

    submitWord: () => {
        const state = get();
        if (state.selectedLetters.length === 0) return;
        
        const wordString = state.selectedLetters.map(l => l.id).join('');
        const valid = isValidWord(wordString);
        
        if (valid) {
            const wordScore = calculateWordScore(state.selectedLetters);
            set({ 
                score: state.score + wordScore, 
                lastWordStatus: 'valid',
                selectedLetters: [] // consumed
            });
            // Draw replacement letters
            set((newState) => {
                 const diff = 7 - newState.hand.length;
                 const newHand = [...newState.hand, ...Array.from({ length: diff }, drawRandomLetter)];
                 return { hand: newHand };
            });
        } else {
            set({ lastWordStatus: 'invalid' });
        }
    },
    
    resetSelection: () => {
        set((state) => ({
            hand: [...state.hand, ...state.selectedLetters],
            selectedLetters: [],
            lastWordStatus: null
        }));
    }
}));
