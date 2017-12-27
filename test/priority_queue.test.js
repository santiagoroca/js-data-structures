const PriorityQueue = require('../index').PriorityQueue;

test('Should PUSH 100 register and have size 100.', () => {
	let queue = new PriorityQueue();

	for (let i = 0; i < 100; i++) {
		queue.push(i);
	}

	expect(queue.empty()).toEqual(false);
	expect(queue.size()).toEqual(100);
});

test('Should POP 100 register in a 100 size queue and be empty.', () => {
	let queue = new PriorityQueue();

	for (let i = 0; i < 100; i++) {
		queue.push(i);
	}

	while (!queue.empty()) {
		queue.pop();
	}

	expect(queue.empty()).toEqual(true);
	expect(queue.size()).toEqual(0);
});

test('Should PUSH 100 registers randomly and POPED them in sorted order.', () => {
	let queue = new PriorityQueue();

	for (let i = 0; i < 100; i++) {
		queue.push(parseInt((Math.random() + 1) * 100));
	}

	let min = -Infinity;
	while (!queue.empty()) {
		expect(queue.peek()).toBeGreaterThanOrEqual(min);
		min = queue.peek();
		queue.pop();
	}
});

test('Should PUSH and POP 100 registers interleaved randomly and be empty.', () => {
	let queue = new PriorityQueue();

	for (let i = 0; i < 100; i++) {
		queue.push(parseInt((Math.random() + 1) * 100));
		queue.pop();
	}

	expect(queue.empty()).toEqual(true);
});

test('Should return always the smallest element.', () => {
	let queue = new PriorityQueue();

	for (let i = 100; i >= 0; i--) {
		queue.push(i);
		expect(queue.peek()).toEqual(i);
	}
});

test('Should return always the biggest element.', () => {
	let queue = new PriorityQueue(PriorityQueue.MAX);

	for (let i = 0; i < 100; i++) {
		queue.push(i);
		expect(queue.peek()).toEqual(i);
	}
});

test('Should use custom comparator with object.', () => {
	let queue = new PriorityQueue((a, b) => a.value > b.value);

	for (let i = 0; i < 100; i++) {
		queue.push({
			value: i
		});

		expect(queue.peek().value).toEqual(i);
	}
});