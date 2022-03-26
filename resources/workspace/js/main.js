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
import gutil from "./libs/gutil-1.0.0.js";

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

const weatherCardContainerEl = $("#weather-card-container");

/* ----------------------- */
/* Internal Program States */
/* ----------------------- */
// create localstorage datakey name(s)
datastore.datakeys.searchHistory = "search-history";

const searchSettings = {
    historyLength: 10, // maximum number of search results that will be saved
    loadingMessage: "Searching",
    errorMessage: "Invalid entry",
    defaultMessage: "City, State",
}

// store api data
const apis = {
    "openweathermap": {
        root: "https://api.openweathermap.org/data/2.5/",
        apiKey: "&appid=594655f7cc53f85edac45ab1fd9d4a8a",
        default: "&units=imperial",

        getImgUrl(iconId) {
            return `http://openweathermap.org/img/wn/${iconId}@2x.png`;
        }
    }
}

/* ---------------------- */
/* General Util Functions */
/* ---------------------- */
async function getAPIRequest(apiName, query) {
    const api = apis[apiName];
    const response = await fetch(api.root + query + api.default + api.apiKey);
    const data = await response.json();
    return data;
}

/* ------------------------ */
/* Dedicated Util Functions */
/* ------------------------ */
// update current-day local weather 
function updateCurrentWeatherCard(weatherData) {
    const weatherIconEl = $(weatherHeaderEl).children(".weather-icon");
    const cityNameEl = $(weatherHeaderEl).children("h2");
    const tempEl = $("#current-temp");
    const windSpeedEl = $("#current-wind");
    const uviEl = $("#current-uvi");
    const humidityEl = $("#current-humid");

    $(weatherIconEl).attr("src", apis.openweathermap.getImgUrl(weatherData.icon));
    $(cityNameEl).text(weatherData.cityName);
    $(tempEl).text(weatherData.temp + "°F");
    $(windSpeedEl).text(weatherData.windSpeed + "mph");
    $(uviEl).text(weatherData.uvi);
    $(humidityEl).text(weatherData.humidity + "%");
}

function createWeatherCard(weatherData) {
    // construct weather card
    const weatherCardEl = $("<div class=\"weather-card\">");
    const weatherCardHeadEl = $("<div class=\"cent-all-hz\">");
    const forecastDateEl = $("<h3>");
    const forecastIconEl = $("<img class=\"weather-icon\">");
    const weatherCardBodyEl = $("<div class=\"weather-data\">");

    const sec1 = $("<div>");
    const sec2 = $("<div>");
    const sec3 = $("<div>");

    const tempEl = $("<p>");
    const windSpeedEl = $("<p>");
    const humidEl = $("<p>");

    // display data settings to elements
    $(tempEl).text(weatherData.temp + "°F");
    $(windSpeedEl).text(weatherData.windSpeed + "mph");
    $(humidEl).text(weatherData.humidity + "%");
    $(forecastIconEl).attr("src", apis.openweathermap.getImgUrl(weather.icon));

    // append elements to weather card body
    $(sec1).append("<p>Temperature:</p>").append(tempEl);
    $(sec2).append("<p>Wind Speed:</p>").append(windSpeedEl);
    $(sec3).append("<p>Humidity:</p>").append(humidEl);

    $(weatherCardBodyEl).append(sec1);
    $(weatherCardBodyEl).append(sec2);
    $(weatherCardBodyEl).append(sec3);

    // append elements to weather card header
    $(weatherCardHeadEl).append(forecastIconEl);
    $(weatherCardHeadEl).append(forecastDateEl);

    // append both main sub-containers to primary container
    $(weatherCardEl).append(weatherCardHeadEl);
    $(weatherCardEl).append(weatherCardBodyEl);


}

function generateWeatherCards(weatherData) {
    $(weatherCardContainerEl).empty(); // clear old weather cards

    gutil.forInterval(1, 5, 1, 500, index => {

    });
}

function loadSearchHistory() {

}

function addSearchQueryToHistory(query, data) {

}

function processSearchQuery(input) {

    // parse search request for 'CityName, StateName'
    const searchQuery = /(\w+)\s*,\s*(\w+)/.exec(input.trim());

    // if search query is invalid then exit
    if (!searchQuery) {
        $(searchFieldEl).attr("placeholder", searchSettings.errorMessage).val("");
        return;
    }

    // reset placeholder to default
    $(searchFieldEl).attr("placeholder", searchSettings.defaultMessage);
    const [searchInput, queryCity, queryState] = searchQuery;

    // make async request to openweathermap for initial weather and location data
    const weatherLocationRequest = getAPIRequest(
        "openweathermap", 
        `weather?q=${queryCity},${queryState},US`
    );

    // loading animation on search bar
    const waitInterval = gutil.whileInterval(2, 1, 500, num => {
        $(searchFieldEl).val(searchSettings.loadingMessage + ([".", "..", "..."])[num%3]);
    });

    // local weather data JSON parsing callback
    weatherLocationRequest.then(localWeather => {
        const localWeatherData = {
            icon: localWeather.weather[0].icon,
            windSpeed: ~~localWeather.wind.speed,
            temp: ~~localWeather.main.temp,
            cityName: localWeather.name,
            humidity: localWeather.main.humidity
        };

        console.log(localWeather);

        // make second request for forecast
        const forecastRequest = getAPIRequest(
            "openweathermap",
            `onecall?lat=${localWeather.coord.lat}&lon=${localWeather.coord.lon}`
        )

        forecastRequest.then(forecastData => {
            // add uv index to localWeatherData before updating the local weather
            localWeatherData.uvi = forecastData.current.uvi;
            updateCurrentWeatherCard(localWeatherData);

            const forecastWeatherData = {

            }

            // stop animation for initial request 
            clearInterval(waitInterval);
            $(searchFieldEl).val(`${queryCity}, ${queryState}`);

            // add search results to history
            addSearchQueryToHistory({
                query: searchInput,
                cityName: queryCity,
                stateName: queryState
            }, {
                localWeather: localWeatherData,
                forecastWeather: forecastData
            });

            console.log("Forecast:", forecastData);
        });

    });
}

/* ------------------------ */
/* Event Callback Functions */
/* ------------------------ */

function onSearchQuery(event) {
    if (event.keyCode != 13) return; // if the user presses enter, continue

    // unfocus the search field
    $(searchFieldEl).blur();
    processSearchQuery($(searchFieldEl).val());
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