$(document).ready(() => {
  const $color1 = "rgba(237, 106, 90, 1)";
  const $color2 = "rgba(244, 241, 187, 1)";
  const $color3 = "rgba(155, 193, 188, 1)";
  const $color4 = "rgba(93, 87, 107, 1)";
  const $color5 = "rgba(230, 235, 224, 1)";
  const $asidecontent = $(".aside-content");
  const $favourites = $("#favourites");
  const $allMaps = $("#all-maps");
  const $contributions = $("#contributions");
  const $mapForm = $("#new-map_form");
  const $mapButton = $("#new-map_button");
  const $favouritesAside = $(".favourites-aside");
  const $allMapsAside = $(".all-maps-aside");
  const $contributionsAside = $(".contributions-aside");
  const $mapListItem = $(".map-list-item");
  const map = L.map("mapid").setView([45.5017, -73.5673], 12);
  const $newMapButton = $("#new-map_button");
  const $mapNameField = $("#name-field");

  const $login = $("#login");
  const $logout = $("#logout");
  const $register = $("#register");
  const $welcome = $("#welcome-message");
  const $registerForm = $(".register_form");
  const $loginForm = $(".login_form");

  $login.click(() => {
    $loginForm.toggle();
    $registerForm.hide();
  });

  $register.click(() => {
    $loginForm.hide();
    $registerForm.toggle();
  });

  $logout.click(() => {
    $login.show();
    $register.show();
    $logout.hide();
    $welcome.hide();
  });

  $newMapButton.click(() => {
    $mapForm.toggle();
    $mapNameField.focus();
  });

  $favourites.click(() => {
    $asidecontent
      .addClass("turn-red")
      .removeClass("turn-yellow")
      .removeClass("turn-green");
    $favourites.removeClass("left-border");
    $contributions.addClass("left-border");
    $allMaps.addClass("left-border");
    $contributionsAside.hide();
    $allMapsAside.hide();
    $favouritesAside.show();
  });
  $contributions.click(() => {
    $asidecontent
      .addClass("turn-yellow")
      .removeClass("turn-red")
      .removeClass("turn-green");
    $contributions.removeClass("left-border");
    $allMaps.addClass("left-border");
    $favourites.addClass("left-border");
    $contributionsAside.show();
    $allMapsAside.hide();
    $favouritesAside.hide();
  });
  $allMaps.click(() => {
    $asidecontent
      .addClass("turn-green")
      .removeClass("turn-yellow")
      .removeClass("turn-red");
    $allMaps.removeClass("left-border");
    $contributions.addClass("left-border");
    $favourites.addClass("left-border");
    $contributionsAside.hide();
    $allMapsAside.show();
    $favouritesAside.hide();
  });


  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done(users => {
    for (user of users) {
      $("<div>")
        .text(user.name)
        .appendTo($("body"));
    }
  });
});
