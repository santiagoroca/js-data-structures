const CircularBuffer = require('../queue/CircularBuffer');
const Stack = require('../stack/Stack');

class Node {

	constructor (value, left, right) {
		this.value = value;
		this.left = left;
		this.right = right;
		this._size = false;	
	}

	isDirty () {
		this._size = false;
	}

	size () {
		if (!this._size) {
			this._size = (1 + (this.left ? this.left.size() : 0) + (this.right ? this.right.size() : 0));
		}

		return this._size;
	}

}

const ITERATORS = [

	function * preorder (node) {
		if (!node) {
			return;
		}

		const stack = new Stack();
			  stack.push(node);

		while (!stack.empty()) {
			let current = stack.peek();
			stack.pop();

			yield current;

			if (current.right) {
				stack.push(current.right);
			}

			if (current.left) {
				stack.push(current.left);
			}
		}
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

		const stack_inorder = new Stack();
		const stack_postorder = new Stack();
			  stack_inorder.push(node);

		while (!stack_inorder.empty()) {
			let current = stack_inorder.peek();
			stack_inorder.pop();
			stack_postorder.push(current);

			if (current.left) {
				stack_inorder.push(current.left);
			}

			if (current.right) {
				stack_inorder.push(current.right);
			}
		}

		while (!stack_postorder.empty()) {
			yield stack_postorder.peek();
			stack_postorder.pop();
		}
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

	constructor (comparator) {
		this.root = null;
		this.count = 0;

		// Defines the way the tree will be iterated
		// calling the iterator
		this.iteration_mode = 1;
	}

	insert (element) {
		this.count++;
		this.root = this._insert(this.root, element);
	}

	_insert (node, element) {
		if (!node) {
			return new Node(element);
		}

		if (element < node.value) {
			node.left = this._insert(node.left, element);
		} else {
			node.right = this._insert(node.right, element);
		}

		//Let know node that should update height if it need to be used
		node.isDirty();

		return node;
	}

	contains (element) {
		return this._find(this.root, element) ? true : false;
	}

	find (element) {
		return this._find(this.root, element);
	}

	_find (node, value) {
		if (!node) {
			return null;
		}

		if (value < node.value) {
			return this._find(node.left, value);
		} else if (value > node.value) {
			return this._find(node.right, value);
		} else {
			return node;
		}
	}

	min () {
		if (this.root) {
			return this._findMin(this.root);	
		}
		
		return null;
	}

	_findMin (node, value) {
		let current = node;

		while (current.left) {
			current = current.left;
		}

		return current;
	}

	max () {
		if (this.root) {
			return this._findMax(this.root);	
		}
		
		return null;
	}

	_findMax (node) {
		let current = node;

		while (current.right) {
			current = current.right;
		}

		return current;
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

		this.root = this._remove(this.root, element, count);
		this.count = count.count;
	}

	_remove (node, value, count) {
		if (!node) {
			return null;
		}

		if (value < node.value) {
			node.left = this._remove(node.left, value, count);
		} else if (value > node.value) {
			node.right = this._remove(node.right, value, count);
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
			node.value = this._findMin(node.right).value;

			//Delete the original copied Node
			node.right = this._remove(node.right, node.value);
		}

		return node;
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