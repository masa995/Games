const restartBtn = document.querySelector('.js-tic-tac-toe__restart');
const newGameBtn = document.querySelector('.js-tic-tac-toe__new-game');
const easyLevelBtn = document.querySelector('.js-tic-tac-toe__easy-level');
const hardLevelBtn = document.querySelector('.js-tic-tac-toe__hard-level');
const gameBoard = document.querySelector('.js-tic-tac-toe__game');
const winText = document.querySelector('.js-tic-tac-toe__win-text');
let cells;
let keyLevel = 'easy';
const huPlayer = 'X';
const aiPlayer = 'O';
const huSymbol = `<svg class="cross">
<line class="cross-first" x1="10" y1="10" x2="70" y2="70" stroke="#333" stroke-width="10" stroke-linecap="round" />
<line class="cross-second" x1="70" y1="10" x2="10" y2="70" stroke="#333" stroke-width="10" stroke-linecap="round" />
</svg>`;
const aiSymbol = `<svg class="circle">
<circle r="30" cx="40" cy="40" stroke="#c15746" stroke-width="10" fill="none" stroke-linecap="round" />
</svg>`;

let origBoard;
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
];

if (gameBoard !== null) {
  initGame();

  newGameBtn.addEventListener('click', () => {
    easyLevelBtn.removeAttribute('disabled');
    hardLevelBtn.removeAttribute('disabled');
    newGameBtn.setAttribute('disabled', 'disabled');
    restartBtn.setAttribute('disabled', 'disabled');
  })

  easyLevelBtn.addEventListener('click', () => {
    checkLevel('easy');
  })

  hardLevelBtn.addEventListener('click', () => {
    checkLevel('hard');
  })

  restartBtn.addEventListener('click', () => {
    startGame();
  })
}

function checkLevel(level) {
  keyLevel = level;
  startGame();
  restartBtn.removeAttribute('disabled');
  newGameBtn.removeAttribute('disabled');
  easyLevelBtn.setAttribute('disabled', 'disabled');
  hardLevelBtn.setAttribute('disabled', 'disabled');
}

function initGame() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.setAttribute('id', i);
    cell.classList.add('tic-tac-toe__cell');
    gameBoard.appendChild(cell);
  }
  cells = document.querySelectorAll('.tic-tac-toe__cell');
}

function startGame() {
  origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = '';
    cells[i].classList.add('mouse');
    cells[i].addEventListener('click', turnClick);
  }
  winText.innerText = '';
}

function turnClick(event) {
  if (typeof origBoard[event.target.id] == 'number') {
    turn(event.target.id, huPlayer, huSymbol);

    if ((!checkTie()) && (!checkWin(origBoard, huPlayer))) {
      turn(bestSport(), aiPlayer, aiSymbol);
    }
  }
}

function turn(squareId, player, playerSymbol) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerHTML = playerSymbol;
  cells[squareId].classList.remove('mouse');

  let gameWon = checkWin(origBoard, player);
  if (gameWon) {
    gameOver(player);
  }
}

function checkWin(board, player) {
  let moves = playerMoves(board, player);

  for (let win of winCombos) {
    if (win.every((elem) => moves.indexOf(elem) !== -1)) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  if (emptySquares().length == 0) {
    for (let i = 0; i < cells.length; i++) {
      cells[i].removeEventListener('click', turnClick);
    }
    setTimeout(() => declareWinner('Ничья'), 1500);
    return true;
  }
  return false;
}

function gameOver(player) {
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', turnClick);
    cells[i].classList.remove('mouse');
  }
  setTimeout(() => declareWinner(player === huPlayer ? 'Вы победили' : 'Вы проиграли'), 1500);
}

function declareWinner(who) {
  winText.innerText = who;
}

function emptySquares() {
  return origBoard.filter((cell) => typeof cell == 'number');
}

function playerMoves(board, player) {
  let results = [];

  for (let i = 0; i < board.length; i++) {
    const e = board[i];
    if (e === player) {
      results = results.concat(i);
    }
  }
  return results;
}

function bestSport() {
  if (keyLevel === 'easy') {
    return bestSportEasy();
  }
  else if (keyLevel === 'hard') {
    return bestSportHard();
  }
  else {
    return bestSportHard();
  }
}

function bestSportEasy() {
  let arr = emptySquares();
  let moves = playerMoves(origBoard, huPlayer);

  for (let win of winCombos) {
    if ((moves.includes(win[0])) && (moves.includes(win[1]))) {
      if (arr.includes(win[2])) {
        return win[2];
      }
    } else if ((moves.includes(win[0])) && (moves.includes(win[2]))) {
      if (arr.includes(win[3])) {
        return win[1];
      }
    } else if ((moves.includes(win[1])) && (moves.includes(win[2]))) {
      if (arr.includes(win[0])) {
        return win[0];
      }
    }
  }
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function bestSportHard() {
  let arr = minimax(origBoard, aiPlayer);
  return arr.index;
}

function minimax(newBoard, player) {
  let availSpots = emptySquares();

  if (checkWin(newBoard, huPlayer)) {
    return { score: -10 };
  } else if (checkWin(newBoard, aiPlayer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }
  let moves = [];

  for (let i = 0; i < availSpots.length; i++) {
    let move = [];

    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == aiPlayer) {
      let result = minimax(newBoard, huPlayer);
      move.score = result.score;
    } else {
      let result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;
    moves.push(move);
  }

  let bestMove;

  if (player === aiPlayer) {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}