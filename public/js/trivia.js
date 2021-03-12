const random = Math.floor(Math.random() * 5);
const trueButton = document.querySelector(".true-button");
const falseButton = document.querySelector(".false-button");
const questionContainer = document.querySelector(".question-container");
const scoresContainer = document.querySelector(".scores-container");
const rightAnswerAudio = new Audio("../assets/rightanswer.mp3");
const wrongAnswerAudio = new Audio("../assets/incorrect.swf.mp3");
const questionEl = document.querySelector(".question");
const correctAnswerEl = document.querySelector(".correct-answers");
const incorrectAnswerEl = document.querySelector(".incorrect-answers");
const resultsPercentEl = document.querySelector(".results-percent");

let data;
let correct = 0;
let incorrect = 0;
let answerCount = 0;

const getQuestionsApi = async () => {
  try {
    let response = await fetch(
      "https://opentdb.com/api.php?amount=1&type=boolean"
    );
    data = await response.json();
    let question = data.results[0].question;
    questionEl.innerHTML = question; //Use innerHTML to "decode" the text coming from API. TextContent will insert the escaped characters
    return data;
  } catch (err) {
    console.error(err, `Something went wrong when you requested`);
  }
};
getQuestionsApi().then((data) => {
  /////passing data to the click event handler function
  answerClickEvent(data);
});

function answerClickEvent(obj) {
  let correctAnswer = obj.results[0].correct_answer;
  // let currentScore = Number(currentScoreEl.textContent);

  console.log(correctAnswer);

  function rightAnswer() {
    rightAnswerAudio.play();
    score = score + 2;
    correct++;
    currentScoreEl.textContent = score;
    return correct;
  }
  function wrongAnswer() {
    wrongAnswerAudio.play();
    score = score - 2;
    incorrect++;
    currentScoreEl.textContent = score;
    return incorrect;
  }

  function trueBtn() {
    answerCount++;
    if (correctAnswer === "True") {
      rightAnswer();
    } else {
      wrongAnswer();
    }
    getQuestionsApi();
  }

  trueButton.addEventListener("click", trueBtn);

  function falseBtn() {
    answerCount++;
    if (correctAnswer === "False") {
      rightAnswer();
    } else {
      wrongAnswer();
    }
    getQuestionsApi();
  }

  falseButton.addEventListener("click", falseBtn);

  return answerCount;
}
