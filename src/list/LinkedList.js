class Node {

	constructor (value, next) {
		this.value = value;
		this.next = next;
	}

}

class LinkedList {

	constructor () {
		this.head = null;
		this.count = 0;
	}

	/**
	 * @param  {[any]}
	 */
	push (element) {
		this.count++;
		this.head = new Node(element, this.head);
	}

	/**
	 * 
	 */
	pop () {
		if (this.head) {
			this.count--;
			this.head = this.head.next;	
		}
	}

	/**
	 * @param  {[type]}
	 * @param  {[type]}
	 * @return {[type]}
	 */
	insertAt (index, element) {
		this.count++;

		if (!this.head) {
			this.head = new Node(element);
			return;
		}

		let current = this.head;

		while (--index && current.next) {
			current = current.next;
		}

		current.next = new Node(element, current.next);
	}

	removeAt (index) {
		this.count--;

		if (index == 0) {
			this.head = this.head.next;
			return;			
		}

		let current = this.head;
		while (--index && current.next) {
			current = current.next;
		}

		if (index == 0) {
			current.next = current.next.next;
		}
	}

	peek () {
		return this.head;
	}

	setAt (index, element) {
		let current = this.head;
		while (index-- && current) {
			current = current.next;
		}

		if (current) {
			current.value = element;
		}
	}

	getAt (index) {
		let current = this.head;

		while (index && current) {
			current = current.next;
			index--;
		}

		if (index == 0) {
			return current;
		}

		return null;
	}

	size () {
		return this.count;
	}

	empty () {
		return this.count == 0;
	}

	contains (element) {
		let current = this.head;

		while (current) {
			if (current.value == element) {
				return true;
			}

			current = current.next;
		}

		return false;
	}

	find (element) {
		let current = this.head;

		while (current) {
			if (current.value == element) {
				return current;
			}

			current = current.next;
		}

		return null;
	}

	clear () {
		this.count = 0;
		this.head = null;
	}

	*[Symbol.iterator] () {
		let current = this.head;

		while (current) {
			yield current;
			current = current.next;
		}
	}
	
}

module.exports = LinkedList;