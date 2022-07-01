if (!localStorage.getItem("highscores")) {
  localStorage.setItem("highscores", JSON.stringify([]));
}

var score = {
  total: 0,
};

function populateScores() {
  var highscoresStored = document.querySelector("#result");
  highscoresStored.innerHTML = "";

  let scoreHistory = JSON.parse(localStorage.getItem("highscores"));

  for (var i = 0; i < scoreHistory.length; i++) {
    var si = scoreHistory[i];
    var element = document.createElement("p");
    element.textContent = si.initials + "-" + si.score;
    highscoresStored.appendChild(element);
  }
}
function clearHighscores(event) {
  localStorage.setItem("highscores", JSON.stringify([]));
  populateScores();
}

function hideHighscores() {
  var scores = document.querySelector("#highscores");
  scores.className = "d-none";
}

function showHome() {
  hideQuestions();
  hideHighscores();
  hideTimer();

  document.querySelectorAll("section,nav").forEach(function (node) {
    node.classList.remove("d-none");
  });
}
document.querySelector("#clear").addEventListener("click", clearHighscores);
document.querySelector("#goback").addEventListener("click", showHome);
document
  .querySelector("#view-scores")
  .addEventListener("click", showHighscores);

//Disapears Questions
function hideQuestions() {
  var questions = document.querySelector("#questions").children;
  // -->for loop to delete all questions
  for (var i = 0; i < questions.length; i++) {
    var question = questions[i];
    question.className = "d-none";
  }
}
hideQuestions();

//Disapearing timer
hideTimer();

//Disapearing gameover
var gameover = document.querySelector("#gameover");
gameover.className = "d-none";

//Disapearing scores
var highscores = document.querySelector("#highscores");
highscores.className = "d-none";

// We use this variable to keep track of which
// question is being answered.
var currentQuestion = 0;

// Timer stuff
function getTimer() {
  return parseInt(document.getElementById("timer").textContent);
}

function setTimer(val) {
  document.querySelector("#timer").innerHTML = val;
}

function showTimer() {
  var timeRecord = document.querySelector("#time-display");
  timeRecord.className = "d-block";
}

function hideTimer() {
  var timeRecord = document.querySelector("#time-display");
  timeRecord.className = "d-none";
}

function countdown() {
  setTimer(Math.max(getTimer() - 1, 0));

  if (getTimer() <= 0) {
    endGame();
  }
}

function setScore(totalScore) {
  document.querySelector(".final-score").innerHTML = totalScore;
}

function endGame() {
  clearInterval(interval);
  setScore(score.total);
  // show gameover
  var gameover = document.querySelector("#gameover");
  gameover.className = "d-block";

  hideQuestions();
}

function handleAnswerClick(event) {
  console.log(event);
  var classes = event.target.classList;
  var isCorrect = false;
  for (var i = 0; i < classes.length; i++) {
    var className = classes[i];
    if ("correct" === className) {
      isCorrect = true;
    }
  }
  var questions = document.querySelector("#questions").children;
  var questionN = questions[currentQuestion];
  if (isCorrect) {
    score.total += 20;
  } else {
    setTimer(Math.max(getTimer() - 10, 0));
  }

  if (currentQuestion + 1 < questions.length) {
    var questionN = questions[currentQuestion];
    var hr = document.createElement("hr");
    var result = document.createElement("p");
    result.className = "answer-result";

    if (isCorrect) {
      result.textContent = "Correct";
    } else {
      result.textContent = "Incorrect";
    }

    setTimeout(function () {
      questionN.className = "d-none";
      currentQuestion = currentQuestion + 1;
      var questions = document.querySelector("#questions").children;
      var question1 = questions[currentQuestion];
      question1.className = "d-block";
    }, 1000);
    questionN.appendChild(hr);
    questionN.appendChild(result);
  } else {
    endGame();
  }
}

function startCountdown() {
  currentQuestion = 0;
  interval = setInterval(countdown, 1000);
  score = { total: 0 };
  setTimer(50);
  var nodesWithFeedback = Array.from(document.querySelectorAll("p"))
    .filter(
      (el) => el.textContent === "Correct" || el.textContent === "Incorrect"
    )
    .concat(Array.from(document.querySelectorAll("hr")));

  //+ Array.from(document.querySelectorAll("hr"));
  for (var i = 0; i < nodesWithFeedback.length; i++) {
    console.log(nodesWithFeedback);
    nodesWithFeedback[i].remove();
  }
  var sectionDelete = document.querySelector("section");
  sectionDelete.className = "d-none";
  showTimer();
  document.querySelector("#questions").children[0].className = "d-block";
}

function showHighscores() {
  populateScores();
  // show scores
  endGame();
  hideQuestions();

  var highscoreShow = document.querySelector("#highscores");
  highscoreShow.className = "d-block";

  // hide everything else
  var hideNav = document.querySelector("nav");
  hideNav.className = "d-none navbar navbar-light bg-light";
  var gameover = document.querySelector("#gameover");
  gameover.className = "d-none";

  document.querySelector("section").className = "d-none";
}

function storeInitials(event) {
  event.preventDefault();
  console.log(event);
  var inputInitials = document.querySelector("#input-initials").value;

  var storedScores = localStorage.getItem("highscores");
  console.log("Stored scores", storedScores);

  var parsedScores = JSON.parse(storedScores);
  console.log("Parsed scores", parsedScores);

  parsedScores.push({
    initials: inputInitials,
    score: score.total,
  });
  console.log("Parsed scores after adding", parsedScores);
  localStorage.setItem("highscores", JSON.stringify(parsedScores));

  showHighscores();
}

var btnInitials = document.querySelector("#submit-btn");
btnInitials.addEventListener("click", storeInitials);

var inputtext = document.querySelector("#input-initials");
const enterKey = 13;
inputtext.addEventListener("keyup", function (event) {
  if (event.keyCode === enterKey) {
    event.preventDefault();
    document.getElementById("submit-btn").click();
  }
});

var btnStartQuiz = document.querySelector("#start-quiz");
btnStartQuiz.addEventListener("click", startCountdown);

var btnAnswers = document.querySelectorAll("li");
for (var i = 0; i < btnAnswers.length; i++) {
  var btnAnswer = btnAnswers[i];
  btnAnswer.addEventListener("click", handleAnswerClick);
}
