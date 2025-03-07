let direction = {x:0, y:0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/imagination.mp3');
let speed = 5;

let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];
let food = {x: 6, y: 7};
let score = 0;

function isCollide(sarr) {
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++){
        if(sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0){
        return true;
    }
    
}

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function gameEngine(){
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        direction = {x: 0, y: 0};
        alert("Game Over,press any key to play again!");
        snakeArr =[{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    if (snakeArr[0].y === food.y && snakeArr[0].x ===food.x) {
        foodSound.play();
        score += 1;
        if (score>hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));  
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())}
        
    }
    //Moving Snake
    for (let i = snakeArr.length - 2; i>=0; i--) {
        // const element = array[i];
        snakeArr[i+1] = {...snakeArr[i]};
        
    }
    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;
   
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        // snakeElement.classList.add('snack');
        if (index === 0){
            snakeElement.classList.add('head');
            
        }
        else{
            snakeElement.classList.add('snack');
        }
        board.appendChild(snakeElement);
    });
    // Display the snake
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

let hiscore = localStorage.getItem("hiscore");
let hiscoreval = 0;
if (hiscore === null) {
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    direction = {x: 0, y: 1}; // Start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            direction.x = -1;
            direction.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            direction.x = 1;
            direction.y = 0;
            break;
        default:
            // break;
    }
    });

