function initPlacesAutocomplete() {
	const placesAutocompleteBox = new google.maps.places.Autocomplete(
		document.getElementById("places-search-box"),
		{
			fields: ["address_components", "geometry", "icon", "name"],
		}
	);
}

function searchSubmission(event) {
	event.preventDefault();
}

function init() {
	const searchForm = document.getElementById("search-form");
	searchForm.addEventListener("submit", searchSubmission);
}

init();
