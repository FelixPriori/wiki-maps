let currentMap;

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
<<<<<<< HEAD
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
=======
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

>>>>>>> a2a462ed5eddf50432c56d412f90376a11d6b575
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
