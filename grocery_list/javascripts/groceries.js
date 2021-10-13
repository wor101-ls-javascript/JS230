// - Add an event handler for the submit event on the form.
//    - add button input: type='submit'  

// - Retrieve the item name and value from the form elements.
//    - item name input: type='text' id='name'
//    - quantity input: type='text' id='quantity'

// - Use a quantity of 1 if the quantity field is left empty.

// - Create a new list item object using the name and quantity as strings.
//    - ul id='grocery-list'

// - Add the list item to the grocery list portion of the HTML.
// - Clear the form's contents.

document.addEventListener('DOMContentLoaded', function() {
  let addItemForm = document.querySelector('form');

  addItemForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let itemNameElement = document.getElementById('name');
    let itemName = itemNameElement.value;

    let quantityElement = document.getElementById('quantity');
    let quantity = parseInt(quantityElement.value, 10) || 1;
   
    let newListItem = document.createElement('li');
    newListItem.textContent = quantity + ' ' + itemName;

    document.getElementById('grocery-list').appendChild(newListItem);

    itemNameElement.value = '';
    quantityElement.value = '';
  });
});

/*
(function groceryListManager() {
  class GroceryList {
    constructor(listContainerElement) {
      this.list = document.querySelector(listContainerElement);
    }

    addItem(name, quantity) {
      var listItem = document.createElement("li");
      listItem.append(`${quantity} ${name}`);

      this.list.append(listItem);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector("form");
    let myGroceryList = new GroceryList("#grocery-list");
    const getValueOf = (selector) => form.querySelector(selector).value;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      let name = getValueOf("#name");
      let quantity = getValueOf("#quantity") || "1";

      myGroceryList.addItem(name, quantity);
      form.reset();
    });
  });
})();
*/