export const SCRABBLE_LETTERS = {
  A: { id: 'A', score: 1 }, B: { id: 'B', score: 3 }, C: { id: 'C', score: 3 },
  D: { id: 'D', score: 2 }, E: { id: 'E', score: 1 }, F: { id: 'F', score: 4 },
  G: { id: 'G', score: 2 }, H: { id: 'H', score: 4 }, I: { id: 'I', score: 1 },
  J: { id: 'J', score: 8 }, K: { id: 'K', score: 5 }, L: { id: 'L', score: 1 },
  M: { id: 'M', score: 3 }, N: { id: 'N', score: 1 }, O: { id: 'O', score: 1 },
  P: { id: 'P', score: 3 }, Q: { id: 'Q', score: 10 }, R: { id: 'R', score: 1 },
  S: { id: 'S', score: 1 }, T: { id: 'T', score: 1 }, U: { id: 'U', score: 1 },
  V: { id: 'V', score: 4 }, W: { id: 'W', score: 4 }, X: { id: 'X', score: 8 },
  Y: { id: 'Y', score: 4 }, Z: { id: 'Z', score: 10 }
};

const VOWEL_POOL = 'AAAAEEEEEIIIIOOOOUUU'.split('');
const CONS_POOL = 'BBCCDDFFGGHHJKKLLMMNNNPPQRRRSSSTTTTVVWWXYYZ'.split('');

export const drawRandomLetter = () => {
  const isVowel = Math.random() < 0.4;
  const pool = isVowel ? VOWEL_POOL : CONS_POOL;
  const char = pool[Math.floor(Math.random() * pool.length)];
  return { ...SCRABBLE_LETTERS[char], uniqueId: crypto.randomUUID() };
};

export const createStartingDeck = () => {
  const defaultLetters = ['A', 'A', 'E', 'E', 'I', 'O', 'U', 'T', 'R', 'S', 'L', 'N', 'D', 'G', 'C'];
  return defaultLetters.map(char => ({
      ...SCRABBLE_LETTERS[char],
      uniqueId: crypto.randomUUID()
  }));
};

export const calculateWordScore = (lettersArray) => {
  return lettersArray.reduce((acc, letter) => acc + letter.score, 0);
};
