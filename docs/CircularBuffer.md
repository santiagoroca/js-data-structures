## JStandard.CircularBuffer

Fixed Length Queue with fast push, pop operations. 

----------

### Constructor ###

**constructor(size = 1000)** 

    const circularBuffer = new CircularBuffer();

**constructor(size)**

    const circularBuffer = new CircularBuffer(1500);

----------

### Methods ###

**push(element)** (void) Adds a new value to the end of the buffer. 

- element: Any type of element

**pop()** (void) Pops the element in the front of the Buffer.

**peek()** (Element) Returns the element at the front of the Buffer or null if empty.

**full()** (Boolean) Returns true if Buffer is full otherwise false. 

**empty()** (Boolean) Returns true if Buffer is empty otherwise false.

**size()** (Number) Returns the number of active elements in the Buffer.

