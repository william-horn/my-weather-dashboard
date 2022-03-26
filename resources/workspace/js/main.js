/*
? @document-start
======================
| MAIN PROGRAM LOGIC |
==================================================================================================================================

? @author:                 William J. Horn
? @document-name:          main.js
? @document-created:       03/24/2022
? @document-modified:      03/24/2022
? @document-version:       v1.0.0

==================================================================================================================================

? @document-info
==================
| ABOUT DOCUMENT |
==================================================================================================================================

This program handles the main Weather Dashboard logic.

* Technologies used:
    - jQuery
    - openweathermap API
    - Google Fonts API

* openweatherapp API key:
    - 594655f7cc53f85edac45ab1fd9d4a8a

==================================================================================================================================

? @document-changelog
======================
| DOCUMENT CHANGELOG |
==================================================================================================================================

==================================================================================================================================

? @document-todo
=================
| DOCUMENT TODO |
==================================================================================================================================

==================================================================================================================================
*/

/* ---------------- */
/* Import Libraries */
/* ---------------- */
import datastore from "./libs/datastore-1.0.0.js";
import PseudoEvent from "./libs/pseudo-events-2.1.0.js";

/* ------------------------- */
/* Global Element References */
/* ------------------------- */
// Search field elements
const searchFieldEl = $("#search-field");
const searchDropDownEl = $("#search-drop-down");
const searchDropDownResultsEl = $("#search-drop-down .scroll");

// Current weather display elements
const currentWeatherDisplayEl = $("#current-weather-display");
const weatherHeaderEl = $(currentWeatherDisplayEl).children(".weather-header");
const weatherDataEl = $(currentWeatherDisplayEl).children(".weather-data");

/* ----------------------- */
/* Internal Program States */
/* ----------------------- */
const weatherAPIKey = "594655f7cc53f85edac45ab1fd9d4a8a";

/* ---------------------- */
/* General Util Functions */
/* ---------------------- */
async function getAPIRequest(url, key) {
    const response = await fetch(url + "&appid=" + key);
    const data = await response.json();
    return data;
}

/* ------------------------ */
/* Dedicated Util Functions */
/* ------------------------ */
function updateCurrentWeatherCard(weatherData) {

}

function generateWeatherCard(weatherData) {

}

function loadSearchHistory() {

}

/* ------------------------ */
/* Event Callback Functions */
/* ------------------------ */

function onSearchQuery(event) {
    if (event.keyCode != 13) return; // if the user presses enter, continue

    // unfocus the search field
    $(searchFieldEl).blur();

    // parse search request
    const searchQuery = /(\w+)\s*,\s*(\w+)/.exec(
        $(searchFieldEl).val().trim()
    );

    // search parameters should be in format: 'city', 'state abbrv'
    const [searchInput, queryCity, queryState] = searchQuery;

    const searchPromise = getAPIRequest(
        `https://api.openweathermap.org/data/2.5/weather?q=${queryCity},${queryState},US`,
        weatherAPIKey
    );

    console.log("Searched! Result: ");
    searchPromise.then(data => console.log(data));
}

function onSearchFocus(event) {
    $(searchDropDownEl).show();
}

function onSearchFocusLost(event) {
    $(searchDropDownEl).hide();
}

function init() {
    

}

/* -------------------------- */
/* Connect Js Event Listeners */
/* -------------------------- */
$(searchFieldEl).focusout(onSearchFocusLost);
$(searchFieldEl).focus(onSearchFocus);
$(searchFieldEl).keyup(onSearchQuery);
$(() => init()) // init program when document is ready