let cursorId;

function toggleCursor() {
  let textField = document.querySelector('.text-field');
  textField.classList.toggle('cursor');
}

document.addEventListener('DOMContentLoaded', ()=> {
  let textField = document.querySelector('.text-field');

  
  textField.addEventListener('click', event => {
    event.stopPropagation();
    textField.classList.add('focused');
    if (cursorId) {
      clearInterval(cursorId);
      textField.classList.remove('cursor');
      cursorId = undefined;
    } else {
      cursorId = setInterval(toggleCursor, 500);
    }
  });
});

document.addEventListener('click', event => {
  let textField = document.querySelector('.text-field');
  textField.classList.remove('focused');
  if (cursorId) {
    clearInterval(cursorId);
    textField.classList.remove('cursor');
    cursorId = undefined;
  }
});

document.addEventListener('keydown', event => {
  let textField = document.querySelector('.text-field');
  let content = document.querySelector('.content');

  if (textField.classList.contains('focused')) {
    if (event.key === 'Backspace') {
      content.textContent = content.textContent.slice(0, -1);
    } else if (event.key.length === 1) {
      content.textContent += event.key;
    }    
  }
});

