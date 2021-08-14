let startSecs = 0
let passedSecs = 0
let timeoutVar
let timerStarted = false
let intervalCount = 1
let output = document.getElementById("timerOutput")
let message = document.getElementById("messageOutput")
let sound = new Audio('assets/audio/bell.mp3')

// Handling timer running and stopped
function toggleTimer() {
    if (!timerStarted) {
        output.style.color = "#fff"
        output.innerHTML = "00:00" // show 00:00 on stop
        message.innerHTML = "Pomodoro no. " + intervalCount
        startSecs = ~~(Date.now() / 1000)
        timeoutVar = setInterval(stopTime, 1000)
        timerStarted = true
    }
    else {
        output.style.color = "#999"
        clearInterval(timeoutVar)
        timerStarted = false
        output.innerHTML = "00:00"
    }
}

// Monitoring passed time and providing output
function stopTime() {
    passedSecs = ~~(Date.now() / 1000) - startSecs
    let mins, secs
    mins = ~~(passedSecs % 3600 / 60)
    secs = ~~(passedSecs % 60)
    if (mins < 25) { // mins < 25
        output.innerHTML = mins.toString().padStart(2, "0")+":"+secs.toString().padStart(2, "0")
    }
    else {
        output.style.color = "#999"
        output.innerHTML = "25:00"
        clearInterval(timeoutVar)
        timerStarted = false
        if (intervalCount == 1) {
            message.innerHTML = "First pomodoro over,<br>take a little break!"
            intervalCount++
        }
        else if (intervalCount == 2) {
            message.innerHTML = "Second pomodoro over,<br>take a little break!"
            intervalCount++
        }
        else if (intervalCount == 3) {
            message.innerHTML = "Third pomodoro over,<br>take a little break!"
            intervalCount++
        }
        else if (intervalCount == 4) {
            message.innerHTML = "Fourth pomodoro over,<br>take a longer break!"
            intervalCount = 1
        }
        sound.play()
    }
}

// Resetting everything
function reset() {
    clearInterval(timeoutVar)
    timerStarted = false
    intervalCount = 1
    output.style.color = "#999"
    output.innerHTML = "00:00"
    message.innerHTML = "Start your first pomodoro."
}