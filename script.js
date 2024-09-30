let timerInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const timerDisplay = document.getElementById('timer-display');
const lapList = document.getElementById('lap-list');

document.getElementById('start-timer').addEventListener('click', startTimer);
document.getElementById('pause-timer').addEventListener('click', pauseTimer);
document.getElementById('reset-timer').addEventListener('click', resetTimer);
document.getElementById('lap-timer').addEventListener('click', recordLap);

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 10);
        isRunning = true;
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    timerDisplay.textContent = '00 : 00 : 00 : 000';
    lapList.innerHTML = ''; // Clear lap times
}

function updateTimer() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    const totalMilliseconds = elapsedTime % 1000;
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);

    timerDisplay.textContent = `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)} : ${pad(totalMilliseconds)}`;
}

function pad(value) {
    return value < 10 ? '0' + value : value;
}

function recordLap() {
    if (isRunning) {
        const lapTime = timerDisplay.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}
