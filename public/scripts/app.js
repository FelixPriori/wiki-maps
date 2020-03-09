$(() => {

  const $color1 = 'rgba(237, 106, 90, 1)';
  const $color2 = 'rgba(244, 241, 187, 1)';
  const $color3 = 'rgba(155, 193, 188, 1)';
  const $color4 = 'rgba(93, 87, 107, 1)';
  const $color5 = 'rgba(230, 235, 224, 1)';
  const $asidecontent = $('.aside-content');
  const $favourites = $('#favourites');
  const $allMaps = $('#all-maps');
  const $contributions = $('#contributions');
  const $mapForm = $('#new-map_form');
  const $mapButton = $('#new-map_button');
  const $favouritesAside = $('.favourites-aside');
  const $allMapsAside = $('.all-maps-aside');
  const $contributionsAside = $('.contributions-aside');

  const map = L.map('mapid').setView([45.5017, -73.5673], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const popupContent = `
    <form class="marker-form">
      <label for="marker-name">Name</label>
      <input type="text", placeholder="name your marker!"/>
      <label for="marker-img">Image</label>
      <input class="marker-img" type="url", placeholder="img url"/>
      <label for="marker-description">Description</label>
      <textarea class="marker-description" placeholder="desciption"></textarea>
      <input class="submit" type="submit">
      <button class="cancel-button">Cancel</button>
    </form>
  `;

  newMarkerGroup = new L.LayerGroup();
	map.on('click', addMarker);

  function addMarker(click){
    return newMarker = new L.marker(click.latlng, {draggable: 'true'})
      .addTo(map)
      .bindPopup(popupContent)
      .openPopup();
  }

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

  $mapButton.click(() => {
    $mapForm.toggle();
  });

  $favourites.click(() => {
    $asidecontent.addClass('turn-red')
      .removeClass('turn-yellow')
      .removeClass('turn-green');
    $favourites.removeClass('left-border');
    $contributions.addClass('left-border');
    $allMaps.addClass('left-border');
    $contributionsAside.hide();
    $allMapsAside.hide();
    $favouritesAside.show();
  });
  $contributions.click(() => {
    $asidecontent.addClass('turn-yellow')
    .removeClass('turn-red')
    .removeClass('turn-green');
    $contributions.removeClass('left-border');
    $allMaps.addClass('left-border');
    $favourites.addClass('left-border');
    $contributionsAside.show();
    $allMapsAside.hide();
    $favouritesAside.hide();
  });
  $allMaps.click(() => {
    $asidecontent.addClass('turn-green')
    .removeClass('turn-yellow')
    .removeClass('turn-red');
    $allMaps.removeClass('left-border');
    $contributions.addClass('left-border');
    $favourites.addClass('left-border');
    $contributionsAside.hide();
    $allMapsAside.show();
    $favouritesAside.hide();
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
