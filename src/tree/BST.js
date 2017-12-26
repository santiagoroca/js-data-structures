//Find node in BST, if node found, return node otherwise, return null
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

//Insert node into BST, return head node
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

	return node;
}

class Node {

	constructor (value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}

}

class BST {

	constructor () {
		this.root = null;
	}

	insert (value) {
		this.root = insert(value);
	}

	find (value) {
		return this.root.find(value);	
	}

	//TODO Check how BST Removes nodes
	remove () {

	}

}

module.export = BST;