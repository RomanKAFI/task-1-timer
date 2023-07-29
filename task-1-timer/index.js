const inputEl = document.getElementById("secondsInput");
const startButtonEl = document.getElementById("startButton");
const stopButtonEl = document.getElementById("stopButton");
const resetButtonEl = document.getElementById("resetButton");
const timerEl = document.getElementById("timerDisplay");

let intervalId;
let remainingSeconds = 0;

const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const createTimerAnimator = () => {
  return (seconds) => {
    remainingSeconds = seconds;
    clearInterval(intervalId);

    intervalId = setInterval(() => {
      remainingSeconds--;
      if (remainingSeconds >= 0) {
        timerEl.textContent = formatTime(remainingSeconds);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
  inputEl.value = inputEl.value.replace(/\D/g, "");
});

startButtonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);
  animateTimer(seconds);
  inputEl.value = "";
});

stopButtonEl.addEventListener("click", () => {
  clearInterval(intervalId);
});

resetButtonEl.addEventListener("click", () => {
  clearInterval(intervalId);
  timerEl.textContent = "00:00:00";
  remainingSeconds = 0;
});
