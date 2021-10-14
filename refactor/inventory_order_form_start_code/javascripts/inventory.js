var inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function() {
      var date = new Date();
      document.querySelector('#order_date').textContent = (date.toUTCString());
      // $("#order_date").text(date.toUTCString());
    },
    cacheTemplate: function() {
      let inventory = document.getElementById('inv_item');
      this.invTemplate = Handlebars.compile(inventory.innerHTML);

      // var $iTmpl = $("#inventory_item").remove();
      // this.template = $($iTmpl).html();
    },
    add: function() {
      this.lastId++;
      var item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1
      };
      this.collection.push(item);

      return item;
    },
    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },
    get: function(id) {
      var found_item;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          found_item = item;
          return false;
        }
      });

      return found_item;
    },
    update: function(tableRow) {
      //let tableRow = $item[0];
      var id = this.findID(tableRow),
          item = this.get(id);

      item.name = tableRow.querySelector("[name^=item_name]").value;    
      //item.name = $item.find("[name^=item_name]").val();

      item.stock = tableRow.querySelector("[name^=item_stock_number]").value;
      //item.stock_number = $item.find("[name^=item_stock_number]").val();
      
      item.quantity = tableRow.querySelector("[name^=item_quantity]").value;
      //item.quantity = $item.find("[name^=item_quantity]").val();
    },
    newItem: function(e) {
      e.preventDefault();
      var item = this.add();
      //    $item = $(this.template.replace(/ID/g, item.id));

      let newItem = this.invTemplate(item);
      let newTR = document.createElement('TR');
      newTR.innerHTML = newItem;

      document.getElementById('inventory').appendChild(newTR);

      //$("#inventory").append($item);
    },
    findParent: function(e) {
      let currentNode = e.target;

      while (currentNode.tagName !== 'TR') {
        currentNode = currentNode.parentNode;
      }
      return currentNode;
      //return $(e.target).closest("tr");
    },
    findID: function(item) {
      return parseInt(item.querySelector('input[type=hidden]').value, 10);
      // console.log(item);
      // return +$item.find("input[type=hidden]").val();$item.find("input[type=hidden]").val();
    },
    deleteItem: function(e) {
      e.preventDefault();
      let item = this.findParent(e).cloneNode(true);
      this.findParent(e).remove();
      //var $item = this.findParent(e).remove();

      this.remove(this.findID(item));
    },
    updateItem: function(e) {
      let item = this.findParent(e);

      //var $item = $(this.findParent(e));

      this.update(item);
    },
    bindEvents: function() {
      let self = this;
      document.querySelector("#add_item").addEventListener('click', function(event) {
        self.newItem(event);
      });
      //$("#add_item").on("click", $.proxy(this.newItem, this));

      document.querySelector("#inventory").addEventListener('click', function(event) {
        if (event.target.classList.contains('delete')) {
          event.preventDefault();
          self.deleteItem.call(self, event);
          //self.findParent(event).remove();
        }
      });

     document.querySelector("#inventory").addEventListener('focusout', self.updateItem.bind(self));
      //$("#inventory").on("blur", ":input", $.proxy(this.updateItem, this));
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

document.addEventListener('DOMContentLoaded', event => inventory.init.bind(inventory)());


// $($.proxy(inventory.init, inventory));
