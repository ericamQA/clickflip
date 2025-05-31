// storage.js — LocalStorage Utilities, exposed globally

window.getDecks = function () {
  return JSON.parse(localStorage.getItem('clickflip-decks') || '{}');
};

window.saveDeck = function (name, cards) {
  const decks = window.getDecks();

  // Prevent overwriting the tutorial deck
  if (name === 'QA Methodologies') {
    if (decks[name]) {
      alert("Sorry, you already have a deck with that name and that one can't be overwritten. Give your new deck another name in order to save it.");
      return;
    }
  } else if (decks[name]) {
    const proceed = confirm("You've already got a deck with that name. Do you want to rename this deck or continue and overwrite it?\n\nPress OK to overwrite or Cancel to go back.");
    if (!proceed) return;
  }

  decks[name] = cards;
  localStorage.setItem('clickflip-decks', JSON.stringify(decks));
};