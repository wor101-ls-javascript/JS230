document.addEventListener('DOMContentLoaded', () => {
  const templates = {}
  let photos;
  let comments;
  let previous = document.querySelector('a.prev');
  let next = document.querySelector('a.next');
  let currentIndex = 0;

  document.querySelectorAll("script[type='text/x-handlebars']").forEach(tmpl => {
    templates[tmpl["id"]] = Handlebars.compile(tmpl["innerHTML"]);
  });

  document.querySelectorAll("[data-type=partial]").forEach(tmpl => {
    Handlebars.registerPartial(tmpl["id"], tmpl["innerHTML"]);
  });

  function renderPhotos() {
    let slides = document.getElementById('slides');
    slides.insertAdjacentHTML('beforeend', templates.photos({ photos: photos } ));
  }

  function renderPhotoInformation(id) {
    let photo = photos.filter(photo => photo.id === id)[0];
    let header = document.querySelector("section > header");
    header.insertAdjacentHTML('beforeend', templates.photo_information(photo));
  }

  function clearPhotoInformation() {
    let header = document.querySelector("section > header");
    while (header.firstChild) {
      header.removeChild(header.firstChild);
    }

  }

  function renderComments() {
    let commentsList = document.querySelector('#comments > ul');
    commentsList.insertAdjacentHTML('beforeend', templates.photo_comments({ comments: comments }))
  }

  function clearComments() {
    let commentsList = document.querySelector('#comments > ul');
    while (commentsList.firstChild) {
      commentsList.removeChild(commentsList.firstChild);
    }
  }

  function getComments(photoId) {
    fetch(`/comments?photo_id=${photoId}`)
    .then(response => response.json())
    .then(json => {
      comments = json;
      renderComments();
    });
  }

  function getNextFigureElement(nextIndex) {
    let nextPhotosId = photos[nextIndex].id;
    let allFigures = Array.prototype.slice.call(document.querySelectorAll('#slides figure'));
    return allFigures.filter(fig => {
      let id = parseInt(fig.dataset.id, 10);
      return nextPhotosId === id;
    })[0];  
  }

  fetch('/photos')
    .then(response => response.json())
    .then(json => {
      photos = json;
      renderPhotos();
      renderPhotoInformation(photos[0].id);
      getComments(photos[0].id);
    })

  previous.addEventListener('click', event => {
    event.preventDefault();

    let currentFigure = Array.prototype.slice.call(document.querySelectorAll('#slides figure'))[currentIndex];
    let id = parseInt(currentFigure.dataset.id, 10);

    let nextIndex;

    if (currentIndex <= 0) {
      nextIndex = photos.length -1;
    } else {
      nextIndex = currentIndex - 1;
    }

    let nextFigure = getNextFigureElement(nextIndex);
    let nextPhotosId = photos[nextIndex].id;

    currentFigure.className = 'hide';
    nextFigure.className = 'show';
     currentIndex = nextIndex;
    clearPhotoInformation();
    renderPhotoInformation(nextPhotosId);

        // update comments
        clearComments();
        getComments(nextPhotosId);

  });
  
  next.addEventListener('click', event => {
    event.preventDefault();
    // get current element display != none || figure where display = block
    
    let currentFigure = Array.prototype.slice.call(document.querySelectorAll('#slides figure'))[currentIndex];
    let id = parseInt(currentFigure.dataset.id, 10);
    

    //find index of photo with id in the photos array
    let nextIndex;

    if (currentIndex >= photos.length - 1) {
      nextIndex = 0;
    } else {
      nextIndex = currentIndex + 1;
    }
    // find next figure element with id that matches next photos id in the array
    let nextPhotosId = photos[nextIndex].id;
    let nextFigure = getNextFigureElement(nextIndex);

    // hide current figure using and unhide next figure
    currentFigure.className = 'hide';
    nextFigure.className = 'show';
     currentIndex = nextIndex;
    clearPhotoInformation();
    renderPhotoInformation(nextPhotosId);

    // update comments
    clearComments();
    getComments(nextPhotosId);

    
  });





});