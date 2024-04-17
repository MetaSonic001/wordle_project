document.addEventListener("DOMContentLoaded", () => {
    createSquares();
    const wordle = ['which', 'there', 'their', 'about', 'would', 'these', 'other', 'words', 'could', 'write', 'first', 'water', 'after', 'where', 'right', 'think', 'three', 'years', 'place', 'sound', 'great'];
    let guessedWords = [[]];
    let availableSpace = 1;
    let word = wordle[Math.floor(Math.random() * wordle.length)];
    let guessedWordCount = 0;
    const keys = document.querySelectorAll(".keyboard-row button");
    
    function getCurrentWordArr() {
        return guessedWords[guessedWords.length - 1];
    }
    
    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);
            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace += 1;
            availableSpaceEl.textContent = letter;
        }
    }
    
    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);
        if (!isCorrectLetter) {
            return "grey";
        }
        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = (letter === letterInThatPosition);
    
        if (isCorrectPosition) {
            return "rgb(83,141,78)";
        }
    
        return "rgb(181,159,59)";
    }
    
    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        const currentWord = currentWordArr.join('');
        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 200;
        currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);
                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = 'background-color:' + tileColor + ';border-color:' + tileColor + '';
            }, interval * index);
        });
    
        guessedWordCount += 1;
        if (currentWord === word) {
            window.alert("Congratulation");
        }
        if (guessedWords.length === 6) {
            window.alert('Sorry, you have no more guesses! The word is ' + word + '.');
        }
        guessedWords.push([]);
    }
    
    function createSquares() {
        const gameboard = document.getElementById("board");
        
        for (let index = 0; index < 30; index++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate_animated");
            square.setAttribute("id", index + 1);
            gameboard.appendChild(square);
        }
    }
    
    function handleDeleteLetter() {
        const currentWordArr = getCurrentWordArr();
        currentWordArr.pop();
        const LastLetterEl = document.getElementById(String(availableSpace - 1));
        LastLetterEl.textContent = '';
        availableSpace -= 1;
    }

    keys.forEach(key => {
        key.onclick = ({target}) => {
            const letter = target.getAttribute("data-key");
            if (letter === "enter") {
                const currentWordArr = getCurrentWordArr();
                if (currentWordArr.length !== 5) {
                    window.alert("Word must be 5 letters");
                    return;
                } else {
                    handleSubmitWord();
                    return;
                }
            }
            if (letter === "del") {
                handleDeleteLetter();
                return;
            }
            updateGuessedWords(letter);
        };
    });
});
