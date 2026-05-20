// QUIZ QUESTIONS
const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Logic", "Home Tool Markup Language"],
    correct: 0
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["<!-- -->", "** **", "//", "## ##"],
    correct: 2
  },
  {
    question: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"],
    correct: 1
  },
  {
    question: "Which tag is used to link a CSS file in HTML?",
    options: ["<style>", "<css>", "<link>", "<script>"],
    correct: 2
  },
  {
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Management", "Display Output Method", "Document Oriented Markup"],
    correct: 0
  }
];

// VARIABLES
let currentQuestion = 0;
let score = 0;

// SCREENS
let startScreen = document.getElementById("start-screen");
let questionScreen = document.getElementById("question-screen");
let resultScreen = document.getElementById("result-screen");

// BUTTONS
let startBtn = document.getElementById("start-btn");
let restartBtn = document.getElementById("restart-btn");

// START QUIZ
startBtn.addEventListener("click", function() {
  startScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  loadQuestion();
});

// LOAD QUESTION
function loadQuestion() {
  let q = questions[currentQuestion];

  document.getElementById("question-number").textContent = "Question " + (currentQuestion + 1) + " of 5";
  document.getElementById("score-display").textContent = "Score: " + score;
  document.getElementById("question-text").textContent = q.question;

  let optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  for (let i = 0; i < q.options.length; i++) {
    let btn = document.createElement("button");
    btn.textContent = q.options[i];
    btn.classList.add("option-btn");
    btn.addEventListener("click", function() {
      checkAnswer(i, btn);
    });
    optionsContainer.appendChild(btn);
  }
}

// CHECK ANSWER
function checkAnswer(selected, btn) {
  let correct = questions[currentQuestion].correct;

  // Disable all buttons
  let allBtns = document.querySelectorAll(".option-btn");
  allBtns.forEach(function(b) {
    b.disabled = true;
  });

  if (selected === correct) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
    allBtns[correct].classList.add("correct");
  }

  // Wait 1 second then go to next question
  setTimeout(function() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

// SHOW RESULT
function showResult() {
  questionScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  document.getElementById("final-score").textContent = "You scored " + score + " out of 5";

  if (score === 5) {
    document.getElementById("result-message").textContent = "Perfect Score! 🏆";
  } else if (score >= 3) {
    document.getElementById("result-message").textContent = "Good Job! 👏";
  } else {
    document.getElementById("result-message").textContent = "Keep Practicing! 💪";
  }
}

// RESTART
restartBtn.addEventListener("click", function() {
  currentQuestion = 0;
  score = 0;
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});