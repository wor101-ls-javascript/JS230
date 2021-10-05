// 1. Write some JavaScript code to retrieve a word count for each h2 heading on the page.
let h2Elements = document.getElementsByTagName('H2');
h2Elements = Array.prototype.slice.call(h2Elements);
let h2WordCounts = h2Elements.map(elem => elem.textContent.split(' ').length);
console.log(h2WordCounts);

// 2. The page has a table of contents with the title "Contents" and links to the different content sections on "Naming and etymology," 
// "Taxonomy and evolution," etc.
// Use three different DOM methods to retrieve a reference to the div element that contains the table of contents.
let allDivs = document.getElementsByTagName('DIV');
allDivs = Array.prototype.slice.call(allDivs);
let contentDiv = allDivs.filter(div => div.classList.contains('toc'));

contentDiv = document.querySelector('.toc');
document.getElementById('toc');
document.querySelector('#toc');
document.querySelectorAll('.toc')[0];

// 3. Write some JavaScript code to change the color for every odd indexed link in the table of contents to green.
let links = document.querySelectorAll('.toc a');

for (let index = 0; index < links.length; index += 1) {
  if (index % 2 === 1) {
    links[index].style.color = 'green';
  }
}
// 4. Write some JavaScript code to retrieve the text of every thumbnail caption on the page.

let thumbnailCaptionsElements = document.querySelectorAll('.thumbcaption');
thumbnailCaptionsElements = Array.prototype.slice.call(thumbnailCaptionsElements);
thumbnailCaptionText = thumbnailCaptionsElements.map(elem => elem.textContent.trim());

// 5. You can think of the scientific classification of an animal as a series of key-value pairs. 
// Here, the keys are taxonomic ranks (Domain, Kingdom, Phylum, etc.). 
// The values are the specific groups to which the animal belongs.

// Write JavaScript code that extracts the classification of animals from the web page and logs an Object that uses the ranks as keys and the groups as values. 
// You may assume the taxonomic ranks to use as keys is provided for you as an array.
let ranks = ['Kingdom:', 'Phylum:', 'Class:', 'Order:', 'Family:', 'Genus:', 'Species:'];
let allTR = document.getElementsByTagName('TR');
allTR = Array.prototype.slice.call(allTR);
let classTR = allTR.filter(tr => {
  let td = tr.firstElementChild;
  if (ranks.includes(td.textContent)) {
    return true;
  } else {
    return false;
  }
});

let classification = {};

classTR.forEach(tr => classification[tr.firstElementChild.textContent] = tr.lastElementChild.textContent);