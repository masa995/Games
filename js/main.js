"use strict";var dataRules=[{textRules:"<p>Крестки-нолики</p>\n                <p>Игроки по очереди ставят на свободные клетки поля символы (один всегда крестики, другой всегда нолики). Первый, выстроивший в ряд 3 символа по вертикали, горизонтали или диагонали, выигрывает. Первый ход делает игрок, ставящий крестики.</p>"},{textRules:"<p>Змейка</p>\n                <p>Цель игры заключается в том, чтобы змейка съела как можно больше ягод. После каждой съеденной ягоды количество очков и размер змейки увеличивается.</p>\n                <p>Если змейка врежется в саму себя, то игра закончиться. На сложном уровне добавляются препятствия (серые кубы), с которыми змейка, также не должна сталкиваться.</p>\n                <p>Управление осуществляется стрелочками на клавиатуре.</p>"}],popup=document.querySelector(".js-popup"),popupBody=document.querySelector(".js-popup__body"),popupClose=document.querySelector(".js-popup__close-btn"),popupText=document.querySelector(".js-popup__text"),popupOpenBtns=document.querySelectorAll(".js-btn-ruls");function mapRuls(e){return{ticTacToe:0,snake:1}[e]}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),e}null!==popup&&(popupClose.addEventListener("click",(function(e){popup.classList.remove("active")})),popupBody.addEventListener("click",(function(e){e.target.closest(".js-popup__content")||popup.classList.remove("active")})),popupOpenBtns.forEach((function(e){e.addEventListener("click",(function(e){popup.classList.add("active");var t=mapRuls(e.currentTarget.getAttribute("data-ruls")),i=dataRules[t].textRules;popupText.innerHTML="".concat(i)}))})));var Canvas=function(){function e(){_classCallCheck(this,e),this.canvas=this.createCanvas(),this.context=this.canvas.getContext("2d")}return _createClass(e,[{key:"createCanvas",value:function(){var e=document.querySelector(".js-snake"),t=document.createElement("canvas");return t.classList.add("snake__game","js-snake__game"),e.appendChild(t),t}}]),e}(),Board=function(){function e(t,i){_classCallCheck(this,e),this.mainEl=document.querySelector(".js-snake"),this.scoreEl=this.createScore(),this.cell=i,this.indentCell=2,this.score=0,this.context=t.context,this.canvas=t.canvas,this.widthCanvas=this.mainEl.clientWidth/2,this.heightCanvas=this.mainEl.clientHeight-300,this.widthGame=this.roundCell(this.widthCanvas,this.cell),this.heightGame=this.roundCell(this.heightCanvas,this.cell),this.canvas.setAttribute("width",this.widthGame),this.canvas.setAttribute("height",this.heightGame),this.rowGame=this.widthGame/this.cell,this.columnGame=this.heightGame/this.cell,this.barrier={levelEasy:[],levelHard:[{x:0,y:0},{x:0,y:this.cell},{x:this.cell,y:0},{x:this.cell,y:this.cell},{x:0,y:this.heightGame-this.cell},{x:0,y:this.heightGame-2*this.cell},{x:this.cell,y:this.heightGame-this.cell},{x:this.cell,y:this.heightGame-2*this.cell},{x:this.widthGame-this.cell,y:this.heightGame-this.cell},{x:this.widthGame-this.cell,y:this.heightGame-2*this.cell},{x:this.widthGame-2*this.cell,y:this.heightGame-this.cell},{x:this.widthGame-2*this.cell,y:this.heightGame-2*this.cell},{x:this.widthGame-this.cell,y:0},{x:this.widthGame-2*this.cell,y:0},{x:this.widthGame-this.cell,y:this.cell},{x:this.widthGame-2*this.cell,y:this.cell}]},this.barrierMap=this.barrier.levelEasy,this.drawGameBoard()}return _createClass(e,[{key:"createScore",value:function(){var e=document.querySelector(".js-snake"),t=document.createElement("p");return t.classList.add("snake__score-text","js-snake__score-text"),e.appendChild(t),t}},{key:"updateMap",value:function(e){this.barrierMap=e}},{key:"roundCell",value:function(e,t){return Math.round(e/t)*t}},{key:"drawGameBoard",value:function(){for(var e=0;e<this.columnGame;e++)for(var t=0;t<this.rowGame;t++)this.context.fillStyle="rgba(255, 255, 255, 0.4)",this.context.fillRect(t*this.cell,e*this.cell,this.cell-this.indentCell,this.cell-this.indentCell);this.drawScore(this.score),this.drawBarrier()}},{key:"drawBarrier",value:function(){var e=this;this.barrierMap.forEach((function(t){e.context.fillStyle="#333333",e.context.fillRect(t.x,t.y,e.cell-e.indentCell,e.cell-e.indentCell)}))}},{key:"drawScore",value:function(){return this.scoreEl.textContent="Счет: ".concat(this.score)}},{key:"zeroScore",value:function(){return this.score=0,this.scoreEl.textContent="Счет: 0"}},{key:"updateScore",value:function(e){this.score++,this.drawScore()}}]),e}(),Berry=function(){function e(t,i){_classCallCheck(this,e),this.context=t.context,this.cell=i.cell,this.radius=this.cell/3,this.rowGame=i.rowGame,this.columnGame=i.columnGame,this.pi=Math.PI,this.x,this.y}return _createClass(e,[{key:"draw",value:function(){this.context.beginPath(),this.context.fillStyle="#a66210",this.context.arc(this.x+this.cell/2,this.y+this.cell/2,this.radius,0,2*this.pi),this.context.fill(),this.context.closePath()}},{key:"coordinats",value:function(){this.x=getRandomInt(0,this.rowGame)*this.cell,this.y=getRandomInt(0,this.columnGame)*this.cell}},{key:"newPosition",value:function(e,t){var i=this;this.coordinats(),e.forEach((function(e){e.x===i.x&&e.y===i.y&&i.coordinats()})),t.length>0&&t.forEach((function(e){e.x===i.x&&e.y===i.y&&i.coordinats()}))}}]),e}(),Snake=function(){function e(t,i,n){_classCallCheck(this,e),this.context=t.context,this.cell=i.cell,this.indentCell=i.indentCell,this.heightGame=i.heightGame,this.x=0,this.y=3*this.cell,this.dx=this.cell,this.dy=0,this.tails=[{x:0,y:3*this.cell}],this.maxTails=3,this.keyDirection=null,this.controlScreenKey=n,this.createScreenBtns(),this.activeControlScreen(this.activeControlScreen),this.handleControl=this.handleControl.bind(this),this.handleControlScreen=this.handleControlScreen.bind(this)}return _createClass(e,[{key:"handleControl",value:function(e){"ArrowUp"===e.code&&(null!==this.keyDirection&&"down"===this.keyDirection||(this.dx=0,this.dy=-this.cell,this.keyDirection="up")),"ArrowDown"===e.code&&(null!==this.keyDirection&&"up"===this.keyDirection||(this.dx=0,this.dy=this.cell,this.keyDirection="down")),"ArrowLeft"===e.code&&(null!==this.keyDirection&&"right"===this.keyDirection||(this.dx=-this.cell,this.dy=0,this.keyDirection="left")),"ArrowRight"===e.code&&(null!==this.keyDirection&&"left"===this.keyDirection||(this.dx=this.cell,this.dy=0,this.keyDirection="right"))}},{key:"handleControlScreen",value:function(e){e.target.classList.contains("js-btn__up")&&(null!==this.keyDirection&&"down"===this.keyDirection||(this.dx=0,this.dy=-this.cell,this.keyDirection="up")),e.target.classList.contains("js-btn__down")&&(null!==this.keyDirection&&"up"===this.keyDirection||(this.dx=0,this.dy=this.cell,this.keyDirection="down")),e.target.classList.contains("js-btn__left")&&(null!==this.keyDirection&&"right"===this.keyDirection||(this.dx=-this.cell,this.dy=0,this.keyDirection="left")),e.target.classList.contains("js-btn__right")&&(null!==this.keyDirection&&"left"===this.keyDirection||(this.dx=this.cell,this.dy=0,this.keyDirection="right"))}},{key:"createScreenBtns",value:function(){document.querySelector(".js-snake").insertAdjacentHTML("beforeend",'<div class="snake__box-left snake-box js-snake-box">\n        <button class="snake__control-btn js-btn__left">&larr;</button>\n        <button class="snake__control-btn js-btn__right">&rarr;</button>\n      </div>\n\n      <div class="snake__box-right snake-box js-snake-box">\n        <button class="snake__control-btn js-btn__up">&uarr;</button>\n        <button class="snake__control-btn js-btn__down">&darr;</button>\n      </div>')}},{key:"activeControlScreen",value:function(e){this.controlScreenKey&&document.querySelectorAll(".snake-box").forEach((function(e){e.classList.add("active")}))}},{key:"update",value:function(e,t,i,n,s){this.x+=this.dx,this.y+=this.dy,this.x<0?this.x=t.widthGame-this.cell:this.x>=t.widthGame&&(this.x=0),this.y<0?this.y=t.heightGame-this.cell:this.y>=t.heightGame&&(this.y=0),this.tails.unshift({x:this.x,y:this.y}),this.tails.length>this.maxTails&&this.tails.pop(),this.crachSnake(e,t,i,n),this.eatSnake(e,t,s)}},{key:"crachSnake",value:function(e,t,i,n){var s=this;this.tails.forEach((function(r,a){for(var l=a+1;l<s.tails.length;l++)r.x===s.tails[l].x&&r.y===s.tails[l].y&&(s.deth(i,n),t.zeroScore(),e.newPosition(s.tails,t.barrierMap))})),t.barrierMap.forEach((function(r){r.x===s.tails[0].x&&r.y===s.tails[0].y&&(s.deth(i,n),t.zeroScore(),e.newPosition(s.tails,t.barrierMap))}))}},{key:"eatSnake",value:function(e,t,i){var n=this;this.tails.forEach((function(i){i.x===e.x&&i.y===e.y&&(n.maxTails++,t.updateScore(),e.newPosition(n.tails,t.barrierMap),.7)}))}},{key:"draw",value:function(){var e=this;this.tails.forEach((function(t,i){e.context.fillStyle=0==i?"#333333":"#555555",e.context.fillRect(t.x,t.y,e.cell-e.indentCell,e.cell-e.indentCell)}))}},{key:"deth",value:function(e,t){this.x=0,this.y=3*this.cell,this.dx=this.cell,this.dy=0,this.tails=[{x:0,y:3*this.cell}],this.maxTails=3,this.keyDirection=null,document.removeEventListener("click",this.handleControlScreen),document.removeEventListener("keydown",this.handleControl)}}]),e}(),Game=function(){function e(t,i,n){var s=arguments.length>3&&void 0!==arguments[3]&&arguments[3];_classCallCheck(this,e),this.newGameBtn=document.querySelector(t.selectorNewGame),this.restartBtn=document.querySelector(t.selectorRestart),this.easyLevelBtn=document.querySelector(t.selectorEasyLevel),this.hardLevelBtn=document.querySelector(t.selectorHardLevel),this.btnMenu=document.querySelector(i.selectorBtnMenu),this.listMenu=document.querySelector(i.selectorListMenu),this.fps=300,this.startTime=0,this.currentTime=0,this.time=0,this.currentSecond=0,this.speed=0,this.cell=n,this.controlScreenKey=s,this.canvas=new Canvas,this.board=new Board(this.canvas,this.cell),this.berry=new Berry(this.canvas,this.board),this.snake=new Snake(this.canvas,this.board,this.controlScreenKey),this.gameLoopSnake=this.gameLoopSnake.bind(this),this.gameLoopSnake(),this.btns(),this.berry.newPosition(this.snake.tails,this.board.barrierMap)}return _createClass(e,[{key:"btns",value:function(){var e=this;this.newGameBtn.addEventListener("click",(function(){e.easyLevelBtn.removeAttribute("disabled"),e.hardLevelBtn.removeAttribute("disabled"),e.newGameBtn.setAttribute("disabled","disabled"),e.restartBtn.setAttribute("disabled","disabled")})),this.easyLevelBtn.addEventListener("click",(function(){e.checkLevel(e.board.barrier.levelEasy),e.controlScreenKey?document.addEventListener("click",e.snake.handleControlScreen):document.addEventListener("keydown",e.snake.handleControl),e.activeMenu()})),this.hardLevelBtn.addEventListener("click",(function(){e.checkLevel(e.board.barrier.levelHard),e.controlScreenKey?document.addEventListener("click",e.snake.handleControlScreen):document.addEventListener("keydown",e.snake.handleControl),e.activeMenu()})),this.restartBtn.addEventListener("click",(function(){e.snake.deth(e.startTime,e.fps),e.board.zeroScore(),e.berry.newPosition(e.snake.tails,e.board.barrierMap),e.controlScreenKey?document.addEventListener("click",e.snake.handleControlScreen):document.addEventListener("keydown",e.snake.handleControl),e.activeMenu()}))}},{key:"activeMenu",value:function(){btnMenu.classList.toggle("active"),listMenu.classList.toggle("active")}},{key:"checkLevel",value:function(e){this.board.updateMap(e),this.snake.deth(this.startTime,this.fps),this.board.zeroScore(),this.berry.newPosition(this.snake.tails,this.board.barrierMap),this.restartBtn.removeAttribute("disabled"),this.newGameBtn.removeAttribute("disabled"),this.easyLevelBtn.setAttribute("disabled","disabled"),this.hardLevelBtn.setAttribute("disabled","disabled")}},{key:"gameLoopSnake",value:function(){requestAnimationFrame(this.gameLoopSnake),0===this.startTime&&(this.startTime=(new Date).getTime()),this.currentTime=(new Date).getTime(),this.time=this.currentTime-this.startTime,this.currentSecond=Math.floor(this.time/(this.fps-this.speed)),this.currentSecond>0&&(this.startTime=0,this.canvas.context.clearRect(0,0,this.board.widthGame,this.board.heightGame),this.board.drawGameBoard(),this.berry.draw(),this.snake.draw(),this.snake.update(this.berry,this.board,this.startTime,this.fps,this.speed))}}]),e}(),btnsMenu={selectorNewGame:".js-snake__new-game",selectorRestart:".js-snake__restart",selectorEasyLevel:".js-snake__easy-level",selectorHardLevel:".js-snake__hard-level"},activeMenuBtn={selectorBtnMenu:".js-btns-menu__icon",selectorListMenu:".js-btns-menu__list"};function getRandomInt(e,t){return Math.floor(Math.random()*(t-e)+e)}function _createForOfIteratorHelper(e,t){var i="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!i){if(Array.isArray(e)||(i=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){i&&(e=i);var n=0,s=function(){};return{s:s,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:s}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a=!0,l=!1;return{s:function(){i=i.call(e)},n:function(){var e=i.next();return a=e.done,e},e:function(e){l=!0,r=e},f:function(){try{a||null==i.return||i.return()}finally{if(l)throw r}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),e}null!==(game=document.querySelector(".js-snake"))&&(window.matchMedia("(min-width: 1100px)").matches&&isTouchDevice()?new Game(btnsMenu,activeMenuBtn,25,!0):window.matchMedia("(max-width: 1100px)").matches?new Game(btnsMenu,activeMenuBtn,20,!0):window.matchMedia("(max-width: 1100px)").matches?new Game(btnsMenu,activeMenuBtn,15,!0):new Game(btnsMenu,activeMenuBtn,25,!1));var game,TicTacToe=function(){function e(t,i){var n=this;_classCallCheck(this,e),this.gameBoard=this.createElementBoard(),this.winText=this.createElementText(),this.newGameBtn=document.querySelector(t.selectorNewGame),this.restartBtn=document.querySelector(t.selectorRestart),this.easyLevelBtn=document.querySelector(t.selectorEasyLevel),this.hardLevelBtn=document.querySelector(t.selectorHardLevel),this.btnMenu=document.querySelector(i.selectorBtnMenu),this.listMenu=document.querySelector(i.selectorListMenu),this.origBoard,this.cells,this.keyLevel="easy",this.huPlayer="X",this.aiPlayer="O",this.huSymbol='<svg class="cross">\n    <line class="cross-first" x1="10" y1="10" x2="70" y2="70" stroke="#333" stroke-width="10" stroke-linecap="round" />\n    <line class="cross-second" x1="70" y1="10" x2="10" y2="70" stroke="#333" stroke-width="10" stroke-linecap="round" />\n    </svg>',this.aiSymbol='<svg class="circle">\n    <circle r="30" cx="40" cy="40" stroke="#c15746" stroke-width="10" fill="none" stroke-linecap="round" />\n    </svg>',this.winCombos=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]],this.handleTurnClick=function(e){"number"==typeof n.origBoard[e.target.id]&&(n.turn(e.target.id,n.huPlayer,n.huSymbol),n.checkTie()||n.checkWin(n.origBoard,n.huPlayer)||n.turn(n.BestSport(),n.aiPlayer,n.aiSymbol))},this.init()}return _createClass(e,[{key:"createElementBoard",value:function(){var e=document.querySelector(".js-tic-tac-toe"),t=document.createElement("div");return t.classList.add("tic-tac-toe__game","js-tic-tac-toe__game"),e.appendChild(t),t}},{key:"createElementText",value:function(){var e=document.querySelector(".js-tic-tac-toe"),t=document.createElement("p");return t.classList.add("tic-tac-toe__win-text","js-tic-tac-toe__win-text"),e.appendChild(t),t}},{key:"whoWinner",value:function(e){this.winText.innerText=e}},{key:"init",value:function(){for(var e=this,t=0;t<9;t++){var i=document.createElement("div");i.setAttribute("id",t),i.classList.add("tic-tac-toe__cell"),this.gameBoard.appendChild(i)}this.cells=document.querySelectorAll(".tic-tac-toe__cell"),this.newGameBtn.addEventListener("click",(function(){e.easyLevelBtn.removeAttribute("disabled"),e.hardLevelBtn.removeAttribute("disabled"),e.newGameBtn.setAttribute("disabled","disabled"),e.restartBtn.setAttribute("disabled","disabled")})),this.easyLevelBtn.addEventListener("click",(function(){e.checkLevel("easy"),e.activeMenu()})),this.hardLevelBtn.addEventListener("click",(function(){e.checkLevel("hard"),e.activeMenu()})),this.restartBtn.addEventListener("click",(function(){e.start(),e.activeMenu()}))}},{key:"activeMenu",value:function(){btnMenu.classList.toggle("active"),listMenu.classList.toggle("active")}},{key:"checkLevel",value:function(e){this.keyLevel=e,this.start(),this.restartBtn.removeAttribute("disabled"),this.newGameBtn.removeAttribute("disabled"),this.easyLevelBtn.setAttribute("disabled","disabled"),this.hardLevelBtn.setAttribute("disabled","disabled")}},{key:"start",value:function(){this.origBoard=[0,1,2,3,4,5,6,7,8];for(var e=0;e<this.cells.length;e++)this.cells[e].innerHTML="",this.cells[e].classList.add("pointer"),this.cells[e].addEventListener("click",this.handleTurnClick),this.winText.innerText=""}},{key:"turn",value:function(e,t,i){this.origBoard[e]=t,document.getElementById(e).innerHTML=i,this.cells[e].removeEventListener("click",this.handleTurnClick),this.cells[e].classList.remove("pointer"),this.checkWin(this.origBoard,t)&&this.gameOver(t)}},{key:"checkWin",value:function(e,t){var i,n=this.playerMoves(e,t),s=_createForOfIteratorHelper(this.winCombos);try{for(s.s();!(i=s.n()).done;){if(i.value.every((function(e){return-1!==n.indexOf(e)})))return!0}}catch(e){s.e(e)}finally{s.f()}return!1}},{key:"checkTie",value:function(){var e=this;if(0==this.emptySquares().length){for(var t=0;t<this.cells.length;t++)this.cells[t].removeEventListener("click",this.handleTurnClick);return setTimeout((function(){return e.whoWinner("Ничья")}),1200),!0}return!1}},{key:"gameOver",value:function(e){for(var t=this,i=0;i<this.cells.length;i++)this.cells[i].removeEventListener("click",this.handleTurnClick),this.cells[i].classList.remove("pointer");setTimeout((function(){return t.whoWinner(e===t.huPlayer?"Вы победили":"Вы проиграли")}),1200)}},{key:"emptySquares",value:function(){return this.origBoard.filter((function(e){return"number"==typeof e}))}},{key:"playerMoves",value:function(e,t){for(var i=[],n=0;n<e.length;n++){e[n]===t&&(i=i.concat(n))}return i}},{key:"BestSport",value:function(){return"easy"===this.keyLevel?this.BestSportEasy():"hard"===this.keyLevel?this.BestSportHard():void 0}},{key:"BestSportEasy",value:function(){var e,t=this.emptySquares(),i=this.playerMoves(this.origBoard,this.huPlayer),n=_createForOfIteratorHelper(this.winCombos);try{for(n.s();!(e=n.n()).done;){var s=e.value;if(i.includes(s[0])&&i.includes(s[1])){if(t.includes(s[2]))return s[2]}else if(i.includes(s[0])&&i.includes(s[2])){if(t.includes(s[3]))return s[1]}else if(i.includes(s[1])&&i.includes(s[2])&&t.includes(s[0]))return s[0]}}catch(e){n.e(e)}finally{n.f()}return t[Math.floor(Math.random()*t.length)]}},{key:"BestSportHard",value:function(){return this.minimax(this.origBoard,this.aiPlayer).index}},{key:"minimax",value:function(e,t){var i=this.emptySquares();if(this.checkWin(e,this.huPlayer))return{score:-10};if(this.checkWin(e,this.aiPlayer))return{score:10};if(0===i.length)return{score:0};for(var n,s=[],r=0;r<i.length;r++){var a={};if(a.index=e[i[r]],e[i[r]]=t,t==this.aiPlayer){var l=this.minimax(e,this.huPlayer);a.score=l.score}else{var c=this.minimax(e,this.aiPlayer);a.score=c.score}e[i[r]]=a.index,s.push(a)}if(t===this.aiPlayer)for(var o=-1/0,h=0;h<s.length;h++)s[h].score>o&&(o=s[h].score,n=h);else for(var u=1/0,d=0;d<s.length;d++)s[d].score<u&&(u=s[d].score,n=d);return s[n]}}]),e}();btnsMenu={selectorNewGame:".js-tic-tac-toe__new-game",selectorRestart:".js-tic-tac-toe__restart",selectorEasyLevel:".js-tic-tac-toe__easy-level",selectorHardLevel:".js-tic-tac-toe__hard-level"},activeMenuBtn={selectorBtnMenu:".js-btns-menu__icon",selectorListMenu:".js-btns-menu__list"};null!==(game=document.querySelector(".tic-tac-toe"))&&new TicTacToe(btnsMenu,activeMenuBtn);var btnMenu=document.querySelector(".js-btns-menu__icon"),listMenu=document.querySelector(".js-btns-menu__list");function isTouchDevice(e){return void 0!==window.ontouchstart}btnMenu.addEventListener("click",(function(){btnMenu.classList.toggle("active"),listMenu.classList.toggle("active")}));