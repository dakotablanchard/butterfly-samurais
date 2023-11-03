//Variable to store how chatgpt should act
const AI_USER_STORY =
	'You are a travel planner. Respond as an an array of JSON objects. Each object in the array will be an activity during the day with a heading, description, start-time, and end-time. Here is a template: [{"heading":"heading for activity 1", "description":"description for activity 1","start-time":"start time for activity 1","end-time":"end time for activity 1"},{"heading":"heading for activity 2", "description":"description for activity 2","start-time":"start time for activity 2","end-time":"end time for activity 2",}]. This is a strict format that must be followed exactly. Include specific location names. Exception: If you are asked about something other than planning a trip, respond only as "invalid". Here is an example: If you are asked "I want to 2+2 in Hartford, CT" then your response is just "invalid". Do not converse or attempt, just say "invalid". Your answers must only contain either the array of JSON or "invalid"; Do not add anything else';

const invalidEvent = new Event("invalid-input");

//Store loadingGraphic as a const
const displayLoad = document.getElementById("loadingGraphic");
const displayIndexHTML = document.getElementById("wholePage");

//Store form as variable
const searchForm = document.getElementById("search-form");

//Store input boxes as variables
const activityBox = document.getElementById("activity-search-box");
const locationBox = document.getElementById("places-search-box");
const dateBox = document.getElementById("datepicker");

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

	displayIndexHTML.style.display = "none";
	displayLoad.style.display = "block";

	let input = {
		activity: activityBox.value,
		location: locationBox.value,
		date: dateBox.value,
	};

	//get the input for what they want to do
	let prompt = `Write me a travel itinerary for ${input.activity} in ${input.location}. Ensure to respond as you were instructed.`;

	activityBox.value = "";
	locationBox.value = "";
	dateBox.value = "";
	//call function and wait for a response
	openAiCall(prompt)
		//when we get a response
		.then((response) => {
			if (response == "invalid") {
				document.dispatchEvent(invalidEvent);
			} else {
				let uuid = create_UUID();
				localStorage.setItem(uuid, JSON.stringify([response, input]));
				let recentSearches = localStorage.getItem("recent-searches");
				if (recentSearches) {
					let recentSearchesArr = JSON.parse(recentSearches);
					recentSearchesArr.push({input: input, uuid: uuid});
					localStorage.setItem(
						"recent-searches",
						JSON.stringify(recentSearchesArr)
					);
				} else {
					localStorage.setItem(
						"recent-searches",
						JSON.stringify([{input: input, uuid: uuid}])
					);
				}
				location.assign("./results.html" + "?uuid=" + uuid);
			}
		})
		//if error
		.catch((error) => {
			//log error with func
			console.error("Error:", error);
		});
}

function displayRecent() {
	const recentSearchDiv = document.getElementById("recent-searches");

	let recentSearches = localStorage.getItem("recent-searches");
	if (recentSearches) {
		let recentSearchesArr = JSON.parse(recentSearches);
		let recentThree = recentSearchesArr.slice(-3);

		for (search of recentThree) {
			const rowDiv = document.createElement("div");
			rowDiv.className = "row container";
			recentSearchDiv.appendChild(rowDiv);

			const colDiv = document.createElement("div");
			colDiv.className = "col s12";
			rowDiv.appendChild(colDiv);

			const cardContainerDiv = document.createElement("div");
			cardContainerDiv.className = "container";
			colDiv.appendChild(cardContainerDiv);

			const cardDiv = document.createElement("div");
			cardDiv.className = "card blue accent-2";
			cardContainerDiv.appendChild(cardDiv);

			const cardContentDiv = document.createElement("div");
			cardContentDiv.className = "card-content white-text";
			cardDiv.appendChild(cardContentDiv);

			const titleSpan = document.createElement("span");
			titleSpan.className = "card-title";
			titleSpan.textContent = search.input.activity;
			cardContentDiv.appendChild(titleSpan);

			const paragraph = document.createElement("p");
			paragraph.textContent = `in ${search.input.location}.`;
			cardContentDiv.appendChild(paragraph);

			const cardActionDiv = document.createElement("div");
			cardActionDiv.className = "card-action";
			cardDiv.appendChild(cardActionDiv);

			const actionLink = document.createElement("a");
			actionLink.href = "./results.html" + "?uuid=" + search.uuid;
			actionLink.textContent = "Review Trip";
			cardActionDiv.appendChild(actionLink);
		}
	}
}

//run on page load
function init() {
	document.addEventListener("DOMContentLoaded", function () {
		var elems = document.querySelectorAll(".datepicker");
		var instances = M.Datepicker.init(elems, options);
	});

	//add on submit event to form
	searchForm.addEventListener("submit", searchSubmission);

	document.addEventListener("DOMContentLoaded", function () {
		var elems = document.querySelectorAll(".modal");
		M.Modal.init(elems, {
			onCloseEnd: function () {
				location.reload();
			},
			onOpenEnd: function () {
				console.log("invalid input.");
			},
		});
	});

	document.addEventListener("invalid-input", function () {
		let elem = document.getElementById("invalid-modal");
		var instance = M.Modal.getInstance(elem);
		instance.open();
	});

	displayRecent();
}

//run the on page load function
init();
