//The map is by default pointing to montreal
$("#map-form").on("submit", function(event) {
  event.preventDefault();
  postMap();
});

const renderMaps = function(maps) {
    $('#maps-container').empty();
    for(let i = 0; i < maps.length; i++){
     $map = createMapElement(maps[i]);
     $('#maps-container').prepend($map);
    }
  };


  function createMapElement(dataMap) {
    let $map = `
    <div class="map-list-item">
      <img src="/assets/img/compass.svg" alt="" style="width: 3em" title="compass">
      <p id=${dataMap.id}>
        ${dataMap.name} 
      </p>
    </div>`;
    return $map;
  }
  
  function loadMaps() {
    $.ajax({
      method: "GET",
      url: `/maps`,
    }).done(renderMaps);
  }
  loadMaps();

const postMap = function(event) {

    $.ajax({
    method: "POST",
    url: `/maps`,
    data: $("#map-form").serialize(),
    }).done(() => loadMaps()); 
};
//have to update this based on the users latitude and longitude
const createPoints = function(lat, lng) {
  L.marker([lat, lng]).addTo(createMap);
};
