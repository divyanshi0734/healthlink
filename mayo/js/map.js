let map;

function initMap() {
    console.log("initMap() called");
    const apiKey = "AIzaSyAY7yJTWj_oLIc1fLHDCQlj4lxlUdSFwDA";
    console.log("API Key:", apiKey);

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=onMapLoaded&libraries=places`;  // Add places library
    script.async = true;

    script.onerror = function() {
        console.error("Failed to load Google Maps API script.");
    };

    document.head.appendChild(script);
}

function onMapLoaded() {
    try {
        console.log("onMapLoaded() called");
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 0, lng: 0 },
            zoom: 8
        });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    map.setCenter(pos);

                    new google.maps.Marker({
                        position: pos,
                        map: map,
                        title: "Your Location"
                    });
                },
                () => {
                    handleLocationError(true, map.getCenter());
                }
            );
        } else {
            handleLocationError(false, map.getCenter());
        }
    } catch (error) {
        console.error("Error initializing map:", error);
    }
}

function handleLocationError(browserHasGeolocation, pos) {
    alert(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

function findNearbyHospitals() {
    try {
        console.log("findNearbyHospitals() called");
        if (!map) {
            console.error("Map is not initialized yet!");
            return;
        }
        const service = new google.maps.places.PlacesService(map);
        const request = {
            location: map.getCenter(),
            radius: '5000',
            type: ['hospital']
        };

        service.nearbySearch(request, (results, status) => {
            console.log("nearbySearch status:", status);
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                clearMarkers();
                results.forEach(place => {
                    createMarker(place);
                });
            } else {
                alert('Could not find any hospitals nearby.  Error: ' + status);
            }
        });
    } catch (error) {
        console.error("Error finding nearby hospitals:", error);
    }
}

function findNearbyClinics() {
    try {
        console.log("findNearbyClinics() called");
        if (!map) {
            console.error("Map is not initialized yet!");
            return;
        }
        const service = new google.maps.places.PlacesService(map);
        const request = {
            location: map.getCenter(),
            radius: '5000',
            type: ['doctor']
        };

        service.nearbySearch(request, (results, status) => {
            console.log("nearbySearch status:", status);
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                clearMarkers();
                results.forEach(place => {
                    createMarker(place);
                });
            } else {
                alert('Could not find any clinics nearby.  Error: ' + status);
            }
        });
    } catch (error) {
        console.error("Error finding nearby clinics:", error);
    }
}

let markers = [];

function createMarker(place) {
    const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name
    });

    markers.push(marker);

    const infowindow = new google.maps.InfoWindow({
        content: `<strong>${place.name}</strong><br>${place.vicinity}`
    });

    marker.addListener('click', () => {
        infowindow.open(map, marker);
    });
}

function clearMarkers() {
    markers.forEach(marker => {
        marker.setMap(null);
    });
    markers = [];
}

document.addEventListener('DOMContentLoaded', initMap);