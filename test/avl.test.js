const AVL = require('../index').tree.AVL;

const STATIC_VALUES_ARRAY = [
	1, 4, 3, 6, 7, 2, 3, 9, 19, 20, 3, 15
];

const PRE_ORDER = [
	3, 1, 2, 9, 6, 4, 7, 19, 15, 20
];

const POST_ORDER = [
	2, 1, 4, 7, 6, 15, 20, 19, 9, 3
];

const LEVEL_ORDER = [
	3, 1, 9, 2, 6, 19, 4, 7, 15, 20
];

const RAND_VALUES_ARRAY = new Array(1000);

for (let i = 0; i < 1000; i++) {
	RAND_VALUES_ARRAY[i] = i;
}

test('Should create an empty AVL', () => {
	let avl = new AVL();
	expect(avl.size()).toEqual(0);
	expect(avl.empty()).toEqual(true);
});

test('Should insert 1000 Nodes.', () => {
	let avl = new AVL();

	for (let i = 0; i < 1000; i++) {
		avl.insert(RAND_VALUES_ARRAY[i]);
	}

	expect(avl.size()).toEqual(1000);
	expect(avl.empty()).toEqual(false);
});

test('Should insert 1000 Nodes and contain a specific inserted node.', () => {
	let avl = new AVL();

	for (let i = 0; i < 1000; i++) {
		avl.insert(RAND_VALUES_ARRAY[i]);
	}

	expect(avl.contains(RAND_VALUES_ARRAY[500])).toEqual(true);
});

test('Should insert 1000 Nodes and do not contain a specific value.', () => {
	let avl = new AVL();

	for (let i = 0; i < 1000; i++) {
		avl.insert(RAND_VALUES_ARRAY[i]);
	}

	expect(avl.contains(1000000)).toEqual(false);
});

test('Should insert 1000 Nodes and find a specific inserted node.', () => {
	let avl = new AVL();

	for (let i = 0; i < 1000; i++) {
		avl.insert(RAND_VALUES_ARRAY[i]);
	}

	expect(avl.find(RAND_VALUES_ARRAY[500]).value).toEqual(RAND_VALUES_ARRAY[500]);
});

test('Should insert 1000 Nodes and do not find a specific value.', () => {
	let avl = new AVL();

	for (let i = 0; i < 1000; i++) {
		avl.insert(RAND_VALUES_ARRAY[i]);
	}

	expect(avl.find(1000000)).toEqual(null);
});

test('Should insert 1000 Nodes and find the minimum value.', () => {
	let avl = new AVL();

	for (let i = 0; i < 1000; i++) {
		avl.insert(RAND_VALUES_ARRAY[i]);
	}

	expect(avl.min().value).toEqual(0);
});

test('Should insert 1000 Nodes and find the maximum value.', () => {
	let avl = new AVL();

	for (let i = 0; i < 1000; i++) {
		avl.insert(RAND_VALUES_ARRAY[i]);
	}

	expect(avl.max().value).toEqual(999);
});

test('Should insert 1000 Nodes and find the minimum value should return null.', () => {
	let avl = new AVL();
	expect(avl.min()).toEqual(null);
});

test('Should insert 1000 Nodes and do not find the maximum value should return null.', () => {
	let avl = new AVL();
	expect(avl.max()).toEqual(null);
});

test('Should insert 1000 Nodes and remove a specific value.', () => {
	let avl = new AVL();

	for (let i = 0; i < 1000; i++) {
		avl.insert(RAND_VALUES_ARRAY[i]);
	}

	expect(avl.contains(999)).toEqual(true);
	avl.remove(999);
	expect(avl.contains(999)).toEqual(false);
});

test('Should insert 12 Nodes and iterate in-order.', () => {
	let avl = new AVL();

	for (let i = 0; i < STATIC_VALUES_ARRAY.length; i++) {
		avl.insert(STATIC_VALUES_ARRAY[i]);
	}

	let prev = -1;
	let iterations = 0;
	for (let node of avl) {
		iterations++;
		expect(prev).toBeLessThanOrEqual(node.value);
		prev = node.value;
	}

	expect(iterations).toEqual(10);
});

test('Should insert 12 Nodes and iterate pre-order.', () => {
	let avl = new AVL();

	for (let i = 0; i < STATIC_VALUES_ARRAY.length; i++) {
		avl.insert(STATIC_VALUES_ARRAY[i]);
	}

	avl.setIterationMode(AVL.PREORDER);

	let i = 0;
	let iterations = 0;
	for (let node of avl) {
		iterations++;
		expect(node.value).toEqual(PRE_ORDER[i++]);
	}

	expect(iterations).toEqual(10);
});

test('Should insert 12 Nodes and iterate post-order.', () => {
	let avl = new AVL();

	for (let i = 0; i < STATIC_VALUES_ARRAY.length; i++) {
		avl.insert(STATIC_VALUES_ARRAY[i]);
	}

	avl.setIterationMode(AVL.POSTORDER);

	let i = 0;
	let iterations = 0;
	for (let node of avl) {
		iterations++;
		expect(node.value).toEqual(POST_ORDER[i++]);
	}

	expect(iterations).toEqual(10);
});

test('Should insert 12 Nodes and iterate level-order.', () => {
	let avl = new AVL();

	for (let i = 0; i < STATIC_VALUES_ARRAY.length; i++) {
		avl.insert(STATIC_VALUES_ARRAY[i]);
	}

	avl.setIterationMode(AVL.LEVELORDER);

	let i = 0;
	let iterations = 0;
	for (let node of avl) {
		iterations++;
		expect(node.value).toEqual(LEVEL_ORDER[i++]);
	}

	expect(iterations).toEqual(10);
});

test('Should insert 12 Nodes and iterate level-order on empty list.', () => {
	let avl = new AVL();

	avl.setIterationMode(AVL.LEVELORDER);

	let iterations = 0;
	for (let node of avl) {
		iterations++;
	}

	expect(iterations).toEqual(0);
});

test('Should clear the whole tree.', () => {
	let avl = new AVL();

	for (let i = 0; i < 1000; i++) {
		avl.insert(RAND_VALUES_ARRAY[i]);
	}

	expect(avl.size()).toEqual(1000);
	avl.clear();
	expect(avl.size()).toEqual(0);
});

test('Should remove with left node empty.', () => {
	let avl = new AVL();

	avl.insert(1);
	avl.insert(2);
	expect(avl.size()).toEqual(2);
	expect(avl.contains(1)).toEqual(true);
	avl.remove(1);
	expect(avl.contains(1)).toEqual(false);
	expect(avl.size()).toEqual(1);
});

test('Should remove with right node empty.', () => {
	let avl = new AVL();

	avl.insert(1);
	avl.insert(0);
	expect(avl.size()).toEqual(2);
	expect(avl.contains(1)).toEqual(true);
	avl.remove(1);
	expect(avl.contains(1)).toEqual(false);
	expect(avl.size()).toEqual(1);
});

test('Should remove with both nodes set.', () => {
	let avl = new AVL();

	avl.insert(1);
	avl.insert(2);
	avl.insert(0);
	expect(avl.size()).toEqual(3);
	expect(avl.contains(1)).toEqual(true);
	avl.remove(1);
	expect(avl.contains(1)).toEqual(false);
	expect(avl.size()).toEqual(2);
});

test('Should remove with empty tree.', () => {
	let avl = new AVL();

	expect(avl.size()).toEqual(0);
	expect(avl.contains(1)).toEqual(false);
	avl.remove(1);
	expect(avl.contains(1)).toEqual(false);
	expect(avl.size()).toEqual(0);
});

test('Should remove on left subtree.', () => {
	let avl = new AVL();

	avl.insert(2);
	avl.insert(1);
	avl.insert(0);
	expect(avl.size()).toEqual(3);
	expect(avl.contains(1)).toEqual(true);
	avl.remove(1);
	expect(avl.contains(1)).toEqual(false);
	expect(avl.size()).toEqual(2);
});

test('Should remove on right subtree.', () => {
	let avl = new AVL();

	avl.insert(0);
	avl.insert(1);
	avl.insert(2);
	expect(avl.size()).toEqual(3);
	expect(avl.contains(1)).toEqual(true);
	avl.remove(1);
	expect(avl.contains(1)).toEqual(false);
	expect(avl.size()).toEqual(2);
});

test('Should insert LEFT LEFT.', () => {
    let avl = new AVL();
    avl.insert(3);
    avl.insert(2);
    avl.insert(1);
    expect(avl.size()).toEqual(3);
});

test('Should remove node LEFT LEFT.', () => {
	let avl = new AVL();

	avl.insert(2);
    avl.insert(3);
	avl.insert(1);
	avl.insert(0);
	expect(avl.size()).toEqual(4);
	expect(avl.contains(3)).toEqual(true);
	avl.remove(3);
	expect(avl.contains(3)).toEqual(false);
	expect(avl.size()).toEqual(3);
});

test('Should insert RIGHT RIGHT.', () => {
    let avl = new AVL();
    avl.insert(1);
    avl.insert(2);
    avl.insert(3);
    expect(avl.size()).toEqual(3);
});

test('Should remove node RIGHT RIGHT.', () => {
	let avl = new AVL();

	avl.insert(2);
	avl.insert(3);
	avl.insert(1);
	avl.insert(4);

	expect(avl.size()).toEqual(4);
	expect(avl.contains(1)).toEqual(true);
	avl.remove(1);
	expect(avl.contains(1)).toEqual(false);
	expect(avl.size()).toEqual(3);
});

test('Should insert LEFT RIGHT.', () => {
    let avl = new AVL();
    avl.insert(3);
    avl.insert(1);
    avl.insert(2);
    expect(avl.size()).toEqual(3);
});

test('Should remove node LEFT RIGHT.', () => {
	let avl = new AVL();

	avl.insert(2);
	avl.insert(0);
	avl.insert(3);
	avl.insert(1);
	expect(avl.size()).toEqual(4);
	expect(avl.contains(3)).toEqual(true);
	avl.remove(3);
	expect(avl.contains(3)).toEqual(false);
	expect(avl.size()).toEqual(3);
});

test('Should insert RIGHT LEFT.', () => {
    let avl = new AVL();
    avl.insert(3);
    avl.insert(4);
    avl.insert(2);
    expect(avl.size()).toEqual(3);
});

test('Should remove node RIGHT LEFT.', () => {
	let avl = new AVL();

    avl.insert(1);
    avl.insert(0);
    avl.insert(3);
    avl.insert(2);
	expect(avl.size()).toEqual(4);
	expect(avl.contains(0)).toEqual(true);
	avl.remove(0);
	expect(avl.contains(0)).toEqual(false);
	expect(avl.size()).toEqual(3);
});

test('Should remove with both nodes set and use the min right value as new node.', () => {
    let avl = new AVL();

    avl.insert(1);
    avl.insert(0);
    avl.insert(3);
    avl.insert(2);
    expect(avl.size()).toEqual(4);
    expect(avl.contains(1)).toEqual(true);
    avl.remove(1);
    expect(avl.contains(1)).toEqual(false);
    expect(avl.size()).toEqual(3);
});

test('Should insert repeated set and have the correct size.', () => {
    let avl = new AVL();

    avl.insert(1);
    avl.insert(0);
    avl.insert(1);
    avl.insert(0);
    avl.insert(2);
    avl.insert(3);

    expect(avl.size()).toEqual(4);
});
