//Queues
const CircularBuffer = require('./src/queue/CircularBuffer');
const Queue = require('./src/queue/Queue');
const PriorityQueue = require('./src/queue/PriorityQueue');

//Lists
const LinkedList = require('./src/list/LinkedList');
const SortedLinkedList = require('./src/list/SortedLinkedList');

//Stacks
const Stack = require('./src/stack/Stack');

//Trees
const BinarySearchTree = require('./src/tree/BinarySearchTree');
const AVL = require('./src/tree/AVL');

//Sets
const OrderedSet = require('./src/set/OrderedSet');
const UnorderedSet = require('./src/set/UnorderedSet');

//Errors
const NoAllowedArgumentError = require('./src/error/NoAllowedArgumentError');

module.exports = {

	queue: {
		Queue: Queue,
		CircularBuffer: CircularBuffer,
		PriorityQueue: PriorityQueue
	},

	list: {
		LinkedList: LinkedList,
		SortedLinkedList: SortedLinkedList
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

}