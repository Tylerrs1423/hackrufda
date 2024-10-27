const gameContainer = document.querySelector('.game-container');
const resetButton = document.getElementById('reset-btn');
const playButton = document.getElementById('play-button');
const backButton = document.getElementById('back-btn');
const difficultySelector = document.getElementById('difficulty');
const pointsDisplay = document.getElementById('points-display');

const mainMenu = document.getElementById('main-menu');
const matchingGame = document.getElementById('matching-game');

let points = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let currentCards = [];

const cardSets = {
    easy: ['☺', '☺', '☹', '☹', '♠', '♠', '♥', '♥', '♦', '♦', '♣', '♣', '♪', '♪', '♫', '♫', '☼', '☼', '★', '★'],
    medium: ['☺', '☺', '☹', '☹', '♠', '♠', '♥', '♥', '♦', '♦', '♣', '♣', '♪', '♪', '♫', '♫', '☼', '☼', '★', '★',
             '⚛', '⚛', '⚜', '⚜', '☾', '☾', '✿', '✿', '☁', '☁'],
    hard: ['☺', '☺', '☹', '☹', '♠', '♠', '♥', '♥', '♦', '♦', '♣', '♣', '♪', '♪', '♫', '♫', '☼', '☼', '★', '★',
           '⚛', '⚛', '⚜', '⚜', '☾', '☾', '✿', '✿', '☁', '☁', '♛', '♛', '⚒', '⚒', '♘', '♘', '⚓', '⚓', '♨', '♨']
};

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createCard(text) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = text;
    card.style.color = "transparent";
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');
    this.style.color = "white"; 

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
    if (isMatch) {
        disableCards();
        updatePoints();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        firstCard.style.color = "transparent";
        secondCard.classList.remove('flipped');
        secondCard.style.color = "transparent";
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function createGame(difficulty) {
    gameContainer.innerHTML = ''; 
    currentCards = [...cardSets[difficulty]]; 
    shuffle(currentCards);

    currentCards.forEach(text => {
        const card = createCard(text);
        gameContainer.appendChild(card);
    });
}

function updatePoints() {
    points += 1;
    pointsDisplay.textContent = `Points: ${points}`;
}

function resetGame() {
    const selectedDifficulty = difficultySelector.value;
    createGame(selectedDifficulty);
}

function startGame() {
    mainMenu.style.display = 'none';
    matchingGame.style.display = 'block';
    resetGame();
}

function goToMainMenu() {
    mainMenu.style.display = 'block';
    matchingGame.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    pointsDisplay.textContent = `Points: ${points}`;
    playButton.addEventListener('click', startGame);
    backButton.addEventListener('click', goToMainMenu);
    resetButton.addEventListener('click', resetGame);
    difficultySelector.addEventListener('change', resetGame);
});
