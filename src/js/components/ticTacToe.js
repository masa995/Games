const gameBoard = document.querySelector('.js-tic-tac-toe__game');
const restartBtn = document.querySelector('.js-tic-tac-toe__restart');
const winText = document.querySelector('.js-tic-tac-toe__win-text');
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

const size = 3;

const cells = initGame();

restartBtn.addEventListener('click', () => {
  startGame(cells);
});

function initGame() {
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.setAttribute('id', i);
    cell.classList.add('tic-tac-toe__cell');
    gameBoard.appendChild(cell);
  }

  const resultCells = document.querySelectorAll('.tic-tac-toe__cell');
  startGame(resultCells);

  return resultCells;
}


function startGame(cellsGames) {
  origBoard = Array.from(Array(9).keys());

  for (let i = 0; i < cellsGames.length; i++) {
    cellsGames[i].innerHTML = '';
    cellsGames[i].classList.remove('mouse');
    cellsGames[i].addEventListener('click', (e) => {
      turnClick(e);
    });
  }
  winText.textContent = '';
}

function turnClick(event) {
  if (typeof origBoard[event.target.id] == 'number') {
    turn(event.target.id, huPlayer, huSymbol);
    if (!checkTie()) {
      turn(bestSport(), aiPlayer, aiSymbol);
    }
  }
}

function turn(cellId, player, whoSymbol) {
  origBoard[cellId] = player;
  document.getElementById(cellId).innerHTML = whoSymbol
  let gameWon = checkWin(origBoard, player);
  if (gameWon) {
    gameOver(gameWon, cells);
  }
}

function checkWin(board, player) {
  let results = [];

  for (let i = 0; i < board.length; i++) {
    const e = board[i];
    if (e === player) {
      results = results.concat(i);
    }
  }

  let plays = results;
  let gameWon = null;

  for (let [index, win] of winCombos.entries()) {

    if (win.every(elem => plays.indexOf(elem) !== -1)) {
      gameWon = { index: index, player: player }; //в gameWon - хранится объект {index : номер выйграшной комбинации; player: знак игрока(O или X)}
      // console.log(gameWon);
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon, cellsGames) {

  for (let i = 0; i < cellsGames.length; i++) {
    cellsGames[i].removeEventListener('click', turnClick);
  }
  declareWinner(gameWon == huPlayer ? 'Вы победили' : 'Вы проиграли');
}


function declareWinner(who = 'неизвестно') { //ф-ция выводит результат игры 
  winText.textContent = who;
}

function emptySquares() {
  return origBoard.filter(item => typeof item == 'number');
}

function bestSport() {
  return emptySquares()[0]; //первый элемент из доступных ячеек
}

function checkTie() {
  if (emptySquares().length == 0) {
    for (let i = 0; i < cells.length; i++) {
      cells[i].removeEventListener('click', turnClick);
    }
    declareWinner('Ничья');
    return true;
  }
  return false;
}