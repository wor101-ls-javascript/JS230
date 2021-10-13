// get all 'a' elements from the div id='team'
//  - add event listener for click
//    - override default
//    - open our new html modal ??



$(document).ready(function (){
  let modalTemplate = Handlebars.compile($('#teamMemberModalTemplate').html());


  let teamLinks = $('#team a');
  teamLinks.on('click', function(event) {
    event.preventDefault();
    let name = $(this).children('img').attr('alt');
    let imageLink = $(this).children('img').attr('src');
    let teamMember = {
      name: name,
      imageLink: imageLink,
    }

    $('#team h2').append(modalTemplate(teamMember));

    $('#modal a').on('click', function(event) {
      event.preventDefault();
      $('#modal').remove();
    });
  });


  
});