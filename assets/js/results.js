const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const uuid = urlParams.get("uuid");
const jsonResponseArr = JSON.parse(localStorage.getItem(uuid));
const response = JSON.parse(jsonResponseArr[0]);
const auxData = jsonResponseArr[1];

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

init();
