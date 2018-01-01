## JStandard.OrderedSet

Ordered Set contains the most commons set functions implemented on top of a AVL which doesn't allow duplicated keys. Ordered Set can be ibeterated only in Inorder to achieve its Ordered State.

Ordered Set is under a lot of improvement process that will be released soon in the future. The usage interface wont change so you wont be affected in your projects in future releases. 

----------

### Constructor ###

Default constructor will create an empty Ordered Set. Optionally, you can also provide an array containing the initial
entries on the set. 

**constructor(set)** 

    const orderedSet = new OrderedSet();

    const orderedSet = new OrderedSet([1, 4, 6, 2, 3, 4, 5]);s

----------

### Methods ###

**insert(element)** (void) Adds a new Node with the specified value to the set if it's not already present.

- element: Native types

**union(set)** (OrderedSet) [throws NoAllowedArgumentError] Returns the union of the current set with the provided. A ∪ B = { x | x &‌#8712; A ^ x &‌#8712; B }

- set: OrderedSet

**intersection(set)** (OrderedSet) [throws NoAllowedArgumentError] Returns the intersection of the current set with the provided. A ∩ B = { x | x &‌#8712; A ^ x &‌#8712; B }

- set: OrderedSet

**difference(set)** (OrderedSet) [throws NoAllowedArgumentError] Returns the difference of the current set with the provided. A - B = { x | x &‌#8712; A ^ x &‌#8713; B } 

- set: OrderedSet

**subset(set)** (Bollean) [throws NoAllowedArgumentError] Returns true if the provided set is subset of the current set, false otherwise. We understand that B is subset of A if all the keys present on B are present in A. Not necesarily backwards.

- set: OrderedSet

**equals(set)** (Boolean) [throws NoAllowedArgumentError] Returns true if the two sets contain the exact same keys, false otherwise.

- set: OrderedSet

----------

### Inerited from BinarySearchTree Methods ###

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
const orderedSet = new OrderedSet();

//Insert random values
orderedSet.insert(1); 
orderedSet.insert(4); 
orderedSet.insert(3); 
orderedSet.insert(6); 
orderedSet.insert(7);
orderedSet.insert(2); 
orderedSet.insert(3); 
orderedSet.insert(9); 
orderedSet.insert(19); 
orderedSet.insert(20); 
orderedSet.insert(3); 
orderedSet.insert(15);

//Iterate natively
for (let node of orderedSet) {
	console.log(node.value);
}

// 1 2 3 3 3 4 6 7 9 15 19 20
```