document.addEventListener('DOMContentLoaded', event => {
  const message = document.getElementById('message');
  const letters = document.getElementById('spaces');
  const guesses = document.getElementById('guesses');
  const apples = document.getElementById('apples');
  const replay = document.getElementById('replay');
  const correctlyGuessedLetter = '*';
  
  // document.addEventListener('keydown', event => {
  //   let key = event.key.toLowerCase();

  //   if (validKey(key) && unusedLetter(key) && guessesRemaining()) {
  //     newGame.letters_guessed.push(key);
  //     console.log(newGame.letters_guessed);
  //     if (newGame.word.includes(key)) {
  //       addLetters(key);

  //     } else {
  //       newGame.incorrect += 1;
  //       apples.className = `guess_${newGame.incorrect}`;
  //     }
  //     newGame.gameStatus();
  //   }

  //});

  // function addLetters(key) {
  //   let spacesArray = Array.prototype.slice.call(letters.querySelectorAll('span'));
  //   newGame.word.forEach((letter, index) => {
  //     if (letter === key) {
  //       spacesArray[index].textContent = key;
  //     }
  //   });
  // }
  

  // function validKey(key) {
  //   return key.match(/[a-z]/) && key.length === 1;
  // }

  // function unusedLetter(key) {
  //   return !newGame.letters_guessed.includes(key);
  // }

  // function guessesRemaining() {
  //   return newGame.allowedWrongGuesses >= 0
  // }


  let randomWord = function() {
    let words = ['apple', 'banana', 'orange', 'pear'];
  
    return function randomWord() {
      let wordsLength = words.length;
      let randomIndex = Math.floor(Math.random() * wordsLength);
      return words.splice(randomIndex, 1);
    }
  }();


  
  
  class Game {
    constructor() {
      this.word = this.getWord().split('');
      this.incorrect = 0;
      this.letters_guessed = [];
      this.correct_spaces = 0;
      this.allowedWrongGuesses = 6;
      this.blanks = this.createSpaces(this.word.length);
      this.listeners();
    }

    listeners() {
      this.keyEvent = this.keydown.bind(this);
      document.addEventListener('keydown', this.keyEvent);
      
      replay.addEventListener('click', this.reset);
    } 
  
    getWord() {
      let word = randomWord()[0];
      if (word) {
        return word;
      } else {
        this.displayMessage("Sorry, I've run out of words");
        return '';
      }
    }
  
    createSpaces(numberOfSpaces) {
      for (let index = 0; index < numberOfSpaces; index += 1) {
        let newSpace = document.createElement('span');
        letters.appendChild(newSpace);
      }      
    }

    displayMessage(text) {
      message.textContent = text;
    }

    gameStatus(){
      if (this.incorrect >= this.allowedWrongGuesses) {
        message.textContent = "Sorry, You're out of guesses";
        replay.hidden = false;
        document.removeEventListener('keydown', this.keyEvent)
      } else if (this.word.every(char => char === correctlyGuessedLetter)) {
        message.textContent = "You won!";
        replay.hidden = false;
        document.removeEventListener('keydown', this.keyEvent)
      }
    }

    keydown(event) {
      function validKey(key) {
        return key.match(/[a-z]/) && key.length === 1;
      }

      function addLetters(key) {
        let letterSpans = Array.prototype.slice.call(letters.querySelectorAll('span'));
        this.word.forEach((char, index) => {
          if (char === key) { 
            letterSpans[index].textContent = key; 
            this.word[index] = correctlyGuessedLetter;
          }
        });
      }

      function updateApples() {
        let apples = document.getElementById('apples');
        apples.className = `guess_${this.incorrect}`
      }

      let key = event.key.toLowerCase();
      if (validKey(key) && !this.letters_guessed.includes(key)) {
        console.log(key);

        this.letters_guessed.push(key);
        if (this.word.includes(key)) {
          addLetters.call(this, key);
        } else {
          this.incorrect += 1;
          updateApples.call(this);
        }
        this.gameStatus.call(this);
      } 
    }

    reset(event) {
      function clearBlanks() {
        let blanks = Array.prototype.slice.call(letters.querySelectorAll('span'));
        blanks.forEach(blank => blank.remove());
      }

      event.preventDefault();
      clearBlanks();
      message.textContent = '';
      replay.hidden = true;

      newGame = new Game();

      // event.preventDefault();
      // this.word = this.getWord();
      // this.incorrect = 0;
      // this.letters_guessed = [];
      // this.correct_spaces = 0;
      // this.allowedWrongGuesses = 6;
      // clearBlanks();
      // this.blanks = this.createSpaces(this.word.length);
      // this.listeners();
    }
  }
  
  let newGame = new Game();
  console.log(newGame.word);
});

