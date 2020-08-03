$(document).ready(function() {
    makeMap();
});

function makeMap() {
    //clear map
    $('#map').empty();
    $('#map').append('<div style="height:700px" id="map"></div>');

    // Adding tile layer to the map
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });

    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });

    var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "satellite-streets-v11",
        accessToken: API_KEY
    });

    // Grab Earthquake Data 
    var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

    d3.json(geoData).then(function(response) {
        console.log(response);

        //create markers, heatmap, and circles
        var markers = L.markerClusterGroup(); //this is already a master layer
        var heatArray = [];
        var circles = [];

        // earthquake data
        var earthquakes = response.features;

        // grab relevant data
        earthquakes.forEach(function(earthquake) {
            let lon = earthquake.geometry.coordinates[0];
            let lat = earthquake.geometry.coordinates[1];
            let magnitude = earthquake.properties.mag;
            let location = earthquake.properties.place;
            let time = getTime(earthquake.properties.time);

            // console.log(lat, lon);

            // if the latitude and longitude are given...
            if ((lat) && (lon)) {
                //marker for cluster
                let temp = L.marker([+lat, +lon]).bindPopup(`<h4>${location}</h4> <hr> <p>Magnitude: ${magnitude}</p> <p>Occured: ${time} </p>`);
                // add the marker to the layer
                markers.addLayer(temp);

                //heatmap points
                heatArray.push([+lat, +lon]);

                // circles with changing radius
                circles.push(L.circle([+lat, +lon], {
                    fillOpacity: 0.8,
                    color: getMarkerColor(magnitude),
                    // fillColor: getMarkerColor(magnitude),
                    radius: getMarkerSize(magnitude)
                }).bindPopup(`<h4>${location}</h4> <hr> <p>Magnitude: ${magnitude}</p> <p>Occured: ${time} </p>`));

            }
        });

        // grab fault lines data 
        var faultData = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
        d3.json(faultData).then(function(response) {
            console.log(response);
            let faults = L.geoJSON(response, {
                    style: function(feature) {
                        return {
                            color: '#D5573B',
                            weight: 2.0
                        }
                    }
                })
                //create heatmap layer
            var heat = L.heatLayer(heatArray, {
                radius: 20,
                blur: 15,
                gradient: {
                    0: '#F24236',
                    0.5: "#86A8E7",
                    1: "#5FFBF1"
                },
                "maxOpacity": .8,
                "scaleRadius": true,
                "useLocalExtrema": true,
            });

            // create circles layer
            var circleLayer = L.layerGroup(circles);

            // Create a baseMaps object to contain the streetmap and darkmap
            var baseMaps = {
                "Street": streetmap,
                "Dark": darkmap,
                "Light": lightmap,
                "Satellite": satellitemap
            };

            // Create an overlayMaps object here to contain the "State Population" and "City Population" layers
            var overlayMaps = {
                "Heatmap": heat,
                "Markers": markers,
                "Magnitudes": circleLayer,
                "Fault Lines": faults
            };

            // Creating map object
            var myMap = L.map("map", {
                center: [-25.3145, -60.783],
                zoom: 4,
                layers: [darkmap, circleLayer]
            });

            // Create a layer control, containing our baseMaps and overlayMaps, and add them to the map
            L.control.layers(baseMaps, overlayMaps).addTo(myMap);

            // Create a legend to display information about our map
            var info = L.control({
                position: "bottomleft"
            });
            // When the layer control is added, insert a div with the class of "legend"
            info.onAdd = function() {
                var div = L.DomUtil.create("div", "legend");
                //create HTML for legend (has to be i tags) - taken from Alexander (thanks) + Stack Overflow: https://gis.stackexchange.com/questions/133630/adding-leaflet-legend
                div.innerHTML += "<h4><u>Magnitudes</u></h4>";
                div.innerHTML += '<i class="dot" style="background: #8E7C93"></i><span>0-2</span><br>';
                div.innerHTML += '<i class="dot" style="background: #610345"></i><span>2-4</span><br>';
                div.innerHTML += '<i class="dot" style="background: #2292A4"></i><span>4-6</span><br>';
                div.innerHTML += '<i class="dot" style="background: #BDBF09"></i><span>6-8</span><br>';
                div.innerHTML += '<i class="dot" style="background: #D96C06"></i><span>8+</span>';

                return div;
            };
            // Add the info legend to the map
            info.addTo(myMap);

        })


    });
}

// f(x) - given a UNIX code, spit out a date and time. Based on code provided in https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript/12848463. 
function getTime(timestamp) {
    var stamp = new Date(timestamp * 1000);

    var date = stamp.getDate();

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var month = months[stamp.getMonth()];


    // Modified to get the current year because the data is rendered from the last thirty days - would pose an issue in January, but that can be dealt with later
    var year = new Date().getFullYear();

    var hours = stamp.getHours();

    var minutes = "0" + stamp.getMinutes();

    var seconds = "0" + stamp.getSeconds();

    var formattedTime = `${month} ${date}, ${year}; ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;

    return formattedTime;
}

// f(x): given the magnitude, change the size of the marker - used different scale factors to make the difference in size bigger
function getMarkerSize(magnitude) {
    var size = 0;
    if (magnitude > 8) {
        size = magnitude * 24000;
    } else if (magnitude > 6) {
        size = magnitude * 20000;
    } else if (magnitude > 4) {
        size = magnitude * 19000;
    } else if (magnitude > 2) {
        size = magnitude * 18000;
    } else {
        size = magnitude * 18000;
    }
    return size;
}

// f(x): given the magnitude change the color 
function getMarkerColor(magnitude) {
    var color = "";
    if (magnitude > 8) {
        color = "#D96C06";
    } else if (magnitude > 6) {
        color = "#BDBF09";
    } else if (magnitude > 4) {
        color = "#2292A4";
    } else if (magnitude > 2) {
        color = "#610345"
    } else {
        color = "#8E7C93";
    }
    return color;
}