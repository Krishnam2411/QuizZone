// Constants
const player = document.getElementById("player");
const screen = document.getElementById("screen");
const game = document.getElementById("game");
const Score = document.getElementById("score");
const Lives = document.getElementById("lives");
const alarm = document.getElementById("alarm");
const Time = document.getElementById("time");
const question = document.getElementById("question");
const Option1 = document.getElementById("Option1");
const Option2 = document.getElementById("Option2");
const Option3 = document.getElementById("Option3");
const Option4 = document.getElementById("Option4");
// sounds
const tick = new Audio("/static/sounds/tick.mp3");
const right = new Audio("/static/sounds/positive_beep.mp3");
const wrong = new Audio("/static/sounds/negative_beep.mp3");
const timeUp = new Audio("/static/sounds/time-up.mp3");
const url = window.location.href.split("/");
const category = url[url.length - 1];
let questionSet;

// fetch questions
fetch(`http://127.0.0.1:5000/api/${category}`)
  .then((response) => response.json())
  .then((data) => {
    questionSet = data.response;
  })
  .catch((error) => console.error(error));

let score, lives, time, i, submit, correct;
let playerName = localStorage.getItem("PlayerName");
if (!playerName) playerName = "Guest";
player.innerHTML = playerName;
gameStart();

//creates game starting screen
function gameStart() {
  const screen = document.createElement("div");
  const screenButton = document.createElement("button");
  screen.classList.add("startScreen");
  screenButton.textContent = "Start Game";
  screenButton.classList.add("Button", "start");
  screen.appendChild(screenButton);
  screenButton.addEventListener("click", () => {
    screen.remove();
    initialize();
  });
  document.body.appendChild(screen);
}
//initiates quiz
function initialize() {
  lives = 3;
  score = 0;
  i = 0;
  time = 11;
  submit = false;
  correct = false;
  Option1.addEventListener("click", () => {
    submit = true;
    if (questionSet[i].correct_option == 0) {
      correct = true;
      Option1.classList.add("correct");
    } else {
      correct = false;
      showCorrect(questionSet[i].correct_option);
      Option1.classList.add("incorrect");
    }
  });
  Option2.addEventListener("click", () => {
    submit = true;
    if (questionSet[i].correct_option == 1) {
      correct = true;
      Option2.classList.add("correct");
    } else {
      correct = false;
      showCorrect(questionSet[i].correct_option);
      Option2.classList.add("incorrect");
    }
  });
  Option3.addEventListener("click", () => {
    submit = true;
    if (questionSet[i].correct_option == 2) {
      Option3.classList.add("correct");
      correct = true;
    } else {
      correct = false;
      showCorrect(questionSet[i].correct_option);
      Option3.classList.add("incorrect");
    }
  });
  Option4.addEventListener("click", () => {
    submit = true;
    if (questionSet[i].correct_option == 3) {
      correct = true;
      Option4.classList.add("correct");
    } else {
      Option4.classList.add("incorrect");
      showCorrect(questionSet[i].correct_option);
      correct = false;
    }
  });
  updateScreen();
}
function timer() {
  alarm.classList.remove("timeUp");
  time--;
  Time.innerHTML = `${time}`;
  tick.play();
}
// continuously iterates until game is over
function updateScreen() {
  timer();
  if (time == 0) {
    lives--;
    time = 11;
    alarm.classList.add("timeUp");
    timeUp.play();
    i++;
  }
  if (submit) {
    if (correct) {
      score++;
      correct = false;
      right.play();
    } else {
      lives--;
      wrong.play();
    }
    time = 11;
    i++;
    submit = false;
    Option1.classList.remove("correct", "incorrect");
    Option2.classList.remove("correct", "incorrect");
    Option3.classList.remove("correct", "incorrect");
    Option4.classList.remove("correct", "incorrect");
  }
  if (isGameOver()) {
    gameOver();
    return;
  }
  showScore();
  showLives();
  showProblem();
  setTimeout(updateScreen, 1000);
}
function showScore() {
  Score.innerHTML = `Score : ${score}`;
}
function showLives() {
  Lives.innerHTML = "";
  for (let i = 0; i < lives; i++) {
    Lives.innerHTML += `<img id="heart" src="/static/images/heart.png">`;
  }
}
function showCorrect(option) {
  switch (option) {
    case 0:
      Option1.classList.add("correct");
      break;
    case 1:
      Option2.classList.add("correct");
      break;
    case 2:
      Option3.classList.add("correct");
      break;
    case 3:
      Option4.classList.add("correct");
      break;
  }
}
function showProblem() {
  question.innerHTML = `${questionSet[i].question}`;
  Option1.innerHTML = `${questionSet[i].options[0]}`;
  Option2.innerHTML = `${questionSet[i].options[1]}`;
  Option3.innerHTML = `${questionSet[i].options[2]}`;
  Option4.innerHTML = `${questionSet[i].options[3]}`;
}
function isGameOver() {
  if (i > 9 || lives == 0) return true;
}
//creates gameover screen
function gameOver() {
  let mssg = "";
  if (score == 10) mssg = "Perfect score!";
  else if (score > 6) mssg = "Well played!";
  else if (score > 3) mssg = "Not bad!";
  else mssg = "Keep trying!";
  const screen = document.createElement("div");
  const screenButton = document.createElement("button");
  const retryButton = document.createElement("button");
  screen.classList.add("screen");
  retryButton.textContent = "Play again";
  screenButton.textContent = "New game";
  retryButton.classList.add("Button");
  screenButton.classList.add("Button");
  screen.innerHTML = `<h1 class="screenMessage big">GAME OVER, <span class="Name">${localStorage.getItem(
    "PlayerName"
  )}</Name></h1><span class="screenMessage">Your Score : ${score}</span><h2 class="screenMessage highlight">${mssg}</h2>`;
  screen.appendChild(screenButton);
  screen.appendChild(retryButton);
  retryButton.addEventListener("click", () => {
    window.location.reload();
    screen.remove();
  });
  screenButton.addEventListener("click", () => {
    window.location.href = "/#choose-category";
  });
  document.body.appendChild(screen);
}
