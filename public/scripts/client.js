let markers = [];
localStorage.removeItem("mapId");

//The map is by default pointing to montreal
$("#map-form").on("submit", function(event) {
  event.preventDefault();
  postMap();
});
//Submit for a pointer on the map
$("body").on("submit", ".marker-form", function(event) {
  event.preventDefault();
  if ($(".marker-name").val().length) {
    markPoint();
    map.closePopup();
    renderPointsOnMap();
  } else {
    $(".marker-name-alert").slideDown("fast");
    setTimeout(() => {
      $(".marker-name-alert").slideUp("fast");
    }, 5000);
  }
});

$("#Uregister-form").on("submit", function(event) {
  event.preventDefault();
  $('.register_form').hide();
  registerUser();
});

$("#Ulogin-form").on("submit", function(event) {
  event.preventDefault();
  $('.login_form').hide();
  loginUser();
});

$("#logout").on("click", function(event) {
  event.preventDefault();
  logoutUser();
});

const toggleFavouriting = (element, id) => {
  if ($(element).attr("src") === "/assets/img/heart-fill.svg") {
    $(element).attr("src", "/assets/img/heart.svg");
    deleteFavouriteMap(id);
    getPointMaps(id);
  } else {
    $(element).attr("src", "/assets/img/heart-fill.svg");
    userFavouriteMap(id);
    getPointMaps(id);
  }
};

const highlightMap = id => {
  localStorage.setItem("mapId", id);
  $(".map-list-item")
    .css("border", "none")
    .css("opacity", "50%");
  $(`#${id}`)
    .css("border", "1px solid black")
    .css("opacity", "100%");
};

const clearMap = () => {
  // there exists an array of marker id
  // loop through
  // remove that layer
  for (const marker of markers) {
    marker.remove();
  }
};

const editName = id => {
  $(`#${id}`)
    .find("form")
    .show();
  $(`#${id}`)
    .find(".edit")
    .show();
  $(`#${id}`)
    .find(".not-edit")
    .hide();
  $(`#${id}`)
    .find("p")
    .hide();
};

const cancel = id => {
  $(`#${id}`)
    .find("form")
    .hide();
  $(`#${id}`)
    .find(".edit")
    .hide();
  $(`#${id}`)
    .find(".not-edit")
    .show();
  $(`#${id}`)
    .find("p")
    .show();
};

const editNameForm = currentName => {
  return `
    <form style="display:none;">
      <input type='text' value='${currentName}'>
    </form>
  `;
};

const createMapElement = dataMap => {
  let $map = `
    <div id=${dataMap.id} onclick="highlightMap(${dataMap.id}); clearMap();" class="map-list-item">
      <button>
        <img src="/assets/img/compass.svg" alt="" style="width: 3em" title="view map">
        <p class="map-name">
          ${dataMap.name}
        </p>
        ${editNameForm(dataMap.name)}
      </button>
      <div class="icons">
        <img onclick="cancel(${
          dataMap.id
        })" class="edit cancel-img" src="/assets/img/x-circle.svg" alt="" title="cancel">
        <img class="edit confirm-img" src="/assets/img/check-circle.svg" alt="" title="confirm">
        <img onclick="toggleFavouriting(this, ${dataMap.id})" class="favouritable not-edit" src="/assets/img/heart.svg" alt="" title="favourite">
        <img onclick="editName(${dataMap.id})" class="edit-map-title not-edit" src="/assets/img/pencil.svg" alt="" title="edit title">
      </div>
    </div>
  `;
  return $map;
};

const renderMaps = function(maps, target) {
  $(`#${target}`).empty();
  for (let i = 0; i < maps.length; i++) {
    $map = createMapElement(maps[i]);
    $(`#${target}`).prepend($map);
  }
};

const loadMaps = highlight => {
  $.ajax({
    method: "GET",
    url: `/maps`
  }).done(data => {
    renderMaps(data, 'maps-container');
    if (highlight) {
      const firstMapId = data[data.length - 1].id;
      highlightMap(firstMapId);
    }
  });
};
loadMaps(false);

const loadFavouriteMaps = highlight => {
  $.ajax({
    method: "GET",
    url: "users/favourites"
  }).done(data => {
    renderMaps(data, 'favourites-container');
    if (highlight) {
      const firstMapId = data[data.length - 1].id;
      highlightMap(firstMapId);
    }
  });
};

const loadContributedMaps = highlight => {
  $.ajax({
  method: "GET",
  url: "users/contributions"
  }).done(data => {
    renderMaps(data, 'contributions-container');
    if (highlight) {
      const firstMapId = data[data.length - 1].id;
      highlightMap(firstMapId);
    }
  });
};

$('#contributions').click(() => {
  loadContributedMaps(false);
  setTimeout(() => {
    $('.icons').css('visibility', 'hidden');
    if($('#contributions-container').children().length === 0) {
      $('#contribution-notice').show()
      $('#favourite-notice').hide()
    } else {
      $('#favourite-notice').hide()
      $('#contribution-notice').hide()
    }
  }, 25);
});

$('#favourites').click(() => {
  loadFavouriteMaps(false);
  setTimeout(() => {
    $('.icons').css('visibility', 'hidden');
    if($('#favourites-container').children().length === 0) {
      $('#favourite-notice').show()
      $('#contribution-notice').hide()
    } else {
      $('#favourite-notice').hide()
      $('#contribution-notice').hide()
    }
  }, 25);
})

$('#all-maps').click(() => {
  $('.icons').css('visibility', 'visible');
  $('#favourite-notice').hide()
  $('#contribution-notice').hide()
});

const postMap = function() {
  if ($("#name-field").val()) {
    $("#new-map_form").hide();
    $.ajax({
      method: "POST",
      url: `/maps`,
      data: $("#map-form").serialize()
    }).done(() => {
      loadMaps(true);
      $("#name-field")[0].value = "";
    });
  } else {
    $(".name-alert").slideDown("fast");
    setTimeout(() => {
      $(".name-alert").slideUp("fast");
    }, 5000);
  }
};
// have id from the cliked map name
let idMap;
$("map-list-item").on("click", ".point", function(e) {
  idMap = $(e.target)
    .siblings(".elementMap")
    .attr("id");
});

/*
  BELOW IS CODE REGARDING MARKERS
*/
const map = L.map("mapid").setView([45.5017, -73.5673], 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const popupContent = `
  <form class="marker-form">
    <h2>Add a new marker</h2>
    <label for="marker-name">Name</label>
    <input class="marker-name" name="name" type="text", placeholder="name your marker!"/>
    <p class="marker-name-alert alert alert-warning" style="display:none; color: rgba(237, 106, 90, 1);" role="alert">Please name your marker!</p>
    <label for="marker-img">Image</label>
    <input name="image" class="marker-img" type="url", placeholder="img url"/>
    <label for="marker-description">Description</label>
    <textarea name="description" class="marker-description" placeholder="desciption"></textarea>
    <div class="buttons">
      <input class="btn btn-light submit" type="submit">
    </div>
  </form>
`;

//Marker Functions

const addMarker = click => {
  let latitude = click.latlng.lat;
  let longitude = click.latlng.lng;
  arrayCoords = [latitude, longitude];
  const newMarker = new L.marker(click.latlng)
    .addTo(map)
    .bindPopup(popupContent)
    .openPopup();
  newMarker.pending = true;
  const confirmedMarkers = markers.filter(marker => !marker.pending);
  markers.filter(marker => marker.pending).forEach(marker => marker.remove());
  markers = [...confirmedMarkers, newMarker];
  return arrayCoords;
};

//post markers on the map using ajax post request
const markPoint = function() {
  let dataObj = $(".marker-form").serialize();
  dataObj += `&latitude=${arrayCoords[0]}&longitude=${
    arrayCoords[1]
  }&map_id=${localStorage.getItem("mapId")}`;
  $.ajax({
    method: "POST",
    url: "points/markpoint",
    data: dataObj
  }).done(() => {
    clearMap();
    getPointsOnMap();
  });
  let contributionObject = {
    map_id: localStorage.getItem('mapId'),
    contributor_id: localStorage.getItem('userID')
  }
  $.ajax({
    method: "POST",
    url: "users/contributions",
    data: contributionObject
  }).done(data => console.log(data));
};

const getPointsOnMap = function() {
  $.ajax({
    method: "GET",
    url: `/maps/${localStorage.getItem("mapId")}`
  }).done(renderMarkers);
};

const getPoints = function() {
  $.ajax({
    method: "GET",
    url: "points/getpoints"
  });
};

newMarkerGroup = new L.LayerGroup();
map.on("click", event => {
  if (localStorage.getItem("mapId")) {
    if (checkUserLoggedIn()) {
      addMarker(event);
    } else {
      $(".user-login-alert").show();
      setTimeout(() => {
        $(".user-login-alert").hide();
      }, 3000);
    }
  } else {
    $(".select-map-alert").show();
    setTimeout(() => {
      $(".select-map-alert").hide();
    }, 3000);
  }
});

const editPoint = () => {
  $(event.target)
    .closest(".leaflet-popup-content")
    .find(".edit-popup")
    .show();
  $(event.target)
    .closest(".leaflet-popup-content")
    .find(".marker-form")
    .hide();
};

const backToPoint = () => {
  event.preventDefault();
  $(event.target)
    .closest(".leaflet-popup-content")
    .find(".edit-popup")
    .hide();
  $(event.target)
    .closest(".leaflet-popup-content")
    .find(".marker-form")
    .show();
};

// added a input hidden to pass markerId *****
const editForm = (
  markerId,
  markerDatalatitude,
  markerDatalongitude,
  markerMapId,
  markerData
) => {
  return `
    <form class='edit-popup' style='display:none;'>
      <h2>Edit marker</h2>
      <input class="makerMapId" name="makerMapId" type="hidden" value='${markerMapId}'>
      <input class="makerId" name="markerId" type="hidden" value='${markerId}'>
      <input class="makerLat" name="makerLat" type="hidden" value='${markerDatalatitude}'>
      <input class="makerLong" name="makerLong" type="hidden" value='${markerDatalongitude}'>
      <label for="marker-name">Name</label>
      <input class="marker-name" name="name" type="text", value='${markerData.name}'!"/>
      <p class="marker-name-alert alert alert-warning" style="display:none; color: rgba(237, 106, 90, 1);" role="alert">Please name your marker!</p>
      <label for="marker-img">Image</label>
      <input name="image" class="marker-img" type="url", value="${markerData.image}"/>
      <label for="marker-description">Description</label>
      <textarea name="description" class="marker-description">${markerData.description}</textarea>
      <div class="buttons">
        <input class="btn btn-light" type="submit">
        <button class="btn btn-light" onclick="backToPoint()">Cancel</button>
      </div>
    </form>
  `;
};

// added a parameter in fct for pass markerId to input hidden*****
const makeMarkerHtml = markerData => {
  let markerContent =
    editForm(
      markerData.id,
      markerData.latitude,
      markerData.longitude,
      markerData.map_id,
      markerData
    ) + `<div class="marker-form" id='${markerData.id}'>`;
  if (markerData.image) {
    markerContent += `
      <div class="img-box">
        <img src='${markerData.image}'>
      </div>
    `;
  }
  markerContent += `<h2>${markerData.name}</h2>`;
  if (markerData.description) {
    markerContent += `<p>${markerData.description}</p>`;
  }
  markerContent += `
      <div id='${markerData.id}' class="buttons">
        <button id='${markerData.map_id}'class="btn btn-light delete-button deleteMarker">Delete</button>
        <button id='${markerData.map_id}' class="btn btn-light edit-button editMarker" onclick="editPoint()">Edit</button>
      </div>
    </div>`;
  return markerContent;
};

const renderMarkers = function(markerList) {
  for (const marker of markerList) {
    const markerContent = makeMarkerHtml(marker);
    const newMarker = new L.marker([marker.latitude, marker.longitude])
      .addTo(map)
      .bindPopup(markerContent);
    newMarker.point_id = marker.id;
    markers.push(newMarker);
  }
};

const getPointMaps = function(data) {
  let idMap = data;
  $.ajax({
    method: "GET",
    url: `/maps/${idMap}`
  }).done(renderMarkers);
};

const renderPointsOnMap = function() {
  $.ajax({
    method: "GET",
    url: "/points/getpoints"
  }).done(renderMarkers);
};

$("#maps-container").on("click", "button", function(e) {
  let idMap = $(e.target)
    .closest("div")
    .attr("id");
  $.ajax({
    method: "GET",
    url: `/maps/${idMap}`
  }).done(renderMarkers);
});
// have map-id from the cliked map name and render the point for this map
// have point-id from the cliked delete
const deleteMark = () => {
  $("#mapid").on("click", ".deleteMarker", function(e) {
    let idMap = $(e.target).attr("id");
    let point = $(e.target)
      .closest("div")
      .attr("id");
    let dataObj = { pointId: point, mapid: idMap };
    $.ajax({
      method: "POST",
      url: "/maps/points/delete",
      data: dataObj
    }).done(() => {
      markers
        .filter(marker => marker.point_id == dataObj.pointId)
        .forEach(judgy => judgy.remove());
      markers = markers.filter(marker => marker.point_id != dataObj.pointId);
    });
  });
};
deleteMark();

/* ADD user functionality Login ------ Register Can Favourite a map, Can Have Contributions */

const makeName = function(name) {
  const $h2 = $('<h2 class="welcome-message">');
  $h2.text(`Welcome, ${name}!`);
  $("#welcome-message").append($h2);
};

const loginLayout = name => {
  $("#logout").show();
  $("#login").hide();
  $("#register").hide();
  $(".login_form").hide();
  $("#favourites").show();
  $("#contributions").show();
  $("#new-map_button").show();
  $(".icons").css('visibility', 'visible');
  makeName(name);
};

const logoutLayout = () => {
  $("#login").show();
  $("#register").show();
  $("#logout").hide();
  $("#favourites").hide();
  $("#contributions").hide();
  $("#new-map_button").hide();
  $(".icons").css('visibility', 'hidden');
  $(".welcome-message").remove();
};

const checkUserLoggedIn = function() {
  if (localStorage.getItem("userID") !== null) {
    return true;
  }
};

const fillHearts = favourites => {
  for (const favourite of favourites) {
    $(`#${favourite.map_id}`)
      .find(".favouritable")
      .attr("src", "/assets/img/heart-fill.svg");
  }
};

if (checkUserLoggedIn()) {
  $.ajax({
    method: "GET",
    url: "users/checkUser"
  }).done(data => loginLayout(data.first_name));
  $.ajax({
    method: "GET",
    url: "users/getFaves"
  }).done(data => fillHearts(data));
} else {
  logoutLayout();
}

const logoutUser = function() {
  localStorage.removeItem("userID");
  $.ajax({
    method: "POST",
    url: "users/logout"
  }).done(() => {
    logoutLayout();
  });
};

const loginUser = function() {
  let userData = { email: $(".login-email").val() };
  $.ajax({
    method: "POST",
    url: "users/login",
    data: userData
  }).done(data => {
    localStorage.setItem("userID", data.id);
    loginLayout(data.first_name);
  });
};
const registerUser = function() {
  let dataObj = {
    first_name: $(".register-name").val(),
    email: $(".register-email").val(),
    password: $(".register-password").val()
  };
  $.ajax({
    method: "POST",
    url: "users/register",
    data: dataObj
  }).done(loginUser());
};
/* User Favourites and Contributions */

const createFavouriteMapElement = dataMap => {
  let $map = `
  <div id=${dataMap.id} onclick="highlightMap(${
    dataMap.id
  }); clearMap();" class="map-list-item">
  <button >
  <img src="/assets/img/compass.svg" alt="" style="width: 3em" title="view map">
  <p class="map-name">
  ${dataMap.name}
  </p>
  ${editNameForm(dataMap.name)}
  </button>
  <div class="icons">
  <img onclick="cancel(${
    dataMap.id
  })" class="edit cancel-img" src="/assets/img/x-circle.svg" alt="" title="cancel">
  <img class="edit confirm-img" src="/assets/img/check-circle.svg" alt="" title="confirm">
  <img onclick="toggleFavouriting(this)" class="favouritable not-edit" src="/assets/img/heart.svg" alt="" title="favourite">
  <img onclick="editName(${
    dataMap.id
  })" class="edit-map-title not-edit" src="/assets/img/pencil.svg" alt="" title="edit title">
  </div>
  </div>
  `;
  return $map;
};

const renderFavouriteMaps = function(maps) {
  $("#favouriteMap-aside").empty();
  for (let i = 0; i < maps.length; i++) {
    $map = createMapFavouriteMapElement(maps[i]);
    $("#favouriteMap-aside").prepend($map);
  }
};

const userFavouriteMap = function(id) {
  let favouriteMap = id;
  let userId = localStorage.getItem("userID");
  dataObj = {
    map_id: favouriteMap,
    contributor_id: userId
  };
  $.ajax({
    method: "POST",
    url: "/users/favourite",
    data: dataObj
  }).done();
};

const deleteFavouriteMap = function(id) {
  let favouriteMap = id;
  let userId = localStorage.getItem("userID");
  dataObj = {
    map_id: favouriteMap,
    contributor_id: userId
  };
  $.ajax({
    method: "POST",
    url: "/users/deleteFavouriteMap",
    data: dataObj
  }).done();
};
// ==============================================================

$("body").on("submit", ".edit-popup", function(event) {
  event.preventDefault();
  console.log("hello !");
  let name = $(event.target)
    .closest("form")
    .children(".marker-name")
    .attr("value")

  let idPoint = $(event.target)
    .closest("form")
    .children(".makerId")
    .val();

  let mapId = $(event.target)
    .closest("form")
    .children(".makerMapId")
    .val();

  let latPoint = $(event.target)
    .closest("form")
    .children(".makerLat")
    .val();

  let longPoint = $(event.target)
    .closest("form")
    .children(".makerLong")
    .val();

  console.log("idPoint: ", idPoint);

  if (name.length) {
    let namePoint = $(event.target)
      .closest("form")
      .children(".marker-name")
      // .attr("value");
      .val();
    let imgPoint = $(event.target)
      .closest("form")
      .children(".marker-img")
      .val();

    let descriptionPoint = $(event.target)
      .closest("form")
      .children("textarea")
      .val();

    let dataObj = {
      pointId: idPoint,
      pointName: namePoint,
      pointImgURL: imgPoint,
      pointDescription: descriptionPoint,
      pointLatitude: latPoint,
      pointLongitude: longPoint,
      pointMapId: mapId
    };

    map.closePopup();
    markers
      .filter(marker => marker.point_id == dataObj.pointId)
      .forEach(judgy => judgy.remove());
    markers = markers.filter(marker => marker.point_id != dataObj.pointId);

    $.ajax({
      method: "POST",
      url: "/maps/edit/point",
      data: dataObj
    }).done(() => {
      console.log(dataObj);

      let mark = {
        id: dataObj.pointId,
        name: dataObj.pointName,
        description: dataObj.pointDescription,
        latitude: dataObj.pointLatitude,
        longitude: dataObj.pointLongitude,
        image: dataObj.pointImgURL,
        map_id: "13"
      };
      let markerList = [];
      markerList[0] = mark;
      renderMarkers(markerList);
    });
  } else {
    console.log("hello noooo!");
    map.closePopup();
  }
});
