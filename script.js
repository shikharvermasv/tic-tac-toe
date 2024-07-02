const gameInfo = document.querySelector('.game-info');
const boxes = document.querySelectorAll('.box');
const newGameBtn = document.querySelector('.btn');

let currentPlayer ;

let gameGrid;

let winningPos = [
    [0, 1, 2] , 
    [3, 4, 5] ,
    [6, 7, 8] ,
    [0, 3, 6] ,
    [1, 4, 7] ,
    [2, 5, 8] ,
    [2, 4, 6] ,
    [0, 4, 8] 
];

gameInit();

//let's initialise the game

function gameInit(){
    currentPlayer = "X"
    gameGrid = [ "" , "" , "" , "" , "" , "" , "" , "" , "" ,];
    boxes.forEach((box , index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList.remove('win');
    })
    newGameBtn.classList.remove("active");
    
    gameInfo.innerText = "Current Player - " + currentPlayer;
}





boxes.forEach((box , index) =>{
    box.addEventListener('click' , ()=>{
        handleClick(index);
    })
});

function checkGameOver(){
    let winner = "";
    

    winningPos.forEach((position)=>{
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]] ) ){
            if(gameGrid[position[0]]==="X"){
                winner = "X";
            }

            else{
                winner = "0";
            }

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

            //disable all events for other boxes

            boxes.forEach((box)=>{
                box.style.pointerEvents = "none"
            })

        }

    })
    
    if(winner !== ""){
        gameInfo.innerText = "Winner is Player - " + winner;
        newGameBtn.classList.add("active");
        return;
    }

    let count = 0;

    gameGrid.forEach((box)=>{
        if(box !== "")
        count++;
    });

    if(count == 9){
        gameInfo.innerText = "It's a Draw !!";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index){
    if(gameGrid[index] == ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = 'none'
        currentPlayerManager();
        // check if the game is over 
        checkGameOver();
    }
}

function currentPlayerManager(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }

    //Ui Update kardo
    gameInfo.innerText = "Current Player - " + currentPlayer;
}


newGameBtn.addEventListener('click' , gameInit);