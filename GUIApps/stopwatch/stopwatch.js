let clock;
let startStopButton;
let resetButton;

let centiseconds;
let centiInterval;
let centisecondsCount = 0;

let seconds;
let secondsCount = 0;

let minutes;
let minutesCount = 0;

let hours;
let hoursCount = 0;

function updateHours() {
  if (hoursCount < 100) {
    hoursCount += 1;
  } else {
    hoursCount = 0;
  }
  let string = hoursCount < 10 ? '0' + String(hoursCount) : String(hoursCount);
  hours.textContent = string;
}

function updateMinutes() {
  if (minutesCount < 60) {
    minutesCount += 1;
  } else {
    updateHours();
    minutesCount = 0;
  }
  let string = minutesCount < 10 ? '0' + String(minutesCount) : String(minutesCount);
  minutes.textContent = string;
}

function updateSeconds() {
  if (secondsCount < 60) {
    secondsCount += 1;
  } else {
    updateMinutes();
    secondsCount = 0;
  }
  let string = secondsCount < 10 ? '0' + String(secondsCount) : String(secondsCount);
  seconds.textContent = string;
}

function updateCenti() {
  if (centisecondsCount < 60) {
    centisecondsCount += 1;
  } else {
    updateSeconds();
    centisecondsCount = 0;
  }
  let centString = centisecondsCount < 10 ? '0' + String(centisecondsCount) : String(centisecondsCount);
  
  centiseconds.textContent = centString;
}

function startClock() {
  centiInterval = setInterval(updateCenti, 10);
}


document.addEventListener('DOMContentLoaded', () => {
  clock = document.getElementById('clock');
  startStopButton = document.getElementById('start_stop');
  resetButton = document.getElementById('reset');
  centiseconds = document.getElementById('centiseconds');
  seconds = document.getElementById('seconds');
  minutes = document.getElementById('minutes');
  hours = document.getElementById('hours');


  startStopButton.addEventListener('click', event => {
    event.preventDefault();
    console.log('Click!');
    let buttonStatus = startStopButton.className;
    if (buttonStatus === 'start') {
      startClock();
      startStopButton.className = 'stop';
      startStopButton.textContent = 'Stop';
    } else {
      clearInterval(centiInterval);
      startStopButton.className = 'start';
      startStopButton.textContent = 'Start';
    }    
  });

  function resetCounts() {
    centisecondsCount = 0;
    secondsCount = 0;
    minutesCount = 0;
    hoursCount = 0;
  }

  function resetTextContent() {
    centiseconds.textContent = '00';
    seconds.textContent = '00';
    minutes.textContent = '00';
    hours.textContent = '00';
  }

  resetButton.addEventListener('click', event => {
    event.preventDefault();
    clearInterval(centiInterval);
    resetCounts();
    resetTextContent();
    startStopButton.className = 'start';
    startStopButton.textContent = 'Start';


  });
});