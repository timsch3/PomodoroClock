let startSecs = 0
let passedSecs = 0
let timeoutVar
let timerStarted = false
let intervalCount = 1
let output = document.getElementById("timerOutput")
let message = document.getElementById("messageOutput")
let sound = new Audio('assets/audio/bell.mp3')

function toggleTimer() {
    if (!timerStarted) {
        output.innerHTML = "00:00"
        message.innerHTML = "Pomodoro no. " + intervalCount
        startSecs = ~~(Date.now() / 1000)
        timeoutVar = setInterval(stopTime, 1000)
        timerStarted = true
    }
    else {
        clearInterval(timeoutVar)
        timerStarted = false
        output.innerHTML = "00:00"
    }
}

function stopTime() {
    passedSecs = ~~(Date.now() / 1000) - startSecs
    let mins, secs
    mins = ~~(passedSecs % 3600 / 60)
    secs = ~~(passedSecs % 60)
    if (mins < 25) {
        output.innerHTML = mins.toString().padStart(2, "0")+":"+secs.toString().padStart(2, "0")
    }
    else {
        output.innerHTML = mins.toString().padStart(2, "0")+":"+secs.toString().padStart(2, "0")
        clearInterval(timeoutVar)
        timerStarted = false
        if (intervalCount == 1) {
            message.innerHTML = "First pomodoro over, take a little break!"
            intervalCount++
        }
        else if (intervalCount == 2) {
            message.innerHTML = "Second pomodoro over, take a little break!"
            intervalCount++
        }
        else if (intervalCount == 3) {
            message.innerHTML = "Third pomodoro over, take a little break!"
            intervalCount++
        }
        else if (intervalCount == 4) {
            message.innerHTML = "Fourth pomodoro over, take a longer break!"
            intervalCount = 1
        }
        sound.play()
    }
}

function reset() {
    clearInterval(timeoutVar)
    timerStarted = false
    intervalCount = 1
    output.innerHTML = "00:00"
    message.innerHTML = "Start your first pomodoro."
}