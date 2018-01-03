const SortedLinkedList = require('../index').list.SortedLinkedList;

const STATIC_VALUES_ARRAY = [
	4, 1, 2, 6, 5, 9, 17, 8, 22, 35
];

const SORTED_STATIC_VALUES_ARRAY = [
	1, 2, 4, 5, 6, 8, 9, 17, 22, 35
];

test('Constructor should create an empty Linked List.', () => {
	let list = new SortedLinkedList();

	expect(list.empty()).toEqual(true);
	expect(list.peek()).toEqual(null);
});

test('Should push 50 elements to the list.', () => {
	let list = new SortedLinkedList();

	for (let i = 0; i < 50; i++) {
		list.insert(i);
		expect(list.peek().value).toEqual(0);
	}
});

test('Should get at index from the list.', () => {
	let list = new SortedLinkedList();

	for (let i = 0; i < STATIC_VALUES_ARRAY.length; i++) {
		list.insert(STATIC_VALUES_ARRAY[i]);
	}

	expect(list.getAt(0).value).toEqual(1);
	expect(list.getAt(1).value).toEqual(2);
	expect(list.getAt(2).value).toEqual(4);
	expect(list.getAt(3).value).toEqual(5);
	expect(list.getAt(4).value).toEqual(6);
	expect(list.getAt(5).value).toEqual(8);
	expect(list.getAt(6).value).toEqual(9);
	expect(list.getAt(7).value).toEqual(17);
	expect(list.getAt(8).value).toEqual(22);
	expect(list.getAt(9).value).toEqual(35);
});

test('Should get at index from the list.', () => {
	let list = new SortedLinkedList();

	for (let i = 0; i < STATIC_VALUES_ARRAY.length; i++) {
		list.insert(STATIC_VALUES_ARRAY[i]);
	}

	let index = 0;
	while (!list.empty()) {
		list.pop();
	}
});

test('Should pop with empty list.', () => {
	let list = new SortedLinkedList();
	expect(list.getAt(10)).toEqual(null);
});

test('Should not change the iteration Mode.', () => {
	let list = new SortedLinkedList();
	list.setIterationMode(10);
	expect(list.iteration_mode).toEqual(1);
});