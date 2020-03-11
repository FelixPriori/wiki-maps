let markers = [];
//The map is by default pointing to montreal
$("#map-form").on("submit", function(event) {
  event.preventDefault();
  postMap();
});

$("body").on("submit", ".marker-form", function(event) {
  event.preventDefault();
  markPoint();
});

const toggleFavouriting = element => {
  if ($(element).attr("src") === "/assets/img/heart-fill.svg") {
    $(element).attr("src", "/assets/img/heart.svg");
  } else {
    $(element).attr("src", "/assets/img/heart-fill.svg");
  }
};

const highlightMap = id => {
  localStorage.setItem('mapId', id);
  $('.map-list-item').css('border', 'none')
    .css('opacity', '50%');
  $(`#${id}`).css('border', '1px solid black')
    .css('opacity', '100%');
};

const clearMap = () => {
    markers.clearLayers();
  // there exists an array of marker id
  // loop through
  // remove that layer
  for (const marker of markers) {
    marker.remove();
  }
}

const clearPending = () => {

}

const editName = id => {
  const $mapName = $(`#${id} > button > p`);
  $mapName.attr("contenteditable", "true");
  $mapName.focus();
};

const createMapElement = dataMap => {
  let $map = `
    <div id=${dataMap.id} onclick="highlightMap(${dataMap.id}); clearMap();" class="map-list-item">
      <button >
        <img src="/assets/img/compass.svg" alt="" style="width: 3em" title="view map">
        <p class="map-name">
          ${dataMap.name}
        </p>
      </button>
      <div class="icons">
        <img onclick="toggleFavouriting(this)" class="favouritable" src="/assets/img/heart.svg" alt="" title="favourite">
        <img onclick="editName(${dataMap.id})" class="edit-map-title" src="/assets/img/pencil.svg" alt="" title="edit title">
      </div>
    </div>
  `;
  return $map;
};

const renderMaps = function(maps) {
  $("#maps-container").empty();
  for (let i = 0; i < maps.length; i++) {
    $map = createMapElement(maps[i]);
    $("#maps-container").prepend($map);
  }
};

const loadMaps = highlight => {
  $.ajax({
    method: "GET",
    url: `/maps`
  }).done(data => {
    renderMaps(data);
    if (highlight) {
      const firstMapId = data[data.length - 1].id;
      highlightMap(firstMapId);
    }
  });
};
loadMaps(false);

const postMap = function() {
  if ($('#name-field').val()) {
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
    $('.name-alert').slideDown('fast');
    setTimeout(() => {
      $('.name-alert').slideUp('fast');
    }, 5000)
  }
};
// have id from the cliked map name
let idMap;
$("map-list-item").on("click", ".point", function(e) {
  console.log(e.target);
  idMap = $(e.target)
    .siblings(".elementMap")
    .attr("id");
  console.log($(e.target).children(".elementMap"));
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

const addMarker = (click) => {
    let latitude = click.latlng.lat;
    let longitude = click.latlng.lng;
    arrayCoords = [latitude, longitude];
    const newMarker = new L.marker(click.latlng, { draggable: "true" })
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
const markPoint = function(){
  if ($('.marker-name').val()) {
    let dataObj = $('.marker-form').serialize();
    dataObj += `&latitude=${arrayCoords[0]}&longitude=${arrayCoords[1]}&map_id=${localStorage.getItem('mapId')}`;
    $.ajax({
      method: "POST",
      url: "points/markpoint",
      data: dataObj,
    }).done();
  } else {
    $('.marker-name-alert').slideDown('fast');
    setTimeout(() => {
      $('.marker-name-alert').slideUp('fast');
    }, 5000);
  }

}

const getPoints = function(){
  $.ajax({
    method: "GET",
    url: "/getpoints",
    success: function () {
    }
  });
};

const deletePoint = id => {
  // RAY : delete the point with this id;
};


newMarkerGroup = new L.LayerGroup();
map.on("click", addMarker);

const editPoint = () => {
  $(event.target)
    .closest('.leaflet-popup-content')
    .find('.edit-popup')
    .show();
  $(event.target)
    .closest('.leaflet-popup-content')
    .find('.marker-form')
    .hide();
}

const backToPoint = () => {
  event.preventDefault();
  $(event.target)
    .closest('.leaflet-popup-content')
    .find('.edit-popup')
    .hide();
  $(event.target)
    .closest('.leaflet-popup-content')
    .find('.marker-form')
    .show();
};

const editForm = () => {
  return `
    <form class='edit-popup' style='display:none;'>
      <h2>Edit marker</h2>
      <label for="marker-name">Name</label>
      <input class="marker-name" name="name" type="text", placeholder="name your marker!"/>
      <p class="marker-name-alert alert alert-warning" style="display:none; color: rgba(237, 106, 90, 1);" role="alert">Please name your marker!</p>
      <label for="marker-img">Image</label>
      <input name="image" class="marker-img" type="url", placeholder="img url"/>
      <label for="marker-description">Description</label>
      <textarea name="description" class="marker-description" placeholder="desciption"></textarea>
      <div class="buttons">
        <input class="btn btn-light" type="submit">
        <button class="btn btn-light" onclick="backToPoint()">Cancel</button>
      </div>
    </form>
  `;
}


const makeMarkerHtml = (markerData) => {
  let markerContent = editForm() + `<div class="marker-form" id='${markerData.id}'>`
  if (markerData.image) {
    markerContent +=  `
      <div class="img-box">
        <img src='${markerData.image}'>
      </div>
    `;
  }
  markerContent += `<h2>${markerData.name}</h2>`;
  if (markerData.description) {
    markerContent += `<p>${markerData.description}</p>`
  }
  markerContent += `
      <div class="buttons">
        <button class="btn btn-light edit-button" onclick="deletePoint(${markerData.id})">Delete</button>
        <button class="btn btn-light delete-button" onclick="editPoint()">Edit</button>
      </div>
    </div>`;
  return markerContent;
}

const renderMarkers = function(markerList) {
  for (const marker of markerList) {
    const markerContent = makeMarkerHtml(marker);
    const newMarker = new L.marker([marker.latitude, marker.longitude], {draggable: 'true'})
      .addTo(map)
      .bindPopup(markerContent);
    markers.push(newMarker);
  }
};


$("#maps-container").on("click", "button", function(e) {
  let idMap = $(e.target)
    .closest("div")
    .attr("id");
  // console.log(idMap);
  $.ajax({
    method: "GET",
    url: `/maps/${idMap}`
    // data: `${idMap}`
  })
    .done(renderMarkers);
});


// refreshes when
/*
  - switch map
  - add point
  - add point without saving
*/
