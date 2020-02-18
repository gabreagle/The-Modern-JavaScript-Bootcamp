// Non-reusable code for our very specific project

// PLAN OF ATTACK
// 1. Setup boilerplate for the project
// 2. Identify challenging aspects of the project we're about to work on
// 3. Get started to the project and write a lot of codes
const autoCompleteConfig = {
	// 2. renderOption() - function that knows how to render a movie
	renderOption(movie) {
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		return `
				<img src="${imgSrc}" />
				${movie.Title}`;
	},
	inputValue(movie) {
		return movie.Title;
	},
	// 4. fetchData() - function to find movies
	async fetchData(searchTerm) {
		const response = await axios.get('http://www.omdbapi.com/', {
			// axios function; or use http://www.omdbaqi.com/?d9835cc5
			params : {
				apikey : 'd9835cc5',
				s      : searchTerm
			}
		});
		if (response.data.Error) {
			return [];
		}
		return response.data.Search;
	}
};

createAutoComplete({
	...autoCompleteConfig,
	// 1. root -element that the autocomplete should be render into
	root           : document.querySelector('#left-autocomplete'), // 3. onOption() - function that gets invoked when a user clicks an option
	onOptionSelect(movie) {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
	}
});

createAutoComplete({
	...autoCompleteConfig,
	// 1. root -element that the autocomplete should be render into
	root           : document.querySelector('#right-autocomplete'), // 3. onOption() - function that gets invoked when a user clicks an option
	onOptionSelect(movie) {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
	}
});

// get the movie ID and return movie ID
let leftMovie, rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params : {
			apikey : 'd9835cc5',
			i      : movie.imdbID
		}
	});

	summaryElement.innerHTML = movieTemplate(response.data);

	// compare left & right movie
	if (side === 'left') {
		leftMovie = response.data;
	} else {
		rightMovie = response.data;
	}

	if (leftMovie && rightMovie) {
		runComparison();
	}
};

// HELPER FUNCTION: compare movies
const runComparison = () => {
	// 1. Find the first "article" element for each movie
	const leftSideStats = document.querySelectorAll('#left-summary .notification');
	const rightSideStats = document.querySelectorAll('#right-summary .notification');

	leftSideStats.forEach((leftStat, index) => {
		const rightStat = rightSideStats[index];

		const leftSideValue = parseFloat(leftStat.dataset.value);
		const rightSideValue = parseFloat(rightStat.dataset.value);

		if (rightSideValue > leftSideValue) {
			leftStat.classList.remove('is-primary');
			leftStat.classList.add('is-warning');
		} else if (rightSideValue < leftSideValue) {
			rightStat.classList.remove('is-primary');
			rightStat.classList.add('is-warning');
		} else {
			return;
		}
	});
	// 2. Run a comparison on the box office
	// 3. Apply some styling to that "article" element
};

// Use the movie ID and return information
const movieTemplate = (movieDetail) => {
	const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
	const metascore = parseInt(movieDetail.Metascore);
	const imdbRating = parseFloat(movieDetail.imdbRating);
	const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
	const award = movieDetail.Awards.split(' ').reduce((prev, word) => {
		const value = parseInt(word);

		if (isNaN(value)) {
			return prev;
		} else {
			return prev + value;
		}
	}, 0);
	// let count = 0;
	// const award = movieDetail.Awards.split(' ').forEach((word) => {
	// 	const value = parseInt(word);
	// 	if (isNan(value)) {
	// 		return;
	// 	} else {
	// 		count += value;
	// 	}
	// });

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
		<article data-value=${award} class="notification is-primary">
			<p class="title">${movieDetail.Awards}</p>
			<p class="subtitle">Awards</p>
		</article>
		<article data-value=${dollars} class="notification is-primary">
			<p class="title">${movieDetail.BoxOffice}</p>
			<p class="subtitle">Box Office</p>
		</article>
		<article data-value=${metascore} class="notification is-primary">
			<p class="title">${movieDetail.Metascore}</p>
			<p class="subtitle">Metascore</p>
		</article>
		<article data-value=${imdbRating} class="notification is-primary">
			<p class="title">${movieDetail.imdbRating}</p>
			<p class="subtitle">IMDb Rating</p>
		</article>
		<article data-value=${imdbVotes} class="notification is-primary">
			<p class="title">${movieDetail.imdbVotes}</p>
			<p class="subtitle">IMDb Votes</p>
		</article>
	`;
};

// TESTING
// createAutoComplete({
// 	// 1. root -element that the autocomplete should be render into
// 	root: document.querySelector('.autocomplete--1'),
// 	// 2. renderOption() - function that knows how to render a movie
// 	renderOption(movie) {
// 		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
// 		return `
// 			<img src="${movie.thumbnailUrl}" />
// 			${movie.Title}`;
// 	},
// 	// 3. onOption() - function that gets invoked when a user clicks an option
// 	onOptionSelect(movie) {
// 		onMovieSelect(movie);
// 	},
// 	inputValue(movie) {
// 		return movie.Title;
// 	},
// 	// 4. fetchData() - function to find movies
// 	async fetchData(searchTerm) {
// 		const response = await axios.get('http://https://jsonplaceholder.typicode.com/photos?albumId=1', {});
// 		if (response.data.Error) {
// 			return [];
// 		}
// 		return response.data.Search;
// 	}
// });
