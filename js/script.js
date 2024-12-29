
const playBoard = document.querySelector(".play-board")
const score = document.querySelector(".score");
const elementHighScore = document.querySelector(".high-score");
let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let speedX = 0, speedY = 1;
let interval ;
let count = 0;
let highS = +localStorage.getItem("high-score") || 0;  
elementHighScore.innerHTML = `High Score: ${highS}`;

let rePlay = document.querySelector(".replay");


  


const foodRandomPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const solveGameOver = () => {
    clearInterval(interval);
    
    // alert("Game over!  Press OK to replay...");
}

const directionChange = (e)=> {
    if(e.key === "ArrowUp" && speedY != 1){  // ^ to assign by their numeric value use keyCode
        speedX = 0;
        speedY = -1;
    }else if(e.key === "ArrowDown" && speedY != -1){
        speedX = 0;
        speedY = 1;
    }else if(e.key === "ArrowLeft"&& speedX != 1 ){
        speedX = -1;
        speedY = 0;
    }else if(e.key === "ArrowRight" &&  speedX != -1){
        speedX = 1;
        speedY = 0;
    }
     
}


const initialGame= ()=> {

    if(gameOver) return solveGameOver();

    let htmlElement = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>
`;
   
 if(snakeX === foodX && snakeY === foodY){
    foodRandomPosition();
    snakeBody.push([foodX, foodY]);
    count ++;
    highS = Math.max(count, highS);  
    localStorage.setItem("high-score", highS);
    score.innerHTML = `Score: ${count}`;
    elementHighScore.innerHTML = `High Score: ${highS}`;
    

 }
      

   for(let i = snakeBody.length-1; i > 0; i--){
    snakeBody[i] = snakeBody[i-1];
    
    
   }
   snakeBody[0] =[snakeX, snakeY];

        snakeY += speedY;
        snakeX += speedX;



        if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30  ){

            gameOver = true ;
        }




        for(let i=0; i < snakeBody.length; i++){
            htmlElement += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>
            `;
            

            if(i !=0 && snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]){
                gameOver = true;
            }
        }
        

       
    playBoard.innerHTML = htmlElement;
}
const replay = () => {
    location.reload();
}
foodRandomPosition();
interval = setInterval(initialGame, 125);

document.addEventListener("keydown", directionChange)