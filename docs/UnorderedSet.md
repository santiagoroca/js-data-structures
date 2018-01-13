## JStandard.set.UnorderedSet

Unordered Set is implemented on top of a Native Set Object. It adds operations for finding the difference between two sets, the intersection, union, subset and equality.

Unordered Set should be used in scenarios when cardinality in order is not needed nor getting the minimum or maximum element but fast access to keys and set creation/operations.

----------

### Constructor ###

Default constructor will create an empty Unordered Set. Optionally, you can also provide an array containing the initial
entries on the set.

**constructor(set)**

    const orderedSet = new UnorderedSet();

    const orderedSet = new UnorderedSet([1, 4, 6, 2, 3, 4, 5]);s

----------

### Methods ###

**insert(element)** (void) Adds a new Node with the specified value to the set if it's not already present.

- element: Native types

**union(set)** (UnorderedSet) [throws NoAllowedArgumentError] Returns the union of the current set with the provided. A ∪ B = { x | x &‌#8712; A ^ x &‌#8712; B }

- set: UnorderedSet

**intersection(set)** (UnorderedSet) [throws NoAllowedArgumentError] Returns the intersection of the current set with the provided. A ∩ B = { x | x &‌#8712; A ^ x &‌#8712; B }

- set: UnorderedSet

**difference(set)** (UnorderedSet) [throws NoAllowedArgumentError] Returns the difference of the current set with the provided. A - B = { x | x &‌#8712; A ^ x &‌#8713; B }

- set: UnorderedSet

**subset(set)** (Bollean) [throws NoAllowedArgumentError] Returns true if the provided set is subset of the current set, false otherwise. We understand that B is subset of A if all the keys present on B are present in A. Not necesarily backwards.

- set: UnorderedSet

**equals(set)** (Boolean) [throws NoAllowedArgumentError] Returns true if the two sets contain the exact same keys, false otherwise.

- set: UnorderedSet

**remove(element)** (void) Removes a Node with the specified value from the tree.

- element: Native types

**contains(element)** (Boolean) Returns true if the value is found in the tree or false otherwise.

- element: Native types

**size()** (Number) Returns the number of active elements in the tree.

**empty()** (Boolean) Returns true if tree is empty otherwise false.

**clear()** (void) Clears the whole tree.

----------