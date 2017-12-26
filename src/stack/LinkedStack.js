class Node {

	constructor (value) {
		this.value = value;
	}

}

class LinkedStack {

	constructor () {
		this.tail = null;
	}

	push (value) {
		if (!this.tail) {
			this.tail = new Node(value);
		} else {
			this.tail.prev = new Node(value);
			this.tail = this.tail.prev;	
		}
	}

	pop () {
		if (this.tail) {
			this.tail = this.tail.prev;
		}
	}

	peek () {
		if (this.tail) {
			return this.tail.value;
		}
	}

	empty () {
		return !this.tail;
	}

}

module.export = LinkedStack;