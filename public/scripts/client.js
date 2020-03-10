//The map is by default pointing to montreal
$("#map-form").on("submit", function(event) {
  event.preventDefault();
  postMap();
});

const renderMaps = function(maps) {
  $("#maps-container").empty();
  for (let i = 0; i < maps.length; i++) {
    const $map = createMapElement(maps[i]);
    $("#maps-container").prepend($map);
  }
};

const createMapElement = dataMap => {
  let $map = `
    <div  class="map-list-item point">
<img src="/assets/img/compass.svg" alt="" style="width: 3em" title="compass"><p class="elementMap"  id=${dataMap.id}>${dataMap.name} </p></div>`;
  return $map;
};

const loadMaps = () => {
  $.ajax({
    method: "GET",
    url: `/maps`
  }).done(renderMaps);
};
loadMaps();

const postMap = function(event) {
  $.ajax({
    method: "POST",
    url: `/maps`,
    data: $("#map-form").serialize()
  }).done(() => loadMaps());
};
// have id from the cliked map name
let idMap;

$(".all-maps-aside").on("click", ".elementMap", function(e) {
  // console.log(e.target);
  idMap = $(e.target)
    // .siblings(".elementMap")
    .attr("id");
  // console.log(idMap);
  // console.log($(e.target).children(".elementMap"));
  $.ajax({
    method: "POST",
    url: `/maps/${idMap}`,
    data: `${idMap}`
  }).done(data => console.log(data));
});

//have to update this based on the users latitude and longitude
const createPoints = function(lat, lng) {
  L.marker([lat, lng]).addTo(createMap);



  let geojson_url = "";

  fetch(
    geojson_url
  ).then(
    res => res.json()
  ).then(
    data => {
      let geojsonLayer = L.geoJson(data, {
        onEachFeature:function(feature,layer){
          layer.binPopup(feature.properties['name'])
        }
      }).addTo(map)
        map.fitBounds(geojsonLayer.getBounds())
    }
  )
  )
};

L.geoJSON(geojsonFeature).addTo(map);
let myLayer = L.geoJSON().addTo(map);
myLayer.addData(geojsonFeature);
