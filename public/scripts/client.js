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
<<<<<<< HEAD
    <div  class="map-list-item point">
<img src="/assets/img/compass.svg" alt="" style="width: 3em" title="compass">
      <p class="elementMap"  id=${dataMap.id}>
        ${dataMap.name} 
      </p>
    </div>`;
    return $map;
  }
=======
    <div class="map-list-item">
      <button>
        <img src="/assets/img/compass.svg" alt="" style="width: 3em" title="compass">
        <p id=${dataMap.id}>
          ${dataMap.name}
        </p>
      </button>
    </div>`;
    return $map;
  }

>>>>>>> 5787acbe934c3172d14a4bc89cf7cd6f91575650
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
// have id from the cliked map name
let idMap;
$("map-list-item").on("click", ".point", function(e) {
  console.log(e.target);
  idMap = $(e.target).siblings(".elementMap").attr("id");
  console.log($(e.target).children(".elementMap"));
});

// function loadPoints() {
//   $.ajax({
//     method: "GET",
//     url: `/maps:${lidMap}`
//   }).done((data)=>console.log(data));
// }

//have to update this based on the users latitude and longitude
const createPoints = function(lat, lng) {
  L.marker([lat, lng]).addTo(createMap);
};
