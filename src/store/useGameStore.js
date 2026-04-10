import { create } from 'zustand';
import { drawRandomLetter, calculateWordScore } from '../utils/scoring';
import { isValidWord } from '../utils/dictionary';
import config from '../data/config.json';

export const useGameStore = create((set, get) => ({
    // Session State
    playerMaxHp: 50,
    playerHp: 50,
    gold: 0,
    floor: 1,

    // Combat State
    enemyInfo: null,
    hand: [],
    selectedLetters: [],
    dictionaryLoaded: false,
    score: 0,
    lastWordStatus: null,
    combatLog: [],

    setDictionaryLoaded: () => set({ dictionaryLoaded: true }),

    startEncounter: () => {
        const templates = config.enemies;
        const enemyTemplate = templates[Math.floor(Math.random() * templates.length)];
        const intent = enemyTemplate.intents[Math.floor(Math.random() * enemyTemplate.intents.length)];
        
        set({
            enemyInfo: { 
                ...enemyTemplate, 
                hp: enemyTemplate.maxHp,
                intent 
            },
            combatLog: [`A wild ${enemyTemplate.name} appears!`],
            score: 0
        });
        get().drawHand();
    },

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
        if (state.selectedLetters.length === 0 || !state.enemyInfo || state.enemyInfo.hp === 0) return;
        
        const wordString = state.selectedLetters.map(l => l.id).join('');
        const valid = isValidWord(wordString);
        
        if (valid) {
            const damage = calculateWordScore(state.selectedLetters);
            
            set((newState) => {
                let log = [...newState.combatLog, `You spelled ${wordString.toUpperCase()} for ${damage} damage!`];
                let newEnemyHp = Math.max(0, newState.enemyInfo.hp - damage);
                let newPlayerHp = newState.playerHp;
                
                // If enemy dies
                if (newEnemyHp === 0) {
                     log.push(`You defeated ${newState.enemyInfo.name}! You earned 15 Gold.`);
                     return {
                         enemyInfo: { ...newState.enemyInfo, hp: 0 },
                         gold: newState.gold + 15,
                         combatLog: log,
                         lastWordStatus: 'valid',
                         selectedLetters: [],
                         hand: [] // Clear hand
                     };
                }

                // Enemy Attacks
                const currentIntent = newState.enemyInfo.intent;
                if (currentIntent.type === 'attack') {
                    newPlayerHp = Math.max(0, newPlayerHp - currentIntent.value);
                    log.push(`${newState.enemyInfo.name} attacks you for ${currentIntent.value} damage!`);
                }
                
                if (newPlayerHp === 0) {
                     log.push(`You died... Game Over.`);
                }
                
                // Next intent
                const nextIntent = newState.enemyInfo.intents[Math.floor(Math.random() * newState.enemyInfo.intents.length)];
                
                // Draw replacement letters
                const diff = 7 - newState.hand.length;
                const newHand = [...newState.hand, ...Array.from({ length: diff }, drawRandomLetter)];

                return { 
                    score: newState.score + damage,
                    enemyInfo: { ...newState.enemyInfo, hp: newEnemyHp, intent: nextIntent },
                    playerHp: newPlayerHp,
                    combatLog: log,
                    lastWordStatus: 'valid',
                    selectedLetters: [],
                    hand: newHand
                };
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
