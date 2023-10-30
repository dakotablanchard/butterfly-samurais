const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const uuid = urlParams.get("uuid");
const response = JSON.parse(localStorage.getItem(uuid));

const activityWrapper = document.getElementById("activity-wrapper");

function init() {
	console.log(response);
	displayResponse();
}

function displayResponse(response) {
	for (activity of response) {
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

	const cardTitleSpan = document.createElement("span");
	cardTitleSpan.className = "card-title";
	cardTitleSpan.textContent = header;

	const cardContentDiv = document.createElement("div");
	cardContentDiv.className = "card-content";

	const paragraph = document.createElement("p");
	paragraph.textContent = description;

	cardImageDiv.appendChild(cardTitleSpan);
	cardContentDiv.appendChild(paragraph);
	cardDiv.appendChild(cardContentDiv);
	colDiv.appendChild(cardDiv);
	activityWrapper.appendChild(colDiv);
}

init();
