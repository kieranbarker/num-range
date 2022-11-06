/*! NumRange v1.0.1 | (c) 2022 Kieran Barker | MIT License | https://github.com/kieranbarker/num-range */
class NumRange {
	constructor({ start = 0, stop = undefined, step = 1 } = {}) {
		if (typeof stop == "undefined") {
			throw new TypeError("NumRange: Stop value cannot be undefined.");
		}

		if (step == 0) {
			throw new RangeError("NumRange: Step value cannot be zero.");
		}

		this.start = Number(start);
		this.stop = Number(stop);
		this.step = Number(step);
	}

	get length() {
		const length = Math.ceil((this.stop - this.start) / this.step);
		return Math.max(length, 0);
	}

	*[Symbol.iterator]() {
		let num = this.start;

		while (this.step > 0 ? num < this.stop : num > this.stop) {
			yield num;
			num += this.step;
		}
	}

	at(index) {
		if (index >= 0 && index > this.length - 1) return;
		if (index < 0 && Math.abs(index) > this.length) return;
		return (index >= 0 ? this.start : this.stop) + this.step * index;
	}

	indexOf(num) {
		const index = (num - this.start) / this.step;
		if (index < 0 || index > this.length - 1) return -1;
		if (!Number.isInteger(index)) return -1;
		return index;
	}

	includes(num) {
		return this.indexOf(num) > -1;
	}
}
