const DoubleLinkedList = require('../index').list.DoubleLinkedList;

test('Constructor should create an empty Linked List.', () => {
	let list = new DoubleLinkedList();

	expect(list.empty()).toEqual(true);
	expect(list.peek()).toEqual(null);
	expect(list.peekLast()).toEqual(null);
	expect(list.size()).toEqual(0);
});

test('Should insert 50 elements to the list.', () => {
	let list = new DoubleLinkedList();

	for (let i = 0; i < 50; i++) {
		list.insert(i);
		expect(list.peek().value).toEqual(i);
	}
});

test('Should push 50 elements to the list.', () => {
	let list = new DoubleLinkedList();

	for (let i = 0; i < 50; i++) {
		list.push(i);
		expect(list.peekLast().value).toEqual(i);
	}
});

test('Should remove 50 elements from the list.', () => {
	let list = new DoubleLinkedList();

	for (let i = 0; i < 50; i++) {
		list.insert(i);
	}

	for (let i = 49; i >= 0; i--) {
		expect(list.peek().value).toEqual(i);
		list.remove();
	}
});

test('Should remove 50 elements from the list.', () => {
	let list = new DoubleLinkedList();

	for (let i = 0; i < 50; i++) {
		list.push(i);
	}

	for (let i = 49; i >= 0; i--) {
		expect(list.peekLast().value).toEqual(i);
		list.pop();
	}
});

test('Should push element at position 20 in a 50 length list.', () => {
	let list = new DoubleLinkedList();

	for (let i = 0; i < 50; i++) {
		list.insert(0);
	}

	list.insertAt(20, 1);

	let current = list.peek()
	for (let i = 0; i < 20; i++) {
		expect(current.value).toEqual(0);
		current = current.next;
	}

	expect(current.value).toEqual(1);
});

test('Should push element at position 55 in a 50 length list.', () => {
	let list = new DoubleLinkedList();

	for (let i = 0; i < 50; i++) {
		list.insert(0);
	}

	list.insertAt(55, 1000);
	expect(list.peekLast().value).toEqual(1000);
});


test('Should push element at position 10 in a 0 length list.', () => {
	let list = new DoubleLinkedList();

	list.insertAt(10, 1);
	expect(list.peekLast().value).toEqual(1);
});

test('Should pop element at position 10 in a 20 length list.', () => {
	let list = new DoubleLinkedList();

	for (let i = 0; i < 20; i++) {
		list.insert(0);
	}

	list.insertAt(10, 1);
	list.removeAt(10);

	let current = list.peek();
	for (let i = 0; i < 10; i++) {
		current = current.next;
	}
	expect(current.value).toEqual(0);
});

test('Should not pop element at position 10 in a 5 length list.', () => {
	let list = new DoubleLinkedList();

	for (let i = 0; i < 5; i++) {
		list.insert(0);
	}

	list.removeAt(10);
	
	let current = list.peek();
	for (let i = 0; i < 5; i++) {
		current = current.next;
	}

	expect(current).toBeDefined();
});

test('Should pop first element.', () => {
	let list = new DoubleLinkedList();

	list.push(1);
	for (let i = 0; i < 5; i++) {
		list.push(0);
	}
	list.removeAt(0);

	expect(list.peek().value).toEqual(0);
});

test('Should pop last element.', () => {
	let list = new DoubleLinkedList();

	for (let i = 0; i < 5; i++) {
		list.insert(0);
	}
	list.push(1);
	list.removeAt(5);

	expect(list.peekLast().value).toEqual(0);
});

test('Should set value at defined index.', () => {
	let list = new DoubleLinkedList();

	for (let i = 0; i < 5; i++) {
		list.insert(0);
	}

	list.setAt(2, 1);
	
	expect(list.getAt(2).value).toEqual(1);
});

test('Should not set value at undefined index.', () => {
	let list = new DoubleLinkedList();

	for (let i = 0; i < 5; i++) {
		list.insert(0);
	}
	list.setAt(6, 1);
	
	let current = list.peek();
	while (current.next) {
		expect(current.value).toEqual(0);
		current = current.next;
	}
});

test('Should return the correct index.', () => {
	let list = new DoubleLinkedList();

	for (let i = 0; i < 5; i++) {
		list.insert(0);
	}
	list.setAt(2, 1);
	
	expect(list.getAt(2).value).toEqual(1);
});

test('Should return null.', () => {
	let list = new DoubleLinkedList();

	for (let i = 0; i < 5; i++) {
		list.insert(0);
	}
	
	expect(list.getAt(5)).toBeNull();
});

test('Should return size 0.', () => {
	let list = new DoubleLinkedList();	
	expect(list.size()).toEqual(0);
});

test('Should return the correct size.', () => {
	let list = new DoubleLinkedList();

	for (let i = 0; i < 5; i++) {
		list.insert(0);
	}
	expect(list.size()).toEqual(5);

	for (let i = 4; i >= 0; i--) {
		list.remove();
		expect(list.size()).toEqual(i);
	}
});

test('Should return correct state for emtpy function.', () => {
	let list = new DoubleLinkedList();	
	expect(list.empty()).toEqual(true);

	for (let i = 0; i < 5; i++) {
		list.insert(0);
	}
	expect(list.empty()).toEqual(false);

	for (let i = 0; i < 5; i++) {
		list.remove();
	}
	expect(list.empty()).toEqual(true);	
});

test('Should return correct state for emtpy function.', () => {
	let list = new DoubleLinkedList();	
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

test('Should return correct state for emtpy function.', () => {
	let list = new DoubleLinkedList();	
	expect(list.empty()).toEqual(true);
	list.insertAt(0, 0);
	list.insertAt(0, 0);
	list.insertAt(0, 0);
	expect(list.empty()).toEqual(false);
	list.removeAt(0);
	list.removeAt(0);
	list.removeAt(0);
	expect(list.empty()).toEqual(true);	
});

test('Should return correct state for contain function.', () => {
	let list = new DoubleLinkedList();	

	for (let i = 0; i < 5; i++) {
		list.insert(0);
	}

	list.setAt(2, 1);
	expect(list.contains(1)).toEqual(true);	
	list.setAt(2, 0);
	expect(list.contains(1)).toEqual(false);	
});

test('Should return correct state for find function.', () => {
	let list = new DoubleLinkedList();	

	for (let i = 0; i < 5; i++) {
		list.insert(0);
	}

	list.setAt(2, 1);
	expect(list.find(1).value).toEqual(1);
	list.setAt(2, 0);
	expect(list.find(1)).toBeNull();
});

test('Should clear the whole List.', () => {
	let list = new DoubleLinkedList();	

	for (let i = 0; i < 5; i++) {
		list.insert(0);
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
	let list = new DoubleLinkedList();	

	for (let i = 0; i < 5; i++) {
		list.insert(0);
	}

	expect(list.getAt(10)).toBeNull();
});

test('Should not return an error when remove called on a empty list.', () => {
	let list = new DoubleLinkedList();
	list.remove();
});

test('Should not return an error when pop called on a empty list.', () => {
	let list = new DoubleLinkedList();
	list.pop();
});

test('Should iterate list of 50 elmements forward.', () => {
	let list = new DoubleLinkedList();

	let i = 0;
	for (; i < 50; i++) {
		list.insert(i);
	}

	//Iterate natively
	for (let node of list) {
	    expect(node.value).toEqual(--i);
	}	
});

test('Should iterate list of 50 elmements forward.', () => {
	let list = new DoubleLinkedList();

	let i = 0;
	for (; i < 50; i++) {
		list.insert(i);
	}

	list.setIterationMode(DoubleLinkedList.FORWARD);

	//Iterate natively
	for (let node of list) {
	    expect(node.value).toEqual(--i);
	}	
});

test('Should iterate list of 50 elmements backward.', () => {
	let list = new DoubleLinkedList();

	
	for (let i = 0; i < 50; i++) {
		list.insert(i);
	}

	list.setIterationMode(DoubleLinkedList.BACKWARD);

	//Iterate natively
	let i = 0;
	for (let node of list) {
	    expect(node.value).toEqual(i++);
	}	
});

test('Should iterate list of 50 elmements backward.', () => {
	let list = new DoubleLinkedList();
	const operations = [
		15, 10, 3, 4, 5, 7, 8, 9, 11, 12, 1000, 13, 14, 15, 16, 17, 18, 10
	]

	for (let i = 0; i < 20; i++) {
		list.push(i);
	}

	list.remove();
	list.remove();
	list.pop();
	list.remove();
	list.insert(10);
	list.push(10);
	list.insert(15);
	list.removeAt(5);
	list.removeAt(8);
	list.insertAt(10, 1000);

	//Iterate natively
	let i = 0;
	for (let node of list) {
	    expect(node.value).toEqual(operations[i++]);
	    console.log(node);
	}	

	list.setIterationMode(DoubleLinkedList.BACKWARD);

	//Iterate natively
	i = operations.length - 1;
	for (let node of list) {
	    expect(node.value).toEqual(operations[i--]);
	}	
});

