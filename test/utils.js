var assert = require('assert'),
	funPaint = require('../src/index.js'),
	utils = require('../src/utils.js'),
	width = 2;

describe('coordinates2bytePosition', function() {
	it('should return the correct byte position', function() {
		assert.strictEqual(utils.coordinates2bytePosition(width, 0, 0), 0);
		assert.strictEqual(utils.coordinates2bytePosition(width, 1, 0), 4);
		assert.strictEqual(utils.coordinates2bytePosition(width, 0, 1), 8);
		assert.strictEqual(utils.coordinates2bytePosition(width, 1, 1), 12);

		assert.strictEqual(utils.coordinates2bytePosition(width, 0, 2), 16);
		assert.strictEqual(utils.coordinates2bytePosition(width, 1, 2), 20);
		assert.strictEqual(utils.coordinates2bytePosition(width, 0, 3), 24);
		assert.strictEqual(utils.coordinates2bytePosition(width, 1, 3), 28);
	});
});

describe('bytePosition2Coordinates', function() {
	it('should return the correct coordinates', function() {
		assert.deepEqual(utils.bytePosition2Coordinates(width, 0), [0, 0]);
		assert.deepEqual(utils.bytePosition2Coordinates(width, 4), [1, 0]);
		assert.deepEqual(utils.bytePosition2Coordinates(width, 8), [0, 1]);
		assert.deepEqual(utils.bytePosition2Coordinates(width, 12), [1, 1]);

		assert.deepEqual(utils.bytePosition2Coordinates(width, 16), [0, 2]);
		assert.deepEqual(utils.bytePosition2Coordinates(width, 20), [1, 2]);
		assert.deepEqual(utils.bytePosition2Coordinates(width, 24), [0, 3]);
		assert.deepEqual(utils.bytePosition2Coordinates(width, 28), [1, 3]);
	});
});

describe('blendAlpha', function() {
	it('should return with 0x00', function() {
		assert.strictEqual(utils.blendAlpha(0x00, 0x00), 0x00);
	});

	it('should return with 0xff', function() {
		assert.strictEqual(utils.blendAlpha(0xff, 0x00), 0xff);
		assert.strictEqual(utils.blendAlpha(0x00, 0xff), 0xff);
		assert.strictEqual(utils.blendAlpha(0xff, 0xff), 0xff);
	});
});

describe('blendChannel', function() {
	it('should return with 0x00', function() {
		assert.strictEqual(utils.blendChannel(0x00, 0x00, 0x00, 0x00), 0x00);
		assert.strictEqual(utils.blendChannel(0x00, 0x00, 0x00, 0x00), 0x00);
		assert.strictEqual(utils.blendChannel(0x00, 0x00, 0x00, 0xff), 0x00);
		assert.strictEqual(utils.blendChannel(0x00, 0x00, 0xff, 0x00), 0x00);
		assert.strictEqual(utils.blendChannel(0x00, 0x00, 0xff, 0xff), 0x00);

		assert.strictEqual(utils.blendChannel(0x00, 0xff, 0xff, 0x00), 0x00);
		assert.strictEqual(utils.blendChannel(0x00, 0xff, 0x00, 0x00), 0x00);
	});

	it('should return with 0xff', function() {
		assert.strictEqual(utils.blendChannel(0xff, 0xff, 0x00, 0x00), 0xff);
		assert.strictEqual(utils.blendChannel(0xff, 0xff, 0x00, 0x00), 0xff);
		assert.strictEqual(utils.blendChannel(0xff, 0xff, 0x00, 0xff), 0xff);
		assert.strictEqual(utils.blendChannel(0xff, 0xff, 0xff, 0x00), 0xff);
		assert.strictEqual(utils.blendChannel(0xff, 0xff, 0xff, 0xff), 0xff);

		assert.strictEqual(utils.blendChannel(0xff, 0x00, 0xff, 0x00), 0xff);
		assert.strictEqual(utils.blendChannel(0xff, 0xff, 0xff, 0x00), 0xff);
	});
});

describe('blendColor', function() {
	it('should return with black', function() {
		assert.deepEqual(
			utils.blendColor(
				[0x00, 0x00, 0x00, 0xff],
				[0xff, 0xff, 0xff, 0x00]
			),
			[0x00, 0x00, 0x00, 0xff]
		);
	});
});

describe('hexColorToArray', function() {
	it('should return the correct values', function() {
		assert.deepEqual(utils.hexColorToArray('#ffffff'), [
			0xff,
			0xff,
			0xff,
			0xff
		]);
		assert.deepEqual(utils.hexColorToArray('#000000'), [
			0x00,
			0x00,
			0x00,
			0xff
		]);
	});
});
