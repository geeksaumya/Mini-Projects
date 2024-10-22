const words = ["apple", "grape", "peach", "berry", "melon"];
let secretWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
const maxGuesses = 6;
let currentGuess = "";
let guesses = 0;
let score = 0;

const grid = document.getElementById("grid");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");
const playAgainButton = document.getElementById("play-again");
const scoreDisplay = document.getElementById("score");

function createGrid() {
    grid.innerHTML = "";
    for (let i = 0; i < maxGuesses * 5; i++) {
        const box = document.createElement("div");
        box.classList.add("letter-box");
        grid.appendChild(box);
    }
}

function createKeyboard() {
    keyboard.innerHTML = "";
    const keys = "abcdefghijklmnopqrstuvwxyz";
    for (let key of keys) {
        const keyButton = document.createElement("button");
        keyButton.classList.add("key");
        keyButton.textContent = key;
        keyButton.addEventListener("click", () => handleKeyPress(key));
        keyboard.appendChild(keyButton);
    }
    const backspaceButton = document.createElement("button");
    backspaceButton.classList.add("key");
    backspaceButton.textContent = "←";
    backspaceButton.addEventListener("click", handleBackspace);
    keyboard.appendChild(backspaceButton);
}

function handleKeyPress(key) {
    if (currentGuess.length < 5) {
        currentGuess += key;
        updateGrid();
    }
    if (currentGuess.length === 5) {
        checkGuess();
    }
}

function handleBackspace() {
    currentGuess = currentGuess.slice(0, -1);
    updateGrid();
}

function updateGrid() {
    const boxes = document.querySelectorAll(".letter-box");
    const guessArray = currentGuess.split("");
    guessArray.forEach((letter, index) => {
        boxes[guesses * 5 + index].textContent = letter;
    });
    for (let i = guessArray.length; i < 5; i++) {
        boxes[guesses * 5 + i].textContent = "";
    }
}

function checkGuess() {
    const boxes = document.querySelectorAll(".letter-box");
    const guessArray = currentGuess.split("");
    const secretArray = secretWord.split("");
    
    // Track letters that are correct and present
    const correctLetters = [];
    const presentLetters = [];
    
    for (let i = 0; i < 5; i++) {
        const box = boxes[guesses * 5 + i];
        if (guessArray[i] === secretArray[i]) {
            box.classList.add("correct");
            correctLetters.push(guessArray[i]);
        } else if (secretArray.includes(guessArray[i])) {
            box.classList.add("present");
            presentLetters.push(guessArray[i]);
        } else {
            box.classList.add("absent");
        }
    }
    
    guesses++;
    
    if (currentGuess === secretWord) {
        message.textContent = "Congratulations! You guessed the word!";
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        keyboard.style.display = "none";
        playAgainButton.style.display = "block";
    } else if (guesses === maxGuesses) {
        message.textContent = `Game over! The word was ${secretWord}`;
        keyboard.style.display = "none";
        playAgainButton.style.display = "block";
    }
    currentGuess = "";
}

function resetGame() {
    secretWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
    currentGuess = "";
    guesses = 0;
    message.textContent = "";
    playAgainButton.style.display = "none";
    keyboard.style.display = "block";
    createGrid();
    createKeyboard();
}

playAgainButton.addEventListener("click", resetGame);

createGrid();
createKeyboard();
