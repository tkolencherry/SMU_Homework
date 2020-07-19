// Read in JSON File 
$(document).ready(function() {


    populateDropdown();




});


function populateDropdown() {
    $.ajax({
        url: "../data/samples.json",
        type: 'GET',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            // alert("got the data!");
            // console.log(data);

            // COME BACK AND CHAIN THIS!!
            var metadata = data.metadata;
            // console.log(metadata);

            var id = metadata.map(x => x.id)

            // console.log(id);

            id.forEach(function(num) {
                // for each id in the array, append it as a dropdown option to the menu
                let id_dropdown = `<option>${num}</option>`
                $('#selDataset').append(id_dropdown);
                // console.log(num);

            });

            // MOVE TO INIT FUNCTION!!!!
            let inputValue = $('#selDataset').val()
            grabDemographics(inputValue);
            buildBar(inputValue);

            // Define the demographic information variables - this will be for bonus later
            var age = metadata.map(x => x.age);
            var ethnicity = metadata.map(x => x.ethnicity);
            var sex = metadata.map(x => x.gender);
            var location = metadata.map(x => x.location);
            var bbType = metadata.map(x => x.bbType);

            // console.log(ethnicity);
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
            console.log(metadata);
            $('#demo_info').empty();
            Object.entries(metadata).forEach(function([key, value]) {
                    if ((key !== 'id') && (key !== 'wfreq')) {
                        let var_option = `<li>${key.toUpperCase()}: ${value}</li>`
                        $('#demo_info').append(var_option);
                    };

                })
                // console.log(data);
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
            console.log(sampleData);
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
                orientation: 'h'
            }

            var traces = [trace1];

            var layout = {
                title: "Top OTU Samples"
            }

            Plotly.newPlot("bar", traces, layout);

        },
        failure: function(error) {
            console.log(error);
        }
    })
}

// EVENT LISTENERS 
// Dropdown Change 
$('#selDataset').on('change', function() {
    let inputValue = $('#selDataset').val()
    grabDemographics(inputValue);
    buildBar(inputValue);
})


// MISC