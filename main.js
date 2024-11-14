const board = document.querySelector(".board .items");
let cel = document.querySelector(".resualt");
let xScore = parseInt(localStorage.getItem("xScore")) || 0;
let oScore = parseInt(localStorage.getItem("oScore")) || 0;
let currntPlayer = "X";
const cells = Array.from({ length: 9 });
const input = document.querySelector(".score input")
const handleClick = (e) => {
  const cellIndex = e.target.dataset.index;

  if (cells[cellIndex]) return;

  updateCell(cellIndex, currntPlayer);

  const winner = checkWinner();

  if (winner || !cells.includes(undefined)) {
    if (winner) {
      winner === "X" ? xScore++ : oScore++;
      saveScore();
      updateScoreDisplay();
      gameOver();    

    }
  
    setTimeout(() => {
      restGame();
    }, 1000);
  }
  

}
const updateCell = (index, value) => {
  cells[index] = value;
  const cell = board.querySelector(`[data-index="${index}"]`);
  cell.textContent = value;
  cell.classList.add(value === "X" ? "player-x" : "player-o");

  currntPlayer = currntPlayer === "X" ? "O" : "X";
  updateTurnIndicator();
};

const checkWinner = () => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
};

const restGame = () => {
  cells.fill(undefined);
  board.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("player-x", "player-o");
  });
  currntPlayer = "X";
  updateTurnIndicator();
};
const gameOver = () => {
  if (xScore >= input.value || oScore >= input.value) {
    localStorage.clear(); 
    xScore=0;
    oScore = 0;
    updateScoreDisplay();
    restGame();    
    finalGame()

  }
};

const updateScoreDisplay = () => {
  cel.innerHTML = `
    <div class="x">X <span class=""win>: ${xScore}</span></div>
    <div class="o">O <span class=""win>: ${oScore}</span></div>

    `;
};

const saveScore = () => {
  localStorage.setItem("xScore", xScore);
  localStorage.setItem("oScore", oScore);
};

const updateTurnIndicator = () => {
  const indicator = document.querySelector(".turn-indicator");
  if (indicator) {
    indicator.textContent = `Current Turn: ${currntPlayer}`;
  }
};

cells.forEach((_, index) => {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = index;
  cell.addEventListener("click", handleClick);
  board.appendChild(cell);
});


const finalGame = () => {
  let div = document.createElement("div");
  div.classList.add("finaly");
  div.textContent = "Game Over";
  div.style.transition = "2s";
  document.querySelector(".board").style.opacity = ".2"
  document.body.appendChild(div);
  setTimeout(() => {
      location.reload();
  }, 3000);
};
updateScoreDisplay();
updateTurnIndicator();
