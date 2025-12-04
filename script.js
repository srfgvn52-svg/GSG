const gameBoard = document.getElementById('game-board');
const yellowScoreElement = document.getElementById('yellow-score');
const redScoreElement = document.getElementById('red-score');
const yellowTeamDisplay = document.getElementById('yellow-team-display');
const redTeamDisplay = document.getElementById('red-team-display');
const yellowTeamNameInput = document.getElementById('yellow-team-name');
const redTeamNameInput = document.getElementById('red-team-name');
const saveNamesButton = document.getElementById('save-names');
const explosionElement = document.getElementById('explosion');
const closeExplosionButton = document.getElementById('close-explosion');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'yellow';
let scores = { yellow: 0, red: 0 };
let teamNames = { yellow: 'Sarı Takım', red: 'Kırmızı Takım' };

saveNamesButton.addEventListener('click', () => {
    const yellowName = yellowTeamNameInput.value.trim();
    const redName = redTeamNameInput.value.trim();

    if (yellowName) teamNames.yellow = yellowName;
    if (redName) teamNames.red = redName;

    yellowTeamDisplay.textContent = teamNames.yellow;
    redTeamDisplay.textContent = teamNames.red;
});

closeExplosionButton.addEventListener('click', () => {
    explosionElement.classList.add('hidden');
    explosionElement.querySelector('p').textContent = ''; // Mesajı temizle
    closeExplosionButton.style.display = 'none'; // Kapat butonunu gizle
    explosionElement.style.display = 'none'; // Patlama ekranını gizle
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'yellow';
    createBoard();
});
 

function createBoard() {
    gameBoard.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.dataset.index = index;
        cellElement.addEventListener('click', handleMove);
        cellElement.textContent = cell;
        gameBoard.appendChild(cellElement);
    });
}

function handleMove(event) {
    const index = event.target.dataset.index;
    if (board[index] !== '') return;

    board[index] = currentPlayer === 'yellow' ? 'G' : 'S';
    event.target.textContent = board[index];
    event.target.style.color = currentPlayer === 'yellow' ? '#ffcc00' : '#b71c1c';

    if (checkWin()) {
        showExplosion(`${teamNames[currentPlayer]} kazandı!`);
        scores[currentPlayer]++;
        updateScores();
        return;
    }

    if (board.every(cell => cell !== '')) {
        setTimeout(() => {
            alert('Berabere!');
            board = ['', '', '', '', '', '', '', '', ''];
            createBoard();
        }, 100);
        return;
    }

    currentPlayer = currentPlayer === 'yellow' ? 'red' : 'yellow';
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Satırlar
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Sütunlar
        [0, 4, 8], [2, 4, 6]             // Çaprazlar
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function updateScores() {
    yellowScoreElement.textContent = scores.yellow;
    redScoreElement.textContent = scores.red;
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    createBoard();
}

function showExplosion(message) {
    explosionElement.querySelector('p').textContent = message;
    explosionElement.classList.remove('hidden');
    explosionElement.style.display = 'flex'; // Patlama ekranının görünür olduğundan emin olun
    closeExplosionButton.style.display = 'inline-block'; // Kapat butonunu göster
}

window.addEventListener('DOMContentLoaded', () => {
    explosionElement.classList.add('hidden');
    explosionElement.style.display = 'none';
});

createBoard();