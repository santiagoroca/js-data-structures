const BinarySearchTree = require('../tree/BinarySearchTree');
const NoAllowedArgumentError = require('../error/NoAllowedArgumentError');

//Constants
const UNION_METHOD_ARGUMENT_ERROR = 'union method only allows OrderedSet as argument.';
const INTERSECTION_METHOD_ARGUMENT_ERROR = 'intersection method only allows OrderedSet as argument.';
const DIFERENCE_METHOD_ARGUMENT_ERROR = 'diference method only allows OrderedSet as argument.';
const EQUALS_METHOD_ARGUMENT_ERROR = 'equals method only allows OrderedSet as argument.';

class OrderedSet extends BinarySearchTree {

	constructor(elements = []) {
		super();

		const elsLength = elements.length;
		for (let i = 0; i < elsLength; i++) {
			this.insert(elements[i]);
		}
	}

	insert (element) {
		if (!this.find(element)) {
			super.insert(element);
		}
	}

	//Iteration Mode INORDER can't be changed for OrderedSet
	setIterationMode () {}

	union (set) {
		if (!(set instanceof OrderedSet)) {
			throw new NoAllowedArgumentError(UNION_METHOD_ARGUMENT_ERROR)
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

	intersection (set) {
		if (!(set instanceof OrderedSet)) {
			throw new NoAllowedArgumentError(INTERSECTION_METHOD_ARGUMENT_ERROR)
		}

		let intersection = new OrderedSet();

		for (let node of set) {
			if (this.contains(node.value)) {
				intersection.insert(node.value);
			}
		}

		return intersection;
	}

	difference (set) {
		if (!(set instanceof OrderedSet)) {
			throw new NoAllowedArgumentError(DIFERENCE_METHOD_ARGUMENT_ERROR)
		}

		let difference = new OrderedSet();

		for (let node of this) {
			if (!set.contains(node.value)) {
				difference.insert(node.value);
			}
		}

		return difference;
	}

	subset (set) {
		let difference = new OrderedSet();

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

	equals (set) {
		if (!(set instanceof OrderedSet)) {
			throw new NoAllowedArgumentError(EQUALS_METHOD_ARGUMENT_ERROR)
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