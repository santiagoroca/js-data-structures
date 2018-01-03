const BinarySearchTree = require('../index').tree.BinarySearchTree;

let TEST_LENGTH = 1000000,
	RANDOM_DATA = new Array(1000000),
	binarySearchTree = null, 
	hrstart = 0,
	totalTime = 0;

for (let i = 0; i < TEST_LENGTH; i++) {
	RANDOM_DATA[i] = (Math.random() + 1) * 100000;
}

console.log('\nBinary Search Tree');

binarySearchTree = new BinarySearchTree();
totalTime = 0;
for (let i = 0; i < TEST_LENGTH; i++) {
	hrstart = process.hrtime();
	binarySearchTree.insert(RANDOM_DATA[i]);
	totalTime += process.hrtime(hrstart)[1];
}
console.info("\t - 1.000.000 Random 'insert' in range 1 - 100.000 (%ds - %dms) ", totalTime / TEST_LENGTH, totalTime / TEST_LENGTH / 1000000);

totalTime = 0;
for (let i = 0; i < TEST_LENGTH; i++) {
	hrstart = process.hrtime();
	binarySearchTree.find(RANDOM_DATA[i]);
	totalTime += process.hrtime(hrstart)[1];
}
console.info("\t - 1.000.000 Random 'find' in range 1 - 100.000 (%ds - %dms) ", totalTime / TEST_LENGTH, totalTime / TEST_LENGTH / 1000000);

totalTime = 0;
for (let i = 0; i < TEST_LENGTH; i++) {
	hrstart = process.hrtime();
	binarySearchTree.contains(RANDOM_DATA[i]);
	totalTime += process.hrtime(hrstart)[1];
}
console.info("\t - 1.000.000 Random 'contains' in range 1 - 100.000 (%ds - %dms) ", totalTime / TEST_LENGTH, totalTime / TEST_LENGTH / 1000000);

totalTime = 0;
for (let i = 0; i < TEST_LENGTH; i++) {
	hrstart = process.hrtime();
	binarySearchTree.contains(RANDOM_DATA[i]);
	totalTime += process.hrtime(hrstart)[1];
}
console.info("\t - 1.000.000 Random 'contains' in range 1 - 100.000 (%ds - %dms) ", totalTime / TEST_LENGTH, totalTime / TEST_LENGTH / 1000000);

totalTime = 0;
for (let i = 0; i < TEST_LENGTH; i++) {
	hrstart = process.hrtime();
	binarySearchTree.min();
	totalTime += process.hrtime(hrstart)[1];
}
console.info("\t - 1.000.000 'min' executions (%ds - %dms) ", totalTime / TEST_LENGTH, totalTime / TEST_LENGTH / 1000000);

totalTime = 0;
for (let i = 0; i < TEST_LENGTH; i++) {
	hrstart = process.hrtime();
	binarySearchTree.max();
	totalTime += process.hrtime(hrstart)[1];
}
console.info("\t - 1.000.000 'max' executions (%ds - %dms) ", totalTime / TEST_LENGTH, totalTime / TEST_LENGTH / 1000000);

totalTime = 0;
for (let i = 0; i < TEST_LENGTH; i++) {
	hrstart = process.hrtime();
	binarySearchTree.size();
	totalTime += process.hrtime(hrstart)[1];
}
console.info("\t - 1.000.000 'size' executions (%ds - %dms) ", totalTime / TEST_LENGTH, totalTime / TEST_LENGTH / 1000000);

totalTime = 0;
for (let i = 0; i < TEST_LENGTH; i++) {
	hrstart = process.hrtime();
	binarySearchTree.empty();
	totalTime += process.hrtime(hrstart)[1];
}
console.info("\t - 1.000.000 'empty' executions (%ds - %dms) ", totalTime / TEST_LENGTH, totalTime / TEST_LENGTH / 1000000);

totalTime = 0;
for (let i = 0; i < 2; i++) {
	hrstart = process.hrtime();
	for (let node of binarySearchTree) {}
	totalTime += process.hrtime(hrstart)[1];
}
console.info("\t - 2 'INORDER Iterations' executions (%ds - %dms) ", totalTime / 2, totalTime / 2 / 1000000)

totalTime = 0;
binarySearchTree.setIterationMode(BinarySearchTree.PREORDER);
for (let i = 0; i < 2; i++) {
	hrstart = process.hrtime();
	for (let node of binarySearchTree) {}
	totalTime += process.hrtime(hrstart)[1];
}
console.info("\t - 2 'PREORDER Iterations' executions (%ds - %dms) ", totalTime / 2, totalTime / 2 / 1000000)

totalTime = 0;
binarySearchTree.setIterationMode(BinarySearchTree.POSTORDER);
for (let i = 0; i < 2; i++) {
	hrstart = process.hrtime();
	for (let node of binarySearchTree) {}
	totalTime += process.hrtime(hrstart)[1];
}
console.info("\t - 2 'POSTORDER Iterations' executions (%ds - %dms) ", totalTime / 2, totalTime / 2 / 1000000)

totalTime = 0;
binarySearchTree.setIterationMode(BinarySearchTree.LEVELORDER);
for (let i = 0; i < 2; i++) {
	hrstart = process.hrtime();
	for (let node of binarySearchTree) {}
	totalTime += process.hrtime(hrstart)[1];
}
console.info("\t - 2 'LEVELORDER Iterations' executions (%ds - %dms) ", totalTime / 2, totalTime / 2 / 1000000)