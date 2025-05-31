// App state
let currentDeck = null;
let currentCards = [];
let currentIndex = 0;
let showTermFirst = true;
let isFrontVisible = true; // Tracks which side is currently shown

// Utility: Show one section, hide the rest
function switchView(viewId) {
  const sections = document.querySelectorAll('main > section');
  sections.forEach(section => {
    section.classList.add('hidden');
  });
  const target = document.getElementById(viewId);
  if (target) target.classList.remove('hidden');
}

// Ensure tutorialDeck shows first in deck list
function renderDeckList() {
  const savedDecks = window.getDecks?.() || {};
  const deckList = document.getElementById('deck-list');
  deckList.innerHTML = '';

  const allDecks = (window.tutorialDeck ? [window.tutorialDeck] : []).concat(
    Object.entries(savedDecks).map(([name, cards]) => ({ name, cards }))
  );

  allDecks.forEach(deck => {
    const card = document.createElement('div');
    card.className = 'p-4 rounded-xl text-center shadow-md cursor-pointer hover:scale-[1.03] transition-transform';

    if (deck.name === window.tutorialDeck.name) {
      card.classList.add('bg-purple-950', 'indigo-50');
      card.innerHTML = `
        <div class="text-2xl">🧪</div>
        <div class="mt-2 font-semibold ">QA Methodologies</div>
      `;
    } else {
      card.classList.add('bg-pink-800', 'text-indigo-50');
      card.innerHTML = `
        <div class="text-2xl">➕</div>
        <div class="mt-2 font-semibold">${deck.name}</div>
      `;
    }

    card.onclick = () => {
      currentDeck = deck;
      switchView('side-preference');
    };

    deckList.appendChild(card);
  });

  // Add custom deck tile
  const addTile = document.createElement('div');
  addTile.className = 'p-4 rounded-xl text-center shadow-md cursor-pointer hover:scale-[1.03] transition-transform bg-slate-500 text-white';
  addTile.innerHTML = `
    <div class="text-2xl">➕</div>
    <div class="mt-2 font-semibold">Add Custom Deck</div>
  `;
  addTile.onclick = () => switchView('create-deck-modal');
  deckList.appendChild(addTile);

  // Initialize About modal
  const aboutWrapper = document.getElementById('about-wrapper');
  const aboutBtn = document.getElementById('about-erica');
  if (aboutWrapper && aboutBtn) {
    aboutBtn.className = 'w-full px-4 py-2 rounded-xl font-semibold text-center shadow-md cursor-pointer hover:scale-[1.03] transition-transform mt-6';
    aboutWrapper.innerHTML = '';
    aboutWrapper.appendChild(aboutBtn);
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function resetCardColors(cardFront, cardBack) {
  const allBgClasses = ['bg-pink-800', 'bg-purple-950'];
  allBgClasses.forEach(cls => {
    cardFront.classList.remove(cls);
    cardBack.classList.remove(cls);
  });
}

function renderCard(index) {
  const card = currentCards[index];
  if (!card) return;

  const cardFront = document.querySelector('.study-card-front');
  const cardBack = document.querySelector('.study-card-back');
  const cardInner = document.getElementById('card-inner');

  if (cardFront && cardBack && cardInner) {
    resetCardColors(cardFront, cardBack);

    cardFront.textContent = showTermFirst ? card.term : card.definition;
    cardBack.textContent = showTermFirst ? card.definition : card.term;

    cardFront.classList.add('bg-pink-800');
    cardBack.classList.add('bg-purple-950');

    cardInner.classList.remove('flipped');
    isFrontVisible = true;
  }
}
// Study Mode
function startStudyMode() {
  setTimeout(() => {
    const cardInner = document.getElementById('card-inner');
    if (cardInner) cardInner.classList.remove('flipped');
    isFrontVisible = true;
  }, 50);

  currentCards = [...currentDeck.cards];
  shuffle(currentCards);
  currentIndex = 0;
  switchView('study-mode');
  renderCard(currentIndex);

  const btnFlip = document.getElementById('btn-flip');
  const btnNext = document.getElementById('btn-next');
  const btnExit = document.getElementById('btn-exit');

  if (btnFlip) btnFlip.onclick = flipCard;
  if (btnNext) btnNext.onclick = nextCard;
  if (btnExit) btnExit.onclick = exitStudy;
}

function flipCard() {
  const cardInner = document.getElementById('card-inner');
  if (!cardInner) return;

  cardInner.classList.toggle('flipped');
  isFrontVisible = !isFrontVisible;
}

function nextCard() {
  const cardInner = document.getElementById('card-inner');
  if (cardInner) cardInner.classList.remove('flipped');
  isFrontVisible = true;
  currentIndex++;
  if (currentIndex >= currentCards.length) {
    switchView('session-complete');
  } else {
    renderCard(currentIndex);
  }
}

function exitStudy() {
  const cardInner = document.getElementById('card-inner');
  if (cardInner) cardInner.classList.remove('flipped');
  isFrontVisible = true;
  switchView('deck-selection');
}

function showDeckNameError(message) {
  const errorDiv = document.getElementById('deck-name-error');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
  }
}

function clearDeckNameError() {
  const errorDiv = document.getElementById('deck-name-error');
  if (errorDiv) {
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
  }
}

function setupEventListeners() {
  const cardContainer = document.getElementById('card-container');
  if (cardContainer) {
    cardContainer.onclick = flipCard;
  }

  const aboutBtn = document.getElementById('about-erica');
  const aboutModal = document.getElementById('about-modal');
  const closeAbout = document.getElementById('close-about');

  if (aboutBtn && aboutModal && closeAbout) {
    aboutBtn.onclick = () => aboutModal.classList.remove('hidden');
    closeAbout.onclick = () => aboutModal.classList.add('hidden');
    aboutModal.onclick = (e) => {
      if (e.target === aboutModal) aboutModal.classList.add('hidden');
    };
  }

  document.getElementById('term-first').onclick = () => {
    showTermFirst = true;
    startStudyMode();
  };

  document.getElementById('definition-first').onclick = () => {
    showTermFirst = false;
    startStudyMode();
  };

  document.getElementById('restart-deck').onclick = startStudyMode;
  document.getElementById('return-home').onclick = () => switchView('deck-selection');

  document.getElementById('toggle-theme').onclick = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    const newTheme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    document.getElementById('toggle-theme').textContent = isDark ? '😎 Lights On' : '🌘 Lights Out';
    document.getElementById('logo').src = isDark 
      ? '/assets/transparent-click-flip-logo-dark-bg.png' 
      : '/assets/transparent-click-flip-logo-light-bg.png';
  };

  // Create default input fields on load
  const container = document.getElementById('card-fields');
  const initial = document.createElement('div');
  initial.className = 'flex gap-2 mt-2';
  initial.innerHTML = `
    <input type="text" placeholder="Term" class="flex-1 px-2 py-1 rounded bg-indigo-50 text-slate-900 ring-1 ring-slate-500 dark:ring-slate-900" required />
    <input type="text" placeholder="Definition" class="flex-1 px-2 py-1 rounded bg-indigo-50 text-slate-900 ring-1 ring-slate-500 dark:ring-slate-900" required />
  `;
  container.appendChild(initial);

  const addIcon = document.createElement('div');
  addIcon.id = 'add-card-field';
  addIcon.textContent = '⊕';
  addIcon.className = 'text-pink-800 text-3xl cursor-pointer mt-3 hover:scale-[1.10] transition-transform text-center';
  const wrapper = document.createElement('div');
  wrapper.className = 'w-full flex justify-center';
  wrapper.appendChild(addIcon);
  container.parentNode.insertBefore(wrapper, container.nextSibling);

  addIcon.onclick = () => {
    const div = document.createElement('div');
    div.className = 'flex gap-2 mt-2';
    div.innerHTML = `
      <input type="text" placeholder="Term" class="flex-1 px-2 py-1 rounded bg-indigo-50 text-slate-900 ring-1 ring-slate-500 dark:ring-slate-900" required />
      <input type="text" placeholder="Definition" class="flex-1 px-2 py-1 rounded bg-indigo-50 text-slate-900 ring-1 ring-slate-500 dark:ring-slate-900" required />
    `;
    container.appendChild(div);
  };

  document.getElementById('form-create-deck').onsubmit = (e) => {
    e.preventDefault();
    clearDeckNameError();
    const name = document.getElementById('deck-name').value.trim();
    if (!name) return showDeckNameError('Please enter a deck name.');

    if (name === window.tutorialDeck.name) {
      return showDeckNameError("That name is taken and can't be overwritten. Rename your deck to save it.");
    }

    const savedDecks = window.getDecks?.() || {};
    if (savedDecks[name]) {
      return showDeckNameError("You've already got a deck with that name. Please choose a new name or continue and overwrite the existing one.");
    }

    const inputs = document.querySelectorAll('#card-fields input');
    const cards = [];
    for (let i = 0; i < inputs.length; i += 2) {
      const term = inputs[i].value.trim();
      const definition = inputs[i + 1].value.trim();
      if (term && definition) cards.push({ term, definition });
    }
    if (cards.length > 0) {
      window.saveDeck(name, cards);
      switchView('deck-selection');
      renderDeckList();
    }
  };

  document.getElementById('cancel-create').onclick = () => switchView('deck-selection');
}

// Init
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const isDark = savedTheme === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  document.getElementById('toggle-theme').textContent = isDark ? '😎 Lights On' : '🌘 Lights Out';
  document.getElementById('logo').src = isDark 
    ? '/assets/transparent-click-flip-logo-dark-bg.png' 
    : '/assets/transparent-click-flip-logo-light-bg.png';
  renderDeckList();
  setupEventListeners();
});
