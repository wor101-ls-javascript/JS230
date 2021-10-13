let thumbnails;
let figures;

function setActiveThumbnail(block) {
  thumbnails.removeClass('active');
  thumbnails.filter((index, thumb) => $(thumb).attr('data-block') === block).addClass('active');
}

function setActiveFigure(block) {
  figures.map(function(index, fig) {
    if ($(fig).attr('data-block') === block) {
      $(fig).show(1000);
    } else {
      $(fig).hide();
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  thumbnails = $('li img');
  figures = $('figure');

  thumbnails.on('click', function() {
    let block = $(this).attr('data-block');
    setActiveThumbnail(block);
    setActiveFigure(block);
  });
});