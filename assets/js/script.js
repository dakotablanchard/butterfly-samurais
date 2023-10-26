//Variable to store how chatgpt should act
const AI_USER_STORY = "You are a travel planner.";

//Store form as variable
const searchForm = document.getElementById("search-form");

//Store input boxes as variables
const activityBox = document.getElementById("activity-search-box");
const locationBox = document.getElementById("places-search-box");

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
			return data.choices[0].message.content;
		})
		.catch((error) => {
			//log any error (401 is bad api key)
			console.error("Error:", error);
		});
}

//on submit form
function searchSubmission(event) {
	//stop default form submission
	event.preventDefault();
	//get the input for what they want to do
	let prompt = activityBox.value;
	//empty inputs
	activityBox.value = "";
	locationBox.value = "";
	//call function and wait for a response
	openAiCall(prompt)
		//when we get a response
		.then((response) => {
			//set the "test" p on index to the response
			document.getElementById("test-response").textContent = response;
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
	searchForm.addEventListener("submit", searchSubmission);
}

//run the on page load function
init();
