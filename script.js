let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;
let timer = null;
let isRunning = false;
let lapCount = 0;

const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const secondEl = document.querySelector(".second");
const msEl = document.querySelector(".millisecond");
const toggleBtn = document.querySelector(".toggle");
const resetBtn = document.querySelector(".reset");
const lapBtn = document.querySelector(".lap");
const icon = document.querySelector("i");
const lapsUl = document.querySelector(".laps");
const clearLapsBtn = document.querySelector(".clear-laps");
const lapsContainer = document.querySelector(".laps-container");

lapsContainer.style.display = "none";
lapsUl.style.display = "none";

function format(num) {
  return num < 10 ? `0${num}` : num;
}

function startTimer() {
  if (timer) return;

  timer = setInterval(() => {
    millisecond++;
    if (millisecond === 100) {
      millisecond = 0;
      second++;
    }
    if (second === 60) {
      second = 0;
      minute++;
    }
    if (minute === 60) {
      minute = 0;
      hour++;
    }
    updateDisplay();
  }, 10);
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function updateDisplay() {
  hourEl.textContent = format(hour);
  minuteEl.textContent = format(minute);
  secondEl.textContent = format(second);
  msEl.textContent = format(millisecond);
}

function resetTimer() {
  stopTimer();
  hour = minute = second = millisecond = 0;
  updateDisplay();
  icon.classList.remove("fa-pause");
  icon.classList.add("fa-play");
  isRunning = false;
  clearAllLaps();
}

function recordLap() {
  lapCount++;
  const lapTime = `${format(hour)}:${format(minute)}:${format(second)}:${format(
    millisecond
  )}`;

  const li = document.createElement("li");
  li.innerHTML = `
    <span><strong>Lap ${lapCount}:</strong> ${lapTime}</span>
    <button class="delete-lap"><i class="fa-solid fa-trash"></i></button>
  `;

  lapsContainer.style.display = "flex";
  lapsUl.style.display = "block";
  lapsUl.prepend(li);
  clearLapsBtn.style.display = "block";

  li.querySelector(".delete-lap").addEventListener("click", () => {
    li.remove();
    updateLapLabels();
    if (lapsUl.children.length === 0) {
      clearLapsBtn.style.display = "none";
      lapsContainer.style.display = "none";
      lapCount = 0;
    }
  });
}

function updateLapLabels() {
  const lapItems = lapsUl.querySelectorAll("li span");
  let count = lapItems.length;
  lapItems.forEach((span) => {
    const time = span.textContent.split(": ").pop();
    span.innerHTML = `<strong>Lap ${count--}:</strong> ${time}`;
  });
}

function clearAllLaps() {
  lapsUl.innerHTML = "";
  clearLapsBtn.style.display = "none";
  lapsContainer.style.display = "none";
  lapCount = 0;
}

toggleBtn.addEventListener("click", () => {
  if (isRunning) {
    stopTimer();
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
  } else {
    startTimer();
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
  }
  isRunning = !isRunning;
});

resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);
clearLapsBtn.addEventListener("click", clearAllLaps);

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    toggleBtn.click();
  }
  if (e.code === "KeyR") {
    resetBtn.click();
  }
  if (e.code === "KeyL") {
    lapBtn.click();
  }
});
