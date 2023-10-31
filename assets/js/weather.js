// Pull date and location from welcome page
// If date is within 16 days of current date then make api call to open weather
// Else return string "Check back within 16 days of your trip to see weather forecast"
var openweatherApiKey = "b3b885146dce3d4c2a9d8e921432d8fb"

var searchForm2 = document.getElementById("search-form");
var locationBox2 = document.getElementById("places-search-box");
var datepicker2 = document.getElementById("datepicker");

var locationValue = locationBox2.value
var dateValue = datepicker2.value

function getWeather(event) {
    event.preventDefault()
    
    // console.log(locationValue)
    var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + locationBox2.value + "&appid=b3b885146dce3d4c2a9d8e921432d8fb"

    fetch(weatherURL)
        .then(function (response) {
            response.json();
        })
        .then(function (data) {
            console.log(data)
            return data
        });
}

//run on page load
function init() {
    //add on submit event to form
    searchForm2.addEventListener("submit", getWeather);
}

//run the on page load function
init();
