const questions = [
  {
    id: 1,
    description: "Who is the author of <cite>The Hitchhiker's Guide to the Galaxy</cite>?",
    options: ['Dan Simmons', 'Douglas Adams', 'Stephen Fry', 'Robert A. Heinlein'],
  },
  {
    id: 2,
    description: 'Which of the following numbers is the answer to Life, the \
                  Universe and Everything?',
    options: ['66', '13', '111', '42'],
  },
  {
    id: 3,
    description: 'What is Pan Galactic Gargle Blaster?',
    options: ['A drink', 'A machine', 'A creature', 'None of the above'],
  },
  {
    id: 4,
    description: 'Which star system does Ford Prefect belong to?',
    options: ['Aldebaran', 'Algol', 'Betelgeuse', 'Alpha Centauri'],
  },
];

const answerKey = { '1': 'Douglas Adams', '2': '42', '3': 'A drink', '4': 'Betelgeuse' };

let quizComplete = false;

function addNamesToRadios() {
  let radios = Array.prototype.slice.call(document.querySelectorAll('input[type="radio"]'));

  radios.forEach(radio => {
    radio.name = radio.parentNode.id;
  });
}

function renderQuestions() {
  let questionTemplate = document.querySelector('script.question');
  let questionScript = Handlebars.compile(questionTemplate.innerHTML);

  let questionElements = questionScript({ 'questions': questions });

  document.querySelector('form').innerHTML = questionElements;
  addNamesToRadios();
}

function gradeQuiz(userAnswers) {
  Object.keys(answerKey).forEach(key => {
    let correctAnswer = answerKey[key];
    let userAnswer = userAnswers[key];
    let result = document.getElementById(key).querySelector('p[name="result"]');

    if (correctAnswer === userAnswer) {
      result.textContent = 'Correct Answer';
      result.className = 'correct';
    } else {
      result.textContent = `Wrong answer. The correct answer is: "${correctAnswer}".`
      result.className = 'wrong';
    }
    result.hidden = false;

  })

}

function addSubmitListener() {
  let submit = document.querySelector('input[type="submit"]');
  submit.addEventListener('click', event => {
    event.preventDefault();

    if (quizComplete) return;  
    let formData = new FormData(document.querySelector('form'));
    let dataObj = {};
    formData.forEach((value, key) => {
      dataObj[key] = value;
    });
    console.log(dataObj);
    gradeQuiz(dataObj);
    quizComplete = true;
  });
}

function addResetListener() {
  let reset = document.querySelector('button.reset');
  reset.addEventListener('click', event => {
    event.preventDefault();
    let results = document.querySelectorAll('p[name="result"]');
    results.forEach(result => {
      result.className = '';
      result.hidden = true;
    });

    let radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => radio.checked = false);

    quizComplete = false;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('hi!');

  renderQuestions();
  addSubmitListener();
  addResetListener();
});