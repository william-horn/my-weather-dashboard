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

Handle Weather Dashboard logic

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


/* ------------------------ */
/* Event Callback Functions */
/* ------------------------ */
function init() {
    
    const data = getAPIRequest(
        "https://api.openweathermap.org/data/2.5/weather?q=Raleigh,NC,US",
        weatherAPIKey
    );
    
    data.then(data => {
        console.log("finally: ", data);
    })

}

/* -------------------------- */
/* Connect Js Event Listeners */
/* -------------------------- */
$(() => init()) // init program when document is ready