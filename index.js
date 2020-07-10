const STORE = [{
  Question: "What is the capital of Spain?",
  Answers: [
    "Madrid",
    "Valencia",
    "San Sebastián",
    "Barcelona"
  ],
  CorrectAnswer: 0
}, {
  Question: "When did the Spanish Civil War began?",
  Answers: [
    "1941",
    "1936",
    "1931",
    "1945"
  ],
  CorrectAnswer: 1
}, {
  Question: "Who is the current president of Spain?",
  Answers: [
    "Pablo Iglesias",
    "Pablo Casado",
    "Santiago Abascal",
    "Pedro Sánchez"
  ],
  CorrectAnswer: 3
}, {
  Question: "When was America discovered by Columbus?",
  Answers: [
    "1500",
    "1530",
    "1492",
    "1498"
  ],
  CorrectAnswer: 2
}, {
  Question: "Where were the 1992 Olympic Games held in Spain?",
  Answers: [
    "Bilbao",
    "Madrid",
    "Barcelona",
    "Valencia"
  ],
  CorrectAnswer: 2
}];

let score = 0;
let questionNum = -1;

function renderQuizz() {
  $("#progress, #results").hide();
}

function clickStart() {
  $("#start button").click(function () {
    questionNum++;
    renderQuestion();
    $("#total").text(STORE.length);
    $("#start").hide();
    $("#progress").show();
  });
}

function renderQuestion() {
  $("#current").text(questionNum + 1);
  $("#score").text(score);
  $("#question").text(STORE[questionNum].Question);
  $("#answers").html(getQuestionHtml());
}

function getQuestionHtml() {
  return STORE[questionNum].Answers.map(function (answer, id) {
    return `<li><label><input type="radio" name="answer" value="${id}" /> ${answer}</label></li>`;
  });
}

function submitQuestion() {
  $(".submit").click(function () {
    nextQuestion();
  });
}

function correctAnswer() {
  alert("Correct!");
  updateScore();
}

function wrongAnswer(curQue) {
  alert("Wrong! Correct answer is " + curQue.Answers[curQue.CorrectAnswer]);
}

function answerSelected() {
  const selId = $('[name="answer"]:checked').val();
  const curQue = STORE[questionNum];
  if (curQue.CorrectAnswer == selId) {
    correctAnswer();
  } else {
    wrongAnswer(curQue);
  }
  updateQuestionNum();
  if (STORE.length - 1 < questionNum) {
    showResults();
  } else {
    renderQuestion();
  }
}

function nextQuestion() {
  if (questionNum > -1) {
    if ($('[name="answer"]:checked').length === 1) {
      answerSelected();
    } else {
      alert("Please select an answer.");
    }
  } else {
    updateQuestionNum();
    renderQuestion();
  }
}

function updateQuestionNum() {
  questionNum++;
}

function updateScore() {
  score++;
}

function showResults() {
  $("#progress").hide();
  $("#corAns").text(score);
  $("#totAns").text(STORE.length);
  $("#results").show();
}

function restartQuizz() {
  $(".restart").click(function () {
    questionNum = -1;
    score = 0;
    $("#start").show();
    $("#progress, #results").hide();
  });
}

$(function () {
  renderQuizz();
  clickStart();
  submitQuestion();
  restartQuizz();
});