// Pull date and location from welcome page
// If date is within 16 days of current date then make api call to open weather
// Else return string "Check back within 16 days of your trip to see weather forecast"

const searchForm2 = document.getElementById("search-form");
const locationBox2 = document.getElementById("places-search-box");
const datepicker2 = document.getElementById("datepicker");

function getWeather(event) {
    event.preventDefault()
    console.log(locationBox2.value)
    console.log(datepicker2.value)
}

//run on page load
function init() {
	//add on submit event to form
	searchForm2.addEventListener("submit", getWeather);
}

//run the on page load function
init();
