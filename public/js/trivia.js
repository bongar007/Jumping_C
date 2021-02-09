const randomQuestion = Math.floor(Math.random() * 5);
const trueButton = $("<button>True</button>").addClass("true-button");
const falseButton = $("<button>False</button>").addClass("false-button");
const rightAnswerAudio = new Audio("rightanswer.mp3");
const wrongAnswerAudio = new Audio("incorrect.swf.mp3");

function getQuestionsApi() {
  fetch("https://opentdb.com/api.php?amount=5").then((response) => {
    $(".question-container").empty();
    if (typeof data === "string") {
      data = $.parseJSON(data);
    }
    /// work on this
    const question = data.results[randomQuestion].question;
    console.log(question);
    $(".question-container").append(
      '<h4 class="question-header">Question: </h4><p class="question"> ' +
        question +
        "</p>"
    );
    answerButtons();
    answerClickEvent(data);

    console.log(response);
  });

  getQuestionsApi();

  function answerButtons() {
    $(".question-container").append(trueButton, falseButton);
  }

  function answerClickEvent(data) {
    const correctAnswer = data.results[randomQuestion].correct_answer;

    $(".true-button").click((e) => {
      const currentScore = parseInt($(".score").text());

      if (correctAnswer === "True") {
        rightAnswerAudio.play();
        currentScore = Number(currentScore + 2);
        $(".score").text(currentScore);
      } else {
        wrongAnswerAudio.play();
        currentScore = Number(currentScore - 2);
        $(".score").text(currentScore);
      }
      getQuestionsApi();
    });

    $(".false-button").click((e) => {
      const currentScore = parseInt($(".score").text());
      if (correctAnswer === "False") {
        rightAnswerAudio.play();
        currentScore = Number(currentScore + 2);
        $(".score").text(currentScore);
      } else {
        wrongAnswerAudio.play();
        currentScore = Number(currentScore - 2);
        $(".score").text(currentScore);
      }
      getQuestionsApi();
    });
  }
}
