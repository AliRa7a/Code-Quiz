import questions from './questions.js';

let currentQuestionIndex = 0;
let time = 60;
let timerInterval;
let userScore;

const startButton = document.getElementById("start");
const timerElement = document.getElementById("time");
const questionTitleElement = document.getElementById("question-title");
const choicesElement = document.getElementById("choices");
const endScreenElement = document.getElementById("end-screen");
const finalScoreElement = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit");
const feedbackElement = document.getElementById("feedback");

// Function to play sounds
function playSound(filename) {
  const audio = new Audio(`./assets/sfx/${filename}`);
  audio.play();
}

function startQuiz() {
  document.getElementById("start-screen").classList.add("hide");
  document.getElementById("questions").classList.remove("hide");

  timerInterval = setInterval(function () {
    time--;
    timerElement.textContent = time;

    if (time <= 0) {
      endQuiz();
    }
  }, 1000);

  showQuestion();
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  questionTitleElement.textContent = currentQuestion.question;
  choicesElement.innerHTML = "";

  currentQuestion.choices.forEach(function (choice) {
    const button = document.createElement("button");
    button.textContent = choice;
    button.addEventListener("click", function () {
      checkAnswer(choice);
    });
    choicesElement.appendChild(button);
  });
}

const feedbackTextElement = document.getElementById("feedback-text");

function checkAnswer(selectedAnswer) {
  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  if (isCorrect) {
    feedbackTextElement.textContent = "Correct!";
    playSound("correct.wav");
  } else {
    feedbackTextElement.textContent = "Incorrect!";
    time -= 10; // Subtract 10 seconds for incorrect answer
    timerElement.textContent = time; // Update the displayed time
    playSound("incorrect.wav");
  }

  document.getElementById("feedback").classList.remove("hide");

  // Display the feedback for a short duration
  setTimeout(() => {
    document.getElementById("feedback").classList.add("hide");
    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
      endQuiz();
    } else {
      showQuestion();
    }
  }, 500);
}

function endQuiz() {
  clearInterval(timerInterval);

  document.getElementById("questions").classList.add("hide");
  endScreenElement.classList.remove("hide");

  userScore = time;
  finalScoreElement.textContent = userScore;
}

submitButton.addEventListener("click", function () {
  const initials = initialsInput.value;

  // Save the score and initials to localStorage
  const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscores.push({ initials: initials, score: userScore });
  localStorage.setItem("highscores", JSON.stringify(highscores));

  // After saving, navigate to the highscores page
  window.location.href = "highscores.html";
});

startButton.addEventListener("click", startQuiz);
