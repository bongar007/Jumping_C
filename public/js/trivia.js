const random = Math.floor(Math.random() * 5);
const trueButton = document
  .createElement("button")
  .classList.add("true-button", "btn", "btn-info");
const falseButton = document
  .createElement("button")
  .classList.add("false-button", "btn", "btn-info");
const rightAnswerAudio = new Audio("../assets/rightanswer.mp3");
const wrongAnswerAudio = new Audio("../assets/incorrect.swf.mp3");

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
  const question = data.results[random].question;
  console.log(question);
  // $(".question-container").append(
  //   '<h4 class="question-header">Question: </h4><p class="question"> ' +
  //     question +
  //     "</p>"

  // answerButtons();
  // answerClickEvent(data);

  // console.log(response);
};

getQuestionsApi();

// function answerButtons() {
//   $(".question-container").append(trueButton, falseButton);
// }

// function answerClickEvent(data) {
//   const correctAnswer = data.results[randomQuestion].correct_answer;

//   $(".true-button").click((e) => {
//     const currentScore = parseInt($(".score").text());

//     if (correctAnswer === "True") {
//       rightAnswerAudio.play();
//       currentScore = Number(currentScore + 2);
//       $(".score").text(currentScore);
//     } else {
//       wrongAnswerAudio.play();
//       currentScore = Number(currentScore - 2);
//       $(".score").text(currentScore);
//     }
//     getQuestionsApi();
//   });

//   $(".false-button").click((e) => {
//     const currentScore = parseInt($(".score").text());
//     if (correctAnswer === "False") {
//       rightAnswerAudio.play();
//       currentScore = Number(currentScore + 2);
//       $(".score").text(currentScore);
//     } else {
//       wrongAnswerAudio.play();
//       currentScore = Number(currentScore - 2);
//       $(".score").text(currentScore);
//     }
//     getQuestionsApi();
//   });
