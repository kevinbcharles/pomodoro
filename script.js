var startButton = document.getElementById("start");
var restartButton = document.getElementById("restart");
var modeText = document.getElementById("mode");
var clock = document.getElementById("time");
var workTime = document.getElementById("workTime");
var breakTime = document.getElementById("breakTime");
var status = "stop";
var mode = "WORK";
var time = new Date(null);
var intervalId = 0;
const soundEffect = new Audio();
var audioActive = false

function formatTime(val) {
    return time.toISOString().substr(14,5); // trim date to just show minutes and seconds
}

function stPause() {
    if (audioActive == false) {
        soundEffect.play();
        audioActive = true;
    }
    if(status == "stop"){
        initClock(workTime);
        startClock();
    }else if(status == "running") {
        pauseClock();
    }else if(status == "paused") {
        startClock();
    }
}

function rstart() {
    pauseClock();
    mode = "WORK";
    initClock(workTime);
}

function initClock(val) {
    time.setTime(60000 * val.value);  // use time value user entered or default in ms
    clock.textContent = formatTime(time);  // set clock to starting time
    startButton.textContent = "START";
}

function startClock() {
    startButton.textContent = "PAUSE";
    status = "running";
    modeText.textContent = mode;
    intervalId = setInterval(clockTick, 1000);
}

function clockTick() {
    if (time.getTime() <= 0) {
        clearInterval(intervalId);
        if (mode == "WORK") {
            initClock(breakTime);
            mode = "BREAK";
            soundEffect.src = "meow.mp3";
            soundEffect.play();
            startClock();
        }else {
            initClock(workTime);
            mode = "WORK";
            soundEffect.src = "moo.mp3";
            soundEffect.play();
            startClock();
        }

    }else {
        time.setTime(time.getTime() - 1000);
        clock.textContent = formatTime(time);
    }
}

function pauseClock() {
    status = "paused";
    startButton.textContent = "RESUME";
    clearInterval(intervalId);
}





startButton.addEventListener('click', stPause)
restartButton.addEventListener('click', rstart)