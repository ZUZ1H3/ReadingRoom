let timerId;
let time = 0;
const stopwatch = document.getElementById("stopwatch");
let hour, min, sec;

function printTime() {
    time++;
    stopwatch.innerText = getTimeFormatString();
}

function startClock() {
    stopClock(); // 기존의 간격을 지웁니다. 
    timerId = setInterval(printTime, 1000);
}

function stopClock() {
    clearInterval(timerId);
}

function resetClock() {
    stopClock();
    stopwatch.innerText = "00:00:00";
    time = 0;
}

function getTimeFormatString() {
    hour = parseInt(String(time / (60 * 60)));
    min = parseInt(String((time - hour * 60 * 60) / 60));
    sec = time % 60;
    return (
        String(hour).padStart(2, "0") +
        ":" +
        String(min).padStart(2, "0") +
        ":" +
        String(sec).padStart(2, "0")
    );
} 
