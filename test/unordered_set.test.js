const UnorderedSet = require('../index').set.UnorderedSet;
const NoAllowedArgumentError = require('../index').error.NoAllowedArgumentError;

const STATIC_VALUES_ARRAY = [
    1, 4, 3, 6, 7, 2, 3, 9, 19, 20, 3, 15
];

test('Should create an empty Ordered Set', () => {
    let orderedSet = new UnorderedSet();
    expect(orderedSet.size()).toEqual(0);
    expect(orderedSet.empty()).toEqual(true);
});

test('Should create an filled Ordered Set', () => {
    let orderedSet = new UnorderedSet([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(orderedSet.size()).toEqual(10);
    expect(orderedSet.empty()).toEqual(false);

    for (let i = 0; i < 10; i++) {
        expect(orderedSet.contains(i)).toEqual(true);
    }
});

test('Should create an empty Ordered Set', () => {
    let orderedSet = new UnorderedSet();
    expect(orderedSet.size()).toEqual(0);
    expect(orderedSet.empty()).toEqual(true);
});

test('Should join two completely different Ordered Sets into one.', () => {
    const A = new UnorderedSet([1, 2, 3]);
    const B = new UnorderedSet([4, 5, 6]);
    const join = A.union(B);

    for (let i = 1; i < 7; i++) {
        expect(join.contains(i)).toEqual(true);
    }

    expect(join.size()).toEqual(6);
    expect(join.empty()).toEqual(false);
});

test('Should join two Ordered Sets, with repeated items, into one.', () => {
    const A = new UnorderedSet([1, 2, 3, 7, 5, 6]);
    const B = new UnorderedSet([4, 5, 8, 1, 2, 9]);
    const join = A.union(B);

    for (let i = 1; i < 10; i++) {
        expect(join.contains(i)).toEqual(true);
    }

    expect(join.size()).toEqual(9);
    expect(join.empty()).toEqual(false);
});

test('Should join two equal Ordered Sets into one.', () => {
    const A = new UnorderedSet([1, 2, 3, 4, 5, 6]);
    const B = new UnorderedSet([4, 5, 6, 1, 2, 3]);
    const join = A.union(B);

    for (let i = 1; i < 7; i++) {
        expect(join.contains(i)).toEqual(true);
    }

    expect(join.size()).toEqual(6);
    expect(join.empty()).toEqual(false);
});

test('Should throw NoAllowedArgumentError with non UnorderedSet argument.', () => {
    const A = new UnorderedSet([1, 2, 3, 4, 5, 6]);
    expect(() => A.union([1, 3, 4, 6, 1])).toThrow(NoAllowedArgumentError);
});

test('Should get the intersection of two similar Ordered Sets into one.', () => {
    const A = new UnorderedSet([1, 2, 3, 7, 8, 9]);
    const B = new UnorderedSet([4, 5, 6, 7, 8, 9]);
    const join = A.intersection(B);

    for (let i = 7; i < 10; i++) {
        expect(join.contains(i)).toEqual(true);
    }

    expect(join.size()).toEqual(3);
    expect(join.empty()).toEqual(false);
});

test('Should get the intersection of two completely different Ordered Sets into one.', () => {
    const A = new UnorderedSet([1, 2, 3, 7, 8, 9]);
    const B = new UnorderedSet([4, 5, 6]);
    const join = A.intersection(B);

    expect(join.size()).toEqual(0);
    expect(join.empty()).toEqual(true);
});

test('Should get the intersection of two equal Ordered Sets into one.', () => {
    const A = new UnorderedSet([1, 2, 3, 4, 5, 6]);
    const B = new UnorderedSet([4, 5, 6, 2, 3, 1]);
    const join = A.intersection(B);

    for (let i = 1; i < 7; i++) {
        expect(join.contains(i)).toEqual(true);
    }

    expect(join.size()).toEqual(6);
    expect(join.empty()).toEqual(false);
});

test('Should throw NoAllowedArgumentError with non UnorderedSet argument.', () => {
    const A = new UnorderedSet([1, 2, 3, 4, 5, 6]);
    expect(() => A.intersection([1, 3, 4, 6, 1])).toThrow(NoAllowedArgumentError);
});

test('Should get the difference of two similar Ordered Sets into one.', () => {
    const A = new UnorderedSet([1, 2, 3, 7, 8, 9]);
    const B = new UnorderedSet([4, 5, 6, 7, 8, 9]);
    const join = A.difference(B);

    for (let i = 1; i < 4; i++) {
        expect(join.contains(i)).toEqual(true);
    }

    expect(join.size()).toEqual(3);
    expect(join.empty()).toEqual(false);
});

test('Should get the difference of two completely different Ordered Sets into one.', () => {
    const A = new UnorderedSet([1, 2, 3, 4, 5, 6]);
    const B = new UnorderedSet([7, 8, 9]);
    const join = A.difference(B);

    for (let i = 1; i < 7; i++) {
        expect(join.contains(i)).toEqual(true);
    }

    expect(join.size()).toEqual(6);
    expect(join.empty()).toEqual(false);
});

test('Should get the difference of two equal Ordered Sets into one.', () => {
    const A = new UnorderedSet([1, 2, 3, 4, 5, 6]);
    const B = new UnorderedSet([4, 5, 6, 2, 3, 1]);
    const join = A.difference(B);

    expect(join.size()).toEqual(0);
    expect(join.empty()).toEqual(true);
});

test('Should throw NoAllowedArgumentError with non UnorderedSet argument.', () => {
    const A = new UnorderedSet([1, 2, 3, 4, 5, 6]);
    expect(() => A.difference([1, 3, 4, 6, 1])).toThrow(NoAllowedArgumentError);
});

test('Should equal two identical sets.', () => {
    const A = new UnorderedSet([1, 2, 3, 4, 5, 6]);
    const B = new UnorderedSet([1, 2, 3, 4, 5, 6]);

    expect(A.equals(B)).toEqual(true);
});

test('Should not equal two slightly different sets. (Case A)', () => {
    const A = new UnorderedSet([1, 2, 3]);
    const B = new UnorderedSet([4, 5, 6, 2, 3, 1]);

    expect(A.equals(B)).toEqual(false);
});

test('Should not equal two completely different sets. (Case A)', () => {
    const A = new UnorderedSet([1, 2, 3]);
    const B = new UnorderedSet([4, 5, 6]);

    expect(A.equals(B)).toEqual(false);
});

test('Should not equal two slightly different sets. (Case B)', () => {
    const A = new UnorderedSet([4, 5, 6, 2, 3, 1]);
    const B = new UnorderedSet([1, 2, 3]);

    expect(A.equals(B)).toEqual(false);
});

test('Should not equal with a empty set.', () => {
    const A = new UnorderedSet([4, 5, 6, 2, 3, 1]);
    const B = new UnorderedSet();

    expect(A.equals(B)).toEqual(false);
});

test('Should not equal empty set.', () => {
    const A = new UnorderedSet();
    const B = new UnorderedSet([4, 5, 6, 2, 3, 1]);

    expect(A.equals(B)).toEqual(false);
});

test('Should throw NoAllowedArgumentError with non UnorderedSet argument.', () => {
    const A = new UnorderedSet([1, 2, 3, 4, 5, 6]);
    expect(() => A.equals([1, 3, 4, 6, 1])).toThrow(NoAllowedArgumentError);
});

test('Should B be subset of A.', () => {
    const A = new UnorderedSet([4, 5, 6, 2, 3, 1]);
    const B = new UnorderedSet([4, 5, 6]);

    expect(A.subset(B)).toEqual(true);
});

test('Should not B be subset of A.', () => {
    const A = new UnorderedSet([4, 5, 6]);
    const B = new UnorderedSet([4, 5, 6, 2, 3, 1]);

    expect(A.subset(B)).toEqual(false);
});

test('Should not B be subset of A.', () => {
    const A = new UnorderedSet([1, 2, 3]);
    const B = new UnorderedSet([4, 5, 6]);

    expect(A.subset(B)).toEqual(false);
});

test('Should throw NoAllowedArgumentError with non UnorderedSet argument.', () => {
    const A = new UnorderedSet([1, 2, 3, 4, 5, 6]);
    expect(() => A.subset([1, 3, 4, 6, 1])).toThrow(NoAllowedArgumentError);
});

test('Should not B equal A.', () => {
    const A = new UnorderedSet([4, 5, 6, 2, 3, 1]);
    const B = new UnorderedSet();

    expect(A.equals(B)).toEqual(false);
});

test('Should not B equal A.', () => {
    const A = new UnorderedSet();
    const B = new UnorderedSet([4, 5, 6, 2, 3, 1]);

    expect(A.equals(B)).toEqual(false);
});

test('Should throw NoAllowedArgumentError with non UnorderedSet argument.', () => {
    const A = new UnorderedSet([1, 2, 3, 4, 5, 6]);
    expect(() => A.equals([1, 3, 4, 6, 1])).toThrow(NoAllowedArgumentError);
});

test('Should create set with 10 elements and delete them all.', () => {
    const unorderedSet = new UnorderedSet([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    for (let i = 0; i < 10; i++) {
        unorderedSet.remove(i);
        expect(unorderedSet.contains(i)).toEqual(false);
        expect(unorderedSet.size()).toEqual(9-i);
    }
});

test('Should try to remove no present elements.', () => {
    const unorderedSet = new UnorderedSet([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    for (let i = 10; i < 20; i++) {
        unorderedSet.remove(i);
    }

    expect(unorderedSet.size()).toEqual(10);
});

test('Should clear Unordered Set.', () => {
    const unorderedSet = new UnorderedSet([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(unorderedSet.size()).toEqual(10);

    unorderedSet.clear();
    for (let i = 0; i < 10; i++) {
        expect(unorderedSet.contains(i)).toEqual(false);
    }
    expect(unorderedSet.size()).toEqual(0);
});