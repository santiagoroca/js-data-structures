const BinarySearchTree = require('../tree/BinarySearchTree');

const findMin = (node) => {
	let current = node;

	while (current.left) {
		current = current.left;
	}

	return current;
}

const rightRotate = (node) => {
	let left = node.left;

	node.left = left.right;
	left.right = node;

	//Recalculate Heights
	node.isDirty();
	left.isDirty();

	return left;
}

const leftRotate = (node) => {
	let right = node.right;

	node.right = right.left;
	right.left = node;

	//Recalculate Heights
	node.isDirty();
	right.isDirty();

	return right;
}

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
}

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
}

class Node {

	constructor (value, left, right) {
		this.value = value;
		this.left = left;
		this.right = right;
		this._height = false;
		this._balanceFactor = false;
	}

	isDirty () {
		this._height = false;
		this._balanceFactor = false;
	}

	height () {
		if (!this._height) {
			this._height = 1 + Math.max(this.left ? this.left.height() : 0, this.right ? this.right.height() : 0);
		}

		return this._height;
	}

	balanceFactor () {
		if (!this._balanceFactor) {
			this._balanceFactor = (this.left ? this.left.height() : 0) - (this.right ? this.right.height() : 0);
		}

		return this._balanceFactor;
	}

}

class AVL extends BinarySearchTree {

	insert (element) {
        let count = {
            count: this.count
        };

		this.root = insert(this.root, element, count);
        this.count = count.count;
	}

	remove (element) {
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