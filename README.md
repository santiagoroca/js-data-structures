## JStandard [![Build Status](https://travis-ci.org/santiiiii/js-data-structures.svg?branch=master)](https://travis-ci.org/santiiiii/js-data-structures) [![Maintainability](https://api.codeclimate.com/v1/badges/60fe99c09bec5d44c070/maintainability)](https://codeclimate.com/github/santiiiii/js-data-structures/maintainability) [![codecov](https://codecov.io/gh/santiiiii/js-data-structures/branch/master/graph/badge.svg)](https://codecov.io/gh/santiiiii/js-data-structures) [![Inline docs](http://inch-ci.org/github/santiiiii/js-data-structures.svg?branch=master)](http://inch-ci.org/github/santiiiii/js-data-structures) [![HitCount](http://hits.dwyl.com/santiiiii/js-data-structures.svg)](http://hits.dwyl.com/santiiiii/js-data-structures)


JStandard offers standard data structures for javascript, paying attention to performance and developer-friendly usage. 

Javascript developer pays little to none attention to the correct usage of Data Structures since most of them are not (well) coded, are not performant or easy to use. This library aims to cover the most common Data Structures covered by a sweet suit of unit tests!

### Structures Available ###

 - [Circular Buffer](https://github.com/santiiiii/js-data-structures/tree/master/docs/CircularBuffer.md)
 - [Priority Queue](https://github.com/santiiiii/js-data-structures/tree/master/docs/PriorityQueue.md)
 - [Linked List](https://github.com/santiiiii/js-data-structures/tree/master/docs/LinkedList.md)
 - [Sorted Linked List](https://github.com/santiiiii/js-data-structures/tree/master/docs/SortedLinkedList.md)
 - [Stack](https://github.com/santiiiii/js-data-structures/tree/master/docs/Stack.md)
 - [Binary Search Tree](https://github.com/santiiiii/js-data-structures/tree/master/docs/BinarySearchTree.md)
 - [AVL](https://github.com/santiiiii/js-data-structures/tree/master/docs/AVL.md)
 - [Ordered Set](https://github.com/santiiiii/js-data-structures/tree/master/docs/OrderedSet.md)
 - [Unordered Set](https://github.com/santiiiii/js-data-structures/tree/master/docs/UnorderedSet.md)

### Usage Example ###
 
```

import { tree } from 'jstandard';

//Create a new Binary Search Tree
const binarySearchTree = new tree.BinarySearchTree();

//Set iteration mode to desired mode
binarySearchTree.setIterationMode(tree.BinarySearchTree.INORDER);

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

// OUPUT 1 2 3 3 3 4 6 7 9 15 19 20

```

### Usage Example ###

```
<script src="node_modules/jstandard/build/jstandard.js"></script>
<script>
    //Create a new Binary Search Tree
    const binarySearchTree = new JStandard.tree.BinarySearchTree();

    //Set iteration mode to desired mode
    binarySearchTree.setIterationMode(JStandard.tree.BinarySearchTree.INORDER);

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

    // OUPUT 1 2 3 3 3 4 6 7 9 15 19 20
</script>
```