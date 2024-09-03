const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'turtle',
  'penguin',
  'jellyfish',
  'lobster',
  'starfish',
  'clam',
  'dolphin',
  'whale',
  'fish',
  'seal',
  'stingray',
  'seaweed',
  'octopus',
  'coral',
  'shrimp',
];


let numWrong = 0;
let correctGuesses = 0;
let word = WORDS[Math.floor(Math.random() * (WORDS.length))];

// Loop over the chars in `word` and create divs.
function createDivsForChars() {
  const wordContainer = document.querySelector('#word-container');
  for (const letter of word) {
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
}

// Loop over each letter in `ALPHABET` and generate buttons.
function generateLetterButtons() {
  const letterButtonContainer = document.querySelector('#letter-buttons');
  for (const char of ALPHABET) {
    letterButtonContainer.insertAdjacentHTML('beforeend', `<button>${char}</button>`);
  }
}

// Set the `disabled` property of `buttonEl` to `true.
// `buttonEl` is an `HTMLElement` object.
function disableLetterButton(buttonEl) {
  buttonEl.disabled = true;
}

// setAttribute() method MDN: By setting the value of the disabled attribute to the empty string (""),
// set disabled to true, button getting disabled.
// function disableLetterButton(buttonEl) {
//     buttonEl.setAttribute('disabled', "");
// }
//document.querySelector("#letter-buttons").addEventListener('click', event => {
//const disable = document.getElementById("#letter-buttons")
//})


// helper function:
// Return `true` if `letter` is in the word.
function isLetterInWord(letter) {
  return word.includes(letter);
}
// const isLetterInWord = (letter) => word.includes(letter)

// Disable all letter buttons. Called when game is won or lost.
function disableAllLetterButtons() {
    const buttons = document.querySelectorAll('button');
    for (const button of buttons) {
      button.disabled = true;
    }
}

// Called when `letter` is in word. Update contents of divs with `letter`.
function handleCorrectGuess(letter) {
  // Replace this with your code
    const letterDivs = document.querySelectorAll(`.${letter}`)
    for (const div of letterDivs){
        div.innerHTML = letter
        correctGuesses += 1
    }
    // win conditional
    if (correctGuesses === word.length) {
      disableAllLetterButtons();
      document.querySelector('#win').style.display = 'block';
      }
}

// Called when `letter` is not in word.
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable all buttons
// and show the "play again" message.
function handleWrongGuess() {
  numWrong += 1;
  document.querySelector('#shark-img img').setAttribute("src", `/static/images/guess${numWrong}.png`);
  if (numWrong === 5){
    disableAllLetterButtons();
    document.querySelector('#play-again').style.display = 'block';
  }
  console.log(`Image path: /static/images/guess${numWrong}.png`);
}
    // const playAgain = document.querySelector('#play-again')
    // playAgain.style.display=''
    // const allButtons = document.querySelectorAll('#letter-buttons')
    // allButtons.disabled=true
    // .innerHTML = 'play again?'

// Reset game state. Called before restarting the game.
function resetGame() { window.location = '/sharkwords' }

// Function that should be called when a letter button is clicked.
function buttonClicked(evt) {
  // get the button that was clicked using the event target
  // get the letter inside the button that was clicked
  // you should then check if the letter is in the word
  // if it is, call `handleCorrectGuess`
  // if it is not, call `handleWrongGuess`
  // finally, disable the button so the letter can't be clicked again
  const clickedBtn = evt.target;
  const letter = clickedBtn.innerHTML;
  if (isLetterInWord(letter, word)){
    handleCorrectGuess(letter);
  } else {
    handleWrongGuess()
  }
  disableLetterButton(clickedBtn)
  // clickedBtn.disabled=true;
}

// This function is called to start the game.
function startGame() {
    // let numWrong = 0;
    // let correctGuesses = 0;
    createDivsForChars();
    generateLetterButtons();

    // const word = WORDS[Math.floor(Math.random() * (WORDS.length))];

    // This selects all buttons in the #letter-buttons section
    const buttons = document.querySelectorAll('#letter-buttons button');

    for (const button of buttons) {
    // event handler that calls the buttonClicked function when a button is clicked
      button.addEventListener('click', buttonClicked)
    }
    document.querySelector('#play-again').addEventListener('click', resetGame);
    document.querySelector('#win').addEventListener('click', resetGame);
}

startGame(); // Call startGame() when the page loads.
