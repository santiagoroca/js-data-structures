const NoAllowedArgumentError = require('../error/NoAllowedArgumentError');

//Constants
const UNION_METHOD_ARGUMENT_ERROR = 'union method only allows UnorderedSet as argument.';
const INTERSECTION_METHOD_ARGUMENT_ERROR = 'intersection method only allows UnorderedSet as argument.';
const DIFERENCE_METHOD_ARGUMENT_ERROR = 'diference method only allows UnorderedSet as argument.';
const SUBSET_METHOD_ARGUMENT_ERROR = 'subset method only allows UnorderedSet as argument.';
const EQUALS_METHOD_ARGUMENT_ERROR = 'equals method only allows UnorderedSet as argument.';

class UnorderedSet {

    constructor(elements = []) {
        this.container = new Set(elements);
    }

    insert (element) {
        this.container.add(element);
    }

    contains (element) {
        return this.container.has(element);
    }

    size () {
        return this.container.size;
    }

    empty () {
        return this.container.size == 0;
    }

    remove (element) {
        return this.container.delete(element);
    }

    clear () {
        this.container.clear();
    }

    union (set) {
        if (!(set instanceof UnorderedSet)) {
            throw new NoAllowedArgumentError(UNION_METHOD_ARGUMENT_ERROR)
        }

        let union = new UnorderedSet();

        for (let node of this) {
            union.insert(node);
        }

        for (let node of set) {
            union.insert(node);
        }

        return union;
    }

    intersection (set) {
        if (!(set instanceof UnorderedSet)) {
            throw new NoAllowedArgumentError(INTERSECTION_METHOD_ARGUMENT_ERROR)
        }

        let intersection = new UnorderedSet();

        for (let node of set) {
            if (this.contains(node)) {
                intersection.insert(node);
            }
        }

        return intersection;
    }

    difference (set) {
        if (!(set instanceof UnorderedSet)) {
            throw new NoAllowedArgumentError(DIFERENCE_METHOD_ARGUMENT_ERROR)
        }

        let difference = new UnorderedSet();

        for (let node of this) {
            if (!set.contains(node)) {
                difference.insert(node);
            }
        }

        return difference;
    }

    subset (set) {
        if (!(set instanceof UnorderedSet)) {
            throw new NoAllowedArgumentError(SUBSET_METHOD_ARGUMENT_ERROR)
        }

        if (this.size() < set.size()) {
            return false;
        }

        for (let node of set) {
            if (!this.contains(node)) {
                return false;
            }
        }

        return true;
    }

    equals (set) {
        if (!(set instanceof UnorderedSet)) {
            throw new NoAllowedArgumentError(EQUALS_METHOD_ARGUMENT_ERROR)
        }

        if (this.container.size != set.size()) {
            return false;
        }

        for (let key of this) {
            if (!set.contains(key)) {
                return false;
            }
        }

        return true;
    }

    *[Symbol.iterator] () {
        yield * this.container[Symbol.iterator]();
    }

}

module.exports = UnorderedSet;