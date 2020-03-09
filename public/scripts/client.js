//The map is by default pointing to montreal
const createMap = function(){
    const map = L.map('map', {
        center: [45.5017, -73.5673],
        zoom: 12
    })
    return map;
};

$.ajax({
    type: "POST",
    url: "/maps",
    data: "$(#something)",
    success: function () {
    createMap();
    }
});
//have to update this based on the users latitude and longitude
const createPoints = function(lat, lng){
    L.marker([lat, lng]).addTo(createMap);
}
