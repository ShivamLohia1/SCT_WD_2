const displayHours = document.getElementById('hours');
const displayMinutes = document.getElementById('minutes');
const displaySeconds = document.getElementById('seconds');
const displayMilliseconds = document.getElementById('milliseconds');

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');

const lapList = document.getElementById('lapList');

let startTime;
let elapsedTime = 0; 
let timerInterval; 
let isRunning = false; 
let lapCounter = 0;

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10); 

    return {
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        milliseconds: String(milliseconds).padStart(3, '0').slice(0, 3) 
    };
}

function updateDisplay() {
    const time = formatTime(elapsedTime);
    displayHours.textContent = time.hours;
    displayMinutes.textContent = time.minutes;
    displaySeconds.textContent = time.seconds;
    displayMilliseconds.textContent = time.milliseconds;
}

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10); 
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval); 

        startBtn.disabled = false;
        pauseBtn.disabled = true;
        lapBtn.disabled = true; 
    }
}

function resetStopwatch() {
    pauseStopwatch(); 
    elapsedTime = 0;
    lapCounter = 0;
    updateDisplay(); 
    lapList.innerHTML = '';

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

function recordLap() {
    if (isRunning) {
        lapCounter++;
        const lapTimeFormatted = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `
            <span>Lap ${lapCounter}:</span>
            <span>${lapTimeFormatted.hours}:${lapTimeFormatted.minutes}:${lapTimeFormatted.seconds}.${lapTimeFormatted.milliseconds}</span>
        `;
        lapList.prepend(lapItem); 
    }
}

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay(); 
    pauseBtn.disabled = true;
    lapBtn.disabled = true; 
});