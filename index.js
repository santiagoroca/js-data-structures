//Queues
const CircularBuffer = require('./src/queue/CircularBuffer');
const PriorityQueue = require('./src/queue/PriorityQueue');

//Lists
const LinkedList = require('./src/list/LinkedList');

//Stacks
const Stack = require('./src/stack/Stack');

//Trees
const BinarySearchTree = require('./src/tree/BinarySearchTree');

//Sets
const OrderedSet = require('./src/set/OrderedSet');

//Errors
const NoAllowedArgumentError = require('./src/error/NoAllowedArgumentError');

module.exports = {

	//Queues
	CircularBuffer: CircularBuffer,
	PriorityQueue: PriorityQueue,

	//Lists
	LinkedList: LinkedList,

	//Stacks
	Stack: Stack,

	//Trees
	BinarySearchTree: BinarySearchTree,

	//Sets
	OrderedSet: OrderedSet,

	//Erros
	NoAllowedArgumentError: NoAllowedArgumentError
	
}