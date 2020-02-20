// Super reusable code to get an autocomplete to work. Zero knowledge of 'movies' or 'recipes' or 'blogs'.
// Must be able to ran several times in the same project

const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
	// function(config)
	// Create a search dropdown
	root.innerHTML = `
        <label><b>Search</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>`;

	const input = root.querySelector('input');
	const dropdown = root.querySelector('.dropdown');
	const resultsWrapper = root.querySelector('.results');

	// start search after 1 second pause
	const onInput = async (event) => {
		const items = await fetchData(event.target.value);

		// If the input is empty, close the dropdown list
		if (!items.length) {
			dropdown.classList.remove('is-active');
			return;
		}

		// clear dropdown search result for each type
		resultsWrapper.innerHTML = '';

		// activate dropdown list box
		dropdown.classList.add('is-active');

		for (let item of items) {
			const option = document.createElement('a');
			option.classList.add('dropdown-item');
			// extract searching data
			option.innerHTML = renderOption(item);
			// close search dropdown and show the title of clicked option on input
			option.addEventListener('click', () => {
				dropdown.classList.remove('is-active');
				input.value = inputValue(item);
				onOptionSelect(item);
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
};
