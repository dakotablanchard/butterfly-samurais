function init() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const uuid = urlParams.get("uuid");
	const response = JSON.parse(localStorage.getItem(uuid));

	console.log(response);
}

function createEventCard(eventObj) {
	let header = eventObj.heading;
	let description = eventObj.description;

  let card = 
  <div class="row">
    <div class="col s12 m7">
      <div class="card">
        <div class="card-image">
          <img src="images/sample-1.jpg">
          <span class="card-title">Card Title</span>
        </div>
        <div class="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
  </div>
}

init();
