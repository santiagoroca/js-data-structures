const OrderedSet = require('../index').OrderedSet;
const NoAllowedArgumentError = require('../index').NoAllowedArgumentError;

const STATIC_VALUES_ARRAY = [
	1, 4, 3, 6, 7, 2, 3, 9, 19, 20, 3, 15
];

test('Should create an empty Ordered Set', () => {
	let orderedSet = new OrderedSet();
	expect(orderedSet.size()).toEqual(0);
	expect(orderedSet.empty()).toEqual(true);
});

test('Should create an filled Ordered Set', () => {
	let orderedSet = new OrderedSet([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
	expect(orderedSet.size()).toEqual(10);
	expect(orderedSet.empty()).toEqual(false);

	for (let i = 0; i < 10; i++) {
		expect(orderedSet.contains(i)).toEqual(true);
	}
});

test('Should create an empty Ordered Set', () => {
	let orderedSet = new OrderedSet();
	expect(orderedSet.size()).toEqual(0);
	expect(orderedSet.empty()).toEqual(true);
});

test('Should not set iteration mode of Ordered Set.', () => {
	let orderedSet = new OrderedSet();
	orderedSet.setIterationMode(3);
	expect(orderedSet.iteration_mode).toEqual(1);
});

test('Should join two completely different Ordered Sets into one.', () => {
	const A = new OrderedSet([1, 2, 3]);
	const B = new OrderedSet([4, 5, 6]);
	const join = A.union(B);

	for (let i = 1; i < 7; i++) {
		expect(join.contains(i)).toEqual(true);
	}

	expect(join.size()).toEqual(6);
	expect(join.empty()).toEqual(false);
});

test('Should join two Ordered Sets, with repeated items, into one.', () => {
	const A = new OrderedSet([1, 2, 3, 7, 5, 6]);
	const B = new OrderedSet([4, 5, 8, 1, 2, 9]);
	const join = A.union(B);

	for (let i = 1; i < 10; i++) {
		expect(join.contains(i)).toEqual(true);
	}

	expect(join.size()).toEqual(9);
	expect(join.empty()).toEqual(false);
});

test('Should join two equal Ordered Sets into one.', () => {
	const A = new OrderedSet([1, 2, 3, 4, 5, 6]);
	const B = new OrderedSet([4, 5, 6, 1, 2, 3]);
	const join = A.union(B);

	for (let i = 1; i < 7; i++) {
		expect(join.contains(i)).toEqual(true);
	}

	expect(join.size()).toEqual(6);
	expect(join.empty()).toEqual(false);
});

test('Should throw "union method only allows OrderedSet as argument." error with non OrderedUnion argument.', () => {
	const A = new OrderedSet([1, 2, 3, 4, 5, 6]);
	expect(() => A.union([1, 3, 4, 6, 1])).toThrow(NoAllowedArgumentError);

});

test('Should get the intersection of two similar Ordered Sets into one.', () => {
	const A = new OrderedSet([1, 2, 3, 7, 8, 9]);
	const B = new OrderedSet([4, 5, 6, 7, 8, 9]);
	const join = A.intersection(B);

	for (let i = 7; i < 10; i++) {
		expect(join.contains(i)).toEqual(true);
	}

	expect(join.size()).toEqual(3);
	expect(join.empty()).toEqual(false);
});

test('Should get the intersection of two completely different Ordered Sets into one.', () => {
	const A = new OrderedSet([1, 2, 3, 7, 8, 9]);
	const B = new OrderedSet([4, 5, 6]);
	const join = A.intersection(B);

	expect(join.size()).toEqual(0);
	expect(join.empty()).toEqual(true);
});

test('Should get the intersection of two equal Ordered Sets into one.', () => {
	const A = new OrderedSet([1, 2, 3, 4, 5, 6]);
	const B = new OrderedSet([4, 5, 6, 2, 3, 1]);
	const join = A.difference(B);

	for (let i = 1; i < 7; i++) {
		console.log(i);
		expect(join.contains(i)).toEqual(true);
	}

	expect(join.size()).toEqual(6);
	expect(join.empty()).toEqual(false);
});