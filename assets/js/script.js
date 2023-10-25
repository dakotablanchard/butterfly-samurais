const OPENAI_API_KEY = "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";

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
	const data = {
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content: "You are a helpful assistant.",
			},
			{
				role: "user",
				content: prompt,
			},
		],
	};

	return fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${OPENAI_API_KEY}`,
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => {
			return data.choices[0].message.content;
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

function searchSubmission(event) {
	event.preventDefault();
	let activityBox = document.getElementById("activity-search-box");
	let prompt = activityBox.value;
	activityBox.value = "";
	openAiCall(prompt)
		.then((response) => {
			document.getElementById("test-response").textContent = response;
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

function init() {
	const searchForm = document.getElementById("search-form");
	searchForm.addEventListener("submit", searchSubmission);
}

init();
