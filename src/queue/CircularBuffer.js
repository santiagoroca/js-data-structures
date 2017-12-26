class CircularBuffer {

	constructor (size = 1000) {
		this.read = 0;
		this.length = 0;
		this.MAX_SIZE = size;
		this.container = new Array(this.MAX_SIZE);
	}

	push (value) {
		if (!this.full()) {
			this.container[(this.read + this.length++) % this.MAX_SIZE] = value;
		}
	}

	pop (item) {
		if (!this.empty()) {
			this.length--;
			this.read++;
			this.read %= this.MAX_SIZE;
		}
	}

	peek () {
		return this.container[this.read];
	}

	full () {
		return this.length == this.MAX_SIZE;
	}

	empty () {
		return this.length == 0;
	}

	size () {
		return this.length;
	}

}

module.exports = CircularBuffer;