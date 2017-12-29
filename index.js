//Queues
const CircularBuffer = require('./src/queue/CircularBuffer');
const PriorityQueue = require('./src/queue/PriorityQueue');

//Lists
const LinkedList = require('./src/list/LinkedList');

//Stacks
const Stack = require('./src/stack/Stack');

module.exports = {
	CircularBuffer: CircularBuffer,
	PriorityQueue: PriorityQueue,
	LinkedList: LinkedList,
	Stack: Stack
}