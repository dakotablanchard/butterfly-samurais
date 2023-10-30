function init() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const uuid = urlParams.get("uuid");
	const response = JSON.parse(localStorage.getItem(uuid));

	console.log(response);
}

init();
