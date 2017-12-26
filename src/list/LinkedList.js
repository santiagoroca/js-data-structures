class Node {

	constructor (value) {
		this.value = value;
		this.next = null;
	}

}

class LinkedList {

	constructor () {
		this.count = 0;
		this.root = null;
		this.tail = null;
	}

	//
	insert (value) {
		this.tail.next = new Item(value);
		this.tail = this.tail.next;
		this.count++;

		if (!this.root) {
			this.root = this.tail;
		}
	}

	//TODO Check if this is the more performant way to remove Nodes
	remove (value) {
		let current = this.root;

		while (current.next) {
			if (current.next.value == value) {
				let next = current.next.next;

				//TODO Check if deleting current.next all the nested objects are deleted
				delete current.next;
				current.next = next;
				this.count--;
				break;
			}
		}
	}

	find () {
		
	}

}

module.export = LinkedList;