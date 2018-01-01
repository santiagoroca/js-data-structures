//Queues
const CircularBuffer = require('./src/queue/CircularBuffer');
const PriorityQueue = require('./src/queue/PriorityQueue');

//Lists
const LinkedList = require('./src/list/LinkedList');

//Stacks
const Stack = require('./src/stack/Stack');

//Trees
const BinarySearchTree = require('./src/tree/BinarySearchTree');
const AVL = require('./src/tree/AVL');

//Sets
const OrderedSet = require('./src/set/OrderedSet');

//Errors
const NoAllowedArgumentError = require('./src/error/NoAllowedArgumentError');

module.exports = {

	queue: {
		CircularBuffer: CircularBuffer,
		PriorityQueue: PriorityQueue
	},

	list: {
		LinkedList: LinkedList
	},

	stack: {
		Stack: Stack
	},

	tree: {
		BinarySearchTree: BinarySearchTree,	
		AVL: AVL
	},

	set: {
		OrderedSet: OrderedSet
	},

	error: {
		NoAllowedArgumentError: NoAllowedArgumentError
	}

}