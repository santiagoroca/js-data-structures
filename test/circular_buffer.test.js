const CircularBuffer = require('../index').queue.CircularBuffer;

test('Should PUSH 1 registers in a 1000 length Queue.', () => {
	let queue = new CircularBuffer();

	for (let i = 0; i < 1; i++) {
		queue.push(i);
	}

	expect(queue.size()).toEqual(1);
});

test('Should PUSH 10 registers in a 1000 length Queue.', () => {
	let queue = new CircularBuffer();

	for (let i = 0; i < 10; i++) {
		queue.push(i);
	}

	expect(queue.size()).toEqual(10);
});

test('Should PUSH 100 registers in a 1000 length Queue.', () => {
	let queue = new CircularBuffer();

	for (let i = 0; i < 100; i++) {
		queue.push(i);
	}

	expect(queue.size()).toEqual(100);
});

test('Should PUSH 1000 registers in a 1000 length Queue.', () => {
	let queue = new CircularBuffer();

	for (let i = 0; i < 1000; i++) {
		queue.push(i);
	}

	expect(queue.size()).toEqual(1000);
});

test('Should POP 10 registers from a 10 length Queue using Queue\'s empty function.', () => {
	let queue = new CircularBuffer(10);

	for (let i = 0; i < 1000; i++) {
		queue.push(i);
	}

	let count = 0;
	while (!queue.empty()) {
		queue.pop();
		count++;
	}

	expect(count).toEqual(10);
});

test('Should POP and PUSH 100 items interleaved.', () => {
	let queue = new CircularBuffer(10);

	for (let i = 0; i < 50; i++) {
		queue.push(i);
		queue.pop();
	}

	expect(queue.size()).toEqual(0);
});

test('Should POP and PUSH items and peek correctly.', () => {
	let queue = new CircularBuffer(10);

	for (let i = 0; i < 50; i++) {
		queue.push(i);
		queue.pop();
	}

	for (let i = 0; i < 10; i++) {
		queue.push(i);
	}

	let i = 0;
	while (!queue.empty()) {
		expect(queue.peek()).toEqual(i++);
		queue.pop();
	}
});

test('Should not return an error when pop called on a empty Queue.', () => {
	let queue = new CircularBuffer(10);
	queue.pop();
});