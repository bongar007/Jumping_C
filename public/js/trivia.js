const random = Math.floor(Math.random() * 5);
let trueButton = document.createElement("button");
trueButton.classList.add("true-button", "btn", "btn-success");
let falseButton = document.createElement("button");
falseButton.classList.add("false-button", "btn", "btn-danger");
let questionContainer = document.querySelector(".question-container");
let rightAnswerAudio = new Audio("../assets/rightanswer.mp3");
let wrongAnswerAudio = new Audio("../assets/incorrect.swf.mp3");
let questionEl = document.querySelector(".question");

const getQuestionsApi = async () => {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=5&type=boolean"
  );
  const data = await response.json();
  console.log(data);
  // $(".question-container").empty();
  // if (typeof data === "string") {
  //   data = $.parseJSON(data);
  // }
  /// work on this
  let question = data.results[random].question;
  console.log(question);
  questionEl.textContent = question;
  questionContainer.append(trueButton, falseButton);
  trueButton.textContent = "True";
  falseButton.textContent = "False";

  answerClickEvent(data);
};

getQuestionsApi();

function answerClickEvent(data) {
  let correctAnswer = data.results[random].correct_answer;
  let currentScore = Number(currentScoreEl.textContent);
  console.log(correctAnswer);

  trueButton.click((e) => {
    console.log(e);
    if (correctAnswer === "True") {
      rightAnswerAudio.play();
      currentScore = currentScore + 2;
      currentScoreEl.textContent = currentScore;
    } else {
      wrongAnswerAudio.play();
      currentScore = currentScore - 2;
      currentScoreEl.textContent = currentScore;
    }
    getQuestionsApi();
  });

  falseButton.click((e) => {
    console.log(e);
    if (correctAnswer === "False") {
      rightAnswerAudio.play();
      currentScore = currentScore + 2;
      currentScoreEl.textContent = currentScore;
    } else {
      wrongAnswerAudio.play();
      currentScore = currentScore - 2;
      currentScoreEl.textContent = currentScore;
    }
    getQuestionsApi();
  });
}
