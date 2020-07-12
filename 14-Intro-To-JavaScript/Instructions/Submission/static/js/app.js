var originalData = UFOdata;

$(document).ready(function() {

    // function init() {
    cityOptions();
    stateOptions();
    countryOptions();
    shapeOptions();
    $('#ufo-table tbody').empty();

    originalData.forEach(function(entry) {

        let newRow = "<tr>";
        Object.entries(entry).forEach(function([key, value]) {
            // console.log([key, value])
            newRow += `<td> ${value} </td>`
        });
        newRow += `</tr>`

        $('#ufo-table tbody').append(newRow);

    });

    // };

    // init();
    // console.log(tableData);

    $('.form').on('submit', function(entry) {
        entry.preventDefault();

        $('#ufo-table tbody').empty();

        buildTable();

    });

    $('.filter-btn').on('click', function(entry) {
        entry.preventDefault();

        $('#ufo-table tbody').empty();

        buildTable();

    });

    $('#city_drop, #state_drop, #country_drop, #shape_drop').on('change', function(entry) {
        entry.preventDefault();

        $('#ufo-table tbody').empty();

        buildTable();

    });
});

function buildTable() {

    var filter_data = filterData();


    $('#ufo-table tbody').empty();

    filter_data.forEach(function(entry) {

        let newRow = "<tr>";
        Object.entries(entry).forEach(function([key, value]) {
            // console.log([key, value])
            newRow += `<td> ${value} </td>`
        });
        newRow += `</tr>`

        $('#ufo-table tbody').append(newRow);

    });

};


function filterData() {
    var inputValue = $('#datetime').val();
    var cityValue = $('#city_drop').val().toLowerCase();
    var stateValue = $('#state_drop').val().toLowerCase();
    var countryValue = $('#country_drop').val().toLowerCase();
    var shapeValue = $('#shape_drop').val();

    // Need to set filter_data as originalData otherwise when the dropdown goes back to "ALL" a table won't populate
    var filter_data = originalData;


    if (inputValue != "") {
        filter_data = originalData.filter(x => x.datetime === inputValue);
    };

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


    // console.log(cityValue !== "ALL");
    // console.log(stateValue !== "ALL");
    // console.log(countryValue !== "ALL");
    // console.log(shapeValue !== "ALL");

    // console.log(inputValue);
    // console.log(stateValue);
    // console.log(countryValue);
    // console.log(shapeValue);

    // console.log(filter_data);
    return filter_data;
};


function cityOptions() {
    var cities = [...new Set(originalData.map(x => x.city))];
    cities.sort();

    cities.forEach(function(city) {
        let city_name = titleCase(city);
        let city_dropdown = `<option>${city_name}</option>`
        $('#city_drop').append(city_dropdown);
    });

};

function stateOptions() {
    var states = [...new Set(originalData.map(x => x.state))];
    states.sort();

    states.forEach(function(state) {
        let state_dropdown = `<option>${state.toUpperCase()}</option>`
        $('#state_drop').append(state_dropdown);
    });

};

function countryOptions() {
    var countries = [...new Set(originalData.map(x => x.country))];
    countries.sort();

    console.log(countries);

    countries.forEach(function(country) {
        let country_dropdown = `<option>${country.toUpperCase()}</option>`
        $('#country_drop').append(country_dropdown);
    });
}

function shapeOptions() {
    var shapes = [...new Set(originalData.map(x => x.shape))];
    shapes.sort();

    shapes.forEach(function(shape) {
        let shape_dropdown = `<option>${shape}</option>`
        $('#shape_drop').append(shape_dropdown);
    });
}

function titleCase(name) {
    var split_string = name.toLowerCase().split(" ");

    for (var i = 0; i < split_string.length; i++) {
        split_string[i] = split_string[i][0].toUpperCase() + split_string[i].slice(1);
    }
    split_string = split_string.join(" ");
    return split_string;
};