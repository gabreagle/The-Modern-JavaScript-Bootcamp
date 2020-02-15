// PLAN OF ATTACK
// 1. Setup boilerplate for the project
// 2. Identify challenging aspects of the project we're about to work on
// 3. Get started to the project and write a lot of codes

const fetchData = async (searchTerm) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		// axios function; or use http://www.omdbaqi.com/?d9835cc5
		params: {
			apikey: 'd9835cc5',
			s: searchTerm
		}
	});

	console.log(response.data);
};

const input = document.querySelector('input');

// start search after 1 second pause
let timeoutId;
const onInput = (event) => {
	if (timeoutId) {
		// every input, the timeout restarts
		clearTimeout(timeoutId);
	}
	timeoutId = setTimeout(() => {
		fetchData(event.target.value);
	}, 1000);
};

input.addEventListener('keypress', onInput);
