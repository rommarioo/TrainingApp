const startLink = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeSelectList = document.querySelector(".time-select-list");
const timePlace = document.querySelector("#time");
const board = document.querySelector(".board");
const colors = [
  "#7e5e3f",
  "#824343",
  "#837c41",
  "#418342",
  "#417983",
  "#414883",
  "#754183",
  "#8c4747",
];
let time = 0;
let score = 0;

startLink.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeSelectList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-select-button")) {
    time = parseInt(event.target.getAttribute("data-time"));
    startGame();
  }
});
board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createCircle();
  }
});
function startGame() {
  screens[1].classList.add("up");
  setInterval(changeTime, 1000);
  createCircle();
  timePlace.textContent = `00:${time}`;
}
function changeTime() {
  if (time === 0) {
    finish();
    setTimeout(() => {
      // location.reload(true);
      location = location;
    }, 4000);
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    timePlace.textContent = `00:${current}`;
  }
}
function finish() {
  timePlace.parentNode.classList.add("hide");
  const getItem = localStorage.getItem("score");

  if (getItem === null) {
    localStorage.setItem("score", score);
  } else if (getItem < score) {
    localStorage.setItem("score", score);
  }
  board.innerHTML = `<h2 class = "textColor">Record: ${getItem} </h2>
                     <h3 class = "textColor">Your score: ${score} </h3>`;
}

function createCircle() {
  const circle = document.createElement("div");
  let sizeCircle = randomNumber(10, 50);

  const { width, height } = board.getBoundingClientRect();
  const x = randomNumber(0, width - sizeCircle);
  const y = randomNumber(0, height - sizeCircle);
  const color = randomNumber(0, colors.length - 1);
  circle.classList.add("circle");
  circle.style.backgroundColor = colors[color];
  circle.style.width = `${sizeCircle}px`;
  circle.style.height = `${sizeCircle}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  board.append(circle);
}
function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
