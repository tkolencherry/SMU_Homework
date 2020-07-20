// Read in JSON File 
$(document).ready(function() {

    buildPage();

});


function buildPage() {
    $.ajax({
        url: "../data/samples.json",
        type: 'GET',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {




            var id = data.metadata.map(x => x.id)



            id.forEach(function(num) {
                // for each id in the array, append it as a dropdown option to the menu
                let id_dropdown = `<option class = "dropdown-item">${num}</option>`
                $('#selDataset').append(id_dropdown);


            });
            let inputValue = $('#selDataset').val()
            grabDemographics(inputValue);
            buildBar(inputValue);
            buildBubble(inputValue);
            buildGauge(inputValue);






        },
        failure: function(error) {
            console.log(error);
        }
    })
}


function grabDemographics(id) {
    $.ajax({
        url: "../data/samples.json",
        type: 'GET',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {

            let metadata = data.metadata.filter(x => x.id == parseInt(id))[0];

            $('#demo_info').empty();
            Object.entries(metadata).forEach(function([key, value]) {
                if ((key !== 'id') && (key !== 'wfreq')) {
                    let var_option = `<li class="list-group-item d-flex justify-content-between align-items-center">${key.toUpperCase()}:  <span class="badge-pill">${value}</span> </li>`
                    $('#demo_info').append(var_option);
                };

            })

        },
        failure: function(error) {
            console.log(error);
        }
    })
}

function buildBar(id) {

    $.ajax({
        url: "../data/samples.json",
        type: 'GET',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {

            let sampleData = data.samples.filter(x => x.id == parseInt(id))[0];

            let sampleList = sampleData["otu_ids"].map(function(e, i) {
                return [e, sampleData["sample_values"][i], sampleData["otu_labels"][i]];
            });

            let sampleSort = sampleList.sort((a, b) => b[1] - a[1]);
            x = sampleSort.map(x => x[1]).slice(0, 10).reverse() //[1] corresponds to the sample_value
            y = sampleSort.map(x => "OTU " + x[0]).slice(0, 10).reverse() //[0] corresponds to the OTU ID (the OTU is neccessary to append)

            var trace1 = {
                x: x,
                y: y,
                type: 'bar',
                orientation: 'h',
                marker: { color: "#129BBC" }

            }

            var traces = [trace1];

            var layout = {
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

function buildBubble(id) {
    $.ajax({
        url: "../data/samples.json",
        type: 'GET',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {

            let sampleData = data.samples.filter(x => x.id == parseInt(id))[0];


            y = sampleData.sample_values
            x = sampleData.otu_ids
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

            var config = { responsive: true };

            Plotly.newPlot("bubble", traces, layout), config;

        },
        failure: function(error) {
            console.log(error);
        }
    })
}

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


// EVENT LISTENERS 
// Dropdown Change 
$('#selDataset').on('change', function() {
    buildPage();
})


// MISC