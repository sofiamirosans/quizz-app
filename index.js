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
const Progress = {
  currentQuestion: -1,
  score: 0
};

//starts quizz, guiding the user to the first question 
function startQuizz() {
  $("#progress, #results").hide();
  $("#start button").click(function () {
    $("#total").text(STORE.length);
    $("#start").hide();
    nextQuestion();
    $("#progress").show();
  });
  $(".submit").click(function () {
    nextQuestion();
  });
}

function renderQuestion() {
  $("#current").text(Progress.currentQuestion + 1);
  $("#score").text(Progress.score);
  $("#question").text(STORE[Progress.currentQuestion].Question);
  $("#answers").html(STORE[Progress.currentQuestion].Answers.map(function (answer, id) {
    return `<li><label><input type="radio" name="answer" value="${id}" /> ${answer}</label></li>`;
  }));
}

function showResults() {
  $("#progress").hide();
  $("#corAns").text(Progress.score);
  $("#totAns").text(STORE.length);
  $("#results").show();
}

function nextQuestion() {
  if (Progress.currentQuestion > -1) {
    if ($('[name="answer"]:checked').length === 1) {
      const selId = $('[name="answer"]:checked').val();
      const curQue = STORE[Progress.currentQuestion];
      // alert("Given Option: " + curQue.Answers[selId]);
      if (curQue.CorrectAnswer == selId) {
        alert("Correct!");
        Progress.score++;
      } else {
        alert("Wrong!");
        alert("Correct answer is " + curQue.Answers[curQue.CorrectAnswer]);
      }
      Progress.currentQuestion++;
      if (STORE.length - 1 < Progress.currentQuestion) {
        showResults();
      } else {
        renderQuestion();
      }
    } else {
      alert("Please select an answer.");
    }
  } else {
    Progress.currentQuestion++;
    renderQuestion();
  }
}

//restarts quizz 
function restartQuizz() {
  $(".restart").click(function () {
    Progress.currentQuestion = -1;
    Progress.score = 0;
    $("#start").show();
    $("#progress, #results").hide();
  });
}

function handleQuizz() {
  startQuizz();
  restartQuizz();
}

handleQuizz();