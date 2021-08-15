let startSecs = 0
let passedSecs = 0
let timeoutVar
let timerStarted = false
let intervalCount = 1
let timerOutput = document.getElementById("timerOutput")
let timeLeftOutput = document.getElementById("timeLeftOutput")
let messageOutput = document.getElementById("messageOutput")
let sound = new Audio('assets/audio/bell.mp3')

// Handling timer running and stopped
function toggleTimer() {
    if (!timerStarted) {
        timerOutput.style.color = "#fff"
        timeLeftOutput.style.color = "#999"
        messageOutput.innerHTML = "Pomodoro no. " + intervalCount
        startSecs = ~~(Date.now() / 1000) // get unix time seconds
        timeoutVar = setInterval(stopTime, 1000) // run stopTime() every second
        timerStarted = true
    }
    else { //when user presses stop
        resetDisplay()
        clearInterval(timeoutVar) //stop running stopTime()
        timerStarted = false
    }
}

// Calculating passed/left time and providing output
function stopTime() {
    passedSecs = ~~(Date.now() / 1000) - startSecs
    let mins, secs
    mins = ~~(passedSecs % 3600 / 60)
    secs = ~~(passedSecs % 60)
    if (mins < 25) { // <========== ALWAYS CHANGE BACK TO: mins < 25
        timerOutput.innerHTML = mins.toString().padStart(2, "0") + ":" + secs.toString().padStart(2, "0")
        let minsLeft = 25 - mins
        timeLeftOutput.innerHTML = minsLeft.toString() + " minutes left"
    }
    else { // when an interval is over
        resetDisplay()
        clearInterval(timeoutVar)
        timerStarted = false
        if (intervalCount == 1) {
            messageOutput.innerHTML = "First pomodoro over,<br>take a little break!"
            intervalCount++
        }
        else if (intervalCount == 2) {
            messageOutput.innerHTML = "Second pomodoro over,<br>take a little break!"
            intervalCount++
        }
        else if (intervalCount == 3) {
            messageOutput.innerHTML = "Third pomodoro over,<br>take a little break!"
            intervalCount++
        }
        else if (intervalCount == 4) {
            messageOutput.innerHTML = "Fourth pomodoro over,<br>take a longer break!"
            intervalCount = 1
        }
        sound.play()
    }
}

function resetDisplay() { // Reset output values and colors
    timerOutput.style.color = "#999"
    timeLeftOutput.style.color = "#444"
    timerOutput.innerHTML = "00:00"
    timeLeftOutput.innerHTML = "25 minutes left"
}
function reset() { // Reset everything (when user presses reset)
    resetDisplay()
    clearInterval(timeoutVar)
    timerStarted = false
    intervalCount = 1
    messageOutput.innerHTML = "Start your first pomodoro."
}