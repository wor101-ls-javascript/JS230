// let request = new XMLHttpRequest();
// request.open('GET', 'https://api.github.com/repos/rails/rails');
// request.responseType = 'json';

// request.addEventListener('load', event => {
//   // request.response will be the result of parsing the JSON response body
//   // or null if the body couldn't be parsed or another error
//   // occurred.

//   let data = request.response;
// });

// request.send();

// let request = new XMLHttpRequest();
// request.open('POST', 'https://ls-230-web-store-demo.herokuapp.com/v1/products');
// request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
// request.setRequestHeader('Authorization', 'token AUTH_TOKEN');
// let data = {name: 'CatMan', sku: 'CAT', price: 1};
// data = JSON.stringify(data);
// request.send(data);

let request = new XMLHttpRequest();
request.open('DELETE', 'https://ls-230-web-store-demo.herokuapp.com/v1/products/4');
request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
request.setRequestHeader('Authorization', 'token AUTH_TOKEN');
request.send(data);