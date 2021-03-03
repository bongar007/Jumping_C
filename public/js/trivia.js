const random = Math.floor(Math.random() * 5);
const trueButton = document.querySelector(".true-button");
const falseButton = document.querySelector(".false-button");
const questionContainer = document.querySelector(".question-container");
const scoresContainer = document.querySelector(".scores-container");
const rightAnswerAudio = new Audio("../assets/rightanswer.mp3");
const wrongAnswerAudio = new Audio("../assets/incorrect.swf.mp3");
const questionEl = document.querySelector(".question");
let data;

const getQuestionsApi = async () => {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=5&type=boolean"
  );
  data = await response.json();

  let question = unescape(data.results[random].question);
  console.log(question);
  questionEl.textContent = question;
  answerClickEvent(data);
};

function answerClickEvent(obj) {
  let correctAnswer = obj.results[random].correct_answer;
  let currentScore = Number(currentScoreEl.textContent);
  console.log(correctAnswer);

  function rightAnswer() {
    rightAnswerAudio.play();
    currentScore = currentScore + 2;
    currentScoreEl.textContent = currentScore;
  }
  function wrongAnswer() {
    wrongAnswerAudio.play();
    currentScore = currentScore - 2;
    currentScoreEl.textContent = currentScore;
  }

  function trueBtn() {
    if (correctAnswer === "True") {
      rightAnswer();
    } else {
      wrongAnswer();
    }
    getQuestionsApi();
  }

  trueButton.addEventListener("click", trueBtn, true);

  function falseBtn() {
    if (correctAnswer === "False") {
      rightAnswer();
    } else {
      wrongAnswer();
    }
    getQuestionsApi();
  }

  falseButton.addEventListener("click", falseBtn, true);
}
