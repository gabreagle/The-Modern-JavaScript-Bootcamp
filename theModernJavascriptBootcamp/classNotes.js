// ===========================================
// 128. Conditionals
// ===========================================

let age = 21;

const ageTest = (age) => {
	if (age < 0) {
		console.log('Error');
	} else if (age === 21) {
		console.log('Happy 21th birthday!');
	} else if (age ** 0.5 === Math.floor(age ** 0.5)) {
		console.log('perfect square!');
	} else if (age % 2 === 1) {
		console.log('Your age is odd! ');
	} else {
		console.log('Your age is even');
	}
};

ageTest(age);
