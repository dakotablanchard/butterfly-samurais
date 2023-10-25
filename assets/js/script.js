function initPlacesAutocomplete() {
	const placesAutocompleteBox = new google.maps.places.Autocomplete(
		document.getElementById("places-search-box"),
		{
			fields: ["address_components", "geometry", "icon", "name"],
		}
	);
}

function searchSubmission() {}

function init() {}

init();
