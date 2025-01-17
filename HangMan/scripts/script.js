const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");


// Initializing game variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

// Ressetting game variables and UI 
const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join(""); //will display blank spaces acc to word length
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false); //enabling all disabled buttons
    gameModal.classList.remove("show"); //removing show class from gameModal
}


const getRandomWord = () => {
    // Selecting a random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word; 
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}


const gameOver = (isVictory) => {
    // After game completes.. showing modal with relevant details
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
}
const initGame = (button, clickedLetter) => {
    // Checking if clickedLetter exist's on the currentWord
    if(currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => { 
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter; // diplaying the matched letter
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed"); // adding guessed class for css
            }
        });
    } else {
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true; // Disabling the clicked button so user can't click again
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;


    // Calling gameOver function if any of these condition is true
    if(wrongGuessCount === maxGuesses) return gameOver(false);  //when player cant guess thw word
    if(correctLetters.length === currentWord.length) return gameOver(true); //when he is able to guess the word
}
// Creating keyboard buttons and adding event listener for buttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}
getRandomWord()
playAgainBtn.addEventListener("click", getRandomWord);         