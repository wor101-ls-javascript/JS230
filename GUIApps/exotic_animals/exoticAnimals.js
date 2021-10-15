let tooltip;
let tooltipScript;
let tooltipTimeout;

function createToolTip(text) {

}

function handlerIn(event) {
  tooltipTimeout = setTimeout(function() {
    let caption = $(event.target).next().text();
    tooltip = tooltipScript({ 'text': caption });
    $(event.target.parentElement).append(tooltip);
    console.log(tooltip);
    console.log(event.target);
  }, 2000);

}

function handlerOut(event) {
  console.log('Handler Out!');
  let tooltip = $(".tooltip");
  clearTimeout(tooltipTimeout);
  tooltip.remove();
}

$(document).ready((event) => {
  let images = $('#exotic_animals img');
  let template = document.getElementById('tooltip_template');
  tooltipScript = Handlebars.compile($(template).html());
  
  images.hover(handlerIn, handlerOut);
});