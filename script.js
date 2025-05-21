var ubi;
var markersArray = [];
var cityMarkersArray = [];
const citiesArray = {
    leon:    { lat: 42.5984, lng: -5.5725, zoom: 15, 
        places: [{name:"Cathedral",type:"church", lat:42.59944, lng:-5.56717}, 
            {name:"San Isidoro",type:"church", lat:42.60075, lng:-5.57081},
            {name: "Casa Botines",type:"monument", lat:42.5984, lng:-5.5706},
            {name: "Reino de León",type:"stadium", lat:42.5876, lng:-5.5764},
            {name: "Puente de los Leones",type:"bridge", lat:42.59604, lng:-5.57937}
        ] },
    ny: { lat: 40.7533, lng: -73.9854,  zoom: 12.5,         
        places: [{name:"Statue of Liberty",type:"monument", lat:40.6893, lng:-74.0445}, 
            {name:"Central Park",type:"park", lat:40.7818, lng:-73.9672},
            {name: "9/11 Memorial & Museum",type:"monument", lat:40.7116, lng:-74.0133},
            {name: "Yankee Stadium",type:"stadium", lat:40.8297, lng:-73.9256},
            {name: "Brooklyn Bridge",type:"bridge", lat:40.7061, lng:-73.9968}
        ] },
    tokyo:   { lat: 35.7020, lng: 139.7679, zoom: 14, 
        places: [{name:"Koyko Castle",type:"castle", lat:35.6854, lng:139.7533}, 
            {name:"Skytree of Tokyo",type:"monument", lat:35.71085, lng:139.8106},
            {name: "Senño-Ji Budist Temple",type:"church", lat:35.7159, lng:139.7971},
            {name: "Kiba Park",type:"park", lat:35.6773, lng:139.8102},
            {name: "Godzilla Head",type:"monument", lat:35.6950, lng:139.7019}
        ]},
    london: {lat: 51.4804, lng: -0.1476, zoom: 12.5, 
        places: [{name:"Wimbeldon",type:"stadium", lat:51.4337, lng:-0.2145}, 
            {name:"Hyde Park",type:"park", lat:51.5070, lng:-0.1691},
            {name: "Buckingham Palace",type:"castle", lat:51.5010, lng:-0.1426},
            {name: "Tower Bridge",type:"bridge", lat:51.5056, lng:-0.0753},
            {name: "Big Ben",type:"monument", lat:51.5006, lng:-0.1246}
        ]},
    cairo:  { lat: 30.0490, lng: 31.2247, zoom: 12.5, 
        places: [{name:"Ghiza Piramids",type:"pyramid", lat:29.97938, lng:31.13478}, 
            {name:"Cairo Citadel",type:"castle", lat:30.0287, lng:31.2599},
            {name: "Mosque of Sadiyya Zainab",type:"church",lat:30.0315, lng:31.2423},
            {name: "Egiptian Museum",type:"monument", lat:30.0484, lng:31.2338},
            {name: "Abdin Palace",type:"castle", lat:30.0432, lng:31.2474}
        ]},
    pripiat:  { lat: 51.3950, lng: 30.0766, zoom: 14.5, 
        places: [{name:"ABK-1",type:"radiation", lat:51.3900, lng:30.1010}, 
            {name:"Staryy Yakht-klub",type:"radiation", lat:51.4082, lng:30.0681},
            {name: "Yaniv",type:"radiation", lat:51.3919, lng:30.0524},
            {name: "Semykhody",type:"radiation", lat:51.3976, lng:30.1045},
            {name: "Big Wheel",type:"radiation", lat:51.4083, lng:30.0558}
        ] }
};

//function used to initialize the map
function initMap(){
    let map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 40, lng: -4},
        zoom:6.5,
    });

    document.getElementById('citySelector').addEventListener("change", () => selectCity(map));
}

//function used to recognise the selected city
function selectCity(map){
    const city = document.getElementById('citySelector').value;
    const cityData = citiesArray[city];

    if(cityData){
        map.setCenter({lat: cityData.lat, lng: cityData.lng});
        map.setZoom(cityData.zoom);
    }

    showCityMarkers(cityData, map);
}

//function used to show the city markers.
function showCityMarkers(cityData, map){
    cityMarkersArray.forEach(marker => marker.setMap(null));
    cityMarkersArray = [];

    if (!cityData.places) return;

    cityData.places.forEach(place => {
        const iconUrl = `img/${place.type}.png`;

        let marker = new google.maps.Marker({
            position: {lat: place.lat, lng: place.lng},
            title: place.name,
            map: map,
            icon: {
                url: iconUrl,
                scaledSize: new google.maps.Size(40, 40)
            }
        });

        google.maps.event.addListener(marker, 'mouseover', function() {
            marker.setIcon({
                url: iconUrl,
                scaledSize: new google.maps.Size(50, 50)
            });

            const infoWindow = new google.maps.InfoWindow({
            content: `<strong>${place.name}</strong>`
            });

            marker.addListener("click", () => {
            infoWindow.open(map, marker);
            });
        });

        google.maps.event.addListener(marker, 'mouseout', function() {
            marker.setIcon({
                url: iconUrl,
                scaledSize: new google.maps.Size(40, 40)
            });
        });

        cityMarkersArray.push(marker);
    });
}

function ubiText(){
    ubi = document.getElementById('ubi').value;
}