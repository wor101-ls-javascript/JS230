document.addEventListener('DOMContentLoaded', function() {
  let form = document.querySelector('form');
  let input = document.querySelector('#guess');
  let paragraph = document.querySelector('p');
  let link = document.querySelector('a');
  let guessButton = document.querySelector('[type="submit"]');
  let answer;
  let guesses;

  function newGame() {
    guessButton.disabled = false;
    answer = Math.floor(Math.random() * 100) + 1;
    guesses = 0;
    paragraph.textContent = 'Guess a number from 1 to 100';
  }
  
  form.addEventListener('submit', event => {
    event.preventDefault();

    let guess = parseInt(input.value, 10);
    let message;

    guesses += 1;
    
    if (isNaN(guess)) {
      alert('You must enter an integer between 1 and 100');
      message = 'Guess a number from 1 to 100';
    } else if (guess === answer) {
      message = `You guessed it! It took you ${guesses} guesses.`;
      guessButton.disabled = true;
    } else if (guess > answer) {
      console.log(guess + ' is higher than ' + answer);
      message = `My number is lower than ${guess}`;
    } else {
      console.log(guess + ' is lower than ' + answer);
      message = `My number is higher than ${guess}`;
    }
    
    paragraph.textContent = message;
  });

  link.addEventListener('click', event => {
    event.preventDefault();
    newGame();
  });
  
  newGame();
});





