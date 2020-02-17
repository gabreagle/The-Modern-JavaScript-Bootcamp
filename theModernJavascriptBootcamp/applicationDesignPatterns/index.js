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

// Create a search dropdown
const root = document.querySelector('.autocomplete');
root.innerHTML = `
	<label><b>Search For a Movie</b></label>
	<input class="input" />
	<div class="dropdown">
		<div class="dropdown-menu">
			<div class="dropdown-content results"></div>
		</div>
	</div>`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

// start search after 1 second pause
const onInput = async (event) => {
	const movies = await fetchData(event.target.value);
	// clear search result
	resultsWrapper.innerHTML = '';
	// active dropdown list box
	dropdown.classList.add('is-active');

	for (let movie of movies) {
		const option = document.createElement('a');
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		option.classList.add('dropdown-item');
		// extract searching data
		option.innerHTML = `
		<img src="${movie.Poster}" />
		${movie.Title}`;
		// put search result into DOM
		resultsWrapper.appendChild(option);
	}
};

input.addEventListener('input', debounce(onInput, 500));
