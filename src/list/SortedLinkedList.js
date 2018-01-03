const BinarySearchTree = require('../tree/BinarySearchTree');

class SortedLinkedList extends BinarySearchTree {

	setIterationMode () {}

	pop () {
		this.remove(this.root.value);
	}

	peek () {
		return this.root;
	}

	getAt (index) {
		if (index <= this.count) {
			return this._findPosition(this.root, index);
		}

		return null;
	}

	_findPosition (node, index) {
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