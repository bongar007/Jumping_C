const zlFetch = require("zl-fetch");
const p5 = require("p5");
let cnv;
let generatedGrid = [];
let readyElement;
let counter = 30;
let score = 0;
let highScore = 0;
let timeleft = 10;
const currentScoreEl = document.querySelector(".current-score");
const highScoreEl = document.querySelector(".high-score");
const canvasSize = 500;

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}
//Creating a 2D array with the "C" randomly inserted
function generateGrid() {
  let grid = [];
  const randomPlaceX = Math.floor(Math.random() * 24);
  const randomPlaceY = Math.floor(Math.random() * 24);
  for (let x = 0; x < 25; x++) {
    let row = [];
    for (let y = 0; y < 25; y++) {
      row.push("");
    }
    grid.push(row);
  }
  grid[randomPlaceX][randomPlaceY] = "C";
  return grid;
}

// Mouse event to track the board and store the score
function locateC(event) {
  const tileSize = canvasSize / generatedGrid.length;
  const { layerX, layerY } = event;
  const x = Math.floor(layerX / tileSize);
  const y = Math.floor(layerY / tileSize);

  if (generatedGrid[x][y] === "C") {
    console.log("YAY!! GOT ONE");
    score++;
    currentScoreEl.textContent = score;
  } else {
    console.log("NOPE, THATS NOT IT");
    score -= 0.5;
    currentScoreEl.textContent = score;
  }
  return score;
}

//drawing the "0"s
function createZero(x, y) {
  const tileSize = canvasSize / generatedGrid.length;

  stroke(255);
  noFill();
  strokeWeight(2);
  ellipse(x * tileSize + 10, y * tileSize + 10, 12, 16);
}
//filling the canvas with '0' and the "c"
function drawZeros(grid) {
  const tileSize = canvasSize / grid.length;

  grid.forEach((row, x) => {
    row.forEach((element, y) => {
      if (element !== "C") {
        createZero(x, y);
      } else {
        stroke(255);
        fill(255);
        ellipse(x * tileSize + 10, y * tileSize + 10, 12, 16);
      }
    });
  });
}

//Adding a count down to create an "end of game" scenario, displayed by a progress-bar
function timer(el) {
  const downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      highScore = currentScoreEl.textContent;
      console.log(highScore);
      highScoreEl.textContent = `Your best score is ${highScore}`;
      if (highScore < currentScoreEl.textContent) {
        let content = { highScore: highScore };

        zlFetch("/dashboard", {
          method: "post",
          body: content,
        }).than((response) => console.log(response));
      }

      noLoop();
      cnv.addClass("hide");
      readyElement.removeClass("hide").addClass("show").html("Game Over!!");
    }
    document.getElementById("progressBar").value = 10 - timeleft;
    timeleft -= 1;
  }, 1000);
}
//Setup function for P5JS
function setup() {
  cnv = createCanvas(canvasSize, canvasSize);
  centerCanvas();
  cnv.parent("canvas-container");

  readyElement = createElement("h1", "READY???");
  readyElement.addClass("show");
  setTimeout(() => {
    readyElement.removeClass("show").addClass("hide");
  }, 2000);
  timer(readyElement);
  // scoreObserver();
  cnv.mouseClicked(locateC);

  frameRate(0.5);
}
// Draw function for P5JS
function draw() {
  createCanvas(canvasSize, canvasSize);
  background(0);
  generatedGrid = generateGrid();
  drawZeros(generatedGrid);
}
