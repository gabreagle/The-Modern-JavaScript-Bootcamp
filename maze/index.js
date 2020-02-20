// ==========================================================================================
// Matter JS Terminology
// World ->  Object that contains all of the different 'things' in our matter app
// Engine -> Reads in the current state of the world from the world Object, then calculates changes in positions of all the different shapes
// Runner -> Gets the engine and world to work together. Runs about 60 times per seconds
// Render -> Whenever the engine processes an PaymentRequestUpdateEvent, Render will take a look at all the different shapes and show them on the screen
// Body -> A shape that we are displaying. Can be a circle, rectangle, oval, etc.
// ==========================================================================================

// Destructuring the Matter
const { Engine, Render, Runner, World, Bodies } = Matter;

// Create a new engine
const engine = Engine.create();
// Access to the world to the newly created engine
const { world } = engine;
// Show content on screen
const render = Render.create({
	// Where to show
	element: document.body,
	// What engine to use
	engine: engine,
	options: {
		width: 800,
		height: 600
	}
});

Render.run(render);
Runner.run(Runner.create(), engine);

const shape = Bodies.rectangle(200, 200, 50, 50, {
	isStatic: true
});

World.add(world, shape);
