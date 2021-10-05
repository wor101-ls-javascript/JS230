// background color #c0f0c0

let html = document.firstElementChild;
let body = document.getElementsByTagName('body')[0];
console.log(body);

let main = document.querySelector("main");
console.log(main);
let header = document.querySelector("body > header");
let nav = document.getElementsByTagName('NAV')[0];
let h1 = document.getElementsByTagName('H1')[0];
let babyFigure = document.getElementsByTagName('FIGURE')[0];
let content = document.getElementById('content');
let figures = Array.prototype.slice.call(document.getElementsByTagName('FIGURE'));
let images = Array.prototype.slice.call(document.getElementsByTagName('IMG'));

// append header element to body BEFORE the 'main' element
body.insertBefore(header, main);

// append h1 element in header BEFORE NAV
header.insertBefore(h1, nav);

// append babyFigure to end of content
content.appendChild(babyFigure);

// fix background color of figure elements
figures.forEach(fig => fig.style.background = '#c0f0c0');

// fix background color of img elements
images.forEach(img => img.style.background = '#c0f0c0')


// // LS School Solution
// let header = document.querySelector("body > header");
// let h1 = document.querySelector("main > h1");
// header.insertBefore(h1, header.firstChild);
// document.body.insertBefore(header, document.body.firstChild);

// let [ chinStickFigure, babyMopFigure ] = document.querySelectorAll("figure");

// let babyMopImage = chinStickFigure.querySelector("img");
// let chinStickImage = babyMopFigure.querySelector("img");
// chinStickFigure.insertBefore(chinStickImage, chinStickFigure.firstChild);
// babyMopFigure.insertBefore(babyMopImage, babyMopFigure.firstChild);

// let article = document.querySelector("article");
// article.insertBefore(chinStickFigure, null);
// article.insertBefore(babyMopFigure, null);