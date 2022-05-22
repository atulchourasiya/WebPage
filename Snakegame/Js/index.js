let inputDir = { x: 0, y: 0 };
const foodsound = new Audio('./Music/food.mp3');
const gameoversound = new Audio('./Music/gameover.mp3');
const moveSound = new Audio('./Music/move.mp3');
const Musicsound = new Audio('./Music/music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
   { x: 14, y: 15 }
]
let food = { x: 11, y: 16 };
// Gamefunction

function main(ctime) {
   window.requestAnimationFrame(main);
   if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
      return;
   }
   lastPaintTime = ctime;
   gameEngine();
}

function isCollide(snake) {
   //   if you bump into yourself
   for (let i = 1; i < snakeArr.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
         return true;
      }
   }
   // if you bump into wall
   if (snake[0].x >= 20 || snake[0].x <= 1 || snake[0].y >= 20 || snake[0].y <= 1) {
      return true;
   }
}

function gameEngine() {
   //Part 1 Updating the snake array and food 
   if (isCollide(snakeArr)) {
      gameoversound.play();
      Musicsound.pause();
      inputDir = { x: 0, y: 0 };
      alert("Game Over. Press Any Key To Play Again");
      score = 0;
      scorenumber.innerHTML = "Score: " + score;
      snakeArr = [{ x: 13, y: 15 }];
   }

   // if you have eaten the food increment the score and put the food again
   if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
      foodsound.play();
      score += 1;
      if (score > hiscoreval) {
         hiscoreval = score;
         localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
         hiscorenumber.innerHTML = "Hi Score : " + hiscoreval;
      }
      scorenumber.innerHTML = "Score: " + score;
      snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
      let a = 2;
      let b = 19;
      food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
   }
   // moving the snake
   for (let i = snakeArr.length - 2; i >= 0; i--) {
      snakeArr[i + 1] = { ...snakeArr[i] };
   }
   snakeArr[0].x += inputDir.x;
   snakeArr[0].y += inputDir.y;
   //Part 2 Display the snake and food
   // Display the snake
   board.innerHTML = "";
   snakeArr.forEach((e, index) => {
      snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = e.y;
      snakeElement.style.gridColumnStart = e.x;
      snakeElement.classList.add('snake');
      if (index === 0) {
         snakeElement.classList.add('head');
      }
      board.appendChild(snakeElement);
   });
   border();
   foodElement = document.createElement('div');
   foodElement.style.gridRowStart = food.y;
   foodElement.style.gridColumnStart = food.x;
   foodElement.classList.add('food');
   board.appendChild(foodElement);
}

function border() {
   for (let i = 1; i <= 20; i++) {
      for (let j = 1; j <= 20; j++){
         if( i=== 1 || j=== 1 || i===20|| j===20)
         {
            bor = document.createElement('div');
            bor.style.gridRowStart = i ;
            bor.style.gridColumnStart = j;
            bor.classList.add('borderclass');
            board.appendChild(bor);

         }   
      }
   }
}

// main logic
let button = document.querySelectorAll(".arrow");
button.forEach(function (ele) {
   ele.addEventListener("click", but => {
      inputDir = { x: 0, y: 1 }//startthegmae
      moveSound.play();
      Musicsound.play();
      console.log(ele);
      switch (ele) {
         case up:
            inputDir.x = 0;
            inputDir.y = -1;
            break;

         case down:
            inputDir.x = 0;
            inputDir.y = 1;
            break;

         case right:
            inputDir.x = 1;
            inputDir.y = 0;
            break;

         case left:
            inputDir.x = -1;
            inputDir.y = 0;
            break;
         default:
            break;
      }
   });
});
let hiscore = localStorage.getItem('hiscore');
if (hiscore === null) {
   hiscoreval = 0;
   localStorage.setItem('hiscore', JSON.stringify(hiscoreval))
}
else {
   hiscoreval = JSON.parse(hiscore);
   hiscorenumber.innerHTML = "Hi Score : " + hiscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
   inputDir = { x: 0, y: 1 }//startthegame
   Musicsound.play();
   moveSound.play();
   switch (e.key) {
      case "ArrowUp":
         inputDir.x = 0;
         inputDir.y = -1;
         break;

      case "ArrowDown":
         inputDir.x = 0;
         inputDir.y = 1;
         break;

      case "ArrowRight":
         inputDir.x = 1;
         inputDir.y = 0;
         break;

      case "ArrowLeft":
         inputDir.x = -1;
         inputDir.y = 0;
         break;
      default:
         break;
   }
});