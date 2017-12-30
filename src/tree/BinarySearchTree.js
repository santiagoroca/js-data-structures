const CircularBuffer = require('../queue/CircularBuffer');

class Node {

	constructor (value, left, right) {
		this.value = value;
		this.left = left;
		this.right = right;
	}

}

const insert = (node, element) => {
	if (!node) {
		return new Node(element);
	}

	if (element < node.value) {
		node.left = insert(node.left, element);
	} else {
		node.right = insert(node.right, element);
	}

	return node;
}

const find = (node, value) => {
	if (!node) {
		return null;
	}

	if (value < node.value) {
		return find(node.left, value);
	} else if (value > node.value) {
		return find(node.right, value);
	} else {
		return node;
	}
}

const findMin = (node, value) => {
	let current = node;

	while (current.left) {
		current = current.left;
	}

	return current;
}

const findMax = (node) => {
	let current = node;

	while (current.right) {
		current = current.right;
	}

	return current;
}

const remove = (node, value, count) => {
	if (!node) {
		return null;
	}

	if (value < node.value) {
		node.left = remove(node.left, value, count);
	} else if (value > node.value) {
		node.right = remove(node.right, value, count);
	} else {
		//Confirms that deletion succeded
		if (count) {
			count.count--;
		}

		if (!node.left) {
			return node.right;
		} else if (!node.right) {
			return node.left;
		}

		//Set current value to the minimum in the right child
		node.value = findMin(node.right).value;

		//Delete the original copied Node
		node.right = remove(node.right, node.value);
	}

	return node;
}

const ITERATORS = [

	function * preorder (node) {
		if (!node) {
			return;
		}

		yield node;
		yield* preorder(node.left);
		yield* preorder(node.right);
	},

	function * inorder (node) {
		if (!node) {
			return;
		}

		yield* inorder(node.left);
		yield node;
		yield* inorder(node.right);
	},

	function * postorder (node) {
		if (!node) {
			return;
		}

		yield* postorder(node.left);
		yield* postorder(node.right);
		yield node;
	},

	function * levelorder (node) {
		if (!node) {
			return;
		}

		let buffer = new CircularBuffer();

		//Push first node to buffer to start level order traversal
		buffer.push(node);

		while (!buffer.empty()) {
			let current = buffer.peek();
			buffer.pop();

			yield current;

			if (current.left) {
				buffer.push(current.left);
			}

			if (current.right) {
				buffer.push(current.right);
			}
		}
	}

];

class BinarySearchTree {

	constructor () {
		this.root = null;
		this.count = 0;

		// Defines the way the tree will be iterated
		// calling the iterator
		this.iteration_mode = 1;
	}

	insert (element) {
		this.count++;
		this.root = insert(this.root, element);
	}

	contains (element) {
		return find(this.root, element) ? true : false;
	}

	find (element) {
		return find(this.root, element);
	}

	min () {
		if (this.root) {
			return findMin(this.root);	
		}
		
		return null;
	}

	max () {
		if (this.root) {
			return findMax(this.root);	
		}
		
		return null;
	}

	size () {
		return this.count;
	}

	empty () {
		return this.count == 0;
	}

	remove (element) {
		let count = {
			count: this.count
		};

		this.root = remove(this.root, element, count);
		this.count = count.count;
	}

	clear () {
		this.count = 0;
		this.root = null;
	}

	setIterationMode (mode) {
		this.iteration_mode = mode;
	}

	*[Symbol.iterator] () {
		yield * ITERATORS[this.iteration_mode](this.root);
	}

}

module.exports = BinarySearchTree;
module.exports.PREORDER = 0;
module.exports.INORDER = 1;
module.exports.POSTORDER = 2;
module.exports.LEVELORDER = 3;