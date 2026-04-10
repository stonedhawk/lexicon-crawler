let dictionarySet = null;

export const loadDictionary = async () => {
    if (dictionarySet) return dictionarySet;
    try {
        const response = await fetch('/enable1.txt');
        const text = await response.text();
        const words = text.split('\n').map(word => word.trim().toLowerCase()).filter(w => w);
        dictionarySet = new Set(words);
        console.log(`Loaded dictionary with ${dictionarySet.size} words.`);
        return dictionarySet;
    } catch (err) {
        console.error("Failed to load dictionary:", err);
        return new Set();
    }
};

export const isValidWord = (word) => {
    if (!dictionarySet) return false;
    return dictionarySet.has(word.toLowerCase());
};

export const findPossibleWords = (lettersArray) => {
    if (!dictionarySet) return { 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
    
    const chars = lettersArray.map(l => l.id.toLowerCase());
    const results = new Set();
    
    const permute = (arr, m = []) => {
        if (m.length >= 3 && m.length <= 7) {
            const str = m.join('');
            if (dictionarySet.has(str)) {
                results.add(str);
            }
        }
        if (m.length === 7) return;
        
        // Explore all branches
        for (let i = 0; i < arr.length; i++) {
            let curr = arr.slice();
            let next = curr.splice(i, 1);
            permute(curr, m.concat(next));
        }
    }
    
    permute(chars);
    
    const counts = { 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
    results.forEach(word => {
        if (counts[word.length] !== undefined) {
             counts[word.length]++;
        }
    });
    
    return counts;
};
