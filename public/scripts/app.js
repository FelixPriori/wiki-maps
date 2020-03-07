$(() => {

  const $color1 = 'rgba(237, 106, 90, 1)';
  const $color2 = 'rgba(244, 241, 187, 1)';
  const $color3 = 'rgba(155, 193, 188, 1)';
  const $color4 = 'rgba(93, 87, 107, 1)';
  const $color5 = 'rgba(230, 235, 224, 1)';
  const $asidecontent = $('.aside-content');
  const $favourites = $('#favourites');
  const $allMaps = $('#all-maps');
  const $contributions = $('#contributions')

  $favourites.click(() => {
    $asidecontent.addClass('turn-red')
      .removeClass('turn-yellow')
      .removeClass('turn-green');
    $favourites.removeClass('left-border');
    $contributions.addClass('left-border');
    $allMaps.addClass('left-border');
  });
  $contributions.click(() => {
    $asidecontent.addClass('turn-yellow')
    .removeClass('turn-red')
    .removeClass('turn-green');
    $contributions.removeClass('left-border');
    $allMaps.addClass('left-border');
    $favourites.addClass('left-border');
  });
  $allMaps.click(() => {
    $asidecontent.addClass('turn-green')
    .removeClass('turn-yellow')
    .removeClass('turn-red');
    $allMaps.removeClass('left-border');
    $contributions.addClass('left-border');
    $favourites.addClass('left-border');
  });


  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
