document.addEventListener('DOMContentLoaded', () => {
  const templates = {}
  let photos;
  let comments;
  let previous = document.querySelector('a.prev');
  let next = document.querySelector('a.next');
  let currentIndex = 0;
  let commentsForm = document.querySelector('#comments > form');

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
    updateLikeButton(photo.id);
    updateFavoriteButton(photo.id);
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

  function renderComment(newComment) {
    let commentsList = document.querySelector('#comments > ul');
    commentsList.insertAdjacentHTML('beforeend', templates.photo_comment(JSON.parse(newComment)))
  }

  function clearCommentsForm() {
    let commentsForm = document.querySelector('#comments > form');
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('body').value = '';
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
    updateCommentFormId(photoId);
  }

  function updateCommentFormId(id) {
    let input = document.querySelector('#comments > form > fieldset > input[name="photo_id"')
    input.value = id;
  }

  function getNextFigureElement(nextIndex) {
    let nextPhotosId = photos[nextIndex].id;
    let allFigures = Array.prototype.slice.call(document.querySelectorAll('#slides figure'));
    return allFigures.filter(fig => {
      let id = parseInt(fig.dataset.id, 10);
      return nextPhotosId === id;
    })[0];  
  }

  function updateLikeButton(id) {
    let likeButton = document.querySelector('.button.like');
    likeButton.addEventListener('click', event => {
      event.preventDefault();
      let idJSON = JSON.stringify({ 'photo_id': id });

      fetch('/photos/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: idJSON,
      })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        let currentCount = likeButton.textContent.match(/\d+/);
        likeButton.textContent = likeButton.textContent.replace(currentCount, json['total']);
      });
    });
  }

  function updateFavoriteButton(id) {
    let favoriteButton = document.querySelector('.button.favorite');
    let url = favoriteButton.getAttribute('href');
    favoriteButton.addEventListener('click', event => {
      event.preventDefault();
      console.log(id);
      let idJSON = JSON.stringify({ 'photo_id': id});

      let request = new XMLHttpRequest();
      request.open('POST', '/photos/favorite');
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.addEventListener('load', () => {
        let currentCount = favoriteButton.textContent.match(/\d+/);
        let newCount = JSON.parse(request.response);
        favoriteButton.textContent = favoriteButton.textContent.replace(currentCount, newCount['total']);
      });
      request.send('photo_id=' + String(id));
    });

    //   fetch(url, {
    //     method: 'POST',
    //     header: {
    //       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    //     },
    //     body: 'photo_id=' + id,
    //   })
    //   .then(response => response.json())
    //   .then(json => {
    //     console.log(json);
    //   });
    // });
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

  commentsForm.addEventListener('submit', event => {
    event.preventDefault();
    console.log('Click!');
    let data = new FormData(commentsForm);
    data = new URLSearchParams(data);
    let url = '/comments/new';

    let request = new XMLHttpRequest();
    request.open('POST','/comments/new');
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.addEventListener('load', () => {
      console.log(request.response);
      renderComment(request.response);
      clearCommentsForm();
      // need to update comments on page with new comment
    });
    request.send(data.toString());

    // LS solution to fetch
    // fetch(href, {
    //   method: method,
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    //   },
    //   body: new URLSearchParams([...data])
    // })
    // .then(response => response.json())
    // .then(json => {
    //   let commentsList = document.querySelector('#comments ul');
    //   commentsList.insertAdjacentHTML('beforeend', templates.photo_comment(json));
    //   form.reset();
    // });

  });
    



});