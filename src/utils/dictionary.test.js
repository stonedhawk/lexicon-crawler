import { describe, it, expect, beforeAll, vi } from 'vitest';
import { loadDictionary, isValidWord, findPossibleWords } from './dictionary';

// Mock Trie Data: represents words 'cat' and 'dog'
const mockTrieData = {
  c: {
    a: {
      t: {
        "_": 1
      }
    }
  },
  d: {
    o: {
      "g": {
        "_": 1
      }
    }
  }
};

describe('Trie-based Dictionary & Backtracking Engine', () => {
  beforeAll(async () => {
    // Mock global fetch to return our simulated Trie data
    globalThis.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTrieData),
      })
    );

    // Initialize the dictionary
    await loadDictionary();
  });

  it('validates correct words', () => {
    expect(isValidWord('cat')).toBe(true);
    expect(isValidWord('dog')).toBe(true);
    expect(isValidWord('CAT')).toBe(true); // case-insensitivity check
  });

  it('invalidates incorrect words or partial prefixes', () => {
    expect(isValidWord('ca')).toBe(false); // prefix, not a full word
    expect(isValidWord('cot')).toBe(false); // not in dictionary
    expect(isValidWord('')).toBe(false);
  });

  it('finds and counts possible words in hand using prefix pruning', () => {
    const letters = [
      { id: 'C' }, { id: 'A' }, { id: 'T' }, 
      { id: 'D' }, { id: 'O' }, { id: 'G' }
    ];

    const results = findPossibleWords(letters);

    // 'cat' (3 letters) and 'dog' (3 letters) are the only valid words
    expect(results[3]).toBe(2); 
    expect(results[4]).toBe(0);
    expect(results[5]).toBe(0);
  });
});
