//The map is by default pointing to montreal
$("#map-form").on("submit", function(event) {
  event.preventDefault();
  postMap();
});

const renderMaps = function(maps) {
    maps.forEach(map => {
      const $map = createPointElement(map);
      $("#maps-container").prepend($map);
    });
  };
  
  function createPointElement(dataMap) {
    let $map = `<div class="map-list-item"> <p id=${dataMap.id}>${dataMap.name}</p> </div>`;
    return $map;
  }

  function loadMaps() {
    $.ajax({
      method: "GET",
      url: `/maps`, 
    }).done(renderMaps);
  }
  $(document).ready
  loadMaps();

const postMap = function() {
  $.ajax({
    method: "POST",
    url: `http://localhost:8080/maps/makemap`,
    data: $("#map-form").serialize(),
    }).done(data => {
        console.log(data);
    }); 
};
//have to update this based on the users latitude and longitude
const createPoints = function(lat, lng) {
  L.marker([lat, lng]).addTo(createMap);
};
