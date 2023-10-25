const OPEN_AI_KEY = "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";

const AI_USER_STORY = "You are a travel planner.";

function initPlacesAutocomplete() {
	const placesAutocompleteBox = new google.maps.places.Autocomplete(
		document.getElementById("places-search-box"),
		{
			fields: ["address_components", "geometry", "icon", "name"],
		}
	);
}

function openAiCall(prompt) {
	return prompt;
}

function searchSubmission(event) {
	event.preventDefault();
	document.getElementById("test-response").textContent = openAiCall("test");
}

function init() {
	const searchForm = document.getElementById("search-form");
	searchForm.addEventListener("submit", searchSubmission);
}

init();
