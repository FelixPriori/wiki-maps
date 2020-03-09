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
    console.log(maps);
  };
  function createPointElement(dataMap) {
    console.log(dataMap);
    let $map = `<div class="map-list-item"> <p id=${dataMap.id}>${dataMap.name} :Coordinates: latitude: ${dataMap.latitude} & longitude: ${dataMap.longitude} id:${dataMap.id}</p> </div>`;
    return $map;
  }
  function loadMaps() {
    $.ajax({
      method: "GET",
      url: `http://localhost:8080/maps`
      // data: { get_param: "value" },
      // dataType: "json"
    }).done(renderMaps);
  }
  loadMaps();

const loadMaps = function(){ 
    $.ajax({
        method: 'GET',
        url: `http://localhost:8080/maps/getmap`,
    }).done(renderMaps)
}

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
