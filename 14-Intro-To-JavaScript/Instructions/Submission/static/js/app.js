// GLOBAL VARIABLES

var originalData = UFOdata;

// WEBPAGE JAVASCRIPT 
$(document).ready(function() {
    // Load Page
    init();

    // EVENT LISTENERS

    // Hit Enter on the Date Filter Form
    $('.form').on('submit', function(entry) {

        // Don't refresh page 
        entry.preventDefault();

        // Filter and Build Table
        buildTable();

    });

    // "FILTER TABLE" Button
    $('#filter-btn').on('click', function(entry) {
        entry.preventDefault();
        buildTable();

    });

    // Change in geographic or shape filter dropdowns
    $('#city_drop, #state_drop, #country_drop, #shape_drop').on('change', function(entry) {
        entry.preventDefault();
        buildTable();

    });
});


// FUNCTIONS CALLED (In order of dependency)

// f(x): Change string to Title Case (modified from StackOverflow)
function titleCase(name) {
    // take a given string, change it to all lowercase and then split into words
    var split_string = name.toLowerCase().split(" ");

    // loop through each word
    for (var i = 0; i < split_string.length; i++) {
        // capitalize the first letter of the word and use string concatenation to reassemble the word
        split_string[i] = split_string[i][0].toUpperCase() + split_string[i].slice(1);
    }

    // join the phrase back together
    split_string = split_string.join(" ");

    // return the title case word/phrase
    return split_string;
};

// f(x): Populate city dropdown options
function cityOptions() {
    // create a new set (array) that consists of the city names
    var cities = [...new Set(originalData.map(x => x.city))];

    // use sort to bring back all the unique values
    cities.sort();

    // for each city in the list of cities...
    cities.forEach(function(city) {
        // bring back the title-case name of the city
        let city_name = titleCase(city);
        // create a dropdown item with the city name 
        let city_dropdown = `<option>${city_name}</option>`
            // append the html item to the dropdown menu
        $('#city_drop').append(city_dropdown);
    });

};

// f(x): Populate state dropdown options
function stateOptions() {
    var states = [...new Set(originalData.map(x => x.state))];
    states.sort();

    states.forEach(function(state) {
        // Note here the use of JS toUpperCase to format state names
        let state_dropdown = `<option>${state.toUpperCase()}</option>`
        $('#state_drop').append(state_dropdown);
    });

};

// f(x): Populate country dropdown options
function countryOptions() {
    var countries = [...new Set(originalData.map(x => x.country))];
    countries.sort();

    countries.forEach(function(country) {
        // Note here the use of JS toUpperCase to format country names
        let country_dropdown = `<option>${country.toUpperCase()}</option>`
        $('#country_drop').append(country_dropdown);
    });
}

// f(x): Populate shape dropdown options
function shapeOptions() {
    var shapes = [...new Set(originalData.map(x => x.shape))];
    shapes.sort();

    shapes.forEach(function(shape) {
        let shape_dropdown = `<option>${shape}</option>`
        $('#shape_drop').append(shape_dropdown);
    });
}



// f(x): Filter Data (Single Filter) - Given the most recent filter, filter data
function filterData() {
    // Grab form/dropdown values
    var inputValue = $('#datetime').val();
    // Need to change to lowercase in order to match format of data
    var cityValue = $('#city_drop').val().toLowerCase();
    var stateValue = $('#state_drop').val().toLowerCase();
    var countryValue = $('#country_drop').val().toLowerCase();
    var shapeValue = $('#shape_drop').val();

    // Need to set filter_data as originalData otherwise when the dropdown goes back to "ALL" a table won't populate
    var filter_data = originalData;

    // Paired if statements change the value of filter_data as appropriate 
    // NOTE: These are paired, not nested, which means that the data is filtered in a way that assumes that ONLY one of the 
    // filters is being applied. 

    if (inputValue != "") {
        // Note the use of Date.parse to allow more flexibility re: user inpu of dates - transforms into Unicode datetime
        filter_data = originalData.filter(x => Date.parse(x.datetime) === Date.parse(inputValue));
    };

    // Since values were set for all of these within the HTML, must use "all" as opposed to "ALL"
    if (cityValue !== "all") {
        filter_data = originalData.filter(x => x.city === cityValue);

    };
    if (stateValue !== "all") {
        filter_data = originalData.filter(x => x.state === stateValue);
    };
    if (countryValue !== "all") {
        filter_data = originalData.filter(x => x.country === countryValue);
    };
    if (shapeValue !== "all") {
        filter_data = originalData.filter(x => x.shape === shapeValue);
    };

    // Since we're calling this function within another, must return the value 
    return filter_data;
};

// f(x): Build Table - Iterate through data and build table based on filtered data
function buildTable() {
    // In order to use the filter_data value that is returned from calling the f(x) we need to assign it to a variable. 
    var filter_data = filterData();

    // Without this code we throw an error because a DataTable cannote be re-initialized
    $('#ufo-table').DataTable().clear().destroy();
    $('#ufo-table tbody').empty();

    // For each entry within the filtered data...
    filter_data.forEach(function(entry) {
        // beging to create a new row with the opening tr tag
        let newRow = "<tr>";
        // within each entry grab the key-value pair...
        Object.entries(entry).forEach(function([key, value]) {
            // append the HTML for a new cell containing the value
            newRow += `<td> ${value} </td>`
        });
        // append the closing tr tag to the newRow variable
        newRow += `</tr>`

        // Append the new row to the table
        $('#ufo-table tbody').append(newRow);

    });

    // Take the table and turn it into a super special DataTable with pagination
    $('#ufo-table').DataTable({
        paging: true
    });

};

// f(x): Initialize Page - Load Dropdown Options and Build Initial Table
function init() {
    cityOptions();
    stateOptions();
    countryOptions();
    shapeOptions();
    buildTable();
};