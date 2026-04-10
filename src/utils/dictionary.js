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
