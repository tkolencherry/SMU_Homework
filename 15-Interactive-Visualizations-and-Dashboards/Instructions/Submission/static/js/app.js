// WEBPAGE JS
$(document).ready(function() {
    buildPage();

    // EVENT LISTENERS 
    // Dropdown Change 
    $('#selDataset').on('change', function() {
        buildPage();
    })

})




// FUNCTIONS - In order of dependency

// f(x) - Grab the Demographic Information
function grabDemographics(id) {
    // AJAX get request
    $.ajax({
        url: "../data/samples.json",
        type: 'GET',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            // grab the metadata array from the data
            let metadata = data.metadata.filter(x => x.id == parseInt(id))[0];

            // empty out the box
            $('#demo_info').empty();

            // for each entry in the array, grab each key-value pair
            Object.entries(metadata).forEach(function([key, value]) {
                // Bring back key-value pairs except for the id (which is what you're selecting off of) and the wash frequency (which is in the gauge chart)
                if ((key !== 'id') && (key !== 'wfreq')) {
                    let var_option = `<li class="list-group-item d-flex justify-content-between align-items-center">${key.toUpperCase()}:  <span class="badge-pill">${value}</span> </li>`
                        // Append the bullet
                    $('#demo_info').append(var_option);
                };

            })

        },
        failure: function(error) {
            console.log(error);
        }
    })
}

// f(x) - Build a horizontal bar graph given an id
function buildBar(id) {
    // AJAX get request
    $.ajax({
        url: "../data/samples.json",
        type: 'GET',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            // grab sample data 
            let sampleData = data.samples.filter(x => x.id == parseInt(id))[0];

            // Need to sort the data - took this code from Alexander 
            // take the OTU ids and bring back the id and the index of the id
            let sampleList = sampleData["otu_ids"].map(function(e, i) {
                // return the OTU id and then use the index to grab the corresponding sample values and OTU labels and toss them in an array
                return [e, sampleData["sample_values"][i], sampleData["otu_labels"][i]];
            });

            // sort the list
            let sampleSort = sampleList.sort((a, b) => b[1] - a[1]);
            x = sampleSort.map(x => x[1]).slice(0, 10).reverse() //[1] corresponds to the sample_value
            y = sampleSort.map(x => "OTU " + x[0]).slice(0, 10).reverse() //[0] corresponds to the OTU ID (the OTU is neccessary to append)

            // set up trace
            var trace1 = {
                x: x,
                y: y,
                type: 'bar',
                orientation: 'h',
                // set color similar to theme
                marker: { color: "#129BBC" }
            }

            var traces = [trace1];

            var layout = {
                // dynamic title to match ID
                title: `<b>Top OTU Samples for BB ID ${sampleData.id}</b>`,
                yaxis: {
                    title: { text: 'OTU Classification No' },
                    automargin: true
                },
                xaxis: {
                    title: { text: 'Number of Microbes' },
                    automargin: true
                }

            }

            Plotly.newPlot("bar", traces, layout);

        },
        failure: function(error) {
            console.log(error);
        }
    })
}

// f(x) - Build a scatter/bubble plot
function buildBubble(id) {
    $.ajax({
        url: "../data/samples.json",
        type: 'GET',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {

            let sampleData = data.samples.filter(x => x.id == parseInt(id))[0];

            // Since there is no sorting required, can just directly call the key
            y = sampleData.sample_values
            x = sampleData.otu_ids
                // Grab text to show up when hovered over
            text = sampleData.otu_labels

            var trace1 = {
                x: x,
                y: y,
                text: text,
                mode: 'markers',
                marker: {
                    color: "#129BBC",
                    size: y
                        // color: [300, 100, 2, 3, 24, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 338, 0],
                        // colorscale: 'Electric'

                },

            }

            var traces = [trace1];

            var layout = {
                title: `<b>OTU Sample Values for BB ID Number ${sampleData.id}</b>`,
                xaxis: {
                    title: { text: 'OTU Classification No' },
                    automargin: true
                },
                yaxis: {
                    title: { text: 'Number of Microbes' },
                    automargin: true
                }

            }

            // Will make it so that when the browser changes size, the graph is responsive
            var config = { responsive: true };

            Plotly.newPlot("bubble", traces, layout), config;

        },
        failure: function(error) {
            console.log(error);
        }
    })
}

// f(x) - Build a Gauge Chart (this chart isn't as impressive here)
function buildGauge(id) {
    $.ajax({
        url: "../data/samples.json",
        type: 'GET',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {

            let metadata = data.metadata.filter(x => x.id == parseInt(id))[0];

            x = metadata.id
            y = metadata.wfreq

            var trace1 = {
                domain: { x: [0, 9], y: [0, 9] },
                value: y,
                title: {
                    text: `<b> Belly Button #${x} Wash Frequency </b>`,
                    font: { size: 22 }
                },
                type: 'indicator',
                mode: 'gauge+number',
                gauge: {
                    axis: { range: [0, 9] },
                    bar: { color: "#129BBC" }
                },
                number: {
                    suffix: "x a Week",
                    font: {
                        size: 18
                    }
                },

            }

            var traces = [trace1];
            var layout = { height: 600, width: 400, margin: { t: 0, b: 20 } };
            var config = { responsive: true };

            Plotly.newPlot("gauge", traces, layout, config);

        },
        failure: function(error) {
            console.log(error);
        }
    })
}


// f(x): Build the Page 
// (1/3) Note: Normally we'd be able to build out a function just for the dropdown and then call it plus the buildGraphs functions in a separate init function, but because of the AJAX get request 
// (2/3) the code to actually do stuff is affiliated with the success key. So if we try to return inputValue within the success portion, then we can't call it elsewhere because the dropdown needs
// (3/3) to populate in order for the #selDataset class to have a value. Which means inputValue needs to be defined within the success key-value pair and the other functions need to be called there. 

function buildPage() {
    // Ajax get request to pull in the local file
    $.ajax({
        url: "../data/samples.json",
        type: 'GET',
        // Pulling from an API can use dataType:'json', but that won't work with a local file
        contentType: 'application/json;charset=UTF-8',
        // this portion is the euivalent of .then() for D3 --> success case, failure case
        success: function(data) {
            // Grab the array of ids
            var id = data.metadata.map(x => x.id)
                // For eaach id...
            id.forEach(function(num) {
                // ...append the number to the dropdown menu + some fancy formatting
                let id_dropdown = `<option class = "dropdown-item">${num}</option>`
                $('#selDataset').append(id_dropdown);
            });

            // After the dropwdown has been made, grab the value of the dropdown selection
            let inputValue = $('#selDataset').val()

            // Run these functions
            grabDemographics(inputValue);
            buildBar(inputValue);
            buildBubble(inputValue);
            buildGauge(inputValue);
        },
        // If we fail, tell me why
        failure: function(error) {
            console.log(error);
        }
    })
}