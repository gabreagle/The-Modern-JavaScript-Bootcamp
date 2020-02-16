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
	if (response.data.Error) {
		return [];
	}
	return response.data.Search;
};

const input = document.querySelector('input');

// start search after 1 second pause
const onInput = async (event) => {
	const movies = await fetchData(event.target.value);

	for (let movie of movies) {
		const div = document.createElement('div');
		// extract searching data
		div.innerHTML = `
		<img src="${movie.Poster}" />
		<h1>${movie.Title}</h1>`;
		// put search result into DOM
		document.querySelector('#target').appendChild(div);
	}
};

input.addEventListener('input', debounce(onInput, 500));
