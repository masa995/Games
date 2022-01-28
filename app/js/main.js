"use strict";var dataRules=[{textRules:"<p>Крестки-нолики</p>\n                <p>Игроки по очереди ставят на свободные клетки поля символы (один всегда крестики, другой всегда нолики). Первый, выстроивший в ряд 3 символа по вертикали, горизонтали или диагонали, выигрывает. Первый ход делает игрок, ставящий крестики.</p>"},{textRules:"<p>Змейка</p>\n                <p>Цель игры заключается в том, чтобы змейка съела как можно больше ягод. После каждой съеденной ягоды количество очков и размер змейки увеличивается.</p>\n                <p>Если змейка врежется в саму себя, то игра закончиться. На сложном уровне добавляются препятствия (серые кубы), с которыми змейка, также не должна сталкиваться.</p>\n                <p>Управление осуществляется стрелочками на клавиатуре.</p>"}],popup=document.querySelector(".js-popup"),popupBody=document.querySelector(".js-popup__body"),popupClose=document.querySelector(".js-popup__close-btn"),popupText=document.querySelector(".js-popup__text"),popupOpenBtns=document.querySelectorAll(".js-btn-ruls");function mapRuls(e){return{ticTacToe:0,snake:1}[e]}function _createForOfIteratorHelper(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,l=!0,o=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return l=e.done,e},e:function(e){o=!0,i=e},f:function(){try{l||null==n.return||n.return()}finally{if(o)throw i}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}null!==popup&&(popupClose.addEventListener("click",(function(e){popup.classList.remove("active")})),popupBody.addEventListener("click",(function(e){e.target.closest(".js-popup__content")||popup.classList.remove("active")})),popupOpenBtns.forEach((function(e){e.addEventListener("click",(function(e){popup.classList.add("active");var t=mapRuls(e.currentTarget.getAttribute("data-ruls")),n=dataRules[t].textRules;popupText.innerHTML="".concat(n)}))})));var score,widthCanvas,heightCanvas,widthGameCells,heightGameCells,rowGame,columGame,mapLevelSnake,main=document.querySelector(".js-snake"),restartBtnSnake=document.querySelector(".js-snake__restart"),newGameBtnSnake=document.querySelector(".js-snake__new-game"),easyLevelBtnSnake=document.querySelector(".js-snake__easy-level"),hardLevelBtnSnake=document.querySelector(".js-snake__hard-level"),keyDirection=null,cell=25,indentCell=2,pi=Math.PI,snakeScore=0,animationSnake={fps:300,startTime:0,currentTime:0,time:0,currentSecond:0,speed:0},snake={x:0,y:3*cell,dx:cell,dy:0,tails:[{x:0,y:3*cell}],maxTails:3},berrySnake={radiusBerry:cell/3,x:0,y:cell},barrierSnake={levelEasy:[],levelHard:[]};if(null!==main){var gameLoopSnake=function e(){requestAnimationFrame(e),0===animationSnake.startTime&&(animationSnake.startTime=(new Date).getTime()),animationSnake.currentTime=(new Date).getTime(),animationSnake.time=animationSnake.currentTime-animationSnake.startTime,animationSnake.currentSecond=Math.floor(animationSnake.time/(animationSnake.fps-animationSnake.speed)),animationSnake.currentSecond>0&&(animationSnake.startTime=0,ctx.clearRect(0,0,widthGameCells,heightGameCells),renderGameBoard(columGame,rowGame,cell,indentCell,ctx),drawBarrier(ctx,mapLevelSnake),drawSnake(ctx),drawBerry(ctx))},canvas=document.querySelector(".js-snake__game"),ctx=canvas.getContext("2d");score=document.querySelector(".js-snake__score-text"),widthCanvas=main.clientWidth/2,heightCanvas=main.clientHeight-300,widthGameCells=roundCell(widthCanvas,cell),heightGameCells=roundCell(heightCanvas,cell),canvas.setAttribute("width",widthGameCells),canvas.setAttribute("height",heightGameCells),rowGame=widthGameCells/cell,columGame=heightGameCells/cell,barrierSnake.levelHard=[{x:0,y:0},{x:0,y:cell},{x:cell,y:0},{x:cell,y:cell},{x:0,y:heightGameCells-cell},{x:0,y:heightGameCells-2*cell},{x:cell,y:heightGameCells-cell},{x:cell,y:heightGameCells-2*cell},{x:widthGameCells-cell,y:heightGameCells-cell},{x:widthGameCells-cell,y:heightGameCells-2*cell},{x:widthGameCells-2*cell,y:heightGameCells-cell},{x:widthGameCells-2*cell,y:heightGameCells-2*cell},{x:widthGameCells-cell,y:0},{x:widthGameCells-2*cell,y:0},{x:widthGameCells-cell,y:cell},{x:widthGameCells-2*cell,y:cell}],mapLevelSnake=barrierSnake.levelEasy,positionBerry(),requestAnimationFrame(gameLoopSnake),newGameBtnSnake.addEventListener("click",(function(){easyLevelBtnSnake.removeAttribute("disabled"),hardLevelBtnSnake.removeAttribute("disabled"),newGameBtnSnake.setAttribute("disabled","disabled"),restartBtnSnake.setAttribute("disabled","disabled"),document.addEventListener("keydown",controlArrows)})),easyLevelBtnSnake.addEventListener("click",(function(){checkLevelSnake(barrierSnake.levelEasy)})),hardLevelBtnSnake.addEventListener("click",(function(){checkLevelSnake(barrierSnake.levelHard)})),restartBtnSnake.addEventListener("click",(function(){refreshSnakeGame(),document.addEventListener("keydown",controlArrows)}))}function renderGameBoard(e,t,n,r,a){for(var i=0;i<e;i++)for(var l=0;l<t;l++)a.fillStyle="rgba(255, 255, 255, 0.4)",a.fillRect(l*n,i*n,n-r,n-r)}function drawBarrier(e,t){t.forEach((function(t){e.fillStyle="#333333",e.fillRect(t.x,t.y,cell-indentCell,cell-indentCell)}))}function drawSnake(e){snake.x=snake.x+snake.dx,snake.y=snake.y+snake.dy,collisionBorder(widthGameCells,heightGameCells,cell),snake.tails.unshift({x:snake.x,y:snake.y}),snake.tails.length>snake.maxTails&&snake.tails.pop(),snake.tails.forEach((function(t,n){e.fillStyle=0==n?"#333333":"#555555",e.fillRect(t.x,t.y,cell-indentCell,cell-indentCell),crachSnake(),eatSnake()}))}function crachSnake(){snake.tails.forEach((function(e,t){for(var n=t+1;n<snake.tails.length;n++)e.x===snake.tails[n].x&&e.y===snake.tails[n].y&&(refreshSnakeGame(),document.removeEventListener("keydown",controlArrows))})),mapLevelSnake.forEach((function(e){e.x===snake.tails[0].x&&e.y===snake.tails[0].y&&(refreshSnakeGame(),document.removeEventListener("keydown",controlArrows))}))}function eatSnake(){snake.tails.forEach((function(e){e.x===berrySnake.x&&e.y===berrySnake.y&&(snake.maxTails++,animationSnake.speed=animationSnake.speed+.5,snakeScore++,positionBerry(),drawScoreSnake(snakeScore))}))}function collisionBorder(e,t,n){snake.x<0&&(snake.x=e-n),snake.x>=e&&(snake.x=0),snake.y<0&&(snake.y=t-n),snake.y>=t&&(snake.y=0)}function drawBerry(e){e.beginPath(),e.fillStyle="#9f5e7e",e.arc(berrySnake.x+cell/2,berrySnake.y+cell/2,berrySnake.radiusBerry,0,2*pi,!1),e.fill(),e.closePath()}function coordinatsBerry(){berrySnake.x=getRandomInt(0,rowGame)*cell,berrySnake.y=getRandomInt(0,columGame)*cell}function positionBerry(){coordinatsBerry();var e,t=_createForOfIteratorHelper(snake.tails);try{for(t.s();!(e=t.n()).done;){var n=e.value;n.x===berrySnake.x&&n.y===berrySnake.y&&coordinatsBerry()}}catch(e){t.e(e)}finally{t.f()}var r,a=_createForOfIteratorHelper(mapLevelSnake);try{for(a.s();!(r=a.n()).done;){var i=r.value;i.x===berrySnake.x&&i.y===berrySnake.y&&coordinatsBerry()}}catch(e){a.e(e)}finally{a.f()}}function drawScoreSnake(e){return score.textContent="Счет: ".concat(e)}function checkLevelSnake(e){mapLevelSnake=e,refreshSnakeGame(),restartBtnSnake.removeAttribute("disabled"),newGameBtnSnake.removeAttribute("disabled"),easyLevelBtnSnake.setAttribute("disabled","disabled"),hardLevelBtnSnake.setAttribute("disabled","disabled")}function refreshSnakeGame(){snake.x=0,snake.y=3*cell,snake.dx=cell,snake.dy=0,snake.tails=[{x:0,y:3*cell}],snake.maxTails=3,animationSnake.fps=300,animationSnake.startTime=0,drawScoreSnake(snakeScore=0),positionBerry()}function roundCell(e,t){return Math.round(e/t)*t}function getRandomInt(e,t){return Math.floor(Math.random()*(t-e)+e)}function controlArrows(e){"ArrowUp"===e.code&&(null!==keyDirection&&"down"===keyDirection||(snake.dx=0,snake.dy=-cell,keyDirection="up")),"ArrowDown"===e.code&&(null!==keyDirection&&"up"===keyDirection||(snake.dx=0,snake.dy=cell,keyDirection="down")),"ArrowLeft"===e.code&&(null!==keyDirection&&"right"===keyDirection||(snake.dx=-cell,snake.dy=0,keyDirection="left")),"ArrowRight"===e.code&&(null!==keyDirection&&"left"===keyDirection||(snake.dx=cell,snake.dy=0,keyDirection="right"))}function _createForOfIteratorHelper(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,l=!0,o=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return l=e.done,e},e:function(e){o=!0,i=e},f:function(){try{l||null==n.return||n.return()}finally{if(o)throw i}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}var TicTacToe=function(){function e(t,n,r,a,i,l){var o=this;_classCallCheck(this,e),this.gameBoard=document.querySelector(t),this.winText=document.querySelector(n),this.newGameBtn=document.querySelector(r),this.restartBtn=document.querySelector(a),this.easyLevelBtn=document.querySelector(i),this.hardLevelBtn=document.querySelector(l),this.origBoard,this.cells,this.keyLevel="easy",this.huPlayer="X",this.aiPlayer="O",this.huSymbol='<svg class="cross">\n    <line class="cross-first" x1="10" y1="10" x2="70" y2="70" stroke="#333" stroke-width="10" stroke-linecap="round" />\n    <line class="cross-second" x1="70" y1="10" x2="10" y2="70" stroke="#333" stroke-width="10" stroke-linecap="round" />\n    </svg>',this.aiSymbol='<svg class="circle">\n    <circle r="30" cx="40" cy="40" stroke="#c15746" stroke-width="10" fill="none" stroke-linecap="round" />\n    </svg>',this.winCombos=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]],this.handleTurnClick=function(e){"number"==typeof o.origBoard[e.target.id]&&(o.turn(e.target.id,o.huPlayer,o.huSymbol),o.checkTie()||o.checkWin(o.origBoard,o.huPlayer)||o.turn(o.BestSport(),o.aiPlayer,o.aiSymbol))},this.init()}return _createClass(e,[{key:"whoWinner",value:function(e){this.winText.innerText=e}},{key:"init",value:function(){for(var e=this,t=0;t<9;t++){var n=document.createElement("div");n.setAttribute("id",t),n.classList.add("tic-tac-toe__cell"),this.gameBoard.appendChild(n)}this.cells=document.querySelectorAll(".tic-tac-toe__cell"),this.newGameBtn.addEventListener("click",(function(){e.easyLevelBtn.removeAttribute("disabled"),e.hardLevelBtn.removeAttribute("disabled"),e.newGameBtn.setAttribute("disabled","disabled"),e.restartBtn.setAttribute("disabled","disabled")})),this.easyLevelBtn.addEventListener("click",(function(){e.checkLevel("easy")})),this.hardLevelBtn.addEventListener("click",(function(){e.checkLevel("hard")})),this.restartBtn.addEventListener("click",(function(){e.start()}))}},{key:"checkLevel",value:function(e){this.keyLevel=e,this.start(),this.restartBtn.removeAttribute("disabled"),this.newGameBtn.removeAttribute("disabled"),this.easyLevelBtn.setAttribute("disabled","disabled"),this.hardLevelBtn.setAttribute("disabled","disabled")}},{key:"start",value:function(){this.origBoard=[0,1,2,3,4,5,6,7,8];for(var e=0;e<this.cells.length;e++)this.cells[e].innerHTML="",this.cells[e].classList.add("pointer"),this.cells[e].addEventListener("click",this.handleTurnClick),this.winText.innerText=""}},{key:"turn",value:function(e,t,n){this.origBoard[e]=t,document.getElementById(e).innerHTML=n,this.cells[e].removeEventListener("click",this.handleTurnClick),this.cells[e].classList.remove("pointer"),this.checkWin(this.origBoard,t)&&this.gameOver(t)}},{key:"checkWin",value:function(e,t){var n,r=this.playerMoves(e,t),a=_createForOfIteratorHelper(this.winCombos);try{for(a.s();!(n=a.n()).done;){if(n.value.every((function(e){return-1!==r.indexOf(e)})))return!0}}catch(e){a.e(e)}finally{a.f()}return!1}},{key:"checkTie",value:function(){var e=this;if(0==this.emptySquares().length){for(var t=0;t<this.cells.length;t++)this.cells[t].removeEventListener("click",this.handleTurnClick);return setTimeout((function(){return e.whoWinner("Ничья")}),1200),!0}return!1}},{key:"gameOver",value:function(e){for(var t=this,n=0;n<this.cells.length;n++)this.cells[n].removeEventListener("click",this.handleTurnClick),this.cells[n].classList.remove("pointer");setTimeout((function(){return t.whoWinner(e===t.huPlayer?"Вы победили":"Вы проиграли")}),1200)}},{key:"emptySquares",value:function(){return this.origBoard.filter((function(e){return"number"==typeof e}))}},{key:"playerMoves",value:function(e,t){for(var n=[],r=0;r<e.length;r++){e[r]===t&&(n=n.concat(r))}return n}},{key:"BestSport",value:function(){return"easy"===this.keyLevel?this.BestSportEasy():"hard"===this.keyLevel?this.BestSportHard():void 0}},{key:"BestSportEasy",value:function(){var e,t=this.emptySquares(),n=this.playerMoves(this.origBoard,this.huPlayer),r=_createForOfIteratorHelper(this.winCombos);try{for(r.s();!(e=r.n()).done;){var a=e.value;if(n.includes(a[0])&&n.includes(a[1])){if(t.includes(a[2]))return a[2]}else if(n.includes(a[0])&&n.includes(a[2])){if(t.includes(a[3]))return a[1]}else if(n.includes(a[1])&&n.includes(a[2])&&t.includes(a[0]))return a[0]}}catch(e){r.e(e)}finally{r.f()}return t[Math.floor(Math.random()*t.length)]}},{key:"BestSportHard",value:function(){return this.minimax(this.origBoard,this.aiPlayer).index}},{key:"minimax",value:function(e,t){var n=this.emptySquares();if(this.checkWin(e,this.huPlayer))return{score:-10};if(this.checkWin(e,this.aiPlayer))return{score:10};if(0===n.length)return{score:0};for(var r,a=[],i=0;i<n.length;i++){var l={};if(l.index=e[n[i]],e[n[i]]=t,t==this.aiPlayer){var o=this.minimax(e,this.huPlayer);l.score=o.score}else{var s=this.minimax(e,this.aiPlayer);l.score=s.score}e[n[i]]=l.index,a.push(l)}if(t===this.aiPlayer)for(var c=-1/0,u=0;u<a.length;u++)a[u].score>c&&(c=a[u].score,r=u);else for(var d=1/0,h=0;h<a.length;h++)a[h].score<d&&(d=a[h].score,r=h);return a[r]}}]),e}(),game=document.querySelector(".tic-tac-toe");null!==game&&new TicTacToe(".js-tic-tac-toe__game",".js-tic-tac-toe__win-text",".js-tic-tac-toe__new-game",".js-tic-tac-toe__restart",".js-tic-tac-toe__easy-level",".js-tic-tac-toe__hard-level");
//# sourceMappingURL=main.js.map
