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

function init() {
	displayResponse();
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





function createWeatherCard(weatherObj) {
	var locationWeather = auxData.location;
	console.log(locationWeather);

// 	let header = weatherObj.heading;
// 	let description = weatherObj.description;

// 	const colDiv = document.createElement("div");
// 	colDiv.className = "col s12";

// 	const cardDiv = document.createElement("div");
// 	cardDiv.className = "card";
// 	colDiv.appendChild(cardDiv);

// 	const cardTitleSpan = document.createElement("span");
// 	cardTitleSpan.className = "card-title";
// 	cardTitleSpan.textContent = header;
// 	cardDiv.appendChild(cardTitleSpan);

// 	const cardContentDiv = document.createElement("div");
// 	cardContentDiv.className = "card-content";
// 	cardDiv.appendChild(cardContentDiv);

// 	const paragraph = document.createElement("p");
// 	paragraph.textContent = description;
// 	cardContentDiv.appendChild(paragraph);

// 	activityWrapper.appendChild(colDiv);
}



// // Function to display current weather at chosen destination
// var APIKey = "3ac4c533f75c393e9ad9feff434508cf";
// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;

// function displayForecast(currentWeatherData) {

// 	// 	//Need to add ability to find selected date!!!
// 	document.querySelector(".cityName").innerHTML = currentWeatherData.city.name;
// 	document.querySelector("#todayTemp").innerHTML = "Temperature: " + currentWeatherData.list[0].main.temp + "°F";
// 	document.querySelector("#todayWind").innerHTML = "Wind Speed: " + currentWeatherData.list[0].wind.speed + "mph";
// 	document.querySelector("#todayHumid").innerHTML = "Humidity: " + currentWeatherData.list[0].main.humidity + "%";
// }

console.log(auxData.location);
// console.log(auxData.date);


init();
