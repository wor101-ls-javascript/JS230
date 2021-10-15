const cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];
let carsList = document.getElementById('cars');

function renderCarListItems() {
  let carTemplate = document.getElementById('car_template');
  let carScript = Handlebars.compile(carTemplate.innerHTML);
  carsList.innerHTML = carScript({ 'cars': cars });

}

function renderSelectOptions() {
  let makeTemplate = document.getElementById('make_options_template');
  let modelTemplate = document.getElementById('model_options_template');
  let yearTemplate = document.getElementById('year_options_template');
  let priceTemplate = document.getElementById('price_options_template');

  let makeScript = Handlebars.compile(makeTemplate.innerHTML);
  let modelScript = Handlebars.compile(modelTemplate.innerHTML);
  let yearScript = Handlebars.compile(yearTemplate.innerHTML);
  let priceScript = Handlebars.compile(priceTemplate.innerHTML);

  let carsData = { 'cars': cars };
  document.getElementById('make').insertAdjacentHTML('beforeend', makeScript(carsData));
  document.getElementById('model').insertAdjacentHTML('beforeend', modelScript(carsData));
  document.getElementById('year').insertAdjacentHTML('beforeend', yearScript(carsData));
  document.getElementById('price').insertAdjacentHTML('beforeend', priceScript(carsData));

}

document.addEventListener('DOMContentLoaded', () => {
  renderCarListItems();
  renderSelectOptions();
});