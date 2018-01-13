## JStandard-queue.PriorityQueue

Priority Queue implementation with Heaps that allow MIN/MAX and custom comparators for more complex objects. 
----------

### Constructor ###

**constructor()** 

    const priorityQueue = new PriorityQueue();

**constructor(Comparer)**

    const priorityQueue = new PriorityQueue(PriorityQueue.MAX);
    const priorityQueue = new PriorityQueue((a, b) => a.value < b.value);

----------

### Methods ###

**push(element)** (void) Adds a new value to the end of the queue and position it acordingly to the comparer function. 

- element: With MAX and MIN comparer only native types can be pushed else a custom comparer should be provided.

**pop()** (void) Pops the element in the front of the Queue.

**peek()** (Element) Returns the element at the front of the Queue or null if empty.

**empty()** (Boolean) Returns true if Queue is empty otherwise false.

**size()** (Number) Returns the number of active elements in the Queue.