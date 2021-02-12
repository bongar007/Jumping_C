let cnv;
let generatedGrid = [];
let readyElement;
let score = 0;
let highScore = 0;
const bennyHill = new Audio("../assets/Benny-hill-theme.mp3");
const currentScoreEl = document.querySelector(".current-score");
const highScoreEl = document.querySelector(".high-score");
const canvasSize = 500;
const nav = document.querySelector("nav");

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = windowHeight - height + 100;
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
//passing it the readyEl, and data obj from the trivia API
function timer(el, data) {
  //Calling to Trivia API and activating the answer buttons
  nav.classList.add("hide");
  getQuestionsApi();
  bennyHill.play();

  //Setting up count down with progress bar
  let current_progress = 0;
  const downloadTimer = setInterval(function () {
    current_progress++;
    const progressBar = document.getElementById("dynamic");
    progressBar.style.width = `${current_progress * 10}%`;
    progressBar.setAttribute("aria-valuenow", current_progress);
    progressBar.textContent = `${10 - current_progress}`;

    //Once time runs out:
    if (current_progress >= 10) {
      clearInterval(downloadTimer);
      bennyHill.pause();
      //Setting up for sending higScore to DB
      highScore = currentScoreEl.textContent;
      highScoreEl.textContent = `Your best score is ${highScore}`;

      //Options for req.body
      let content = { highScore: highScore };
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      };

      //Sending Highscore to DB
      const sendingHighScore = async function () {
        const response = await fetch("/users/api", options);
        const highScoreData = await response.json();
      };
      //Calling all relevant functions once timer hits 0
      sendingHighScore();
      noLoop();
      cnv.addClass("hide");
      questionContainer.classList.add("hide");
      scoresContainer.classList.remove("col-md-6");
      readyElement.removeClass("hide").addClass("show").html("Game Over!!");
      readyElement.position(0, height - 100);
    }
  }, 1000);
}
//Setup function for P5JS
function setup() {
  cnv = createCanvas(canvasSize, canvasSize);
  windowResized();
  cnv.parent("canvas-container");

  readyElement = createElement("h1", "READY???");
  readyElement.addClass("show get-ready");
  readyElement.position(0, height - 100);
  setTimeout(() => {
    timer(readyElement), readyElement.removeClass("show").addClass("hide");
  }, 2000);

  cnv.mouseClicked(locateC);

  frameRate(0.5);
}
// Draw function for P5JS
function draw() {
  cnv;
  background(0);
  generatedGrid = generateGrid();
  drawZeros(generatedGrid);
}
