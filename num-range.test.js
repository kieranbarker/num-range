const NumRange = require("./num-range.cjs");

describe("NumRange", () => {
	it("Must have a stop value", () => {
		expect(() => {
			new NumRange();
		}).toThrow(TypeError);

		expect(() => {
			new NumRange({});
		}).toThrow(TypeError);
	});

	it("Must have a non-zero step value", () => {
		expect(() => {
			new NumRange({ stop: 10, step: 0 });
		}).toThrow(RangeError);
	});

	it("Has a length", () => {
		const range = new NumRange({ stop: 10 });
		expect(range).toHaveLength(10);
	});

	it("Returns the value at an index", () => {
		const range = new NumRange({ stop: 10 });
		expect(range.at(0)).toBe(0);
		expect(range.at(-1)).toBe(9);
		expect(range.at(10)).toBe(undefined);
		expect(range.at(-11)).toBe(undefined);
	});

	it("Returns the index of a value", () => {
		const range = new NumRange({ stop: 10 });
		expect(range.indexOf(0)).toBe(0);
		expect(range.indexOf(1.5)).toBe(-1);
		expect(range.indexOf(10)).toBe(-1);
	});

	it("Checks if a value exists", () => {
		const range = new NumRange({ stop: 10 });
		expect(range.includes(0)).toBe(true);
		expect(range.includes(10)).toBe(false);
	});

	it("Is iterable", () => {
		const posRange = new NumRange({ stop: 10 });
		const posNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		expect([...posRange]).toEqual(posNums);

		const negRange = new NumRange({ stop: -10, step: -1 });
		const negNums = [0, -1, -2, -3, -4, -5, -6, -7, -8, -9];
		expect([...negRange]).toEqual(negNums);
	});
});
