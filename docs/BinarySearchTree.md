## JStandard.BinarySearchTree

Basic Binary Search tree implementation supporting insert, remove, min, max, and preorder, inorder, postorder and levelorder traversal.

----------

### Constructor ###

**constructor()** 

    const binarySearchTree = new BinarySearchTree();

----------

### Methods ###

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

**setIterationMode(mode)** (void) Set the iterator mode for native iterations.

- mode: BinarySearchTree.INORDER (default), BinarySearchTree.PREORDER, BinarySearchTree.POSTORDER, BinarySearchTree.LEVELORDER


----------

### Performance Samples  ###

- 1.000.000 Random 'insert' in range 1 - 100.000 (0.001287228727ms)
- 1.000.000 Random 'find' in range 1 - 100.000 (0.001023060836ms)
- 1.000.000 Random 'contains' in range 1 - 100.000 (9540.0009541897559999999ms)
- 1.000.000 Random 'contains' in range 1 - 100.000 (961.918222s - 0.0009619182220000001ms)
- 1.000.000 'min' executions (0.000083427698ms)
- 1.000.000 'max' executions (0.000109678907ms)
- 1.000.000 'size' executions (0.000062962207ms)
- 1.000.000 'empty' executions (0.000063408442ms)
- 2 'INORDER Iterations' executions (728.125852ms)
- 2 'PREORDER Iterations' executions (849.898217ms)
- 2 'POSTORDER Iterations' executions (178.3478065ms)
- 2 'LEVELORDER Iterations' executions (37.836498ms)

----------

### Iteration Example ###

```
const binarySearchTree = new BinarySearchTree();

//Set iteration mode to desired mode
binarySearchTree.setIterationMode(binarySearchTree.INORDER);

//Insert random values
binarySearchTree.insert(1); 
binarySearchTree.insert(4); 
binarySearchTree.insert(3); 
binarySearchTree.insert(6); 
binarySearchTree.insert(7);
binarySearchTree.insert(2); 
binarySearchTree.insert(3); 
binarySearchTree.insert(9); 
binarySearchTree.insert(19); 
binarySearchTree.insert(20); 
binarySearchTree.insert(3); 
binarySearchTree.insert(15);

//Iterate natively
for (let node of binarySearchTree) {
	console.log(node.value);
}

// 1 2 3 3 3 4 6 7 9 15 19 20
```