// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersAtrray = Array.from(letters);

// Select letters Container
let lettersContainer = document.querySelector(".letters");

// Genrate letters
lettersAtrray.forEach((letters) => {
  // Create Span
  let span = document.createElement("span");
  // Create Letter Text Node
  let theLetter = document.createTextNode(letters);
  // Append The Letter To Span
  span.appendChild(theLetter);
  // Add Class On Span
  span.className = "letter-box";
  // Append Span To The Letters Container
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scale",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "parasite",
    "Interstellar",
    "Shutter Island",
    "Scent Of A Woman",
    "Memento",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: [
    "Syria",
    "Palestine",
    "Yemen",
    "Egypt",
    "Bahrain",
    "Qatar",
    "Saudi Arabia",
  ],
};

// Get Random Property
let allKeys = Object.keys(words);

// Random Number Depend On Keys Length
let randomPropNums = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNums];

// Category Words
let randomPropValue = words[randomPropName];

// Random Number Depend On Words
let randomValueNums = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word
let randomValueName = randomPropValue[randomValueNums];

// Set Category Info
document.querySelector(".game-info .category h4").innerHTML = randomPropName;

// Select Letters Guess Element
let letterGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let LetterAndSpace = Array.from(randomValueName);

// Create Spans Depend On Word
LetterAndSpace.forEach((letter) => {
  // Create Empty Span
  let empty = document.createElement("span");
  // If Letter Is Space
  if (letter === " ") {
    // Add Class To The Span
    empty.className = "space";
  }
  // Append Span To The Letter Guess Container
  letterGuessContainer.appendChild(empty);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attemps
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  // Set Guess Status
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    // The Chosen Word
    let theChosenWord = Array.from(randomValueName.toLowerCase());
    theChosenWord.forEach((wordLetter, Wordindex) => {
      // If The Clicked Letter Equal To One Of The Chosen Word Letter
      if (theClickedLetter == wordLetter) {
        // Set Status To Correct
        theStatus = true;
        // Loop On All Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (Wordindex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });
    // If Letter Is Wrong
    if (theStatus !== true) {
      // Increase The Wrong Attempts
      wrongAttempts++;
      // Add Class Wrong To The Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      // Play Fail Sound
      document.getElementById("fail").play();
      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } else {
      // Play Success Sound
      document.getElementById("success").play();
    }
  }
});

// End Game Function
function endGame() {
  // Create Popup Div
  let div = document.createElement("div");
  // Create Text
  let divText = document.createTextNode(
    `Game Over, The Word Is ${randomValueName}`
  );
  // Append Text To Div
  div.appendChild(divText);
  // Add Class On Div
  div.className = "popup";
  // Append To The Body
  let row = document.querySelector(".row");
  row.appendChild(div);
}
