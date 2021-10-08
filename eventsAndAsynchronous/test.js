/*
**Problem**
Implement a function that tracks events on a web page by wrapping a callback function in a function that adds each event to a tracker object 
before invoking the callback. 

In other words, your function should take a callback function as an argument and return a new function that:

  - Records the event.
  - Executes the original callback function.

Use the following markup and sample scenario to ascertain the expected behavior of the tracker object.

Assume:
  - Assume that the user clicks the elements in the following order: div#blue, div#red, div#orange, and div#green.
  - Use the "click" event listeners for the four elements:

Understanding the Problem

- input:

- output:

- model of problem:

**Examples / Test Cases**


**Data Structures**


**Algorithm**
*/
// let newTracker = (function() {
//   let elemArray = [];
//   return {
//     list() {
//       return elemArray.slice();
//     },

//     elements() {
//       return this.list();
//     },

//     clear() {
//       elemArray = [];
//     },

//     add(event) {
//       elemArray.push(event);
//     }
//   };
// });

// let tracker = newTracker();

// function track(callback) {

//   function isTracked(eventItem) {
//     let lastEvent = tracker.elements().reverse()[0];
//     console.log(lastEvent);
//     if (lastEvent === eventItem) {
//       return true;
//     } else {
//       return false;
//     }
//    }


//     return event => {
//       console.log(event);
//       let eventItem =  event.target.tagName.toLowerCase() + '#' + event.target.id;
//       if (!isTracked(eventItem)) {
//         tracker.add(eventItem);
//       }       
//       console.log(tracker.list());

//       callback(event);
//     };
  


  
//   // record event
//   // execute call back
// }

// const divRed = document.getElementById('red');
// const divBlue = document.getElementById('blue');
// const divOrange = document.getElementById('orange');
// const divGreen = document.getElementById('green');

// divRed.addEventListener('click', track.call(divRed, event => {
//   document.body.style.background = 'red';
// }));

// console.log(divBlue);
// divBlue.addEventListener('click', track(event => {
//   event.stopPropagation();
//   document.body.style.background = 'blue';
// }));

// divOrange.addEventListener('click', track(event => {
//   document.body.style.background = 'orange';
// }));

// divGreen.addEventListener('click', track(event => {
//   document.body.style.background = 'green';
// }));


const divRed = document.querySelector('#red');
const divBlue = document.querySelector('#blue');
const divOrange = document.querySelector('#orange');
const divGreen = document.querySelector('#green');

const tracker = (() => {
  const events = [];
  return {
    list() {
      return events.slice();
    },
    elements() {
      return this.list().map(({target}) => target);
    },
    add(event) {
      events.push(event);
    },
    clear() {
      events.length = 0;
      return events.length;
    },
  };
})();

function track(callback) {
  function isEventTracked(events, event) {
    return events.includes(event);
  }

  return event => {
    if (!isEventTracked(tracker.list(), event)) {
      tracker.add(event);
    }
    console.log(event);
    console.log(tracker.elements());
    callback(event);
  };
}

divRed.addEventListener('click', track(event => {
  document.body.style.background = 'red';
}));

divBlue.addEventListener('click', track(event => {
  event.stopPropagation();
  document.body.style.background = 'blue';
}));

divOrange.addEventListener('click', track(event => {
  document.body.style.background = 'orange';
}));

divGreen.addEventListener('click', track(event => {
  document.body.style.background = 'green';
}));