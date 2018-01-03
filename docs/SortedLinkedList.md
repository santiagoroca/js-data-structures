## JStandard.SortedLinkedList

Sorted Linked List is built on top of a Binary Search Tree to allow common operations in a faster manner.

This type of list is aimed to anyone that needs to store sorted values, and acces them linearly or at a particular index.

----------

### Constructor ###

**constructor()** 

    const sortedLinkedList = new SortedLinkedList();

----------

### Methods from Binary Search Tree ###

**pop()** (void) Removes the first element in the list (Smallest).

**peek()** (Node) Returns the first element in the list (Smallest).

**getAt(index)** (Node) Returns the index at position provided or null if it exceeds the list size.

- index: Number (0 based Array)

----------

### Methods from Binary Search Tree ###

**insert(element)** (void) Adds a new Node with the specified value to the tree.

- element: Native types

**remove(element)** (void) Removes a Node with the specified value from the tree.

- element: Native types

**contains(element)** (Boolean) Returns true if the value is found in the tree or false otherwise.

- element: Native types

**find(element)** (Node) Returns the Node with the specified value or Null if not found;

- element: Native types

**min()** (Node) Returns the Node with the minimum value or Null for an empty tree;

**max()** (Node) Returns the Node with the maximum value or Null for an empty tree;

**size()** (Number) Returns the number of active elements in the tree.

**empty()** (Boolean) Returns true if tree is empty otherwise false.

**clear()** (void) Clears the whole tree.

----------

### Iteration Example ###

```
const sortedLinkedList = new SortedLinkedList();

//Set iteration mode to desired mode
sortedLinkedList.setIterationMode(sortedLinkedList.INORDER);

//Insert random values
sortedLinkedList.insert(1); 
sortedLinkedList.insert(4); 
sortedLinkedList.insert(3); 
sortedLinkedList.insert(6); 
sortedLinkedList.insert(7);
sortedLinkedList.insert(2); 
sortedLinkedList.insert(3); 
sortedLinkedList.insert(9); 
sortedLinkedList.insert(19); 
sortedLinkedList.insert(20); 
sortedLinkedList.insert(3); 
sortedLinkedList.insert(15);

for (let node of sortedLinkedList) {
	console.log(node.value);
}

// 1 2 3 3 3 4 6 7 9 15 19 20
```