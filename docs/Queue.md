## JStandard.queue.Queue

Fixed Length Queue with fast push, pop operations. This type of Queue is much faster but, as a constrain, a fixed size which should be defined on instantiation. If you want a more flexible Queue, use a Simple JStandard.list.LinkedList which defines the same methods but would allow more flexibility and speed when dealing with uknown queue's sizes.

----------

### Constructor ###

**constructor(size = 1000)** 

    const queue = new Queue();

**constructor(size)**

    const queue = new Queue(1500);

----------

### Methods ###

**push(element)** (void) Adds a new value to the end of the queue. 

- element: Any type of element

**pop()** (void) Pops the element in the front of the queue.

**peek()** (Element) Returns the element at the front of the queue or null if empty.

**full()** (Boolean) Returns true if queue is full otherwise false. 

**empty()** (Boolean) Returns true if queue is empty otherwise false.

**size()** (Number) Returns the number of active elements in the queue.

