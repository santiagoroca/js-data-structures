const LinkedList = require('../index').LinkedList;

test('Constructor should create an empty Linked List.', () => {
	let list = new LinkedList();

	expect(list.empty()).toEqual(true);
	expect(list.peek()).toEqual(null);
});

test('Should push 50 elements to the list.', () => {
	let list = new LinkedList();

	for (let i = 0; i < 50; i++) {
		list.push(i);
		expect(list.peek().value).toEqual(i);
	}
});

test('Should pop 50 elements from the list.', () => {
	let list = new LinkedList();

	for (let i = 0; i < 50; i++) {
		list.push(i);
	}

	for (let i = 49; i >= 0; i--) {
		expect(list.peek().value).toEqual(i);
		list.pop();
	}
});

test('Should insert element at position 20 in a 50 length queue.', () => {
	let list = new LinkedList();

	for (let i = 0; i < 50; i++) {
		list.push(0);
	}

	list.insertAt(20, 1);

	let current = list.peek()
	for (let i = 0; i < 20; i++) {
		expect(current.value).toEqual(0);
		current = current.next;
	}

	expect(current.value).toEqual(1);
});

test('Should insert element at position 55 in a 50 length queue.', () => {
	let list = new LinkedList();

	for (let i = 0; i < 50; i++) {
		list.push(0);
	}

	list.insertAt(51, 1);

	let current = list.peek();
	for (let i = 0; i < 50; i++) {
		expect(list.peek().value).toEqual(0);
		current = current.next;
	}

	expect(current.value).toEqual(1);
});


test('Should insert element at position 10 in a 0 length queue.', () => {
	let list = new LinkedList();

	list.insertAt(10, 1);
	expect(list.peek().value).toEqual(1);
});

test('Should remove element at position 10 in a 20 length queue.', () => {
	let list = new LinkedList();

	for (let i = 0; i < 20; i++) {
		list.push(0);
	}

	list.insertAt(10, 1);
	list.removeAt(10);

	let current = list.peek();
	for (let i = 0; i < 10; i++) {
		current = current.next;
	}
	expect(current.value).toEqual(0);
});

test('Should not remove element at position 10 in a 5 length queue.', () => {
	let list = new LinkedList();

	for (let i = 0; i < 5; i++) {
		list.push(0);
	}

	list.removeAt(10);
	
	let current = list.peek();
	for (let i = 0; i < 5; i++) {
		current = current.next;
	}

	expect(current).toBeDefined();
});

test('Should remove first element.', () => {
	let list = new LinkedList();

	list.push(1);
	for (let i = 0; i < 5; i++) {
		list.push(0);
	}
	list.removeAt(0);

	expect(list.peek().value).toEqual(0);
});

test('Should remove last element.', () => {
	let list = new LinkedList();

	for (let i = 0; i < 5; i++) {
		list.push(0);
	}
	list.push(1);
	list.removeAt(5);
	
	let current = list.peek();
	while (current.next) {
		current = current.next;
	}

	expect(current.value).toEqual(0);
});

test('Should set value at defined index.', () => {
	let list = new LinkedList();

	for (let i = 0; i < 5; i++) {
		list.push(0);
	}
	list.setAt(2, 1);
	
	let current = list.peek();
	for (let i = 0; i < 2; i++) {
		current = current.next;
	}

	expect(current.value).toEqual(1);
});

test('Should not set value at undefined index.', () => {
	let list = new LinkedList();

	for (let i = 0; i < 5; i++) {
		list.push(0);
	}
	list.setAt(6, 1);
	
	let current = list.peek();
	while (current.next) {
		expect(current.value).toEqual(0);
		current = current.next;
	}
});

test('Should return the correct index.', () => {
	let list = new LinkedList();

	for (let i = 0; i < 5; i++) {
		list.push(0);
	}
	list.setAt(2, 1);
	
	expect(list.getAt(2).value).toEqual(1);
});

test('Should return null.', () => {
	let list = new LinkedList();

	for (let i = 0; i < 5; i++) {
		list.push(0);
	}
	
	expect(list.getAt(5)).toBeNull();
});

test('Should return size 0.', () => {
	let list = new LinkedList();	
	expect(list.size()).toEqual(0);
});

test('Should return the correct size.', () => {
	let list = new LinkedList();

	for (let i = 0; i < 5; i++) {
		list.push(0);
	}
	expect(list.size()).toEqual(5);

	for (let i = 4; i >= 0; i--) {
		list.pop();
		expect(list.size()).toEqual(i);
	}
});

test('Should return correct state for emtpy function.', () => {
	let list = new LinkedList();	
	expect(list.empty()).toEqual(true);

	for (let i = 0; i < 5; i++) {
		list.push(0);
	}
	expect(list.empty()).toEqual(false);

	for (let i = 0; i < 5; i++) {
		list.pop();
	}
	expect(list.empty()).toEqual(true);	
});

test('Should return correct state for contain function.', () => {
	let list = new LinkedList();	

	for (let i = 0; i < 5; i++) {
		list.push(0);
	}

	list.setAt(2, 1);
	expect(list.contains(1)).toEqual(true);	
	list.setAt(2, 0);
	expect(list.contains(1)).toEqual(false);	
});

test('Should return correct state for contain function.', () => {
	let list = new LinkedList();	

	for (let i = 0; i < 5; i++) {
		list.push(0);
	}

	list.setAt(2, 1);
	expect(list.find(1).value).toEqual(1);
	list.setAt(2, 0);
	expect(list.find(1)).toBeNull();	
});

test('Should clear the whole List.', () => {
	let list = new LinkedList();	

	for (let i = 0; i < 5; i++) {
		list.push(0);
	}

	expect(list.empty()).toEqual(false);
	expect(list.size()).toEqual(5);
	expect(list.getAt(0).value).toEqual(0);
	list.clear();
	expect(list.empty()).toEqual(true);
	expect(list.size()).toEqual(0);
	expect(list.getAt(0)).toBeNull();
});

test('Should return null when getAt when index not found.', () => {
	let list = new LinkedList();	

	for (let i = 0; i < 5; i++) {
		list.push(0);
	}

	expect(list.getAt(10)).toBeNull();
});

test('Should not return an error when pop called on a empty list.', () => {
	let list = new LinkedList();
	list.pop();
});