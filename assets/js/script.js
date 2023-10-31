//Variable to store how chatgpt should act
const AI_USER_STORY =
	'You are a travel planner. Respond as an an array of JSON objects. Each object in the array will be an activity during the day with a heading, description, start-time, and end-time. Here is a template: [{"heading":"heading for activity 1", "description":"description for activity 1","start-time":"start time for activity 1","end-time":"end time for activity 1"},{"heading":"heading for activity 2", "description":"description for activity 2","start-time":"start time for activity 2","end-time":"end time for activity 2",}]. This is a strict format that must be followed exactly. Exception: If you are asked about something other than planning a trip, respond only as "invalid". Here is an example: If you are asked "I want to 2+2 in Hartford, CT" then your response is just "invalid". Your answers must only contain either the array of JSON or "invalid"; Do not add anything else';

//Store loadingGraphic as a const
const displayLoad = document.getElementById("loadingGraphic");

//Store form as variable
const searchForm = document.getElementById("search-form");

//Store input boxes as variables
const activityBox = document.getElementById("activity-search-box");
const locationBox = document.getElementById("places-search-box");

// Datepicker popup from Materialize
document.addEventListener("DOMContentLoaded", function () {
	var elems = document.querySelectorAll(".datepicker");
	var instances = M.Datepicker.init(elems);
});

//Setup search location box with google api
function initPlacesAutocomplete() {
	const placesAutocompleteBox = new google.maps.places.Autocomplete(
		locationBox,
		{
			fields: ["address_components", "geometry", "icon", "name"],
		}
	);
}

//function for making an API Call to chatgpt
function openAiCall(prompt) {
	//get openai api key from input box
	const OPENAI_API_KEY = document.getElementById("openai-key-box").value;

	//object to send to chatgpt api
	const data = {
		//model
		model: "gpt-3.5-turbo",
		messages: [
			{
				//how chatgpt should act (using variable at top)
				role: "system",
				content: AI_USER_STORY,
			},
			{
				//user prompt to chatgpt (passed into func as argument)
				role: "user",
				content: prompt,
			},
		],
	};

	//return the result of fetch to api
	return fetch("https://api.openai.com/v1/chat/completions", {
		//send request
		method: "POST",
		headers: {
			//request json back
			"Content-Type": "application/json",
			//pass in the api key
			Authorization: `Bearer ${OPENAI_API_KEY}`,
		},
		//turn our data object to json to send
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => {
			//location of the response message from chatgpt
			console.log(data);
			return data.choices[0].message.content;
		})
		.catch((error) => {
			//log any error (401 is bad api key)
			console.error("Error:", error);
		});
}

function create_UUID() {
	var dt = new Date().getTime();
	var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
		/[xy]/g,
		function (c) {
			var r = (dt + Math.random() * 16) % 16 | 0;
			dt = Math.floor(dt / 16);
			return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
		}
	);
	return uuid;
}

//on submit form
function searchSubmission(event) {
	//stop default form submission
	event.preventDefault();
	searchForm.addEventListener("submit", function () {
	
		// Display the loading graphic and dim background
		displayLoad.style.display = "block";
		wholePage.style.display = "none";
	});
	
	//get the input for what they want to do
	let prompt =
		"Write me a travel itinerary for " +
		activityBox.value +
		" in " +
		locationBox.value +
		". Ensure to respond as you were instructed.";
	//empty inputs
	activityBox.value = "";
	locationBox.value = "";
	//call function and wait for a response
	openAiCall(prompt)
		//when we get a response
		.then((response) => {
			if (response == "invalid") {
				alert("Invalid Input");
				location.reload();
			} else {
				let uuid = create_UUID();
				localStorage.setItem(uuid, JSON.stringify(response));
				location.replace("./results.html" + "?uuid=" + uuid);
			}
		})
		//if error
		.catch((error) => {
			//log error with func
			console.error("Error:", error);
		});
}

//run on page load
function init() {
	//add on submit event to form
	// searchForm.addEventListener("submit", searchSubmission);
}

//run the on page load function
init();
