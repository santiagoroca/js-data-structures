const Stack = require('../index').Stack;

test('Constructor should create an empty Stack.', () => {
	let stack = new Stack();

	expect(stack.empty()).toEqual(true);
	expect(stack.peek()).toEqual(null);
});

test('Should push 50 elements to the stack.', () => {
	let stack = new Stack();

	for (let i = 0; i < 50; i++) {
		stack.push(i);
		expect(stack.peek()).toEqual(i);
	}
});

test('Should pop 50 elements from the stack.', () => {
	let stack = new Stack();

	for (let i = 0; i < 50; i++) {
		stack.push(i);
	}

	for (let i = 49; i >= 0; i--) {
		expect(stack.peek()).toEqual(i);
		stack.pop();
	}
});

test('Should return size 0.', () => {
	let stack = new Stack();	
	expect(stack.size()).toEqual(0);
});

test('Should return the correct size.', () => {
	let stack = new Stack();

	for (let i = 0; i < 5; i++) {
		stack.push(0);
	}
	expect(stack.size()).toEqual(5);

	for (let i = 4; i >= 0; i--) {
		stack.pop();
		expect(stack.size()).toEqual(i);
	}
});

test('Should return correct state for emtpy function.', () => {
	let stack = new Stack();	
	expect(stack.empty()).toEqual(true);

	for (let i = 0; i < 5; i++) {
		stack.push(0);
	}
	expect(stack.empty()).toEqual(false);

	for (let i = 0; i < 5; i++) {
		stack.pop();
	}
	expect(stack.empty()).toEqual(true);	
});

test('Should clear the whole stack.', () => {
	let stack = new Stack();	

	for (let i = 0; i < 5; i++) {
		stack.push(0);
	}

	expect(stack.empty()).toEqual(false);
	expect(stack.size()).toEqual(5);
	expect(stack.peek()).toEqual(0);
	stack.clear();
	expect(stack.empty()).toEqual(true);
	expect(stack.size()).toEqual(0);
	expect(stack.peek()).toBeNull();
});

test('Should not return an error when pop called on a empty stack.', () => {
	let stack = new Stack();
	stack.pop();
});