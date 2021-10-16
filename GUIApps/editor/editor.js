let menu;
let textarea;

function updateButton(button) {
  button.className = button.className === 'not_selected' ? 'selected' : 'not_selected';
}

function wrapLinkInDiv() {
  let anchors = Array.prototype.slice.call(textarea.querySelectorAll('A'));
  anchors.forEach(anchor => {
    let parent = anchor.parentNode;
    if (parent.getAttribute('contenteditable') === 'true') {
      let wrapper = document.createElement('DIV');
      wrapper.setAttribute('contenteditable', 'false');
      wrapper.className = 'wrapper';
      parent.replaceChild(wrapper, anchor);
      wrapper.appendChild(anchor);
    }
    
  });
}

function implementButtonStyle(button) {
  let style = button.value;

  switch (style) {
    case 'bold':
      document.execCommand('bold');
      break;
    case 'italic':
      document.execCommand('italic');
      break;
    case 'underline':
      document.execCommand('underline');
      break;
    case 'strikethrough':
      document.execCommand('strikeThrough');
      break;
    case 'link':
      let url = 'http://' + prompt('Enter the URL to link to:');
      document.execCommand('createLink', false, url);
      wrapLinkInDiv();
      break;
    case 'ul':
      document.execCommand('insertUnorderedList');
      break;
    case 'ol':
      document.execCommand('insertOrderedList');
      break;
    case 'leftalign':
      document.execCommand('justifyLeft');
      break;
    case 'rightalign':
      document.execCommand('justifyRight');
      break;
    case 'centeralign':
      document.execCommand('justifyCenter');
      break;
    case 'fullyjustified':
      document.execCommand('justifyFull');
      break;
  }
}

function addMenuListeners() {
  menu.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.tagName !== 'BUTTON') {
      return;
    } else {
      updateButton(event.target);
      implementButtonStyle(event.target);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  menu = document.getElementById('menu');
  textarea = document.getElementById('textarea');

  addMenuListeners();
});