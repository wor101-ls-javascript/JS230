// vanilla javascript
let calculatorForm;
let firstNumber;
let secondNumber;
let operator;
let equalButton;
let result;

document.addEventListener('DOMContentLoaded',function() {
  console.log('Hi!');

  calculatorForm = document.querySelector('form');
  firstNumber = document.getElementById('first-number');
  secondNumber = document.getElementById('second-number');
  operator = document.getElementById('operator');
  equalButton = calculatorForm.querySelector('input[type="submit"]');
  result = document.getElementById('result');

  calculatorForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let operand = operator.value;
    let firstValue = parseInt(firstNumber.value, 10);
    let secondValue = parseInt(secondNumber.value, 10);
    
    switch (operand) {
      case '+':
        result.innerHTML = firstValue + secondValue;
        break;
      case '-':
        result.innerHTML = firstValue - secondValue;
        break;
      case '*':
        result.innerHTML = firstValue * secondValue;
        break;
      case '/':
        console.log(firstValue / secondValue);
        if (secondValue === 0) {
          result.innerHTML = 'Cannot divide by 0';
        } else {
          result.innerHTML = firstValue / secondValue;
        }
        
        break;
    }
  });


  // first number input: id='first-number' type="number"
  // operator selec: id='operator'
  // second number input: id='second-number' type='number'
  // equal button input: type='submit'
  // result h1: id="result"

});