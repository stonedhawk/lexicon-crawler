# Lexicon Crawler 📚⚔️

**[Play the Live Native Demo Here!](https://stonedhawk.github.io/lexicon-crawler/)**

A reactive, single-player, web-based roguelite word game where players draft a dynamic deck of letters to defeat enemies structurally bound as nodes on a map! Lexicon Crawler is built entirely natively in the browser leveraging deep reactive pipelines.

## Features Let Loose:
- **Instantaneous Dictionary Validation:** An `O(1)` Set pipeline wrapping over `170,000` cached words.
- **Reactive Rogue-lite State:** A centralized Zustand ecosystem manipulating `deck`, `hand`, `discard`, and `gold` pools concurrently securely.
- **Physical Feedback:** Micro-animations fueled by `framer-motion`. Expect cards to spring, menus to slide, and enemies to violently shake when hit by a barrage of vowels!
- **Dynamic Economy:** A built-in Shop layer that lets players burn cards symmetrically to hyper-optimize their draw pools for Boss encounters.
- **Full Keyboard Integration:** You aren't boxed into using just the UI—freely physically type the words directly from your drafted deck!
- **Persistent Safeguards:** Run crashed the tab? Game inherently targets `localStorage` tracking—you will never lose your progress!

## 🎮 How to Play
1. **The Map**: You must traverse an ascending structural pathway spanning exactly 20 distinct floors, routing through Combat, Merchants, and Elite Boss fights.
2. **Combat Phase**: You are dealt a hand containing 7 random letters from your curated Deck. To inflict damage, you must construct valid English words!
   - Select letters by clicking them or physically typing on your keyboard.
   - Hit **Submit** (or press `Enter`) to cast the spell if your drafted word registers mathematically against the internal Enable-12 dictionary.
   - Want a different perspective? Press the **Spacebar** to instantly shuffle the array!
3. **Drafting / Rewards**: Defeating dungeon encounters yields Gold and grants an opportunity to permanently draft powerful new lettering into your core Deck.
4. **Shops**: Allocate your Gold at Merchant checkpoints to systematically **remove** low-value or awkward letters. Removing garbage maximizes deck consistency!

## 💡 Tips and Tricks
- **Maintain that Multiplier**: Your base HP healing scales off your base Word length, heavily modified by a built-in `Streak` engine. Avoiding misspelled or invalid words prevents the Streak multiplier from reverting to 0!
- **Lean Deck Philosophy**: A bloated deck makes drawing vowels mathematically inconsistent. Aggressively spend Gold deleting tricky consonants (Q, Z, X) to ensure your hand can always swing large payloads!
- **Observe the Hint HUD**: The lower combat UI actively recurses over your exact hand parsing branching permutations. If the `5L` param outputs `0`, stop trying—you mathematically cannot spell a 5-letter word!

## Local Development:
Need ink? Simply pull the repo down locally and boot via Node + Vite.

```bash
npm install
npm run dev
```

### Technologies Used:
1. **React 19**
2. **Vite**
3. **Tailwind CSS v4**
4. **Zustand**
5. **Framer Motion**
6. **Lucide Icons**
