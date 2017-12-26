class Node {

	constructor (value) {
		this.value = value;
	}

}

class LinkedQueue {

	constructor () {
		this.front = null;
		this.tail = null;
	}

	push (value) {
		if (!this.front) {
			this.front = new Node(value);
			this.tail = this.front;
		} else {
			this.tail.next = new Node(value);
			this.tail = this.tail.next;	
		}
	}

	pop (Node) {
		if (this.front) {
			this.front = this.front.next;
		}
	}

	peek () {
		if (this.front) {
			return this.front.value;
		}
	}

	empty () {
		return !this.front;
	}

}

module.export = LinkedQueue;