let count = 0, pointA = 0, pointB = 0;
const table = document.querySelector("table");

class Matrix {
  constructor() {
    this.mat = [];
    this.reset();
  }
  reset() {
    for (let i = 0; i < 3; i++) {
      this.mat[i] = [];
      for (let j = 0; j < 3; j++) {
        this.mat[i][j] = 0;
      }
    }
  }
}

const matrixInstance = new Matrix();

XorY();

function XorY() {
  table.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      if (e.target.innerText === "") {
        const row = e.target.closest("tr").rowIndex;
        const col = e.target.closest("td").cellIndex;
        const flatIndex = row * 3 + col;

        if (count % 2 === 0) {
          matrixInstance.mat[row][col] = `X${flatIndex}`;
          e.target.innerText = "X";
        } else {
          matrixInstance.mat[row][col] = `O${flatIndex}`;
          e.target.innerText = "O";
        }
        count++;
        ispoint();
      }
    }
  });
}

function ispoint() {
  let x = [],
    O = [];
  let xpoint = false,
    Opoint = false;

  if (count >= 5) {
    const winpatterns = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8],
    ];

    matrixInstance.mat.forEach((row) => {
      row.forEach((element) => {
        if (element && element[0] === "X") x.push(parseInt(element.slice(1)));
        if (element && element[0] === "O") O.push(parseInt(element.slice(1)));
      });
    });

    xpoint = winpatterns.some((pattern) =>
      pattern.every((pos) => x.includes(pos))
    );
    Opoint = winpatterns.some((pattern) =>
      pattern.every((pos) => O.includes(pos))
    );

    if (xpoint) {
      updateScoreAndReset("A");
      alert("A WINS");
    }
    if (Opoint) {
      updateScoreAndReset("B");
      alert("B WINS");
    }
  }

  if (count === 9 && !xpoint && !Opoint) {
    alert("Game ties");
    tablereload();
  }
}

function updateScoreAndReset(winner) {
  const div = document.querySelectorAll("div");
  if (winner === "A") {
    div[0].querySelector("p").innerText = `SCORE: ${++pointA}`;
  } else {
    div[1].querySelector("p").innerText = `SCORE: ${++pointB}`;
  }
  tablereload();
}

function tablereload() {
  const buttons = table.querySelectorAll("button");
  buttons.forEach((btn) => (btn.innerText = ""));
  count = 0;
  matrixInstance.reset();
}

function retry() {
  window.location.href = "index.html";
}
