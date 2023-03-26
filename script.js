// Initialize the game state
let currentPlayer = 'X';
let gameStatus = ['', '', '', '', '', '', '', '', ''];
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// Get DOM elements
const squares = document.querySelectorAll('.square');
const message = document.getElementById('message');

// Add event listeners to each square
squares.forEach(square => square.addEventListener('click', handleSquareClick));

// Handle square clicks
function handleSquareClick(event) {
  const square = event.target;
  const index = Array.from(squares).indexOf(square);

  // If the square is already filled or the game is over, return
  if (gameStatus[index] !== '' || !gameStatus.includes('')) {
    return;
  }

  // Update the game state
  gameStatus[index] = currentPlayer;
  square.textContent = currentPlayer;
  square.classList.add(`player${currentPlayer}`);

  // Check if the game is over
  if (checkForWin()) {
    message.textContent = winningMessage();
  } else if (!gameStatus.includes('')) {
    message.textContent = drawMessage();
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = currentPlayerTurn();
  }
}

// Check if any player has won the game
function checkForWin() {
  const winConditions = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (gameStatus[a] !== '' && gameStatus[a] === gameStatus[b] && gameStatus[b] === gameStatus[c]) {
      return true;
    }
  }

  return false;
}

// Initialize the game
function startGame() {
  message.textContent = currentPlayerTurn();
}

// Restart the game
function restartGame() {
  gameStatus = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  squares.forEach(square => {
    square.textContent = '';
    square.classList.remove('playerX', 'playerO');
  });
  startGame();
}

// Add event listener to the "Restart" button
document.getElementById('restartButton').addEventListener('click', restartGame);

// Start the game
startGame();
