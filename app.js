//Leaflet map with a specified center and zoom level
const map = L.map('map').setView([39.8002401, -101.1848659], 5);

//OpenStreetMap layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

//For deleting markers
const markers = [];
let currentMarker = null;
let circle = null;

// When clicked on map
map.on('click', function(e) {
    const selectedRadius = document.querySelector('input[name="radius"]:checked').value;
    const latitude = e.latlng.lat;
    const longitude = e.latlng.lng;

    // Fetch weather data based on the clicked location
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode,windspeed_10m`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        const temperature = data.hourly.temperature_2m[0];
        const weatherCode = data.hourly.weathercode[0];
        const windspeed = data.hourly.windspeed_10m[0];
        const time = data.hourly.time[0];

        // <div> block that displays fetched weather data
        const locationInfo = document.getElementById('data-list');
        locationInfo.innerHTML = `
            <div class="Box">
                <p>Last readings taken: ${time} </p>
                <p> ${temperature}°C </p>
                <p> Weather code: ${weatherCode} </p> 
                <p> Wind: ${windspeed} km/h</p>
            `;
        if (circle) {
            map.removeLayer(circle);
        }
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });

    // Removes existing blue markers
    markers.forEach(marker => {
        map.removeLayer(marker);
    });
    //removes orange marker
    markers.length = 0;
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }

    // Fetching McDonalds data
    fetch(`test.php?radius=${selectedRadius}&latitude=${latitude}&longitude=${longitude}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        const locationsContainer = document.getElementById('locationsContainer');
        locationsContainer.innerHTML = '';
        data.forEach(location => {
            // makes <div> block for each fetched location
            const locationDiv = document.createElement('div');
            locationDiv.classList.add('location');
            const locationInfoHTML = `
                <div class="locations">
                    <img src="./logo.png" alt="Logo" class="location-logo">
                    <p>Street: ${location.addressLine1}  Country: ${location.addressLine4}  City: ${location.addressLine3}  Latitude: ${location.latitude}  Longitude: ${location.longitude}</p>
                </div>
            `;
            locationDiv.innerHTML = locationInfoHTML;
            locationsContainer.appendChild(locationDiv);
            const marker = L.marker([location.latitude, location.longitude])
                .bindPopup(locationInfoHTML)
                .addTo(map);
    
            markers.push(marker);
            locationDiv.querySelector('p').addEventListener('click', () => {
                marker.openPopup();
            });
        });
    
        // Adds an orange marker for the clicked location
        currentMarker = L.marker([latitude, longitude], { icon: orangeIcon }).addTo(map);
        const group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds());
        const radiusInMeters = selectedRadius * 1609.34;
        circle = L.circle([latitude, longitude], {
            radius: radiusInMeters,
            color: 'gray',
            fillColor: 'gray',
            fillOpacity: 0.1,
        }).addTo(map);
    })
    .catch(error => {
        console.error('Error fetching locations:', error);
    });
});

// Cursom marker for current location (orange)
const orangeIcon = L.divIcon({
    className: 'custom-icon',
    iconSize: [20, 20],
    html: '<div style="background-color: orange; width: 20px; height: 20px; border-radius: 50%;"></div>',
});
