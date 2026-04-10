import { create } from 'zustand';
import { drawRandomLetter, calculateWordScore, createStartingDeck } from '../utils/scoring';
import { isValidWord } from '../utils/dictionary';
import config from '../data/config.json';

const initialDeck = createStartingDeck();

export const useGameStore = create((set, get) => ({
    // Session State
    playerMaxHp: 50,
    playerHp: 50,
    gold: 0,
    floor: 1,
    masterDeck: initialDeck,
    
    // Encounter State
    appState: 'combat', // 'combat', 'reward', 'map'
    enemyInfo: null,
    deck: [],
    discard: [],
    hand: [],
    selectedLetters: [],
    dictionaryLoaded: false,
    score: 0,
    lastWordStatus: null,
    combatLog: [],
    rewardOptions: [],

    setDictionaryLoaded: () => set({ dictionaryLoaded: true }),

    startEncounter: () => {
        const templates = config.enemies;
        const enemyTemplate = templates[Math.floor(Math.random() * templates.length)];
        const intent = enemyTemplate.intents[Math.floor(Math.random() * enemyTemplate.intents.length)];
        
        // Shuffle master deck to start the encounter
        const shuffledDeck = [...get().masterDeck].sort(() => Math.random() - 0.5);

        set({
            appState: 'combat',
            enemyInfo: { 
                ...enemyTemplate, 
                hp: enemyTemplate.maxHp,
                intent 
            },
            combatLog: [`A wild ${enemyTemplate.name} appears!`],
            score: 0,
            deck: shuffledDeck,
            discard: [],
            hand: [],
            selectedLetters: [],
            lastWordStatus: null
        });
        
        get().drawFromDeck(7);
    },

    drawFromDeck: (amount) => {
        set(state => {
            let newDeck = [...state.deck];
            let newDiscard = [...state.discard];
            let drawn = [];
            
            for (let i = 0; i < amount; i++) {
                if (newDeck.length === 0) {
                    if (newDiscard.length === 0) break; // Exhausted
                    newDeck = newDiscard.sort(() => Math.random() - 0.5);
                    newDiscard = [];
                }
                drawn.push(newDeck.shift());
            }
            
            return {
                deck: newDeck,
                discard: newDiscard,
                hand: [...state.hand, ...drawn]
            };
        });
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
            const consumedLetters = [...state.selectedLetters];
            
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
                         hand: [],
                         appState: 'reward',
                         rewardOptions: [drawRandomLetter(), drawRandomLetter(), drawRandomLetter()]
                     };
                }

                // Enemy Attacks
                const currentIntent = newState.enemyInfo.intent;
                if (currentIntent.type === 'attack') {
                    newPlayerHp = Math.max(0, newPlayerHp - currentIntent.value);
                    log.push(`${newState.enemyInfo.name} attacks you for ${currentIntent.value} damage!`);
                }
                
                if (newPlayerHp <= 0) {
                     newPlayerHp = 0;
                     log.push(`You died... Game Over.`);
                }
                
                const nextIntent = newState.enemyInfo.intents[Math.floor(Math.random() * newState.enemyInfo.intents.length)];
                
                return { 
                    score: newState.score + damage,
                    enemyInfo: { ...newState.enemyInfo, hp: newEnemyHp, intent: nextIntent },
                    playerHp: newPlayerHp,
                    combatLog: log,
                    lastWordStatus: 'valid',
                    discard: [...newState.discard, ...consumedLetters],
                    selectedLetters: [],
                };
            });

            // Draw up to hand limit (7)
            if (get().appState === 'combat') {
                 const diff = 7 - get().hand.length;
                 if (diff > 0) get().drawFromDeck(diff);
            }

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
    },

    selectReward: (letterItem) => {
        set(state => ({
            masterDeck: [...state.masterDeck, letterItem],
            floor: state.floor + 1
        }));
        // Progress to next combat (Temporary until Map system in Phase 04)
        get().startEncounter();
    },

    skipReward: () => {
        set(state => ({ floor: state.floor + 1 }));
        get().startEncounter();
    }
}));
