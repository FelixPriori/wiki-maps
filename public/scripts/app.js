$(document).ready(() => {

  const $asidecontent = $('.aside-content');
  const $favourites = $('#favourites');
  const $allMaps = $('#all-maps');
  const $contributions = $('#contributions');
  const $mapForm = $('#new-map_form');
  const $newMapButton = $('#new-map_button');
  const $mapNameField =$('#name-field');
  const $favouritesAside = $('.favourites-aside');
  const $allMapsAside = $('.all-maps-aside');
  const $contributionsAside = $('.contributions-aside');
  const $login = $('#login');
  const $logout = $('#logout');
  const $register = $('#register');
  const $welcome = $('#welcome-message');
  const $registerForm = $('.register_form');
  const $loginForm = $('.login_form');
  const $navigateDown = $('.navigate-down');
  const $navigateUp = $('.navigate-up');

  $navigateUp.click(() => {
    $("html, body").animate({ scrollTop: "0" }, 1000);
  });

  $navigateDown.click(() => {
    $("html, body").animate({ scrollTop: "9999" }, 1000);
  })

  $login.click(() => {
    $loginForm.toggle();
    $registerForm.hide();
  });

  $register.click(() => {
    $registerForm.toggle();
  });

  // $logout.click(() => {
  //   $login.show();
  //   $register.show();
  //   $logout.hide();
  // });

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
});
