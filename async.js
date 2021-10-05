// setTimeout(() => {
//   console.log('!');
// }, 3000);

// setTimeout(() => {
//   console.log('World');
// }, 1000);

// console.log('Hello');

// 1. Write a JavaScript function named delayLog that loops through the numbers from 1 to 10, 
// and logs each number after that number of seconds. It should log 1 after 1 second, 2 after 2 seconds, etc. 
// Note that the computation of the time is not dependent on when a previous number was logged. 
// This means that for 10 numbers a total of 10 seconds would have passed.

// function makeLogger(number) {
//   return function() {
//     console.log(number);
//   }
// }

// function delayLog() {
//   let counter = 1;

//   do {
//     let logger = makeLogger(counter);
//     setTimeout(logger, counter * 1000);
//     counter += 1;
//   } while (counter <= 10);
  
// }

// delayLog();

// 2. In what sequence will the JavaScript runtime run the following lines of code? Number them from 1-8 to show the order of execution.

// setTimeout(() => {        // 1
//   console.log('Once');    // 5
// }, 1000);

// setTimeout(() => {        // 2
//   console.log('upon');
// }, 3000);                 // 7

// setTimeout(() => {        // 3
//   console.log('a');
// }, 2000);                 // 6

// setTimeout(() => {        // 4
//   console.log('time');
// }, 4000);                 // 8

// 3. In what sequence does the JavaScript runtime run the functions q, d, n, z, s, f, and g in the following code?

// setTimeout(() => {
//   setTimeout(() => {
//     q();              // 35 mil = 7
//   }, 15);

//   d();                // 10 mil = 3

//   setTimeout(() => {
//     n();
//   }, 5);              // 15 mil = 5

//   z();                // 10 mil = 4
// }, 10);

// setTimeout(() => {
//   s();                // 20 mil = 6
// }, 20);

// setTimeout(() => {
//   f();                // 0 mill = 2
// });

// g();                  // 0 mill = 1

// 4. Write a function named afterNSeconds that takes two arguments: a callback and a time duration in seconds. 
// The function should wait for the indicated period, then invoke the callback function.

// function afterNSeconds(callback, time) {
//   setTimeout(callback, time * 1000);
// }

// 1. Write a function named startCounting that logs a number to the console every second, starting with 1. 
// Each number should be one greater than the previous number.
// let makeUpdateCount = function(number) {
//   return function() {
//     console.log(number);
//     number += 1;
//   }
// }
// function startCounting() {
//   let count = 1;
//   let updateCount = makeUpdateCount(count);
//   setInterval(updateCount, 1000);
// }

// startCounting();

// // LS answer

let counterId;

function startCounting() {
  let count = 0;
  counterId = setInterval(() => {
    count += 1;
    console.log(count);
  }, 1000);
}

function stopCounting() {
  clearInterval(counterId)
}
