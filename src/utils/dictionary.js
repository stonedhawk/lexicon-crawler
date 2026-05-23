import { TrieEngine } from '@rahulmrx/game-ready-dictionary';

let trie = null;

export const loadDictionary = async () => {
    if (trie) return trie;
    try {
        const response = await fetch('/large_trie.json');
        const trieData = await response.json();
        trie = new TrieEngine(trieData);
        console.log("Loaded high-performance precompiled Trie dictionary successfully.");
        return trie;
    } catch (err) {
        console.error("Failed to load precompiled Trie dictionary:", err);
        return null;
    }
};

export const isValidWord = (word) => {
    if (!trie) return false;
    return trie.validate(word.toLowerCase());
};

export const findPossibleWords = (lettersArray) => {
    if (!trie) return { 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
    
    const chars = lettersArray.map(l => l.id.toLowerCase());
    const results = new Set();
    
    const permute = (arr, m = []) => {
        const str = m.join('');
        
        // Trie Backtracking / Prefix Pruning:
        // If the current sequence is not a valid prefix of any English word,
        // we can immediately prune this search branch!
        if (str.length > 0 && !trie.isPrefix(str)) {
            return;
        }

        if (m.length >= 3 && m.length <= 7) {
            if (trie.validate(str)) {
                results.add(str);
            }
        }
        if (m.length === 7) return;
        
        const seen = new Set();
        // Explore all branches
        for (let i = 0; i < arr.length; i++) {
            const char = arr[i];
            if (seen.has(char)) continue;
            seen.add(char);
            
            let curr = arr.slice();
            let next = curr.splice(i, 1);
            permute(curr, m.concat(next));
        }
    };
    
    permute(chars);
    
    const counts = { 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
    results.forEach(word => {
        if (counts[word.length] !== undefined) {
             counts[word.length]++;
        }
    });
    
    return counts;
};
