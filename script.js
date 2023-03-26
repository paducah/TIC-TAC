const board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let currentPlayer = 'X';
let gameOver = false;

function printBoard() {
  for (let i = 0; i < 9; i++) {
    document.getElementById(i.toString()).innerText = board[i];
  }
}

function checkWin() {
  // check rows
  for (let i = 0; i < 9; i += 3) {
    if (board[i] === board[i+1] && board[i+1] === board[i+2] && board[i] !== ' ') {
      return true;
    }
  }
  // check columns
  for (let i = 0; i < 3; i++) {
    if (board[i] === board[i+3] && board[i+3] === board[i+6] && board[i] !== ' ') {
      return true;
    }
  }
  // check diagonals
  if ((board[0] === board[4] && board[4] === board[8]) || (board[2] === board[4] && board[4] === board[6])) {
    return true;
  }
  // no winner
  return false;
}

function playTurn(square) {
  const id = parseInt(square.id);
  if (board[id] === ' ' && !gameOver) {
    board[id] = currentPlayer;
    printBoard();
    if (checkWin()) {
      gameOver = true;
      document.getElementById('message').innerText = `Player ${currentPlayer} wins!`;
    } else if (!board.includes(' ')) {
      gameOver = true;
      document.getElementById('message').innerText = 'Tie game!';
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      document.getElementById('message').innerText = `Player ${currentPlayer}'s turn`;
    }
  }
}

// add event listeners to squares
const squares = document.getElementsByClassName('square');
for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click', function() {
    playTurn(this);
  });
}
