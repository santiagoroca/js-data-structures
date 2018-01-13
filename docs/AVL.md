## JStandard.tree.AVL

AVL Tree implementation on top of JStandard.BinarySearchTree. It only differs from the BinarySearch tree in the insert and remove methods which are extended to perform the tree self-balancing operations.

----------

### Constructor ###

**constructor()**

    const avl = new AVL();

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

- mode: AVL.INORDER (default), AVL.PREORDER, AVL.POSTORDER, AVL.LEVELORDER


----------

### Performance Samples  ###

- 1.000.000 Random 'insert' in range 1 - 100.000 (0.0017402028170000001ms)
- 1.000.000 Random 'find' in range 1 - 100.000 (0.000855810903ms)
- 1.000.000 Random 'contains' in range 1 - 100.000 (0.000869182852ms)
- 1.000.000 Random 'contains' in range 1 - 100.000 (0.000932622613ms)
- 1.000.000 'min' executions (0.000124294413ms)
- 1.000.000 'max' executions (0.000119263085ms)
- 1.000.000 'size' executions (0.000068458712ms)
- 1.000.000 'empty' executions (0.00006713704300000001ms)
- 2 'INORDER Iterations' executions (961.769453ms)
- 2 'PREORDER Iterations' executions (738.963003ms)
- 2 'POSTORDER Iterations' executions (844.0840935ms)
- 2 'LEVELORDER Iterations' executions (9.555036ms)

----------

### Iteration Example ###

```
const avl = new AVL();

//Set iteration mode to desired mode
avl.setIterationMode(AVL.INORDER);

//Insert random values
avl.insert(1);
avl.insert(4);
avl.insert(3);
avl.insert(6);
avl.insert(7);
avl.insert(2);
avl.insert(3);
avl.insert(9);
avl.insert(19);
avl.insert(20);
avl.insert(3);
avl.insert(15);

//Iterate natively
for (let node of avl) {
	console.log(node.value);
}

// 1 2 3 3 3 4 6 7 9 15 19 20
```