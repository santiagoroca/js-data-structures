const find = (node, value) => {
	if (!node) {
		return node;
	}

	if (value == node.value) {
		return node;
	} else if (value < node.value) {
		return find(node.left);
	} else {
		return find(node.right);
	}
}

const rotateLeft = (node) => {
	let right = node.right;

	//Rotate Node with right
	node.right = right.left;
	right.left = node;

	//Update Height of current node
	node.height = Math.max(node.left.height, node.right.height);

	return node;
}

const rotateRight = (node) => {
	let left = node.left;

	//Rotate Node with right
	node.left = left.right;
	left.right = node;

	//Update Height of current node
	node.height = Math.max(node.left.height, node.right.height);

	return node;
}

const insert = (node, value) => {
	if (!root) {
		return new Node(value);
	}

	//BST Ordered
	if (value > node.value) {
		node.right = insert(node.right, value);
	} else {
		node.left = insert(node.left, value);
	}

	//Update new node Height
	node.height = Math.max(node.left.height, node.right.height);

	//Get balance factor between childs to determine if
	//Node is balanced
	const balance = node.left.height - node.right.height;

	//LEFT LEFT
	if (value < node.left.value && balance == -1) {
		return rotateRight(node);
	}
	
	//RIGHT RIGHT
	if (value > node.right.value && balance == 1) {
		return rotateRight(node);
	}

	//LEFT RIGHT
	if (value > node.left.value && balance == -1) {
		this.left = rotateRight(this.left);
		return rotateRight(node);
	}

	//RIGHT LEFT
	if (value < node.right.value && balance == 1) {
		this.right = rotate(this.right);
		return rotateRight(node);
	}

	return node;
}

class Node {

	constructor (value) {
		this.value = value;
		this.left = null;
		this.right = null;
		this.height = 0;
	}

}

//TODO GOOGLE! AVL's name
class AVL {

	constructor () {
		this.root = null;
	}

	insert (value) {
		this.root = insert(value);
	}

	find (value) {
		return this.root.find(value);	
	}

	//TODO Check how remove's method shoulb be implemented
	remove () {

	}

}

module.export = AVL;