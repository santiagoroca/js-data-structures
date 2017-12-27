function heapify (index) {
	let left = 2 * index + 1;
	let right = left + 1;
	let parent = index;

	if (left < this.count && this.compare(this.container[left], this.container[parent])) {
		parent = left;
	}

	if (right < this.count && this.compare(this.container[right], this.container[parent])) {
		parent = right;
	}

	if (parent != index) {
		let temp = this.container[index];
		this.container[index] = this.container[parent];
		this.container[parent] = temp;
		heapify.call(this, parent);
	}
}

const compare = [
	(a, b) => a < b,
	(a, b) => a > b
];

class PriorityQueue {

	constructor (comparator) {

		switch (typeof comparator) {

			case 'number': {
				this.compare = compare[comparator]
			} break;

			case 'function': {
				this.compare = comparator;	
			} break;

			default: {
				this.compare = compare[0];
			}

		}

		this.container = new Array(1000);
		this.count = 0;
	}

	push (value) {
		//Position to insert new element
		let i = this.count;
		this.container[i] = value;
		let parent = parseInt((i-1)/2);

		//TODO calculate parent just once
		while (i != 0 && this.compare(this.container[i], this.container[parent])) {
			//Swap child with parent
			let temp = this.container[parent];
			this.container[parent] = this.container[i];
			this.container[i] = temp;
			i = parent;
			parent = parseInt((i-1)/2);
		}

		//Increment count to insert element at bottom
		this.count++;
	}

	pop () {
		if (this.count <= 0) {
			return;
		}

		//Store last element to heapify
		this.container[0] = this.container[this.count-1];

		//Reheapify
		heapify.call(this, 0);

		this.count--;
	}

	peek () {
		return this.container[0];
	}

	size () {
		return this.count;
	}

	empty () {
		return this.count == 0;
	}

}

module.exports = PriorityQueue;
module.exports.MIN = 0;
module.exports.MAX = 1;