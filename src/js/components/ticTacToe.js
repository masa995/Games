'use strict'
class TicTacToe {
  constructor(btnsMenu, activeMenuBtn) {
    this.gameBoard = this.createElementBoard();
    this.winText = this.createElementText();

    this.newGameBtn = document.querySelector(btnsMenu.selectorNewGame);
    this.restartBtn = document.querySelector(btnsMenu.selectorRestart);
    this.easyLevelBtn = document.querySelector(btnsMenu.selectorEasyLevel);
    this.hardLevelBtn = document.querySelector(btnsMenu.selectorHardLevel);
    this.btnMenu = document.querySelector(activeMenuBtn.selectorBtnMenu);
    this.listMenu = document.querySelector(activeMenuBtn.selectorListMenu);

    this.origBoard;
    this.cells;
    this.keyLevel = 'easy';

    this.huPlayer = 'X';
    this.aiPlayer = 'O';

    this.huSymbol = `<svg class="cross">
    <line class="cross-first" x1="10" y1="10" x2="70" y2="70" stroke="#333" stroke-width="10" stroke-linecap="round" />
    <line class="cross-second" x1="70" y1="10" x2="10" y2="70" stroke="#333" stroke-width="10" stroke-linecap="round" />
    </svg>`;
    this.aiSymbol = `<svg class="circle">
    <circle r="30" cx="40" cy="40" stroke="#c15746" stroke-width="10" fill="none" stroke-linecap="round" />
    </svg>`;

    this.winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2]
    ];

    this.handleTurnClick = (event) => {
      if (typeof this.origBoard[event.target.id] == 'number') {
        this.turn(event.target.id, this.huPlayer, this.huSymbol);

        if ((!this.checkTie()) && (!this.checkWin(this.origBoard, this.huPlayer))) {
          this.turn(this.BestSport(), this.aiPlayer, this.aiSymbol);
        }
      }
    };

    this.init();
  }

  createElementBoard() {
    const game = document.querySelector('.js-tic-tac-toe');
    const board = document.createElement('div');
    board.classList.add('tic-tac-toe__game', 'js-tic-tac-toe__game');
    game.appendChild(board);
    return board;
  }

  createElementText() {
    const game = document.querySelector('.js-tic-tac-toe');
    const text = document.createElement('p');
    text.classList.add('tic-tac-toe__win-text', 'js-tic-tac-toe__win-text');
    game.appendChild(text);
    return text;
  }

  whoWinner(who) {
    this.winText.innerText = who;
  }

  init() {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.setAttribute('id', i);
      cell.classList.add('tic-tac-toe__cell');
      this.gameBoard.appendChild(cell);
    }
    this.cells = document.querySelectorAll('.tic-tac-toe__cell');

    this.newGameBtn.addEventListener('click', () => {
      this.easyLevelBtn.removeAttribute('disabled');
      this.hardLevelBtn.removeAttribute('disabled');
      this.newGameBtn.setAttribute('disabled', 'disabled');
      this.restartBtn.setAttribute('disabled', 'disabled');
    });

    this.easyLevelBtn.addEventListener('click', () => {
      this.checkLevel('easy');
      this.activeMenu();
    });

    this.hardLevelBtn.addEventListener('click', () => {
      this.checkLevel('hard');
      this.activeMenu();
    });

    this.restartBtn.addEventListener('click', () => {
      this.start();
      this.activeMenu();
    });
  }

  activeMenu() {
    btnMenu.classList.toggle('active');
    listMenu.classList.toggle('active');
  }

  checkLevel(level) {
    this.keyLevel = level;
    this.start();
    this.restartBtn.removeAttribute('disabled');
    this.newGameBtn.removeAttribute('disabled');
    this.easyLevelBtn.setAttribute('disabled', 'disabled');
    this.hardLevelBtn.setAttribute('disabled', 'disabled');
  }

  start() {
    this.origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].innerHTML = '';
      this.cells[i].classList.add('pointer');
      this.cells[i].addEventListener('click', this.handleTurnClick)

      this.winText.innerText = '';
    }
  }

  turn(squareId, player, playerSymbol) {
    this.origBoard[squareId] = player;
    document.getElementById(squareId).innerHTML = playerSymbol;
    this.cells[squareId].removeEventListener('click', this.handleTurnClick);
    this.cells[squareId].classList.remove('pointer');

    let gameWon = this.checkWin(this.origBoard, player);
    if (gameWon) {
      this.gameOver(player);
    }
  }

  checkWin(board, player) {
    let moves = this.playerMoves(board, player);

    for (let win of this.winCombos) {
      if (win.every((elem) => moves.indexOf(elem) !== -1)) {
        return true;
      }
    }
    return false;
  }

  checkTie() {
    if (this.emptySquares().length == 0) {
      for (let i = 0; i < this.cells.length; i++) {
        this.cells[i].removeEventListener('click', this.handleTurnClick);
      }
      setTimeout(() => this.whoWinner('Ничья'), 1200);
      return true;
    }
    return false;
  }

  gameOver(player) {
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].removeEventListener('click', this.handleTurnClick);
      this.cells[i].classList.remove('pointer');
    }

    setTimeout(() => this.whoWinner(player === this.huPlayer ? 'Вы победили' : 'Вы проиграли'), 1200);
  }


  emptySquares() {
    return this.origBoard.filter((cell) => typeof cell == 'number');
  }

  playerMoves(board, player) {
    let results = [];

    for (let i = 0; i < board.length; i++) {
      const e = board[i];
      if (e === player) {
        results = results.concat(i);
      }
    }
    return results;
  }

  BestSport() {
    if (this.keyLevel === 'easy') {
      return this.BestSportEasy();
    }
    else if (this.keyLevel === 'hard') {
      return this.BestSportHard();
    }
  }

  BestSportEasy() {
    let arr = this.emptySquares();
    let moves = this.playerMoves(this.origBoard, this.huPlayer);

    for (let win of this.winCombos) {
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

  BestSportHard() {
    let arr = this.minimax(this.origBoard, this.aiPlayer);
    return arr.index;
  }

  minimax(newBoard, player) {
    let emptySpots = this.emptySquares();

    if (this.checkWin(newBoard, this.huPlayer)) {
      return { score: -10 };
    } else if (this.checkWin(newBoard, this.aiPlayer)) {
      return { score: 10 };
    } else if (emptySpots.length === 0) {
      return { score: 0 };
    }
    let moves = [];

    for (let i = 0; i < emptySpots.length; i++) {
      let move = {};

      move.index = newBoard[emptySpots[i]];
      newBoard[emptySpots[i]] = player;

      if (player == this.aiPlayer) {
        let result = this.minimax(newBoard, this.huPlayer);
        move.score = result.score;
      } else {
        let result = this.minimax(newBoard, this.aiPlayer);
        move.score = result.score;
      }

      newBoard[emptySpots[i]] = move.index;
      moves.push(move);
    }

    let bestMove;

    if (player === this.aiPlayer) {
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
}

const game = document.querySelector('.tic-tac-toe');
const btnsMenu = {
  selectorNewGame: '.js-tic-tac-toe__new-game',
  selectorRestart: '.js-tic-tac-toe__restart',
  selectorEasyLevel: '.js-tic-tac-toe__easy-level',
  selectorHardLevel: '.js-tic-tac-toe__hard-level'
}

const activeMenuBtn = {
  selectorBtnMenu: '.js-btns-menu__icon',
  selectorListMenu: '.js-btns-menu__list'
}

if (game !== null) {
  new TicTacToe(btnsMenu, activeMenuBtn);
}
