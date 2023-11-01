// Pull date and location from welcome page
// If date is within 5 days of current date then make api call to open weather
// Else return string "Check back within 5 days of your trip to see weather forecast"

// TODO
// - format user date to match open weathers format (YYYY-MM-DD)
// - create if statement to compare users date to dates recieved by open weather
//      if tripDate = date1, display weather for date1
//      if tripDate = date2, display weather for date2 etc
//      else display message "Check within 5 days of your trip to see weather forecast"        

// API key
var openweatherApiKey = "b3b885146dce3d4c2a9d8e921432d8fb"

// Storing input boxes as variables
var searchForm2 = document.getElementById("search-form");
var locationBox2 = document.getElementById("places-search-box");
var datepicker2 = document.getElementById("datepicker");

// Will recieve data from OpenWeather API
function getWeather(event) {
    event.preventDefault()

    // Storing user input into variables
    var locationValue = locationBox2.value
    // Storing date inputed by user and reformatting it to YYYY-MM-DD
    // This will be used to compare to date coming in from the Open Weather API
    var dateValue = dayjs(datepicker2.value).format("YYYY-MM-DD")
    
    // Building URL for API call
    var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + locationValue + "&appid=" + openweatherApiKey + "&units=imperial"
 
    fetch(weatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Storing each date from the 5 day forecast into a varibale
            // Will use these to dates to compare with date from user input
            // If users date matches one of these then weather data will be displayed for users date
            var date1 = data.list[0].dt_txt.substring(0, data.list[0].dt_txt.lastIndexOf(" "))
            var date2 = data.list[8].dt_txt.substring(0, data.list[8].dt_txt.lastIndexOf(" "))
            var date3 = data.list[16].dt_txt.substring(0, data.list[16].dt_txt.lastIndexOf(" "))
            var date4 = data.list[24].dt_txt.substring(0, data.list[24].dt_txt.lastIndexOf(" "))
            var date5 = data.list[32].dt_txt.substring(0, data.list[32].dt_txt.lastIndexOf(" "))

            checkDates(dateValue, date1, date2, date3, date4, date5)
        });
}

function checkDates(dateValue, date1, date2, date3, date4, date5) {
    console.log(dateValue, date1)
}

//run on page load
function init() {
    //add on submit event to form
    searchForm2.addEventListener("submit", getWeather);
}

//run the on page load function
init();
