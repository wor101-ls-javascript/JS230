let form;
let inputs;
let error;

function validateInput(input) {
  if (input.type === 'submit') return;
  input.setCustomValidity('');
  if (input.checkValidity()) {
    input.className = '';
    let errorLabel = form.querySelector(`label[for="${input.name}"].error`);
    errorLabel.textContent = '';
  }
}

function setCustomValidityMessage(input, event) {
  let inputId = input.id || input.name;
  switch (inputId) {
    case 'first_name':
      if (input.validity.patternMismatch) {
        input.setCustomValidity('First Name must only consist of letters.')
      } else {
        input.setCustomValidity('First Name is a required field.')
      }      
      break;
    case 'last_name':
      if (input.validity.patternMismatch) {
        input.setCustomValidity('Last Name must only consist of letters.');
      } else {
        input.setCustomValidity('Last Name is a required field.');
      }      
      break;
    case 'email':
      if (input.validity.patternMismatch) {
        input.setCustomValidity('Please enter a valid Email.');
      } else {
        input.setCustomValidity('Email is a required field.');
      }
      break;
    case 'password':
      if (input.validity.tooShort) {
        input.setCustomValidity('Password must be at least 10 characters.')
      } else {
        input.setCustomValidity('Password is a required field.');
      }
      break;
    case 'credit1':
        input.setCustomValidity('Each entry must be 4 digits long.')
      break;
    case 'credit2':
      input.setCustomValidity('Each entry must be 4 digits long.')
      break;
    case 'credit3':
      input.setCustomValidity('Each entry must be 4 digits long.')
      break;
    case 'credit4':
      input.setCustomValidity('Each entry must be 4 digits long.')
    break;
  }
}

function addBlurListenerToInputs() {
  inputs.forEach(input => {

    if (input.type !== 'submit') {
      input.addEventListener('blur', event => {
        event.stopPropagation();
        validateInput(event.target);

        let submitError = document.getElementById('submit_error');
        if (submitError.textContent !== '') {
          if (validateAllFields()) {
            submitError.textContent = '';
          }
        }
      });
    }
  });
}

function showError(input) {
  error.textContent = input.validationMessage;
}

function addInvalidListenerstoInputs() {
  inputs.forEach(input => {

    if (input.type !== 'submit') {
      input.addEventListener('invalid', event => {
        let errorLabel = form.querySelector(`label[for="${input.name}"].error`);
        setCustomValidityMessage(input, event)
        errorLabel.textContent = input.validationMessage;
        input.className = 'input_error';
      });
    }
  });
}

function validateAllFields() {
  let allValid = true;
  inputs.forEach(input => {
    if (input.type !== 'submit' && !input.checkValidity()) {
      allValid = false;
    }
  });
  return allValid;
}

// function getCreditCardValue() {
//   let creditNumbers = Array.prototype.slice.call(form.querySelectorAll('input[name="creditcard"]'));
//   let fullNumber = '';
//   creditNumbers.forEach(elem => fullNumber += elem.value);
// }

function addFormSubmitListener() {
  form.addEventListener('submit', event => {
    if (!validateAllFields()) {
      event.preventDefault();
      document.getElementById('submit_error').textContent = 'Form cannot be submitted until errors are corrected.';
    } else {
      event.preventDefault();
      let block = document.getElementById('serialized');
      let data = new FormData(form);
      let creditNumber = data.getAll('creditcard').join('');
      data.delete('creditcard');
      data.append('creditcard', creditNumber);
      let dataURL = new URLSearchParams(data);
      block.textContent = dataURL.toString();
    
    }
  });  
}

function addFocusListenerstoInputs() {
  inputs.forEach(input => {
    if (input.type !== 'submit') {
      input.addEventListener('focus', event => {
        input.className = '';
        let errorLabel = form.querySelector(`label[for="${input.name}"].error`);
        errorLabel.textContent = '';
      });
    }
  });
}

function addNameValidationListener() {
  let firstName = document.getElementById('first_name');
  let lastName = document.getElementById('last_name');

  [firstName, lastName].forEach(name => {
    name.addEventListener('keypress', event => {
      if (!event.key.match(/[a-zA-Z]/)) {
        event.preventDefault();
      }
    });
  });
}

function addPhoneValidationListener() {
  let phone = document.getElementById('phone');
  phone.addEventListener('keypress', event => {
    if (event.key.match(/\D/)) {
      event.preventDefault();
    }
  });
}

function addCreditcardValidationListener() {
  let creditcard = Array.prototype.slice.call(document.querySelectorAll('input[name="creditcard"]'));

  creditcard.forEach(elem => {
    elem.addEventListener('keypress', event => {
      if (event.key.match(/\D/)) {
        event.preventDefault();
      }
    });
  });
}

function addCreditcardFocusListener() {
  let credit1 = document.getElementById('credit1');
  let credit2 = document.getElementById('credit2');
  let credit3 = document.getElementById('credit3');

  [credit1, credit2, credit3].forEach(elem => {
    elem.addEventListener('keyup', event => {
      if (elem.value.length >= 4) {
        elem.nextElementSibling.focus();
      }
    });
  });
}

function addFormListeners() {
  addBlurListenerToInputs();
  addInvalidListenerstoInputs();
  addFormSubmitListener()
  addFocusListenerstoInputs();
  addNameValidationListener();
  addPhoneValidationListener();
  addCreditcardValidationListener();
  addCreditcardFocusListener();
}

function setFirstNameValidationRequirements() {
  let firstName = document.getElementById('first_name');
  firstName.setAttribute('required', 'true');
  firstName.setAttribute('pattern', '^[a-zA-Z]+$');
}

function setLastNameValidationRequirements() {
  let lastName = document.getElementById('last_name');
  lastName.setAttribute('required', 'true');
  lastName.setAttribute('pattern', '^[a-zA-Z]+$');
}

function setEmailValidationRequirements() {
  let email = document.getElementById('email');
  email.setAttribute('required', 'true');
  email.setAttribute('pattern', '.+@.+');
}

function setPasswordValidationRequirements() {
  let password = document.getElementById('password');
  password.setAttribute('required', 'true');
  password.setAttribute('minlength', '10');
}

function setCreditcardValidationRequirements() {
  let creditcard = Array.prototype.slice.call(document.querySelectorAll('input[name="creditcard"]'));
  
  creditcard.forEach(elem => {
    elem.setAttribute('minLength', '4');
    elem.setAttribute('maxLength', '4');
  });
}

function addFormValidationRequirements() {
  form.setAttribute('novalidate', 'true');
  setFirstNameValidationRequirements();
  setLastNameValidationRequirements();
  setEmailValidationRequirements();
  setPasswordValidationRequirements();
  setCreditcardValidationRequirements();
}


document.addEventListener('DOMContentLoaded', () => {
  form = document.getElementById('signup_form');
  inputs = Array.prototype.slice.call(document.querySelectorAll('input'));
  error = document.querySelector('span.error');

  addFormValidationRequirements();
  addFormListeners();  
});