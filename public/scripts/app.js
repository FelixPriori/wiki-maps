$(() => {

  const map = L.map('mapid').setView([45.5017, -73.5673], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const marker = L.marker([45.5017, -73.5673], {draggable: 'true'}).addTo(map)
    .bindPopup('This is a test');
  marker.on('dragend', function(event){
    var marker = event.target;
    var position = marker.getLatLng();
    marker.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
    map.panTo(new L.LatLng(position.lat, position.lng))
  });

  $login = $('#login');
  $logout = $('#logout');
  $register = $('#register');
  $welcome = $('#welcome-message');

  $login.click(() => {
    $login.hide();
    $register.hide();
    $logout.show();
    $welcome.show();
  });

  $logout.click(() => {
    $login.show();
    $register.show();
    $logout.hide();
    $welcome.hide();
  });


  const $color1 = 'rgba(237, 106, 90, 1)';
  const $color2 = 'rgba(244, 241, 187, 1)';
  const $color3 = 'rgba(155, 193, 188, 1)';
  const $color4 = 'rgba(93, 87, 107, 1)';
  const $color5 = 'rgba(230, 235, 224, 1)';
  const $asidecontent = $('.aside-content');
  const $favourites = $('#favourites');
  const $allMaps = $('#all-maps');
  const $contributions = $('#contributions');

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
