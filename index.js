//renders quizz questions

$(function renderQuizz() {
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
      Question: "Question 3",
      Answers: [
        "Answer 3-1",
        "Answer 3-2",
        "Answer 3-3",
        "Answer 3-4"
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
      Question: "Question 5",
      Answers: [
        "Answer 5-1",
        "Answer 5-2",
        "Answer 5-3",
        "Answer 5-4"
      ],
      CorrectAnswer: 2
    }];
    const Progress = {
      currentQuestion: -1,
      score: 0
    };
  
    //starts quizz, guiding the user to the first question 
    $(function startQuizz() {
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
     });
  
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
            // show results.
            $("#progress").hide();
            $("#corAns").text(Progress.score);
            $("#totAns").text(STORE.length);
            $("#results").show();
          } else {
            // update question
            $("#current").text(Progress.currentQuestion + 1);
            $("#score").text(Progress.score);
            $("#question").text(STORE[Progress.currentQuestion].Question);
            $("#answers").html(STORE[Progress.currentQuestion].Answers.map(function (answer, id) {
              return `<li><label><input type="radio" name="answer" value="${id}" /> ${answer}</label></li>`
            }));
          }        
        } else {
          alert("Please select an answer.");
        }
      } else {
        Progress.currentQuestion++;
        // update question
        $("#current").text(Progress.currentQuestion + 1);
        $("#score").text(Progress.score);
        $("#question").text(STORE[Progress.currentQuestion].Question);
        $("#answers").html(STORE[Progress.currentQuestion].Answers.map(function (answer, id) {
          return `<li><label><input type="radio" name="answer" value="${id}" /> ${answer}</label></li>`
        }));
      }
    }
  
    //restarts quizz 
    $(function restartQuizz() {
    $(".restart").click(function () {
      Progress.currentQuestion = -1;
      Progress.score = 0;
      $("#start").show();
      $("#progress, #results").hide();
    });
    });
  });
  
  //handleQuizz function 