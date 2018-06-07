const ITERATORS = [

	function * forward (node) {
		while (node) {
			yield node;
			node = node.next;
		}
	},

	function * backward (node) {
		while (node) {
			yield node;
			node = node.prev;
		}	
	}

];

class Node {

	constructor (value, prev, next) {
		this.value = value;
		this.prev = prev;
		this.next = next;
	}

}

class DoubleLinkedList {

	constructor () {
		this.count = 0;
		this.head = null;
		this.tail = null;
		this.iteration_mode = 0;
	}

	/**
	 * Push am element in the front of the list
	 * @param  {Any} element Element to be pushed 
	 * @return {void}
	 */
	insert (element) {
		if (!this.head) {
			this.head = new Node(element, null, null);	
			this.tail = this.head;
		} else {
			this.head.prev = new Node(element, null, this.head);
			this.head = this.head.prev;
		}

		this.count++;
	}

	/**
	 * Pops an element from the begining
	 * @return {void}
	 */
	remove () {
		if (this.head) {
			this.head = this.head.next;
			this.count--;
		}
	}

	/**
	 * Inserts an element at the end
	 * @param  {Any} element Element to be inserted 
	 * @return {void}
	 */
	push (element) {
		if (this.empty()) {
			this.insert(element);
		} else {
			this.tail.next = new Node(element, this.tail, null);
			this.tail = this.tail.next;

			this.count++;	
		}
	}

	/**
	 * Removes an element from the end
	 * @return {void}
	 */
	pop () {
		if (this.tail) {
			this.tail = this.tail.prev;
			this.count--;
		}
	}

	/**
	 * [Inserts an element at the specified position or at the end if overflows the size]
	 * @param  {Number} index [Index to insert the element]
	 * @param  {Any} element [Element to be insertet]
	 * @return {void}
	 */
	insertAt (index, element) {
		if (index < this.count) {

			let current = this.head;
			while (--index && current.next) {
				current = current.next;
			}

			//Node to be inserted
			let node = new Node(element, current, current.next);

			//Creates new node and adjust most of the connections
			current.next = node;

			if (node.next) {
				node.next.prev = node;
			} else {
				this.tail = node;
			}

			this.count++;	
		} else {
			this.push(element);
		}
	}

	/**
	 * [Removes an element from the specified position if it doesn't overflow the size]
	 * @param  {Number} index [Index to delete the element from]
	 * @return {void}
	 */
	removeAt (index) {
		if (index == 0) {
			this.head = this.head.next;
		} else if (index < this.count) {
			
			let current = this.head;
			while (--index) {
				current = current.next;
			}

			//Delete node from the middle
			current.next = current.next.next;

			//If new next is defined, fix prev pointer
			if (current.next) {
				current.next.prev = current;
			} else {
				this.tail = current;
			}
		}

		this.count--;
	}

	/**
	 * [Returns the first Node in the list or null for empty lists]
	 * @return {Node}
	 */
	peek () {
		return this.head;
	}

	/**
	 * [Returns the last Node in the list or null for empty lists]
	 * @return {Node}
	 */
	peekLast () {
		return this.tail;
	}

	/**
	 * [Set the Node's value to the specified element if it doesn't overflow the size]
	 * @param  {Number} index [Index to return the Node from]
	 * @param  {Any} element [Element to be replaced]
	 * @return {Node}
	 */
	setAt (index, element) {
		if (index < this.count) {
			
			let current = this.head;
			while (index--) {
				current = current.next;
			}

			current.value = element;
		}
	}

	/**
	 * [Returns the specified Node in the list or null if overflows the size]
	 * @param  {Number} index [Index to return the Node from]
	 * @return {Node}
	 */
	getAt (index) {
		if (index < this.count) {
			
			let current = this.head;
			while (index--) {
				current = current.next;
			}

			return current;
		} else {
			return null;
		}
	}

	/**
	 * [Return the current size of the list]
	 * @return {Number}
	 */
	size () {
		return this.count;
	}

	/**
	 * [Returns true if the list is empty, false otherwise]
	 * @return {Boolean} 
	 */
	empty () {
		return this.count == 0;
	}

	/**
	 * [Returns true if a Node matches the element provided, false otherwise]
	 * @param  {Any} element [Element to be search]
	 * @return {Boolean}
	 */
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

	/**
	 * [Returns a Node matching the element provided, null otherwise]
	 * @param  {Any} element [Element to be search]
	 * @return {Node}
	 */
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

	/**
	 * [Clears the list]
	 * @return {void}
	 */
	clear () {
		this.head = null;
		this.tail = null;
		this.count = 0;
	}

	setIterationMode (iterationMode) {
		this.iteration_mode = iterationMode;
	}

	*[Symbol.iterator] () {
		yield * ITERATORS[this.iteration_mode](this.iteration_mode ? this.tail : this.head);
	}

}

module.exports = DoubleLinkedList;
module.exports.FORWARD = 0;
module.exports.BACKWARD = 1;