# Changelog

All notable changes to this project will be documented in this file.

## [v1.2.0] - 2026-04-10
### Added
- **Streak Engine**: Rebalanced the baseline HP recovery system. Finding valid words sequentially scales a `streak` multiplier, expanding HP recovery dynamically via `Score + (streak * 2)`. Errors brutally reset the streak back to 0.
- **HUD Combinatorics**: The combat UI now features a real-time tracking bar predicting exactly how many 3, 4, 5, 6, and 7-letter words are possible given the specific drawn elements in your hand using a recursive permutation engine wrapped in a memoized React hook!

## [v1.1.0] - 2026-04-10
### Added
- **Keyboard Support**: Added robust event listeners during Combat allowing players to physically type words directly from their keyboard, use `Backspace` to undo, and hit `Enter` to submit.
- **Persistent Storage**: Integrated Zustand's native `persist` middleware targeting `localStorage`, ensuring Gold, runs, and HP are universally preserved against browser refreshing.
- **Victory & Death Screens**: Added dedicated 'Restart Run' and 'Play Again' CTAs natively routing to a new `fullReset` store action to clear state and return to Floor 1.
- **Healing Mechanic**: Keying in a valid word now heals the HP of the crawler by `Math.floor(Word Score / 2)`.
- **Node Curing**: Player HP is now automatically entirely restored to Max HP transitioning nodes (e.g., leaving a shop or entering combat).

## [v1.0.0] - 2026-04-10
### Added
- Created foundational Lexicon Crawler application.
- Added ENABLE dictionary caching mapping logic for zero-latency validations.
- Developed React `useGameStore.js` with centralized Zustand execution.
- Added dynamic deck mechanics, shuffling logic, and discarding queues.
- Designed Map Node layouts routing Combat/Shop/Elite/Boss.
- Added `framer-motion` visuals for Entrance interactions and kinetic physical feedback.
