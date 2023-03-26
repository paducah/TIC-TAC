// Define variables for the game state
let currentPlayer = 'X';
let gameStatus = ['', '', '', '', '', '', '', '', ''];

// Define winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Define DOM variables
const message = document.querySelector('.message');
const squares = document.querySelectorAll('.square');

// Define functions
function currentPlayerTurn() {
  return `It's ${currentPlayer}'s turn`;
}

function winningMessage() {
  return `${currentPlayer} has won!`;
}

function drawMessage() {
  return `Game ended in a draw!`;
}

function checkForWin() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      gameStatus[a] !== '' &&
      gameStatus[a] === gameStatus[b] &&
      gameStatus[b] === gameStatus[c]
    ) {
      return true;
    }
  }
  return false;
}

function handleSquareClick(squareClicked, squareIndex) {
  gameStatus[squareIndex] = currentPlayer;
  squareClicked.classList.add(`player${currentPlayer}`);

  if (checkForWin()) {
    message.textContent = winningMessage();
    restartGame();
  } else if (!gameStatus.includes('')) {
    message.textContent = drawMessage();
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = currentPlayerTurn();
  }
}

function restartGame() {
  currentPlayer = 'X';
  gameStatus = ['', '', '', '', '', '', '', '', ''];
  squares.forEach((square) => {
    square.classList.remove('playerX', 'playerO');
  });
  message.textContent = currentPlayerTurn();
}

// Add event listeners to the game board squares
squares.forEach((square, index) => {
  square.addEventListener('click', () => handleSquareClick(square, index));
});

// Initialize the game
message.textContent = currentPlayerTurn();
