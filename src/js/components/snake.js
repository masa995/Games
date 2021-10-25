const main = document.querySelector('.js-snake');
const restartBtnSnake = document.querySelector('.js-snake__restart');
const newGameBtnSnake = document.querySelector('.js-snake__new-game');
const easyLevelBtnSnake = document.querySelector('.js-snake__easy-level');
const hardLevelBtnSnake = document.querySelector('.js-snake__hard-level');
let score;
let widthCanvas;
let heightCanvas;

let widthGameCells;
let heightGameCells;

let rowGame;
let columGame;

let mapLevelSnake;

let keyDirection = null;
const cell = 25;
const indentCell = 2;

const pi = Math.PI;
let snakeScore = 0;

const animationSnake = {
  fps: 300,
  startTime: 0,
  currentTime: 0,
  time: 0,
  currentSecond: 0,
  speed: 0
}

const snake = {
  x: 0,
  y: cell * 3,
  dx: cell,
  dy: 0,
  tails: [{ x: 0, y: cell * 3 }],
  maxTails: 3
}

const berrySnake = {
  radiusBerry: cell / 3,
  x: 0,
  y: cell
}

const barrierSnake = {
  levelEasy: [],
  levelHard: []
}

if (main !== null) {
  const canvas = document.querySelector('.js-snake__game');
  const ctx = canvas.getContext('2d');
  score = document.querySelector('.js-snake__score-text');

  widthCanvas = main.clientWidth / 2;
  heightCanvas = main.clientHeight - 300;

  widthGameCells = roundCell(widthCanvas, cell);
  heightGameCells = roundCell(heightCanvas, cell);

  canvas.setAttribute('width', widthGameCells);
  canvas.setAttribute('height', heightGameCells);

  rowGame = widthGameCells / cell;
  columGame = heightGameCells / cell;

  barrierSnake.levelHard = [
    { x: 0, y: 0 },
    { x: 0, y: cell },
    { x: cell, y: 0 },
    { x: cell, y: cell },
    { x: 0, y: heightGameCells - cell },
    { x: 0, y: heightGameCells - cell * 2 },
    { x: cell, y: heightGameCells - cell },
    { x: cell, y: heightGameCells - cell * 2 },
    { x: widthGameCells - cell, y: heightGameCells - cell },
    { x: widthGameCells - cell, y: heightGameCells - cell * 2 },
    { x: widthGameCells - cell * 2, y: heightGameCells - cell },
    { x: widthGameCells - cell * 2, y: heightGameCells - cell * 2 },
    { x: widthGameCells - cell, y: 0 },
    { x: widthGameCells - cell * 2, y: 0 },
    { x: widthGameCells - cell, y: cell },
    { x: widthGameCells - cell * 2, y: cell }
  ]

  mapLevelSnake = barrierSnake.levelEasy;

  positionBerry();

  //animation
  requestAnimationFrame(gameLoopSnake);

  function gameLoopSnake() {
    requestAnimationFrame(gameLoopSnake);

    if (animationSnake.startTime === 0) {
      animationSnake.startTime = new Date().getTime();
    }

    animationSnake.currentTime = new Date().getTime();
    animationSnake.time = animationSnake.currentTime - animationSnake.startTime;
    animationSnake.currentSecond = Math.floor(animationSnake.time / (animationSnake.fps - animationSnake.speed));

    if (animationSnake.currentSecond > 0) {
      animationSnake.startTime = 0;

      ctx.clearRect(0, 0, widthGameCells, heightGameCells);

      renderGameBoard(columGame, rowGame, cell, indentCell, ctx);
      drawBarrier(ctx, mapLevelSnake);
      drawSnake(ctx);
      drawBerry(ctx);
    }
  }

  newGameBtnSnake.addEventListener('click', () => {
    easyLevelBtnSnake.removeAttribute('disabled');
    hardLevelBtnSnake.removeAttribute('disabled');
    newGameBtnSnake.setAttribute('disabled', 'disabled');
    restartBtnSnake.setAttribute('disabled', 'disabled');

    document.addEventListener('keydown', controlArrows);
  })

  easyLevelBtnSnake.addEventListener('click', () => {
    checkLevelSnake(barrierSnake.levelEasy);
  })

  hardLevelBtnSnake.addEventListener('click', () => {
    checkLevelSnake(barrierSnake.levelHard);
  })

  restartBtnSnake.addEventListener('click', () => {
    refreshSnakeGame();
    document.addEventListener('keydown', controlArrows);

  })
}

function renderGameBoard(colum, row, cell, indent, context) {
  for (let y = 0; y < colum; y++) {
    for (let x = 0; x < row; x++) {
      context.fillStyle = 'rgba(255, 255, 255, 0.4)';
      context.fillRect(x * cell, y * cell, cell - indent, cell - indent);
    }
  }
}

function drawBarrier(context, level) {
  level.forEach((el) => {
    context.fillStyle = '#333333';
    context.fillRect(el.x, el.y, cell - indentCell, cell - indentCell);
  });
}

function drawSnake(context) {
  snake.x = snake.x + snake.dx;
  snake.y = snake.y + snake.dy;

  collisionBorder(widthGameCells, heightGameCells, cell);

  snake.tails.unshift({ x: snake.x, y: snake.y });

  if (snake.tails.length > snake.maxTails) {
    snake.tails.pop();
  }

  snake.tails.forEach((el, index) => {
    if (index == 0) {
      context.fillStyle = '#333333';
    } else {
      context.fillStyle = '#555555';
    }
    context.fillRect(el.x, el.y, cell - indentCell, cell - indentCell);

    crachSnake();
    eatSnake();
  })
}

function crachSnake() {
  snake.tails.forEach((el, index) => {
    for (let i = index + 1; i < snake.tails.length; i++) {
      if (el.x === snake.tails[i].x && el.y === snake.tails[i].y) {
        refreshSnakeGame();
        document.removeEventListener('keydown', controlArrows);
      }
    }
  });


  mapLevelSnake.forEach((el) => {
    if (el.x === snake.tails[0].x && el.y === snake.tails[0].y) {
      refreshSnakeGame();
      document.removeEventListener('keydown', controlArrows);
    }
  });
}

function eatSnake() {
  snake.tails.forEach((el) => {
    if (el.x === berrySnake.x && el.y === berrySnake.y) {
      snake.maxTails++;
      animationSnake.speed = animationSnake.speed + 0.5;
      snakeScore++;

      positionBerry();
      drawScoreSnake(snakeScore);
    }
  });
}

function collisionBorder(width, height, cell) {
  if (snake.x < 0) {
    snake.x = width - cell;
  }
  if (snake.x >= width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = height - cell;
  }

  if (snake.y >= height) {
    snake.y = 0;
  }
}

function drawBerry(context) {
  context.beginPath();
  context.fillStyle = "#9f5e7e";
  context.arc(berrySnake.x + (cell / 2), berrySnake.y + (cell / 2), berrySnake.radiusBerry, 0, pi * 2, false);
  context.fill();
  context.closePath();
}

function coordinatsBerry() {
  berrySnake.x = getRandomInt(0, rowGame) * cell;
  berrySnake.y = getRandomInt(0, columGame) * cell;
}

function positionBerry() {
  coordinatsBerry();
  for (let elem of snake.tails) {
    if (elem.x === berrySnake.x && elem.y === berrySnake.y) {
      coordinatsBerry();
    }
  }

  for (let elem of mapLevelSnake) {
    if (elem.x === berrySnake.x && elem.y === berrySnake.y) {
      coordinatsBerry();
    }
  }
}

function drawScoreSnake(num) {
  return score.textContent = `Счет: ${num}`;
}

function checkLevelSnake(level) {
  mapLevelSnake = level;
  refreshSnakeGame()
  restartBtnSnake.removeAttribute('disabled');
  newGameBtnSnake.removeAttribute('disabled');
  easyLevelBtnSnake.setAttribute('disabled', 'disabled');
  hardLevelBtnSnake.setAttribute('disabled', 'disabled');
}

function refreshSnakeGame() {
  snake.x = 0;
  snake.y = cell * 3;
  snake.dx = cell;
  snake.dy = 0;
  snake.tails = [{ x: 0, y: cell * 3 }];
  snake.maxTails = 3;

  animationSnake.fps = 300;
  animationSnake.startTime = 0;

  snakeScore = 0;

  drawScoreSnake(snakeScore);
  positionBerry();
}

function roundCell(num, cell) {
  return Math.round(num / cell) * cell;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function controlArrows(e) {
  if (e.code === 'ArrowUp') {
    if (keyDirection === null || keyDirection !== 'down') {
      snake.dx = 0;
      snake.dy = -cell;
      keyDirection = 'up';
    }
  }

  if (e.code === 'ArrowDown') {
    if (keyDirection === null || keyDirection !== 'up') {
      snake.dx = 0;
      snake.dy = cell;
      keyDirection = 'down';
    }
  }

  if (e.code === 'ArrowLeft') {
    if (keyDirection === null || keyDirection !== 'right') {
      snake.dx = -cell;
      snake.dy = 0;
      keyDirection = 'left';
    }
  }

  if (e.code === 'ArrowRight') {
    if (keyDirection === null || keyDirection !== 'left') {
      snake.dx = cell;
      snake.dy = 0;
      keyDirection = 'right';
    }
  }
}
