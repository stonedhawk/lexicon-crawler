# Lexicon Crawler 📚⚔️

A reactive, single-player, web-based roguelite word game where players draft a dynamic deck of letters to defeat enemies structurally bound as nodes on a map! Lexicon Crawler is built entirely natively in the browser leveraging deep reactive pipelines.

## Features Let Loose:
- **Instantaneous Dictionary Validation:** An `O(1)` Set pipeline wrapping over `170,000` cached words.
- **Reactive Rogue-lite State:** A centralized Zustand ecosystem manipulating `deck`, `hand`, `discard`, and `gold` pools concurrently securely.
- **Physical Feedback:** Micro-animations fueled by `framer-motion`. Expect cards to spring, menus to slide, and enemies to violently shake when hit by a barrage of vowels!
- **Dynamic Economy:** A built-in Shop layer that lets players burn cards symmetrically to hyper-optimize their draw pools for Boss encounters.
- **Full Keyboard Integration:** You aren't boxed into using just the UI—freely physically type the words directly from your drafted deck!
- **Persistent Safeguards:** Run crashed the tab? Game inherently targets `localStorage` tracking—you will never lose your progress!

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
