//The map is by default pointing to montreal
$("#map-form").on("submit", function(event) {
  event.preventDefault();
  postMap();
});

const renderMaps = function(maps) {
  $("#maps-container").empty();
  for (let i = 0; i < maps.length; i++) {
    $map = createMapElement(maps[i]);
    $("#maps-container").prepend($map);
  }
};

const toggleFavouriting = element => {
  if ($(element).attr("src") === "/assets/img/heart-fill.svg") {
    $(element).attr("src", "/assets/img/heart.svg");
  } else {
    $(element).attr("src", "/assets/img/heart-fill.svg");
  }
};

const highlightMap = (element, id) => {
  localStorage.setItem("mapId", id);
  $(".map-list-item")
    .css("border", "none")
    .css("opacity", "50%");
  $(element)
    .css("border", "1px solid black")
    .css("opacity", "100%");
};

function createMapElement(dataMap) {
  let $map = `
      <div id=${dataMap.id} onclick="highlightMap(this, ${dataMap.id})" class="map-list-item">
        <button id=${dataMap.name}>
          <img src="/assets/img/compass.svg" alt="" style="width: 3em" title="view map">
          <p>
            ${dataMap.name}
          </p>
        </button>
        <div class="icons">
          <img onclick="toggleFavouriting(this)" class="favouritable" src="/assets/img/heart.svg" alt="" title="favourite">
          <img class="edit-map-title" src="/assets/img/pencil.svg" alt="" title="edit title">
        </div>
      </div>
    `;
  return $map;
}

function loadMaps() {
  $.ajax({
    method: "GET",
    url: `/maps`
  }).done(renderMaps);
}
loadMaps();

const postMap = function(event) {
  $("#new-map_form").hide();
  $.ajax({
    method: "POST",
    url: `/maps`,
    data: $("#map-form").serialize()
  }).done(() => loadMaps());
};

//have to update this based on the users latitude and longitude
const createPoints = function(lat, lng) {
  L.marker([lat, lng]).addTo(createMap);
};

