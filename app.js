// rps.js
const readline = require('readline');

// Setup readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const choices = ['rock', 'paper', 'scissors'];

let player;

let playerScore = 0;
let computerScore = 0;

let currentPlayer = 'player';

//randomly generate a computer choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}
//ask user for their choice
function getPlayerChoice() {
    return new Promise((resolve) => {
        rl.question('Enter rock, paper, or scissors: ', (input) => {
            const choice = input.toLowerCase();
            if (choices.includes(choice)) {
                resolve(choice);
            } else {
                console.log('Invalid choice. Please try again.');
                resolve(getPlayerChoice());
            }
        });
    });
}

//take the player's choice and compare it to the computer's choice
function determineWinner(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "It's a tie!";
    }

    if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
        playerScore++;
        return `You win! ${playerSelection} beats ${computerSelection}.`;
    } else {
        computerScore++;
        return `You lose! ${computerSelection} beats ${playerSelection}.`;
    }
}

//initialize the game
async function playGame() {
    console.log("Welcome to Rock, Paper, Scissors!");
    while (playerScore < 5 && computerScore < 5) {
        player = await getPlayerChoice();
        const computer = getComputerChoice();
        console.log(`You chose: ${player}`);
        console.log(`Computer chose: ${computer}`);
        
        const result = determineWinner(player, computer);
        console.log(result);
        console.log(`Score - You: ${playerScore}, Computer: ${computerScore}`);
    }

    if (playerScore === 5) {
        console.log("Congratulations! You reached 5 points and won the game!");
    } else {
        console.log("Sorry! The computer reached 5 points first. Better luck next time!");
    }

    rl.question('Do you want to play again? (yes/no): ', (answer) => {
        if (answer.toLowerCase() === 'yes') {
            playerScore = 0;
            computerScore = 0;
            playGame();
        } else {
            console.log('Thanks for playing!');
            rl.close();
        }
    });
}

playGame();