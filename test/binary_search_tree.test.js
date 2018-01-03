const BinarySearchTree = require('../index').tree.BinarySearchTree;

const STATIC_VALUES_ARRAY = [
	1, 4, 3, 6, 7, 2, 3, 9, 19, 20, 3, 15
];

const PRE_ORDER = [
	1, 4, 3, 2, 3, 3, 6, 7, 9, 19, 15, 20
];

const POST_ORDER = [
	2, 3, 3, 3, 15, 20, 19, 9, 7, 6, 4, 1
];

const LEVEL_ORDER = [
	1, 4, 3, 6, 2, 3, 7, 3, 9, 19, 15, 20
];

const RAND_VALUES_ARRAY = new Array(100000);

let min = 0;
for (let i = 0; i < 99998; i++) {
	RAND_VALUES_ARRAY[i] = parseInt((Math.random() + 1) * 10000);
}
RAND_VALUES_ARRAY[99998] = 0;
RAND_VALUES_ARRAY[99999] = 1000001;

test('Should create an empty Binary Search Tree', () => {
	let bst = new BinarySearchTree();
	expect(bst.size()).toEqual(0);
	expect(bst.empty()).toEqual(true);
});

test('Should insert 100000 Nodes.', () => {
	let bst = new BinarySearchTree();

	for (let i = 0; i < 100000; i++) {
		bst.insert(RAND_VALUES_ARRAY[i]);
	}

	expect(bst.size()).toEqual(100000);
	expect(bst.empty()).toEqual(false);
});

test('Should insert 100000 Nodes and contain a specific inserted node.', () => {
	let bst = new BinarySearchTree();

	for (let i = 0; i < 100000; i++) {
		bst.insert(RAND_VALUES_ARRAY[i]);
	}

	expect(bst.contains(RAND_VALUES_ARRAY[23890])).toEqual(true);
});

test('Should insert 100000 Nodes and do not contain a specific value.', () => {
	let bst = new BinarySearchTree();

	for (let i = 0; i < 100000; i++) {
		bst.insert(RAND_VALUES_ARRAY[i]);
	}

	expect(bst.contains(1000000)).toEqual(false);
});

test('Should insert 100000 Nodes and find a specific inserted node.', () => {
	let bst = new BinarySearchTree();

	for (let i = 0; i < 100000; i++) {
		bst.insert(RAND_VALUES_ARRAY[i]);
	}

	expect(bst.find(RAND_VALUES_ARRAY[23890]).value).toEqual(RAND_VALUES_ARRAY[23890]);
});

test('Should insert 100000 Nodes and do not find a specific value.', () => {
	let bst = new BinarySearchTree();

	for (let i = 0; i < 100000; i++) {
		bst.insert(RAND_VALUES_ARRAY[i]);
	}

	expect(bst.find(1000000)).toEqual(null);
});

test('Should insert 100000 Nodes and find the minimum value.', () => {
	let bst = new BinarySearchTree();

	for (let i = 0; i < 100000; i++) {
		bst.insert(RAND_VALUES_ARRAY[i]);
	}

	expect(bst.min().value).toEqual(0);
});

test('Should insert 100000 Nodes and find the maximum value.', () => {
	let bst = new BinarySearchTree();

	for (let i = 0; i < 100000; i++) {
		bst.insert(RAND_VALUES_ARRAY[i]);
	}

	expect(bst.max().value).toEqual(1000001);
});

test('Should insert 100000 Nodes and find the minimum value should return null.', () => {
	let bst = new BinarySearchTree();
	expect(bst.min()).toEqual(null);
});

test('Should insert 100000 Nodes and do not find the maximum value should return null.', () => {
	let bst = new BinarySearchTree();
	expect(bst.max()).toEqual(null);
});

test('Should insert 100000 Nodes and remove a specific value.', () => {
	let bst = new BinarySearchTree();

	for (let i = 0; i < 100000; i++) {
		bst.insert(RAND_VALUES_ARRAY[i]);
	}

	expect(bst.contains(1000001)).toEqual(true);
	bst.remove(1000001);
	expect(bst.contains(1000001)).toEqual(false);
});

test('Should insert 100000 Nodes and iterate in-order.', () => {
	let bst = new BinarySearchTree();

	for (let i = 0; i < 100000; i++) {
		bst.insert(RAND_VALUES_ARRAY[i]);
	}

	let prev = -1;
	let iterations = 0;
	for (let node of bst) {
		iterations++;
		expect(prev).toBeLessThanOrEqual(node.value);
		prev = node.value;
	}

	expect(iterations).toEqual(100000);
});

test('Should insert 12 Nodes and iterate pre-order.', () => {
	let bst = new BinarySearchTree();

	for (let i = 0; i < STATIC_VALUES_ARRAY.length; i++) {
		bst.insert(STATIC_VALUES_ARRAY[i]);
	}

	bst.setIterationMode(BinarySearchTree.PREORDER);

	let i = 0;
	let iterations = 0;
	for (let node of bst) {
		iterations++;
		expect(node.value).toEqual(PRE_ORDER[i++]);
	}

	expect(iterations).toEqual(12);
});

test('Should insert 12 Nodes and iterate post-order.', () => {
	let bst = new BinarySearchTree();

	for (let i = 0; i < STATIC_VALUES_ARRAY.length; i++) {
		bst.insert(STATIC_VALUES_ARRAY[i]);
	}

	bst.setIterationMode(BinarySearchTree.POSTORDER);

	let i = 0;
	let iterations = 0;
	for (let node of bst) {
		iterations++;
		expect(node.value).toEqual(POST_ORDER[i++]);
	}

	expect(iterations).toEqual(12);
});

test('Should insert 12 Nodes and iterate level-order.', () => {
	let bst = new BinarySearchTree();

	for (let i = 0; i < STATIC_VALUES_ARRAY.length; i++) {
		bst.insert(STATIC_VALUES_ARRAY[i]);
	}

	bst.setIterationMode(BinarySearchTree.LEVELORDER);

	let i = 0;
	let iterations = 0;
	for (let node of bst) {
		iterations++;
		expect(node.value).toEqual(LEVEL_ORDER[i++]);
	}

	expect(iterations).toEqual(12);
});

test('Should insert 12 Nodes and iterate level-order on empty list.', () => {
	let bst = new BinarySearchTree();

	bst.setIterationMode(BinarySearchTree.LEVELORDER);

	let iterations = 0;
	for (let node of bst) {
		iterations++;
	}

	expect(iterations).toEqual(0);
});

test('Should insert 12 Nodes and iterate level-order on empty list.', () => {
	let bst = new BinarySearchTree();

	bst.setIterationMode(BinarySearchTree.LEVELORDER);

	let iterations = 0;
	for (let node of bst) {
		iterations++;
	}

	expect(iterations).toEqual(0);
});

test('Should insert 12 Nodes and iterate inorder-order on empty list.', () => {
	let bst = new BinarySearchTree();

	let iterations = 0;
	for (let node of bst) {
		iterations++;
	}

	expect(iterations).toEqual(0);
});

test('Should insert 12 Nodes and iterate pre-order on empty list.', () => {
	let bst = new BinarySearchTree();
	bst.setIterationMode(BinarySearchTree.PREORDER);

	let iterations = 0;
	for (let node of bst) {
		iterations++;
	}

	expect(iterations).toEqual(0);
});

test('Should insert 12 Nodes and iterate pre-order on empty list.', () => {
	let bst = new BinarySearchTree();
	bst.setIterationMode(BinarySearchTree.POSTORDER);

	let iterations = 0;
	for (let node of bst) {
		iterations++;
	}

	expect(iterations).toEqual(0);
});

test('Should clear the whole tree.', () => {
	let bst = new BinarySearchTree();

	for (let i = 0; i < 100000; i++) {
		bst.insert(RAND_VALUES_ARRAY[i]);
	}

	expect(bst.size()).toEqual(100000);
	bst.clear();
	expect(bst.size()).toEqual(0);
});

test('Should remove with left node empty.', () => {
	let bst = new BinarySearchTree();

	bst.insert(1);
	bst.insert(2);
	expect(bst.size()).toEqual(2);
	expect(bst.contains(1)).toEqual(true);
	bst.remove(1);
	expect(bst.contains(1)).toEqual(false);
	expect(bst.size()).toEqual(1);
});

test('Should remove with right node empty.', () => {
	let bst = new BinarySearchTree();

	bst.insert(1);
	bst.insert(0);
	expect(bst.size()).toEqual(2);
	expect(bst.contains(1)).toEqual(true);
	bst.remove(1);
	expect(bst.contains(1)).toEqual(false);
	expect(bst.size()).toEqual(1);
});

test('Should remove with both nodes set.', () => {
	let bst = new BinarySearchTree();

	bst.insert(1);
	bst.insert(2);
	bst.insert(0);
	expect(bst.size()).toEqual(3);
	expect(bst.contains(1)).toEqual(true);
	bst.remove(1);
	expect(bst.contains(1)).toEqual(false);
	expect(bst.size()).toEqual(2);
});

test('Should remove with empty tree.', () => {
	let bst = new BinarySearchTree();

	expect(bst.size()).toEqual(0);
	expect(bst.contains(1)).toEqual(false);
	bst.remove(1);
	expect(bst.contains(1)).toEqual(false);
	expect(bst.size()).toEqual(0);
});

test('Should remove on left subtree.', () => {
	let bst = new BinarySearchTree();

	bst.insert(2);
	bst.insert(1);
	bst.insert(0);
	expect(bst.size()).toEqual(3);
	expect(bst.contains(1)).toEqual(true);
	bst.remove(1);
	expect(bst.contains(1)).toEqual(false);
	expect(bst.size()).toEqual(2);
});

test('Should remove on right subtree.', () => {
	let bst = new BinarySearchTree();

	bst.insert(0);
	bst.insert(1);
	bst.insert(2);
	expect(bst.size()).toEqual(3);
	expect(bst.contains(1)).toEqual(true);
	bst.remove(1);
	expect(bst.contains(1)).toEqual(false);
	expect(bst.size()).toEqual(2);
});