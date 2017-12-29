class Node {

	constructor (value, prev) {
		this.value = value;
		this.prev = prev;
	}

}

class Stack {

	constructor () {
		this.tail = null;
		this.count = 0;
	}

	/**
	 * @param  {[any]}
	 */
	push (element) {
		this.count++;
		this.tail = new Node(element, this.tail);
	}

	/**
	 * 
	 */
	pop () {
		if (this.tail) {
			this.count--;
			this.tail = this.tail.prev;
		}
	}

	peek () {
		if (this.tail) {
			return this.tail.value;
		}
		
		return null;
	}

	size () {
		return this.count;
	}

	empty () {
		return this.count == 0;
	}

	clear () {
		this.count = 0;
		this.tail = null;
	}
	
}

module.exports = Stack;