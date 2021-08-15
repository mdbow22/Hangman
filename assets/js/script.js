// element selectors
var startButton = document.querySelector(".start-button");
var winsEl = document.querySelector(".win");
var lossesEl = document.querySelector(".lose");
var secLeft = document.querySelector(".timer-count");
var wordEl = document.querySelector(".word-blanks");
var resetButton = document.querySelector(".reset-button");

//global variables for win/lose counters, timer, etc
var wins = 0;
var losses = 0;
var timer;
var chosenWord;
var isWin = false;

// Arrays used to create blanks and letters on screen
var blanks = [];
var letters = [];

// Array of words the user will guess
var words = ["variable", "array", "modulus", "object", "function", "string", "boolean"];

// The init function is called when the page loads 
function init() {
    getWins();
    getlosses();
}

// The startGame function is called when the start button is clicked
function startGame() {
    //code here

    renderBlanks();
    startTimer();
}

// The winGame function is called when the win condition is met
function winGame() {
    //code here
    isWin = false;
    wordEl.textContent = "YOU WON!";
    wins++;
    setWins()
}

// The loseGame function is called when timer reaches 0
function loseGame() {
    // code here
    wordEl.textContent = "YOU LOST!";
    losses++;
    setLosses()
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    // Sets timer
    timer = 10;
    var time = setInterval(function() {
        timer--;
        secLeft.textContent = timer;
        if (timer === 0) {
            clearInterval(time);
            loseGame();
        }
        if (isWin) {
            clearInterval(time);
            winGame();
        }
    }, 1000);

}

// Creates blanks on screen
function renderBlanks() {
    // Randomly picks word from words array
    chosenWord = words[Math.floor(Math.random() * words.length)];

    // Uses loop to push blanks to blankLetters array
    blanks = [];
    for (let i = 0; i < chosenWord.length; i++) {
        blanks.push("_");
    }
    // Converts blankLetters array into a string and renders it on the screen
    wordEl.textContent = blanks.join(" ");
}

// Updates win count on screen and sets win count to client storage
function setWins() {
    winsEl.textContent = wins;
    localStorage.setItem('win', wins);
}

// Updates lose count on screen and sets lose count to client storage
function setLosses() {
    lossesEl.textContent = losses;
    localStorage.setItem('lose', losses);
}

// These functions are used by init
function getWins() {
    // Get stored value from client storage, if it exists
    wins = localStorage.getItem('win');
    // If stored value doesn't exist, set counter to 0
    if (wins === null) {
        wins = 0;
    }
    // If a value is retrieved from client storage set the winCounter to that value
    winsEl.textContent = wins;
    //Render win count to page
}

function getlosses() {
    losses = localStorage.getItem('lose');

    if (losses === null) {
        losses = 0;
    }

    lossesEl.textContent = losses;
}

function checkWin() {
    // If the word equals the blankLetters array when converted to string, set isWin to true
    if (blanks.join("") === chosenWord) {
        isWin = true;
    }

}

// Tests if guessed letter is in word and renders it to the screen.
function checkLetters(letter) {
    let chosenArray = chosenWord.split("");
    for (let i = 0; i < chosenArray.length; i++) {
        if (letter === chosenArray[i]) {
            blanks[i] = letter;
            wordEl.textContent = blanks.join(" ");
            checkWin();
        }
    }
}

// Attach event listener to document to listen for key event
document.addEventListener("keydown", function(event) {
    // If the count is zero, exit function
    if (timer === 0) {
        return;
    }
    // Convert all keys to lower case
    var keyLower = event.key.toLowerCase();
    // Test if key pushed is letter
    var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    if (!(letters.includes(keyLower))) {
        return;
    } else {
        checkLetters(keyLower);
    }
});

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
    // Resets win and loss counts
    wins = 0;
    losses = 0;
    // Renders win and loss counts and sets them into client storage
    setWins()
    setLosses()
}
// Attaches event listener to button
resetButton.addEventListener("click", resetGame);