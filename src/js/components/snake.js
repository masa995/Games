'use strict'
class Canvas {
  constructor() {
    this.canvas = this.createCanvas();
    this.context = this.canvas.getContext('2d');
  }

  createCanvas() {
    const game = document.querySelector('.js-snake');
    const canvas = document.createElement('canvas');
    canvas.classList.add('snake__game', 'js-snake__game');
    game.appendChild(canvas);
    return canvas;
  }
}

class Board {
  constructor(canvas, cell) {
    this.mainEl = document.querySelector('.js-snake');
    this.scoreEl = this.createScore();

    this.cell = cell;
    this.indentCell = 2;
    this.score = 0;
    this.context = canvas.context;
    this.canvas = canvas.canvas;

    this.widthCanvas = this.mainEl.clientWidth / 2;
    this.heightCanvas = this.mainEl.clientHeight - 300;

    this.widthGame = this.roundCell(this.widthCanvas, this.cell);
    this.heightGame = this.roundCell(this.heightCanvas, this.cell);
    this.canvas.setAttribute('width', this.widthGame);
    this.canvas.setAttribute('height', this.heightGame);

    this.rowGame = this.widthGame / this.cell;
    this.columnGame = this.heightGame / this.cell;

    this.barrier = {
      levelEasy: [],
      levelHard: [
        { x: 0, y: 0 },
        { x: 0, y: this.cell },
        { x: this.cell, y: 0 },
        { x: this.cell, y: this.cell },
        { x: 0, y: this.heightGame - this.cell },
        { x: 0, y: this.heightGame - this.cell * 2 },
        { x: this.cell, y: this.heightGame - this.cell },
        { x: this.cell, y: this.heightGame - this.cell * 2 },
        { x: this.widthGame - this.cell, y: this.heightGame - this.cell },
        { x: this.widthGame - this.cell, y: this.heightGame - this.cell * 2 },
        { x: this.widthGame - this.cell * 2, y: this.heightGame - this.cell },
        { x: this.widthGame - this.cell * 2, y: this.heightGame - this.cell * 2 },
        { x: this.widthGame - this.cell, y: 0 },
        { x: this.widthGame - this.cell * 2, y: 0 },
        { x: this.widthGame - this.cell, y: this.cell },
        { x: this.widthGame - this.cell * 2, y: this.cell }
      ]
    }
    this.barrierMap = this.barrier.levelEasy;

    this.drawGameBoard();
  }

  createScore() {
    const game = document.querySelector('.js-snake')
    const score = document.createElement('p');
    score.classList.add('snake__score-text', 'js-snake__score-text');
    game.appendChild(score);
    return score;
  }

  updateMap(level) {
    this.barrierMap = level;
  }

  roundCell(num, cell) {
    return Math.round(num / cell) * cell;
  }

  drawGameBoard() {
    for (let y = 0; y < this.columnGame; y++) {
      for (let x = 0; x < this.rowGame; x++) {
        this.context.fillStyle = 'rgba(255, 255, 255, 0.4)';
        this.context.fillRect(x * this.cell, y * this.cell, this.cell - this.indentCell, this.cell - this.indentCell);
      }
    }

    this.drawScore(this.score);
    this.drawBarrier();
  }

  drawBarrier() {
    this.barrierMap.forEach((el) => {
      this.context.fillStyle = '#333333';
      this.context.fillRect(el.x, el.y, this.cell - this.indentCell, this.cell - this.indentCell);
    });
  }

  drawScore() {
    return this.scoreEl.textContent = `Счет: ${this.score}`;
  }

  zeroScore() {
    this.score = 0;
    return this.scoreEl.textContent = `Счет: 0`;
  }

  updateScore(num) {
    this.score++;
    this.drawScore();
  }
}

class Berry {
  constructor(canvas, board) {
    this.context = canvas.context;
    this.cell = board.cell;
    this.radius = this.cell / 3;
    this.rowGame = board.rowGame;
    this.columnGame = board.columnGame;
    this.pi = Math.PI;
    this.x;
    this.y;
  }

  draw() {
    this.context.beginPath();
    this.context.fillStyle = "#a66210";
    this.context.arc(this.x + (this.cell / 2), this.y + (this.cell / 2), this.radius, 0, this.pi * 2);
    this.context.fill();
    this.context.closePath();
  }

  coordinats() {
    this.x = getRandomInt(0, this.rowGame) * this.cell;
    this.y = getRandomInt(0, this.columnGame) * this.cell;
  }

  newPosition(snakeTail, barrierMap) {
    this.coordinats();

    snakeTail.forEach((elem) => {
      if (elem.x === this.x && elem.y === this.y) {
        this.coordinats();
      }
    });

    if (barrierMap.length > 0) {
      barrierMap.forEach((elem) => {
        if (elem.x === this.x && elem.y === this.y) {
          this.coordinats();
        }
      });
    }
  }
}

class Snake {
  constructor(canvas, board, controlScreenKey) {
    this.context = canvas.context;
    this.cell = board.cell;
    this.indentCell = board.indentCell;
    this.heightGame = board.heightGame;
    this.x = 0;
    this.y = this.cell * 3;
    this.dx = this.cell
    this.dy = 0;
    this.tails = [{ x: 0, y: this.cell * 3 }];
    this.maxTails = 3;
    this.keyDirection = null;
    this.controlScreenKey = controlScreenKey;

    this.createScreenBtns();
    this.activeControlScreen(this.activeControlScreen);
    this.handleControl = this.handleControl.bind(this);
    this.handleControlScreen = this.handleControlScreen.bind(this);
  }

  handleControl(event) {
    if (event.code === 'ArrowUp') {
      if (this.keyDirection === null || this.keyDirection !== 'down') {
        this.dx = 0;
        this.dy = -this.cell;
        this.keyDirection = 'up';
      }
    }

    if (event.code === 'ArrowDown') {
      if (this.keyDirection === null || this.keyDirection !== 'up') {
        this.dx = 0;
        this.dy = this.cell;
        this.keyDirection = 'down';
      }
    }

    if (event.code === 'ArrowLeft') {
      if (this.keyDirection === null || this.keyDirection !== 'right') {
        this.dx = -this.cell;
        this.dy = 0;
        this.keyDirection = 'left';
      }
    }

    if (event.code === 'ArrowRight') {
      if (this.keyDirection === null || this.keyDirection !== 'left') {
        this.dx = this.cell;
        this.dy = 0;
        this.keyDirection = 'right';
      }
    }
  }

  handleControlScreen(event) {
    if (event.target.classList.contains('js-btn__up')) {
      if (this.keyDirection === null || this.keyDirection !== 'down') {
        this.dx = 0;
        this.dy = -this.cell;
        this.keyDirection = 'up';
      }
    }

    if (event.target.classList.contains('js-btn__down')) {
      if (this.keyDirection === null || this.keyDirection !== 'up') {
        this.dx = 0;
        this.dy = this.cell;
        this.keyDirection = 'down';
      }
    }

    if (event.target.classList.contains('js-btn__left')) {
      if (this.keyDirection === null || this.keyDirection !== 'right') {
        this.dx = -this.cell;
        this.dy = 0;
        this.keyDirection = 'left';
      }
    }

    if (event.target.classList.contains('js-btn__right')) {
      if (this.keyDirection === null || this.keyDirection !== 'left') {
        this.dx = this.cell;
        this.dy = 0;
        this.keyDirection = 'right';
      }
    }
  }

  createScreenBtns() {
    const mainEl = document.querySelector('.js-snake');
    mainEl.insertAdjacentHTML(
      'beforeend',
      `<div class="snake__box-left snake-box js-snake-box">
        <button class="snake__control-btn js-btn__left">&lArr;</button>
        <button class="snake__control-btn js-btn__right">&rArr;</button>
      </div>

      <div class="snake__box-right snake-box js-snake-box">
        <button class="snake__control-btn js-btn__up">&uArr;</button>
        <button class="snake__control-btn js-btn__down">&dArr;</button>
      </div>`);
  }

  activeControlScreen(controlScreenKey) {
    if (this.controlScreenKey) {
      const boxControlEls = document.querySelectorAll('.snake-box');
      boxControlEls.forEach((el) => {
        el.classList.add('active');
      });
    }
  }

  update(berry, board, animationStart, animationFps, animationSpeed) {
    this.x += this.dx;
    this.y += this.dy;

    //Collision Border
    if (this.x < 0) {
      this.x = board.widthGame - this.cell;
    } else if (this.x >= board.widthGame) {
      this.x = 0;
    }

    if (this.y < 0) {
      this.y = board.heightGame - this.cell;
    } else if (this.y >= board.heightGame) {
      this.y = 0;
    }

    this.tails.unshift({ x: this.x, y: this.y });

    if (this.tails.length > this.maxTails) {
      this.tails.pop();
    }

    this.crachSnake(berry, board, animationStart, animationFps);
    this.eatSnake(berry, board, animationSpeed);
  }

  crachSnake(berry, board, animationStart, animationFps) {
    this.tails.forEach((el, index) => {
      for (let i = index + 1; i < this.tails.length; i++) {
        if (el.x === this.tails[i].x && el.y === this.tails[i].y) {
          this.deth(animationStart, animationFps);
          board.zeroScore();
          berry.newPosition(this.tails, board.barrierMap)
        }
      }
    });

    board.barrierMap.forEach((el) => {
      if (el.x === this.tails[0].x && el.y === this.tails[0].y) {
        this.deth(animationStart, animationFps);
        board.zeroScore();
        berry.newPosition(this.tails, board.barrierMap);
      }
    });
  }

  eatSnake(berry, board, animationSpeed) {
    this.tails.forEach((el) => {
      if (el.x === berry.x && el.y === berry.y) {
        this.maxTails++;
        board.updateScore();
        berry.newPosition(this.tails, board.barrierMap);

        animationSpeed = animationSpeed + 0.7;
      }
    });
  }

  draw() {
    this.tails.forEach((el, index) => {
      if (index == 0) {
        this.context.fillStyle = '#333333';
      } else {
        this.context.fillStyle = '#555555';
      }

      this.context.fillRect(el.x, el.y, this.cell - this.indentCell, this.cell - this.indentCell);
    });
  }

  deth(animationStart, animationFps) {
    this.x = 0;
    this.y = this.cell * 3;
    this.dx = this.cell;
    this.dy = 0;
    this.tails = [{ x: 0, y: this.cell * 3 }];
    this.maxTails = 3;
    this.keyDirection = null;
    animationStart = 0;
    animationFps = 300;

    document.removeEventListener('click', this.handleControlScreen);
    document.removeEventListener('keydown', this.handleControl);
  }
}

class Game {
  constructor(btnsMenu, activeMenuBtn, cell, controlScreenKey = false) {
    this.newGameBtn = document.querySelector(btnsMenu.selectorNewGame);
    this.restartBtn = document.querySelector(btnsMenu.selectorRestart);
    this.easyLevelBtn = document.querySelector(btnsMenu.selectorEasyLevel);
    this.hardLevelBtn = document.querySelector(btnsMenu.selectorHardLevel);
    this.btnMenu = document.querySelector(activeMenuBtn.selectorBtnMenu);
    this.listMenu = document.querySelector(activeMenuBtn.selectorListMenu);
    this.fps = 300;
    this.startTime = 0;
    this.currentTime = 0;
    this.time = 0;
    this.currentSecond = 0
    this.speed = 0;
    this.cell = cell;
    this.controlScreenKey = controlScreenKey;

    this.canvas = new Canvas();
    this.board = new Board(this.canvas, this.cell);
    this.berry = new Berry(this.canvas, this.board);
    this.snake = new Snake(this.canvas, this.board, this.controlScreenKey);

    this.gameLoopSnake = this.gameLoopSnake.bind(this);
    this.gameLoopSnake();
    this.btns();

    this.berry.newPosition(this.snake.tails, this.board.barrierMap);
  }

  btns() {
    this.newGameBtn.addEventListener('click', () => {
      this.easyLevelBtn.removeAttribute('disabled');
      this.hardLevelBtn.removeAttribute('disabled');
      this.newGameBtn.setAttribute('disabled', 'disabled');
      this.restartBtn.setAttribute('disabled', 'disabled');
    });

    this.easyLevelBtn.addEventListener('click', () => {
      this.checkLevel(this.board.barrier.levelEasy);

      if (this.controlScreenKey) {
        document.addEventListener('click', this.snake.handleControlScreen);
      } else {
        document.addEventListener('keydown', this.snake.handleControl);
      }
      this.activeMenu();
    });

    this.hardLevelBtn.addEventListener('click', () => {
      this.checkLevel(this.board.barrier.levelHard);

      if (this.controlScreenKey) {
        document.addEventListener('click', this.snake.handleControlScreen);
      } else {
        document.addEventListener('keydown', this.snake.handleControl);
      }
      this.activeMenu();
    });

    this.restartBtn.addEventListener('click', () => {
      //Refresh Game
      this.snake.deth(this.startTime, this.fps);
      this.board.zeroScore();
      this.berry.newPosition(this.snake.tails, this.board.barrierMap)

      if (this.controlScreenKey) {
        document.addEventListener('click', this.snake.handleControlScreen);
      } else {
        document.addEventListener('keydown', this.snake.handleControl);
      }
      this.activeMenu();
    });
  }

  activeMenu() {
    btnMenu.classList.toggle('active');
    listMenu.classList.toggle('active');
  }

  checkLevel(level) {
    this.board.updateMap(level);
    this.snake.deth(this.startTime, this.fps);
    this.board.zeroScore();
    this.berry.newPosition(this.snake.tails, this.board.barrierMap)

    this.restartBtn.removeAttribute('disabled');
    this.newGameBtn.removeAttribute('disabled');
    this.easyLevelBtn.setAttribute('disabled', 'disabled');
    this.hardLevelBtn.setAttribute('disabled', 'disabled');
  }



  gameLoopSnake() {
    requestAnimationFrame(this.gameLoopSnake);

    if (this.startTime === 0) {
      this.startTime = new Date().getTime();
    }

    this.currentTime = new Date().getTime();
    this.time = this.currentTime - this.startTime;
    this.currentSecond = Math.floor(this.time / (this.fps - this.speed));

    if (this.currentSecond > 0) {
      this.startTime = 0;

      this.canvas.context.clearRect(0, 0, this.board.widthGame, this.board.heightGame);

      this.board.drawGameBoard();
      this.berry.draw();
      this.snake.draw();
      this.snake.update(this.berry, this.board, this.startTime, this.fps, this.speed);
    }
  }
}

const game = document.querySelector('.js-snake');
const btnsMenu = {
  selectorNewGame: '.js-snake__new-game',
  selectorRestart: '.js-snake__restart',
  selectorEasyLevel: '.js-snake__easy-level',
  selectorHardLevel: '.js-snake__hard-level'
}

const activeMenuBtn = {
  selectorBtnMenu: '.js-btns-menu__icon',
  selectorListMenu: '.js-btns-menu__list'
}

if (game !== null) {
  if (window.matchMedia('(min-width: 1100px)').matches && isTouchDevice()) {
    new Game(btnsMenu, activeMenuBtn, 25, true);
  } else if (window.matchMedia('(max-width: 1100px)').matches) {
    new Game(btnsMenu, activeMenuBtn, 20, true);
  } else if (window.matchMedia('(max-width: 1100px)').matches) {
    new Game(btnsMenu, activeMenuBtn, 15, true);
  } else {
    new Game(btnsMenu, activeMenuBtn, 25, false);
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}