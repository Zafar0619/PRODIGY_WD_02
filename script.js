let intervalId;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

const display = document.getElementById("display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const lapTimesList = document.getElementById("lap-times");

startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLapTime);

function startStopwatch() {
  startTime = new Date().getTime() - elapsedTime;
  intervalId = setInterval(updateDisplay, 1000);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
}

function pauseStopwatch() {
  clearInterval(intervalId);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function resetStopwatch() {
  clearInterval(intervalId);
  elapsedTime = 0;
  lapTimes = [];
  display.textContent = "00:00:00";
  lapTimesList.innerHTML = "";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function recordLapTime() {
  const lapTime = formatTime(elapsedTime);
  lapTimes.push(lapTime);
  const li = document.createElement("li");
  li.textContent = lapTime;
  lapTimesList.appendChild(li);
}

function updateDisplay() {
  elapsedTime = new Date().getTime() - startTime;
  display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(number) {
  return (number < 10 ? "0" : "") + number;
}
