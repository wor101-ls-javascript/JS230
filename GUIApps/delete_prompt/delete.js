todo_items = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Calling Mom' },
  { id: 4, title: 'Coffee with John '}
];

let selectedTodo;
let todos;
let popup;
let contextMenu;


function setDeleteButtonEvents() {
  let deleteButtons = Array.prototype.slice.call(document.querySelectorAll('button.delete'));
  deleteButtons.forEach(button => {
    button.addEventListener('click', event => {
      selectedTodo = event.target.parentNode;
      popup.className = 'show';
    });
  });
}

function contextMenuDeleteListener() {
  let deleteLink = contextMenu.querySelector('a[name="delete"]');
  deleteLink.addEventListener('click', event => {
    event.preventDefault();
    popup.className = 'show'
    contextMenu.className = 'hide';
  })
}

function contextMenuListeners() {
  todos.forEach(todo => {
    todo.addEventListener('contextmenu', event => {
      event.preventDefault();
      if (contextMenu.className === 'hide') {
        contextMenu.style.left = event.clientX + 'px';
        contextMenu.style.top = event.clientY + 'px';
        contextMenu.className = 'show';
        if (event.target.tagName === 'DIV') {
          selectedTodo = event.target;
        } else {
          selectedTodo = event.target.parentElement;
        }
      } else if (contextMenu.className === 'show') {
        contextMenu.className = 'hide';
      }
    });
  });

}

function renderTodos(){
  let todoTemplate = document.getElementById('todoTemplate');
  let todoScript = Handlebars.compile(todoTemplate.innerHTML);
  contextMenu = document.getElementById('context-menu');

  let todoHTML = todoScript({ 'todos': todo_items });
  document.getElementById('todos').innerHTML = todoHTML;
  todos = Array.prototype.slice.call(document.querySelectorAll('div.todo'));
  setDeleteButtonEvents();
  contextMenuListeners();
  contextMenuDeleteListener();
}

function deleteConfirmationListeners() {
  let yesButton = document.getElementById('yes');
  let noButton = document.getElementById('no');

  yesButton.addEventListener('click', event => {
    selectedTodo.remove();
    popup.className = 'hide';
  });

  noButton.addEventListener('click', event => {
    popup.className = 'hide';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Hi!');
  popup = document.getElementById('delete_confirmation');
  renderTodos();
  deleteConfirmationListeners();
});