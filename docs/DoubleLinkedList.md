## JStandard.list.DoubleLinkedList

Double linked list implementation suitable for double ended queues.

----------

### Constructor ###

**constructor()** 

    const DoubleLinkedList = new DoubleLinkedList();

----------

### Methods ###

**insert(element)** (void) Adds a new value to the begining of the list.

- element: Any type of element

**push(element)** (void) Adds a new value to the end of the list.

- element: Any type of element

**remove()** (void) Removes the element in the front of the list.

**pop()** (void) Pops the element in the end of the list.

**insertAt(index, Element)** (void) Adds an element in the provided position or the end of the list if it overflows its size.

- index: Number

- element: Any type of element

**removeAt(index)** (void) Remove an element in the provided position if it not exceeds the size.

- index: Number

**peek()** (Node) Returns the element at the front of the List or null if empty.

**peekLast()** (Node) Returns the element at the end of the List or null if empty.

**empty()** (boolean) Returns true if List is empty otherwise false.

**size()** (number) Returns the number of active elements in the List.

**setAt(index, element)** (void) Set the value of an element in the provided position if not exceeds the size of the list.

- index: Number

- element: Any type of element

**getAt(index)** (Node) Returns the Node in the position or null if it exceeds the list size.

- index: Number

**contains(element)** (boolean) Returns true if the element is present otherwise false.

- element: Any type of element

**find(element)** (Node) Returns the if it is present in the list otherwise null.

**clear()** (void) Clears the list

**setIterationMode(mode)** (void) Set the iterator mode for native iterations.

- mode: DoubleLinkedList.FORWARD (default), DoubleLinkedList.BACKWARD

### Iteration Example ###

```
const doubleLinkedList = new DoubleLinkedList();

//Insert random values
doubleLinkedList.insert(1); 
doubleLinkedList.insert(4); 
doubleLinkedList.insert(3); 
doubleLinkedList.insert(6); 
doubleLinkedList.insert(7);
doubleLinkedList.insert(2); 
doubleLinkedList.insert(3); 
doubleLinkedList.insert(9); 
doubleLinkedList.insert(19); 
doubleLinkedList.insert(20); 
doubleLinkedList.insert(3); 
doubleLinkedList.insert(15);

//Iterate natively
for (let node of doubleLinkedList) {
	console.log(node.value);
}

// 1 4, 3, 6, 7, 2, 3, 9, 19, 20, 3, 15
```