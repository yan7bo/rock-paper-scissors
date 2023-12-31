function getComputerChoice() {
    // returns a random "rock", "paper", or "scissors" (lower case)
    const choices = ["rock", "paper", "scissors"];
    ranNum = Math.floor(Math.random() * 3);
    return choices[ranNum];
}


function playRound(playerSelection, computerSelection) {
    // plays a round of the game using user input and computer input
    // returns a string that declares the winner "You Lose! Paper beats Rock"
    // account for ties by re-playing the round
    playerSelection = playerSelection.toLowerCase();

    // if tie, play again
    switch(playerSelection) {
        case computerSelection:
            return "You tie! Replay the round!";
        
        case "rock":
            switch(computerSelection) {
                case "paper":
                    return "You lose! Paper beats rock!";
                
                case "scissors":
                    return "You win! Rock beats scissors!";
            }
        
        case "paper":
            switch(computerSelection) {
                case "rock":
                    return "You win! Paper beats rock!";

                case "scissors":
                    return "You lose! Scissors beats paper!";
            }
        
        case "scissors":
            switch(computerSelection) {
                case "rock":
                    return "You lose! Rock beats scissors!";
                
                case "paper":
                    return "You win! Scissors beats paper!";
            }
    }
}

function getResult(result) {
    // returns 1 if win, 0 otherwise
    if(result.includes("win")){
        return 1;
    }
    return 0;
}

const TOTAL_ROUNDS = 5;

const listBtns = document.querySelector("#rpsBtns");
const pRound = document.querySelector("#round");
const pResult = document.querySelector("#result");
const pScore = document.querySelector("#score");
const pEnd = document.querySelector("#end");
let score = 0;
let round = 0;

function getWinner(round, score) {
    if(score > round / 2) {
        return `You scored ${score} out of a total of ${round} rounds! You win the game!`;
    } else {
        return `You scored ${score} out of a total of ${round} rounds! You lose the game!`;;
    }
}

function endGame(round) {
    if(round >= TOTAL_ROUNDS) {
        return true;
    } else {
        return false;
    }
}

function addBtns(event) {
    let target = event.target;
    let result = "";

    switch(target.id) {
        case "btnRock":
            result = playRound("rock", getComputerChoice());
        
        case "btnPaper":
            result = playRound("paper", getComputerChoice());
        
        case "btnScissors":
            result = playRound("scissors", getComputerChoice());
    }

    pResult.textContent = result;

    round += (result.includes("win") || result.includes("lose"));
    score += result.includes("win");

    pRound.textContent = `Round: ${round}`;
    pScore.textContent = `Current Score: ${score}`;

    if(endGame(round)) {
        console.log("game end");
        pEnd.textContent = getWinner(round, score);
        listBtns.removeEventListener("click", addBtns);
    }
}

function game() {
    listBtns.addEventListener("click", addBtns);
}

game();