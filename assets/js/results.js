const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const uuid = urlParams.get("uuid");
const jsonResponse = localStorage.getItem(uuid);
const response = JSON.parse(jsonResponse);

const activityWrapper = document.getElementById("activity-wrapper");

function init() {
	console.log(response);
	displayResponse();
}

function displayResponse() {
	for (activity of response) {
		console.log(activity);
		createEventCard(activity);
	}
}

function createEventCard(eventObj) {
	let header = eventObj.heading;
	let description = eventObj.description;

	const colDiv = document.createElement("div");
	colDiv.className = "col s12 m7";

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

init();
