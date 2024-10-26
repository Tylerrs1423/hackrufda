const gameContainer = document.querySelector('.game-container');
const resetButton = document.getElementById('reset-btn');
const cardTexts = [
    'A', 'A', 'B', 'B', 'C', 
    'C', 'D', 'D', 'E', 'E', 
    'F', 'F', 'G', 'G', 'H', 
    'H', 'I', 'I', 'J', 'J', 
    'K', 'K', 'L', 'L', 'M', 
    'M', 'N', 'N', 'O', 'O'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createCard(text) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = text;
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');

    // Show the text by changing the color
    this.style.color = "white"; // Make text visible

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.textContent === secondCard.textContent;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        firstCard.style.color = "transparent"; // Hide text again
        secondCard.classList.remove('flipped');
        secondCard.style.color = "transparent"; // Hide text again
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function createGame() {
    shuffle(cardTexts);
    cardTexts.forEach(text => {
        const card = createCard(text);
        gameContainer.appendChild(card);
    });
}

function resetGame() {
    gameContainer.innerHTML = '';
    createGame();
}


document.addEventListener('DOMContentLoaded', createGame);
resetButton.addEventListener('click', resetGame);
