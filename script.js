// Selecting all elements with class "cell" and assigning to constant cells
const cells = document.querySelectorAll(".cell");

// Selecting elements by ID for player scores and reset button
const playerXScoreSpan = document.querySelector("#playerXScore");
const playerOScoreSpan = document.querySelector("#playerOScore");
const resetBtn = document.querySelector(".resetBtn");

// Selecting toast element and draws count element
const toastDiv = document.querySelector(".toast");
const draws = document.querySelector("#draws");

// Constants for player symbols and initial scores and game state
const playerX = "X";
const playerO = "O";
let playerXScore = 0;
let playerOScore = 0;
let currentLevel = 1;
let flag = true;// Flag to control game state (active or not)
let currentPlayer = playerX;// Starting player

// Array of winning combinations on the tic tac toe grid
const winCombos = [
  [0, 1, 2],// Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [2, 4, 6], // Diagonal from top-right to bottom-left
];

// Adding click event listeners to all cells
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", cellClicked);
}

// Function called when a cell is clicked
function cellClicked(e) {
  if (flag) {
    if (e.target.innerHTML === "") {
      e.target.appendChild(addImg(currentPlayer));
      checkWinner();// Checking for a winner
      checkDraw(); // Checking for a draw
      if (currentPlayer === playerX) {
        currentPlayer = playerO;
      } else {
        currentPlayer = playerX;
      }
    }
  }
}

// Function to create and return an image element with the player's symbol
function addImg(type) {
  const img = document.createElement("img");
  img.src = `${type}.png`;
  return img;
}

// Function to check if there is a winner
function checkWinner() {
  for (let i = 0; i < winCombos.length; i++) {
    const winCombo = winCombos[i];
    const cell1 = cells[winCombo[0]];
    const cell2 = cells[winCombo[1]];
    const cell3 = cells[winCombo[2]];
    if (
      cell1.innerHTML !== "" &&
      cell1.innerHTML === cell2.innerHTML &&
      cell1.innerHTML === cell3.innerHTML
    ) {
      toast(`Player ${currentPlayer} wins!`);
      updateScore();
      flag = false;
      currentLevel++;
      setTimeout(() => {
        reset();
        toast(`Game ${currentLevel}`);
      }, 2000);
    }
  }
}

// Function to check if it's a draw
function checkDraw() {
  if ([...cells].every((cell) => cell.innerHTML !== "")) {
    toast("its a draw");
    currentLevel++;
    setTimeout(() => {
      reset();
      toast(`Game ${currentLevel}`);
    }, 2000);
  }
}

// Function to display toast messages
function toast(msg) {
  toastDiv.classList.add("show");
  toastDiv.textContent = msg;
  setTimeout(() => {
    toastDiv.classList.remove("show");
  }, 1000);
}

// Function to update scores based on winner
function updateScore() {
  if (currentPlayer === playerX) {
    playerXScore++;
    playerXScoreSpan.textContent = playerXScore;
  } else {
    playerOScore++;
    playerOScoreSpan.textContent = playerOScore;
  }
}

// Function to reset the game
function reset() {
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
  flag = true;
}

// Event listener for reset button click
resetBtn.addEventListener("click", () => {
  flag = false;
  reset();
  currentLevel = 1;
  playerOScore = 0;
  playerXScore = 0;
  playerOScoreSpan.textContent = playerOScore;
  playerXScoreSpan.textContent = playerXScore;
  toast("game reset!");
  setTimeout(() => {
    toast(`Game ${currentLevel}`);
    flag = true;
  }, 2000);
});
