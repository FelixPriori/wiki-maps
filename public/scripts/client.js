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
  newMarkerGroup.clearLayers();
};

const clearMap = () => {
  // there exists an array of marker id
  // loop through
  // remove that layer
  console.log(markers);
  for (const marker of markers) {
    marker.remove();
  }
  console.log(markers);
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
  $("#new-map_form").hide();
  $.ajax({
    method: "POST",
    url: `/maps`,
    data: $("#map-form").serialize()
  }).done(() => {
    loadMaps(true);
    $("#name-field")[0].value = "";
  });
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
    <label for="marker-name">Name</label>
    <input name="name" type="text", placeholder="name your marker!"/>
    <label for="marker-img">Image</label>
    <input name="image" class="marker-img" type="url", placeholder="img url"/>
    <label for="marker-description">Description</label>
    <textarea name="description" class="marker-description" placeholder="desciption"></textarea>
    <input class="submit" type="submit">
    <button class="cancel-button">Cancel</button>
  </form>
`;

let arrayCoods = [];

//Marker Functions

let markerListId = [];

const deletePoint = id => {
  for (const marker of markerListId) {
    const key = Object.keys(marker);
    if (key === id) {
      map.removeLayer(marker.key);
    }
  }
}

const makeMarkerHtml = markerData => {
  const markerContent = `<div id='${markerData.id}'>`
  if (markerData.image) {
    markerContent += `<img src='${markerData.image}'>`;
  }
  markerContent += `<h2>${markerData.name}</h2>`;
  if (markerData.description) {
    markerContent += `<p>${markerData.description}</p>`
  }
  markerContent += `<button onclick="deletePoint(${markerData.id})" class="delete-point">Delete</button>`
  markerContent += `</div>`;
  return markerContent;
}

const generateMarkers = markerList => {
  for (const marker of markerList) {
    const markerContent = makeMarkerHtml(marker);
    const newMarker = new L.marker([marker.latitude, marker.longitude], {draggable: 'true'})
      .popupContent(markerContent);
    markerListId.push({
      [marker.id]: newMarker._leaflet_id
    });
    markers.push(newMarker);
  }
};

const addMarker = (click) => {
  let latitude = click.latlng.lat;
  let longitude = click.latlng.lng;
  arrayCoords = [latitude, longitude];
  const newMarker = new L.marker(click.latlng, { draggable: "true" })
    .addTo(map)
    .bindPopup(popupContent)
    .openPopup();
  markers.push(newMarker);
  return arrayCoords;
};

//post markers on the map using ajax post request
const markPoint = function(){
  let dataObj = $('.marker-form').serialize();
  dataObj += `&latitude=${arrayCoords[0]}&longitude=${arrayCoords[1]}&map_id=${localStorage.getItem('mapId')}`;
  $.ajax({
    method: "POST",
    url: "points/markpoint",
    data: dataObj,
  }).done();
}

const getPoints = function(){
  $.ajax({
    method: "GET",
    url: "/getpoints",
    success: function () {
    }
  });
};

newMarkerGroup = new L.LayerGroup();
map.on("click", addMarker);

// have id from the cliked map name


let markerElement = (dataPoint,index) => {
  let markerE = new L.marker([dataPoint[index].latitude, dataPoint[index].longitude]).addTo(map);
}

const renderMaskers = function(points) {
  for (let i = 0; i < points.length; i++) {
    markerElement(points,i);
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
    .done(renderMaskers);
});
