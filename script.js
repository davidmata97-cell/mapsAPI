var markersArray = [];
const citiesArray = {
    leon:    { lat: 42.5984, lng: -5.5725, zoom: 15, 
        places: [{name:"Cathedral", lat:42.59944, lng:-5.56717}, 
            {name:"San Isidoro", lat:42.60075, lng:-5.57081},
            {name: "Casa Botines", lat:42.5984, lng:-5.5706},
            {name: "Reino de León", lat:42.5876, lng:-5.5764},
            {name: "San Marcos", lat:42.6019, lng:-5.5820}
        ] },
    ny: { lat: 40.7164, lng: -74.0303,  zoom: 11,         
        places: [{name:"Cathedral", lat:42.59944, lng:-5.56717}, 
            {name:"San Isidoro", lat:42.60075, lng:-5.57081},
            {name: "Casa Botines", lat:42.5984, lng:-5.5706},
            {name: "Reino de León", lat:42.5876, lng:-5.5764},
            {name: "San Marcos", lat:42.6019, lng:-5.5820}
        ] },
    tokyo:   { lat: 35.6689, lng: 139.7668, zoom: 13 },
    london: {lat: 51.5092, lng: -0.1331, zoom: 12 },
    cairo:  { lat: 30.0490, lng: 31.2247, zoom: 13 },
    pripiat:    { lat: 51.4051, lng: 30.0543, zoom: 14 }
};

function initMap(){
    let map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 40, lng: -4},
        zoom:6.5,
    });

    document.getElementById('citySelector').addEventListener("change", () => selectCity(map));
}

function selectCity(map){
    const city = document.getElementById('citySelector').value;
    const cityData = citiesArray[city];

    if(cityData){
        map.setCenter({lat: cityData.lat, lng: cityData.lng});
        map.setZoom(cityData.zoom);
    }

    showCityMarkers(cityData, map);
}

function showCityMarkers(cityData, map){
    markersArray.forEach(marker => marker.setMap(null));
    markersArray = [];

    if (!cityData.places) return;

    cityData.places.forEach(place => {
        let marker = new google.maps.Marker({
            position: {lat: place.lat, lng: place.lng},
            title: place.name,
            map:map,
        });
        markersArray.push(marker);
    });
}