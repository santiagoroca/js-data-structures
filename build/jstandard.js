var JStandard =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:8080/built/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class CircularBuffer {

	constructor(size = 1000) {
		this.read = 0;
		this.length = 0;
		this.MAX_SIZE = size;
		this.container = new Array(this.MAX_SIZE);
	}

	push(value) {
		if (!this.full()) {
			this.container[(this.read + this.length++) % this.MAX_SIZE] = value;
		}
	}

	pop(item) {
		if (!this.empty()) {
			this.length--;
			this.read++;
			this.read %= this.MAX_SIZE;
		}
	}

	peek() {
		return this.container[this.read];
	}

	full() {
		return this.length == this.MAX_SIZE;
	}

	empty() {
		return this.length == 0;
	}

	size() {
		return this.length;
	}

}

module.exports = CircularBuffer;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const CircularBuffer = __webpack_require__(0);
const Stack = __webpack_require__(3);

class Node {

	constructor(value, left, right) {
		this.value = value;
		this.left = left;
		this.right = right;
		this._size = false;
	}

	isDirty() {
		this._size = false;
	}

	size() {
		if (!this._size) {
			this._size = 1 + (this.left ? this.left.size() : 0) + (this.right ? this.right.size() : 0);
		}

		return this._size;
	}

}

const ITERATORS = [function* preorder(node) {
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
}, function* inorder(node) {
	if (!node) {
		return;
	}

	yield* inorder(node.left);
	yield node;
	yield* inorder(node.right);
}, function* postorder(node) {
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
}, function* levelorder(node) {
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
}];

class BinarySearchTree {

	constructor(comparator) {
		this.root = null;
		this.count = 0;

		// Defines the way the tree will be iterated
		// calling the iterator
		this.iteration_mode = 1;
	}

	insert(element) {
		this.count++;
		this.root = this._insert(this.root, element);
	}

	_insert(node, element) {
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

	contains(element) {
		return this._find(this.root, element) ? true : false;
	}

	find(element) {
		return this._find(this.root, element);
	}

	_find(node, value) {
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

	min() {
		if (this.root) {
			return this._findMin(this.root);
		}

		return null;
	}

	_findMin(node, value) {
		let current = node;

		while (current.left) {
			current = current.left;
		}

		return current;
	}

	max() {
		if (this.root) {
			return this._findMax(this.root);
		}

		return null;
	}

	_findMax(node) {
		let current = node;

		while (current.right) {
			current = current.right;
		}

		return current;
	}

	size() {
		return this.count;
	}

	empty() {
		return this.count == 0;
	}

	remove(element) {
		let count = {
			count: this.count
		};

		this.root = this._remove(this.root, element, count);
		this.count = count.count;
	}

	_remove(node, value, count) {
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

	clear() {
		this.count = 0;
		this.root = null;
	}

	setIterationMode(mode) {
		this.iteration_mode = mode;
	}

	*[Symbol.iterator]() {
		yield* ITERATORS[this.iteration_mode](this.root);
	}

}

module.exports = BinarySearchTree;
module.exports.PREORDER = 0;
module.exports.INORDER = 1;
module.exports.POSTORDER = 2;
module.exports.LEVELORDER = 3;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = class NoAllowedArgumentError extends Error {};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Node {

	constructor(value, prev) {
		this.value = value;
		this.prev = prev;
	}

}

class Stack {

	constructor() {
		this.tail = null;
		this.count = 0;
	}

	/**
  * @param  {[any]}
  */
	push(element) {
		this.count++;
		this.tail = new Node(element, this.tail);
	}

	/**
  * 
  */
	pop() {
		if (this.tail) {
			this.count--;
			this.tail = this.tail.prev;
		}
	}

	peek() {
		if (this.tail) {
			return this.tail.value;
		}

		return null;
	}

	size() {
		return this.count;
	}

	empty() {
		return this.count == 0;
	}

	clear() {
		this.count = 0;
		this.tail = null;
	}

}

module.exports = Stack;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const BinarySearchTree = __webpack_require__(1);

const findMin = node => {
	let current = node;

	while (current.left) {
		current = current.left;
	}

	return current;
};

const rightRotate = node => {
	let left = node.left;

	node.left = left.right;
	left.right = node;

	//Recalculate Heights
	node.isDirty();
	left.isDirty();

	return left;
};

const leftRotate = node => {
	let right = node.right;

	node.right = right.left;
	right.left = node;

	//Recalculate Heights
	node.isDirty();
	right.isDirty();

	return right;
};

const insert = (node, element, count) => {
	if (!node) {
		count.count++;
		return new Node(element);
	}

	if (element < node.value) {
		node.left = insert(node.left, element, count);
	} else if (element > node.value) {
		node.right = insert(node.right, element, count);
	} else {
		return node;
	}

	//Recalculate Height
	node.isDirty();

	//Get balance factor
	const balanceFactor = node.balanceFactor();

	//LEFT LEFT
	if (balanceFactor > 1 && element < node.left.value) {
		return rightRotate(node);
	}

	//RIGHT RIGHT
	if (balanceFactor < -1 && element > node.right.value) {
		return leftRotate(node);
	}

	//LEFT RIGHT
	if (balanceFactor > 1 && element > node.left.value) {
		node.left = leftRotate(node.left);
		return rightRotate(node);
	}

	//RIGHT LEFT
	if (balanceFactor < -1 && element < node.right.value) {
		node.right = rightRotate(node.right);
		return leftRotate(node);
	}

	return node;
};

const remove = (node, element, count) => {
	if (!node) {
		return null;
	}

	if (element < node.value) {
		node.left = remove(node.left, element, count);
	} else if (element > node.value) {
		node.right = remove(node.right, element, count);
	} else {
		if (count) {
			count.count--;
		}

		if (!node.left) {
			return node.right;
		} else if (!node.right) {
			return node.left;
		}

		node.value = findMin(node.right).value;
		node.right = remove(node.right, node.value);
	}

	//Recalculate Height
	node.isDirty();

	//Get balance factor
	const balanceFactor = node.balanceFactor();

	//LEFT LEFT
	if (balanceFactor > 1 && node.left.balanceFactor() >= 0) {
		return rightRotate(node);
	}

	//LEFT RIGHT
	if (balanceFactor > 1 && node.left.balanceFactor() < 0) {
		node.left = leftRotate(node.left);
		return rightRotate(node);
	}

	//RIGHT RIGHT
	if (balanceFactor < -1 && node.right.balanceFactor() <= 0) {
		return leftRotate(node);
	}

	//RIGHT LEFT
	if (balanceFactor < -1 && node.right.balanceFactor() > 0) {
		node.right = rightRotate(node.right);
		return leftRotate(node);
	}

	return node;
};

class Node {

	constructor(value, left, right) {
		this.value = value;
		this.left = left;
		this.right = right;
		this._height = false;
		this._balanceFactor = false;
		this._size = false;
	}

	isDirty() {
		this._height = false;
		this._balanceFactor = false;
		this._size = false;
	}

	height() {
		if (!this._height) {
			this._height = 1 + Math.max(this.left ? this.left.height() : 0, this.right ? this.right.height() : 0);
		}

		return this._height;
	}

	balanceFactor() {
		if (!this._balanceFactor) {
			this._balanceFactor = (this.left ? this.left.height() : 0) - (this.right ? this.right.height() : 0);
		}

		return this._balanceFactor;
	}

}

class AVL extends BinarySearchTree {

	insert(element) {
		let count = {
			count: this.count
		};

		this.root = insert(this.root, element, count);
		this.count = count.count;
	}

	remove(element) {
		let count = {
			count: this.count
		};

		this.root = remove(this.root, element, count);
		this.count = count.count;
	}

}

module.exports = AVL;
module.exports.PREORDER = 0;
module.exports.INORDER = 1;
module.exports.POSTORDER = 2;
module.exports.LEVELORDER = 3;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

//Queues
const CircularBuffer = __webpack_require__(0);
const Queue = __webpack_require__(7);
const PriorityQueue = __webpack_require__(8);

//Lists
const LinkedList = __webpack_require__(9);
const SortedLinkedList = __webpack_require__(10);
const DoubleLinkedList = __webpack_require__(11);

//Stacks
const Stack = __webpack_require__(3);

//Trees
const BinarySearchTree = __webpack_require__(1);
const AVL = __webpack_require__(4);

//Sets
const OrderedSet = __webpack_require__(12);
const UnorderedSet = __webpack_require__(13);

//Errors
const NoAllowedArgumentError = __webpack_require__(2);

module.exports = {

	queue: {
		Queue: Queue,
		CircularBuffer: CircularBuffer,
		PriorityQueue: PriorityQueue
	},

	list: {
		LinkedList: LinkedList,
		SortedLinkedList: SortedLinkedList,
		DoubleLinkedList: DoubleLinkedList
	},

	stack: {
		Stack: Stack
	},

	tree: {
		BinarySearchTree: BinarySearchTree,
		AVL: AVL
	},

	set: {
		OrderedSet: OrderedSet,
		UnorderedSet: UnorderedSet
	},

	error: {
		NoAllowedArgumentError: NoAllowedArgumentError
	}

};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const CircularBuffer = __webpack_require__(0);

class Queue extends CircularBuffer {}

module.exports = Queue;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

function heapify(index) {
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

const compare = [(a, b) => a < b, (a, b) => a > b];

class PriorityQueue {

	constructor(comparator) {

		switch (typeof comparator) {

			case 'number':
				{
					this.compare = compare[comparator];
				}break;

			case 'function':
				{
					this.compare = comparator;
				}break;

			default:
				{
					this.compare = compare[0];
				}

		}

		this.container = new Array(1000);
		this.count = 0;
	}

	push(value) {
		//Position to insert new element
		let i = this.count;
		this.container[i] = value;
		let parent = parseInt((i - 1) / 2);

		//TODO calculate parent just once
		while (i != 0 && this.compare(this.container[i], this.container[parent])) {
			//Swap child with parent
			let temp = this.container[parent];
			this.container[parent] = this.container[i];
			this.container[i] = temp;
			i = parent;
			parent = parseInt((i - 1) / 2);
		}

		//Increment count to insert element at bottom
		this.count++;
	}

	pop() {
		if (this.count <= 0) {
			return;
		}

		//Store last element to heapify
		this.container[0] = this.container[this.count - 1];

		//Reheapify
		heapify.call(this, 0);

		this.count--;
	}

	peek() {
		return this.container[0];
	}

	size() {
		return this.count;
	}

	empty() {
		return this.count == 0;
	}

}

module.exports = PriorityQueue;
module.exports.MIN = 0;
module.exports.MAX = 1;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

class Node {

	constructor(value, next) {
		this.value = value;
		this.next = next;
	}

}

class LinkedList {

	constructor() {
		this.head = null;
		this.count = 0;
	}

	/**
  * @param  {[any]}
  */
	push(element) {
		this.count++;
		this.head = new Node(element, this.head);
	}

	/**
  * 
  */
	pop() {
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
	insertAt(index, element) {
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

	removeAt(index) {
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

	peek() {
		return this.head;
	}

	setAt(index, element) {
		let current = this.head;
		while (index-- && current) {
			current = current.next;
		}

		if (current) {
			current.value = element;
		}
	}

	getAt(index) {
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

	size() {
		return this.count;
	}

	empty() {
		return this.count == 0;
	}

	contains(element) {
		let current = this.head;

		while (current) {
			if (current.value == element) {
				return true;
			}

			current = current.next;
		}

		return false;
	}

	find(element) {
		let current = this.head;

		while (current) {
			if (current.value == element) {
				return current;
			}

			current = current.next;
		}

		return null;
	}

	clear() {
		this.count = 0;
		this.head = null;
	}

	*[Symbol.iterator]() {
		let current = this.head;

		while (current) {
			yield current;
			current = current.next;
		}
	}

}

module.exports = LinkedList;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const BinarySearchTree = __webpack_require__(1);

class SortedLinkedList extends BinarySearchTree {

	setIterationMode() {}

	pop() {
		this.remove(this.root.value);
	}

	peek() {
		return this.root;
	}

	getAt(index) {
		if (index <= this.count) {
			return this._findPosition(this.root, index);
		}

		return null;
	}

	_findPosition(node, index) {
		//Uses left child size as current index
		let current_index = node.left ? node.left.size() : 0;

		if (index < current_index) {
			return this._findPosition(node.left, index);
		} else if (index == current_index) {
			return node;
		} else {
			return this._findPosition(node.right, index - (current_index + 1));
		}
	}

}

module.exports = SortedLinkedList;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

const ITERATORS = [function* forward(node) {
	while (node) {
		yield node;
		node = node.next;
	}
}, function* backward(node) {
	while (node) {
		yield node;
		node = node.prev;
	}
}];

class Node {

	constructor(value, prev, next) {
		this.value = value;
		this.prev = prev;
		this.next = next;
	}

}

class DoubleLinkedList {

	constructor() {
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
	insert(element) {
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
	remove() {
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
	push(element) {
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
	pop() {
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
	insertAt(index, element) {
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
	removeAt(index) {
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
	peek() {
		return this.head;
	}

	/**
  * [Returns the last Node in the list or null for empty lists]
  * @return {Node}
  */
	peekLast() {
		return this.tail;
	}

	/**
  * [Set the Node's value to the specified element if it doesn't overflow the size]
  * @param  {Number} index [Index to return the Node from]
  * @param  {Any} element [Element to be replaced]
  * @return {Node}
  */
	setAt(index, element) {
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
	getAt(index) {
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
	size() {
		return this.count;
	}

	/**
  * [Returns true if the list is empty, false otherwise]
  * @return {Boolean} 
  */
	empty() {
		return this.count == 0;
	}

	/**
  * [Returns true if a Node matches the element provided, false otherwise]
  * @param  {Any} element [Element to be search]
  * @return {Boolean}
  */
	contains(element) {
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
	find(element) {
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
	clear() {
		this.head = null;
		this.tail = null;
		this.count = 0;
	}

	setIterationMode(iterationMode) {
		this.iteration_mode = iterationMode;
	}

	*[Symbol.iterator]() {
		yield* ITERATORS[this.iteration_mode](this.iteration_mode ? this.tail : this.head);
	}

}

module.exports = DoubleLinkedList;
module.exports.FORWARD = 0;
module.exports.BACKWARD = 1;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const AVL = __webpack_require__(4);
const NoAllowedArgumentError = __webpack_require__(2);

//Constants
const UNION_METHOD_ARGUMENT_ERROR = 'union method only allows OrderedSet as argument.';
const INTERSECTION_METHOD_ARGUMENT_ERROR = 'intersection method only allows OrderedSet as argument.';
const DIFERENCE_METHOD_ARGUMENT_ERROR = 'diference method only allows OrderedSet as argument.';
const SUBSET_METHOD_ARGUMENT_ERROR = 'subset method only allows OrderedSet as argument.';
const EQUALS_METHOD_ARGUMENT_ERROR = 'equals method only allows OrderedSet as argument.';

class OrderedSet extends AVL {

	constructor(elements = []) {
		super();

		const elsLength = elements.length;
		for (let i = 0; i < elsLength; i++) {
			this.insert(elements[i]);
		}
	}

	//Iteration Mode INORDER can't be changed for OrderedSet
	setIterationMode() {}

	union(set) {
		if (!(set instanceof OrderedSet)) {
			throw new NoAllowedArgumentError(UNION_METHOD_ARGUMENT_ERROR);
		}

		let union = new OrderedSet();

		for (let node of this) {
			union.insert(node.value);
		}

		for (let node of set) {
			union.insert(node.value);
		}

		return union;
	}

	intersection(set) {
		if (!(set instanceof OrderedSet)) {
			throw new NoAllowedArgumentError(INTERSECTION_METHOD_ARGUMENT_ERROR);
		}

		let intersection = new OrderedSet();

		for (let node of set) {
			if (this.contains(node.value)) {
				intersection.insert(node.value);
			}
		}

		return intersection;
	}

	difference(set) {
		if (!(set instanceof OrderedSet)) {
			throw new NoAllowedArgumentError(DIFERENCE_METHOD_ARGUMENT_ERROR);
		}

		let difference = new OrderedSet();

		for (let node of this) {
			if (!set.contains(node.value)) {
				difference.insert(node.value);
			}
		}

		return difference;
	}

	subset(set) {
		if (!(set instanceof OrderedSet)) {
			throw new NoAllowedArgumentError(SUBSET_METHOD_ARGUMENT_ERROR);
		}

		if (this.size() < set.size()) {
			return false;
		}

		for (let node of set) {
			if (!this.contains(node.value)) {
				return false;
			}
		}

		return true;
	}

	equals(set) {
		if (!(set instanceof OrderedSet)) {
			throw new NoAllowedArgumentError(EQUALS_METHOD_ARGUMENT_ERROR);
		}

		if (this.size() != set.size()) {
			return false;
		}

		for (let node of set) {
			if (!this.contains(node.value)) {
				return false;
			}
		}

		return true;
	}

}

module.exports = OrderedSet;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

const NoAllowedArgumentError = __webpack_require__(2);

//Constants
const UNION_METHOD_ARGUMENT_ERROR = 'union method only allows UnorderedSet as argument.';
const INTERSECTION_METHOD_ARGUMENT_ERROR = 'intersection method only allows UnorderedSet as argument.';
const DIFERENCE_METHOD_ARGUMENT_ERROR = 'diference method only allows UnorderedSet as argument.';
const SUBSET_METHOD_ARGUMENT_ERROR = 'subset method only allows UnorderedSet as argument.';
const EQUALS_METHOD_ARGUMENT_ERROR = 'equals method only allows UnorderedSet as argument.';

class UnorderedSet {

    constructor(elements = []) {
        this.container = new Set(elements);
    }

    insert(element) {
        this.container.add(element);
    }

    contains(element) {
        return this.container.has(element);
    }

    size() {
        return this.container.size;
    }

    empty() {
        return this.container.size == 0;
    }

    remove(element) {
        return this.container.delete(element);
    }

    clear() {
        this.container.clear();
    }

    union(set) {
        if (!(set instanceof UnorderedSet)) {
            throw new NoAllowedArgumentError(UNION_METHOD_ARGUMENT_ERROR);
        }

        let union = new UnorderedSet();

        for (let node of this) {
            union.insert(node);
        }

        for (let node of set) {
            union.insert(node);
        }

        return union;
    }

    intersection(set) {
        if (!(set instanceof UnorderedSet)) {
            throw new NoAllowedArgumentError(INTERSECTION_METHOD_ARGUMENT_ERROR);
        }

        let intersection = new UnorderedSet();

        for (let node of set) {
            if (this.contains(node)) {
                intersection.insert(node);
            }
        }

        return intersection;
    }

    difference(set) {
        if (!(set instanceof UnorderedSet)) {
            throw new NoAllowedArgumentError(DIFERENCE_METHOD_ARGUMENT_ERROR);
        }

        let difference = new UnorderedSet();

        for (let node of this) {
            if (!set.contains(node)) {
                difference.insert(node);
            }
        }

        return difference;
    }

    subset(set) {
        if (!(set instanceof UnorderedSet)) {
            throw new NoAllowedArgumentError(SUBSET_METHOD_ARGUMENT_ERROR);
        }

        if (this.size() < set.size()) {
            return false;
        }

        for (let node of set) {
            if (!this.contains(node)) {
                return false;
            }
        }

        return true;
    }

    equals(set) {
        if (!(set instanceof UnorderedSet)) {
            throw new NoAllowedArgumentError(EQUALS_METHOD_ARGUMENT_ERROR);
        }

        if (this.container.size != set.size()) {
            return false;
        }

        for (let key of this) {
            if (!set.contains(key)) {
                return false;
            }
        }

        return true;
    }

    *[Symbol.iterator]() {
        yield* this.container[Symbol.iterator]();
    }

}

module.exports = UnorderedSet;

/***/ })
/******/ ]);