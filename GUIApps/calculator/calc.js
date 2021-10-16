let calculator;
let operationWindow;
let entryWindow;
let buttons;
let currentValue;
let displayingCurrentValue = false;

function renderDigit(value) {
  let entryText = entryWindow.textContent;
  if (displayingCurrentValue) {
    entryText = '0';
    displayingCurrentValue = false;
  }

  if (entryText === '0' && value !== '.') {
    entryWindow.textContent = value;
  } else if (value === '.' && entryText.includes('.')) {
    return;
  } else {
    entryWindow.textContent = entryText + value;
  }
}

function calculateCurrentValue(value, operationText, entryText) {
  let entryValue = parseFloat(entryText);
  let previousOperation = operationText.slice(-1);
  if (!currentValue) {
    currentValue = entryValue;
  } else {
    switch (previousOperation) {
      case '/':
        currentValue /= entryValue;
        break;
      case 'x':
        currentValue *= entryValue;
        break;
      case '-':
        currentValue -= entryValue;
        break;
      case '+':
        currentValue += entryValue;
        break;
      case '%':
        currentvalue = ((currentValue % entryValue ) + entryValue ) % entryValue;
        break;
    } 
  }
  console.log(currentValue);
}

function renderOperation(value) {
  let operationText = operationWindow.textContent;
  let entryText = entryWindow.textContent;

  operationWindow.textContent = [operationText, entryText, value].join(' ');
  calculateCurrentValue(value, operationText, entryText);
  entryWindow.textContent = String(currentValue);
  displayingCurrentValue = true;
}

function renderNegative() {
  let entryText = entryWindow.textContent;
  if (entryText === '0') {
    return;
  } else if (entryText.includes('-')) {
    entryWindow.textContent = entryText.replace('-', '');
  } else {
    entryWindow.textContent  = '-' + entryText;
  }
}

function clearEntryWindow() {
  entryWindow.textContent = '0';
}

function clearAll() {
  clearEntryWindow();
  operationWindow.textContent = '';
  currentValue = undefined;
}

function renderNonDigit(value) {
  switch (value) {
    case 'ce':
      clearEntryWindow();
      break;
    case 'c':
      clearAll();
      break;
    case 'neg':
      renderNegative();
      break;
    case '/':
      renderOperation(value);
      break;
    case 'x':
      renderOperation(value);
      break;
    case '-':
      renderOperation(value);
      break;
    case '+':
      renderOperation(value);
      break;
    case '%':
      renderOperation(value);
      break;
    case '=':
      renderOperation(value);
      operationWindow.textContent = '';
      currentValue = 0;
      break;

  }
}

function addButtonEventListeners() {
  calculator.addEventListener('click', event => {
    if (event.target.tagName !== 'BUTTON') {
      return;
    } else {
      let value = event.target.value;
      if ((value >= '0' && value <= '9') || value === '.') {
        renderDigit(value);
      } else {
        renderNonDigit(value);
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  calculator = document.getElementById('calculator');
  operationWindow = document.getElementById('operation_window');
  entryWindow = document.getElementById('entry_window');
  buttons = Array.prototype.slice.call(document.querySelectorAll('button'));

  addButtonEventListeners();
});