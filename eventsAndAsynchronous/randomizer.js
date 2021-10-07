/*
**Problem**
Write a randomizer function that accepts n callbacks and calls each callback at some random point in time between now and 2 * n seconds from now. 
For instance, if the caller provides 5 callbacks, the function should run them all sometime within 10 seconds.

While running, randomizer should log the elapsed time every second: 1, 2, 3, ..., 2 * n.

Understanding the Problem

- input:
  - an undefined number of callback functions
  
- output:
  - execute each callback at a random time

- model of problem:
  - count the # of callbacks
  - multiple # of callbacks by 2 to get max time before each callback must be called (5 callbacks, must all be called within 10 secs)
  - create array of integers from 1 up to max callback time
  - for each callback, 
    - generate a random number between 0 and inclusive of 9
    - splice in the callback at the random # without deleting any elements
  - iterate over the array
    - if the element is a an integer, trigger a setTimeout for 1 second that will log the integer
    - else invoke the callback

**Examples / Test Cases**


**Data Structures**


**Algorithm**
*/

function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

// function generateInts(max) {
//   let intArray = [];

//   for (let index = 1; index <= max; index += 1) {
//     intArray.push(index);
//   }
//   return intArray;
// }



// function randomizer(...callbacks) {
//   let maxTime = callbacks.length * 2;
//   let timeOutArray = generateInts(maxTime);

//   callbacks.forEach(callback => {
//     let index = Math.floor(Math.random() * maxTime);
//     timeOutArray.splice(index, 0, callback);
//   });

//   let currentIndex = 0;
//   let id = setInterval(() => {
//     while (typeof timeOutArray[currentIndex] === 'function') {
//       timeOutArray[currentIndex]();
//       currentIndex += 1;
//     }

//     if (typeof timeOutArray[currentIndex] === 'number') {
//       console.log(timeOutArray[currentIndex]);
//       currentIndex += 1;
//     }
//   }, 1000);

//   setTimeout(() => {clearInterval(id)}, 1000 * (maxTime + 1));
// }

function randomizer(...callbacks) {
  if (callbacks.length < 1) {
    return undefined;
  }

  let maxTime = callbacks.length * 2;
  let currentTime = 0;

  let timeLogger = setInterval(() => {
    currentTime += 1;
    console.log(currentTime);

    if (currentTime >= maxTime) {
      clearInterval(timeLogger);
    }
  }, 1000);

  callbacks.forEach(callback => {
    let randomTime = Math.floor(Math.random() * maxTime * 1000);
    setTimeout(() => {
      callback();
    }, randomTime);
  });
}


randomizer(callback1, callback2, callback3);

// Output:
// 1
// 2
// "callback2"
// 3
// "callback3"
// 4
// 5
// "callback1"
// 6