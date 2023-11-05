// Weather Api inputs
var APIKey = "3ac4c533f75c393e9ad9feff434508cf";
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const uuid = urlParams.get("uuid");
const jsonResponseArr = JSON.parse(localStorage.getItem(uuid));
const response = JSON.parse(jsonResponseArr[0]);
const auxData = jsonResponseArr[1];

//Store weather inputs as variables
//Adjust to the ability to find selected date
const dateBox = document.getElementById("datepicker");

const activityWrapper = document.getElementById("activity-wrapper");
const weatherWrapper = document.getElementById("weather-wrapper");

function init() {
	displayResponse();
	displayWeather();
}

function displayResponse() {
	for (activity of response) {
		createEventCard(activity);
	}
}

function createEventCard(eventObj) {
	let header = eventObj.heading;
	let description = eventObj.description;

	const colDiv = document.createElement("div");
	colDiv.className = "col s12";

	const cardDiv = document.createElement("div");
	cardDiv.className = "card";
	colDiv.appendChild(cardDiv);

	const cardTitleSpan = document.createElement("span");
	cardTitleSpan.className = "card-title";
	cardTitleSpan.textContent = header;
	cardDiv.appendChild(cardTitleSpan);

	const cardContentDiv = document.createElement("div");
	cardContentDiv.className = "card-content";
	cardDiv.appendChild(cardContentDiv);

	const paragraph = document.createElement("p");
	paragraph.textContent = description;
	cardContentDiv.appendChild(paragraph);

	activityWrapper.appendChild(colDiv);
}


// function displayWeather() {
// 	for (location of auxData) {
// 		createEventCard(weather);
// 	}


// Must adress the "THEN" loop.

// 	fetch(queryURL).then(function (response) {
// 		console.log(response);
// 		return response.json();
// 	})

// 	.then(function (weatherData) {
// 		renderCurrentDest(weatherData);
// 	});
// }


function createWeatherCard(weatherObj) {
	let header = weatherObj.heading;
	let description = weatherObj.description;
	var locationWeather = auxData.location; // need to set this var using weatherAPI. not location...
	console.log(locationWeather);

	const colDiv = document.createElement("div");
	colDiv.className = "col s12";

	const cardDiv = document.createElement("div");
	cardDiv.className = "card";
	colDiv.appendChild(cardDiv);

	const cardTitleSpan = document.createElement("span");
	cardTitleSpan.className = "card-title";
	cardTitleSpan.textContent = header;
	cardDiv.appendChild(cardTitleSpan);

	const cardContentDiv = document.createElement("div");
	cardContentDiv.className = "card-content";
	cardDiv.appendChild(cardContentDiv);

	const paragraph = document.createElement("p");
	paragraph.textContent = description;
	cardContentDiv.appendChild(paragraph);

	weatherWrapper.appendChild(colDiv);
}

console.log(auxData.location);
console.log(auxData.date);


init();
