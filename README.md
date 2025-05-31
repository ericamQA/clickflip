# Clickflip

Clickflip is a clean, simple flashcard app built for self-study, designed for actual personal use and to give me an app I could write real QA test cases for and run automated testing on. This is a fully client-side project with no database dependency — all custom decks are stored in localStorage.

---

## 🔥 Features

- 🔁 **Card Flipping** — Animated 3D flip effect with magenta/plum color scheme.
- 🌘 **Dark & Light Mode** — Toggle themes dynamically with matching logo swap.
- 🧪 **Built-in Tutorial Deck** — Includes QA methodology terms to demonstrate usage.
- ➕ **Add Custom Decks** — Create new decks with multiple cards stored locally.
- 🧠 **Study Mode** — Choose to start with term or definition first, flip to reveal the other side, and cycle through cards at random.
- 🤓 **About Modal** — Simple modal with my links, photo, and a quick hello.

---

## 📁 File Structure

- `index.html` — Base layout and element containers.
- `styles.css` — Tailwind-based utility classes and flip animation.
- `script.js` — All app logic for deck rendering, card flipping, study flow, and form handling.
- `storage.js` — LocalStorage helpers to load/save custom decks.
- `tutorial.js` — Hardcoded QA deck array used as the built-in starter.

---

## 🚀 How to Use

1. Open the app in your browser.
2. Choose a deck and whether to study terms or definitions.
3. Flip through the cards using the Flip / Next / Exit controls.
4. Create your own deck from the home screen.

🌘 *Dark mode is enabled by default — feel free to switch it up using the top-right toggle.*

---
## 💡 Potential Updates

- 🧭 Product tour onboarding flow (with pointers and animations)
- 😎 An emoji picker to select the emoji associated with a custom decks
- 📱 Improved responsiveness across devices
- 📦 Moving custom decks out of local storage
- 🧰 User settings panel (reorder, rename, or delete decks)
- 🌐 Migrate to external DB for login, shared decks, and syncing
- 📝 Answer modes: multiple choice, timed, or text input
- 🧪 QA scoring and stats dashboard

---

## 🛠 Tech Stack

- HTML + CSS (Tailwind)
- JavaScript (vanilla)
- LocalStorage for persistent data
- Modular file structure

---

## 📄 License

[GNU General Public License v3.0](https://github.com/ericamQA/clickflip/commit/0fbbdb7113ae22551cfea382d68bf693a567cb5b)
