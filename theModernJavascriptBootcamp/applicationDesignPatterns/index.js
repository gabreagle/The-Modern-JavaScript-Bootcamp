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

	if (!movies.length) {
		dropdown.classList.remove('is-active');
		return;
	}
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
		// close search dropdown and show the title of clicked option on input
		option.addEventListener('click', () => {
			dropdown.classList.remove('is-active');
			input.value = movie.Title;
			onMovieSelect(movie);
		});
		// put search result into DOM
		resultsWrapper.appendChild(option);
	}
};

input.addEventListener('input', debounce(onInput, 500));

// close the dropdown while click somewhere else
document.addEventListener('click', (event) => {
	if (!root.contains(event.target)) {
		dropdown.classList.remove('is-active');
	}
});

// get the movie ID and return information
const onMovieSelect = async (movie) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'd9835cc5',
			i: movie.imdbID
		}
	});
	document.querySelector('#summary').innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetail) => {
	return `
		<article class = "media">
			<figure class="media-left">
				<p class="image">
					<img src="${movieDetail.Poster}" />
				</p>
			</figure>
			<div class="media-content">
				<div class="content">
					<h1>${movieDetail.Title}</h1>	
					<h4>${movieDetail.Genre}</h4>
					<p>${movieDetail.Plot}</p>
				</div>
			</div>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetail.Awards}</p>
			<p class="subtitle">Awards</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetail.BoxOffice}</p>
			<p class="subtitle">Box Office</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetail.Metascore}</p>
			<p class="subtitle">Metascore</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetail.imdbRating}</p>
			<p class="subtitle">IMDb Rating</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetail.imdbVotes}</p>
			<p class="subtitle">IMDb Votes</p>
		</article>
	`;
};
