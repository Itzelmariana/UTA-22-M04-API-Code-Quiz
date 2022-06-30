//Disapears Questions
var questions = document.querySelector("#questions").children;
// -->for loop to delete all questions
for (var i = 0; i < questions.length; i++) {
  var question = questions[i];

  question.className = "d-none";
}
//Disapearing timer
var timeRecord = document.querySelector("#time-display");
timeRecord.className = "d-none";

function countdown() {
  var time = parseInt(document.getElementById("timer").textContent);
  time = time - 1;
  document.querySelector("#timer").innerHTML = time;
  var questions = document.querySelector("#questions").children;

  var question1 = questions[0];

  question1.className = "d-block";
  timeRecord.className = "d-block";

  if (time == 0) {
    clearInterval(interval);
  }
}

function startCountdown() {
  interval = setInterval(countdown, 1000);
  var sectionDelete = document.querySelector("section");
  sectionDelete.className = "d-none";
}

var btnStartQuiz = document.querySelector("#start-quiz");
btnStartQuiz.addEventListener("click", startCountdown);
