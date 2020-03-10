let currentMap;

//The map is by default pointing to montreal
$("#map-form").on("submit", function(event) {
  event.preventDefault();
  postMap();
});

$('body').on("submit", '.marker-form',function(event) {
    event.preventDefault();
    markPoint();
});

const renderMaps = function(maps) {
    $('#maps-container').empty();
    for(let i = 0; i < maps.length; i++){
     $map = createMapElement(maps[i]);
     $('#maps-container').prepend($map);
    }
  };

  const toggleFavouriting = (element) => {
    if ($(element).attr('src') === '/assets/img/heart-fill.svg') {
      $(element).attr('src', '/assets/img/heart.svg' );
    } else {
      $(element).attr('src', '/assets/img/heart-fill.svg')
    }
  }

  const highlightMap = (element, id) => {
    localStorage.setItem('mapId', id);
    $('.map-list-item').css('border', 'none')
      .css('opacity', '50%')
    $(element).css('border', '1px solid black')
      .css('opacity', '100%')
  };

  function createMapElement(dataMap) {
    let $map = `
      <div onclick="highlightMap(this, ${dataMap.id})" class="map-list-item">
        <button>
          <img src="/assets/img/compass.svg" alt="" style="width: 3em" title="view map">
          <p id=${dataMap.id}>
            ${dataMap.name}
          </p>
        </button>
        <img onclick="toggleFavouriting(this)" class="favouritable" src="/assets/img/heart.svg" alt="" title="favouritable">
      </div>
    `;
    return $map;
  }

  function loadMaps() {
    $.ajax({
      method: "GET",
      url: `/maps`,
    }).done(renderMaps);
  }
  loadMaps();

const postMap = function() {
    $.ajax({
    method: "POST",
    url: `/maps`,
    data: $("#map-form").serialize(),
    }).done(() => loadMaps());
};

const map = L.map('mapid').setView([45.5017, -73.5673], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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

newMarkerGroup = new L.LayerGroup();
map.on('click', addMarker);
let arrayCoods = [];

function addMarker(click){
let latitude = click.latlng.lat;
let longitude = click.latlng.lng;
 arrayCoords = [latitude, longitude];
  const newMarker = new L.marker(click.latlng, {draggable: 'true'})
    .addTo(map)
    .bindPopup(popupContent)
    .openPopup();
    return arrayCoords;
}
const markPoint = function(){
    let dataObj = $('.marker-form').serialize();
    dataObj += `&latitutde=${arrayCoords[0]}&longitude=${arrayCoords[1]}`;

 $.ajax({
     method: "POST",
     url: "/points/markpoint",
     data: dataObj, 
 }).done();
}

