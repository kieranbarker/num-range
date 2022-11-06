# NumRange

A JavaScript approximation of [Python's `range` type](https://docs.python.org/3/library/stdtypes.html#range).

1. [Creating a new instance](#creating-a-new-instance)
2. [Instance properties](#instance-properties)
3. [Instance methods](#instance-methods)

## Creating a new instance

To create a new `NumRange` instance, simply instantiate the class using the `new` operator. Pass in an object literal with `start`, `stop`, and `step` properties. The `start` value defaults to `0` and the `step` value defaults to `1`. **The `stop` value is required.**

```js
new NumRange({ stop: 6 }); // 0, 1, 2, 3, 4, 5
new NumRange({ start: 1, stop: 6 }); // 1, 2, 3, 4, 5
new NumRange({ start: 1, stop: 6, step: 2 }); // 1, 3, 5
new NumRange({ start: -1, stop: -6, step: -1 }); // -1, -2, -3, -4, -5
```

If the bounds of the range are invalid, then the `NumRange` instance will still be created, but it won't yield anything:

```js
new NumRange({ start: 5, stop: -5, step: 1 }); // yields nothing
new NumRange({ start: -5, stop: 5, step: -1 }); // yields nothing
```

The newly created instance is [<i>iterable</i>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#iterables), meaning it can be consumed by most syntaxes expecting iterables. This includes [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax), the [`Array.from()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) method, and [`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) loops.

```js
const oneToFive = new NumRange({ start: 1, stop: 6 });

console.log(...oneToFive); // 1 2 3 4 5
console.log([...oneToFive]); // [1, 2, 3, 4, 5]
console.log(Array.from(oneToFive)); // [1, 2, 3, 4, 5]

// 1
// 2
// 3
// 4
// 5
for (const num of oneToFive) {
	console.log(num);
}
```

## Instance properties

### `.start`

The first value to be included in the range. **Defaults to `0`.**

### `.stop`

The first value **not** to be included in the range.

### `.step`

The number of steps between each value in the range. **Defaults to `1`.**

### `.length` ([getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get))

The number of values in the range.

## Instance methods

### `[@@iterator]()`

Returns a [`Generator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) object that yields each value in the range. This method is called implicitly when the current instance is used where an iterable is expected, such as at the beginning of a `for...of` loop. You can also call the method directly.

**Parameters:** None.

**Returns:** `{Generator}` A `Generator` object that yields each value in the range.

```js
const oneToFive = new NumRange({ start: 1, stop: 6 });

console.log(...oneToFive); // 1 2 3 4 5
console.log([...oneToFive]); // [1, 2, 3, 4, 5]
console.log(Array.from(oneToFive)); // [1, 2, 3, 4, 5]

// 1
// 2
// 3
// 4
// 5
for (const num of oneToFive) {
	console.log(num);
}

// You can also call the method directly:
const gen = oneToFive[Symbol.iterator]();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: 4, done: false }
console.log(gen.next()); // { value: 5, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

### `.at()`

Returns the value at the given index or `undefined` if it doesn't exist. Accepts a negative index to count backwards from the end of the range.

**Parameters:** `{number}` The index whose value should be retrieved.

**Returns:** `{number|undefined}` The value at the given index or `undefined` if it doesn't exist.

```js
const oneToFive = new NumRange({ start: 1, stop: 6 });

console.log(oneToFive.at(0)); // 1
console.log(oneToFive.at(-1)); // 5
console.log(oneToFive.at(5)); // undefined
console.log(oneToFive.at(-6)); // undefined
```

### `.indexOf()`

Returns the index at which the given value can be found or `-1` if it doesn't exist.

**Parameters:** `{number}` The value whose index should be retrieved.

**Returns:** `{number}` The index at which the given value can be found or `-1` if it doesn't exist.

```js
const oneToFive = new NumRange({ start: 1, stop: 6 });

console.log(oneToFive.indexOf(1)); // 0
console.log(oneToFive.indexOf(6)); // -1
```

### `.includes()`

Returns `true` if the given value can be found in the range or `false` if not.

**Parameters:** `{number}` The value to search for.

**Returns:** `{boolean}` A boolean value which is `true` if the given value can be found in the range or `false` if not.

```js
const oneToFive = new NumRange({ start: 1, stop: 6 });

console.log(oneToFive.includes(1)); // true
console.log(oneToFive.includes(7)); // false
```
