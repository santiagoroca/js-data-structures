## JStandard.list.LinkedList

Linked List Implementation for simple or complex operations.

----------

### Constructor ###

**constructor()** 

    const LinkedList = new LinkedList();

----------

### Methods ###

**push(element)** (void) Adds a new value to the end of the list.

- element: Any type of element

**pop()** (void) Pops the element in the front of the list.

**insertAt(index, Element)** (void) Adds an element in the provided position or the end of the list if it overflows its size.

- index: Number

- element: Any type of element

**removeAt(index)** (void) Remove an element in the provided position if it not exceeds the size.

- index: Number

**peek()** (Node) Returns the element at the front of the List or null if empty.

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