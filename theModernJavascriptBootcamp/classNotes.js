// ===========================================
// 128. Conditionals
// ===========================================

// let age = 21;

// const ageTest = (age) => {
// 	if (age < 0) {
// 		console.log('Error');
// 	} else if (age === 21) {
// 		console.log('Happy 21th birthday!');
// 	} else if (age ** 0.5 === Math.floor(age ** 0.5)) {
// 		console.log('perfect square!');
// 	} else if (age % 2 === 1) {
// 		console.log('Your age is odd! ');
// 	} else {
// 		console.log('Your age is even');
// 	}
// };

// ageTest(age);

// ===========================================
// 130. Guessing Game
// ===========================================

while (true) {
	const secretNumber = Math.floor(Math.random() * 10) + 1;

	let input = parseInt(prompt('Please guess a number between 1 and 10: '));
	while (input !== secretNumber) {
		if (input < secretNumber) {
			input = parseInt(prompt('Too small! Please guess again: '));
		} else {
			input = parseInt(prompt('Too big! Please guess again: '));
		}
	}

	alert('Congratulations! You win!');

	let gameAgain = prompt('Would you want another round? Y/N ');

	while (gameAgain.toLowerCase() !== 'y' && gameAgain.toLowerCase() !== 'n') {
		gameAgain = prompt('Would you want another round? Y/N ');
	}

	if (gameAgain.toLowerCase() === 'n') break;
}
