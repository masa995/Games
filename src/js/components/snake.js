const main = document.querySelector('.js-snake');
let widthCanvas;
let heightCanvas;
let widthGameCells;
let heightGameCells;
let keyDirection = null;
const cell = 25;
const indentCell = 2;

let startTime = 0;
let currentTime = 0;
let time = 0;
let currentSecond = 0;

const snake = {
  x: 0,
  y: cell,
  dx: cell,
  dy: 0,
  tails: [{ x: 0, y: cell }],
  maxTails: 3
}

if (main !== null) {
  const canvas = document.querySelector('.js-snake__game');
  const ctx = canvas.getContext('2d');

  widthCanvas = main.clientWidth / 2;
  heightCanvas = main.clientHeight - 200;

  widthGameCells = roundCell(widthCanvas, cell);
  heightGameCells = roundCell(heightCanvas, cell);

  canvas.setAttribute('width', widthGameCells);
  canvas.setAttribute('height', heightGameCells);

  const rowGame = widthGameCells / cell;
  const columGame = heightGameCells / cell;

  // console.log(widthGameCells + " - " + heightGameCells);
  // console.log(rowGame + " - " + columGame);

  //Animation
  requestAnimationFrame(gameLoop);

  function gameLoop() {
    requestAnimationFrame(gameLoop);

    if (startTime === 0) {
      startTime = new Date().getTime();
    }

    currentTime = new Date().getTime();
    time = currentTime - startTime;
    currentSecond = Math.floor(time / 500);

    if (currentSecond > 0) {
      startTime = 0;
      ctx.clearRect(0, 0, widthGameCells, heightGameCells);

      renderGameBoard(columGame, rowGame, cell, indentCell, ctx);
      drawSnake(ctx);
    }
  }
}

function renderGameBoard(colum, row, cell, indent, context) {
  for (let y = 0; y < colum; y++) {
    for (let x = 0; x < row; x++) {
      context.fillStyle = 'rgba(255, 255, 255, 0.4)';
      context.fillRect(x * cell, y * cell, cell - indent, cell - indent);
    }
  }
}

function drawSnake(context) {
  snake.x = snake.x + snake.dx;
  snake.y = snake.y + snake.dy;
  // console.log(snake.y + " " + "y" + " - " + snake.x + " " + "x");

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
  })
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

function roundCell(num, cell) {
  return Math.round(num / cell) * cell;
}

document.addEventListener('keydown', function (e) {
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
});
