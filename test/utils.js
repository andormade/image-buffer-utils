var assert = require('assert'),
	funPaint = require('../dist/index.js'),
	utils = require('../dist/utils.js'),
	canvas = null;

beforeEach(function() {
	canvas = funPaint.createCanvas(2, 2);
});

describe('coordinates2bytePosition', function() {
	it('should return the correct byte position', function() {
		assert.deepEqual(utils.coordinates2bytePosition(canvas, 0, 0), 0);
		assert.deepEqual(utils.coordinates2bytePosition(canvas, 1, 0), 4);
		assert.deepEqual(utils.coordinates2bytePosition(canvas, 0, 1), 8);
		assert.deepEqual(utils.coordinates2bytePosition(canvas, 1, 1), 12);
	});
});

describe('mergeAlpha', function() {
	it('should return with 0x00', function() {
		assert.strictEqual(utils.blendAlpha(0x00, 0x00), 0x00);
	})

	it('should return with 0xff', function() {
		assert.strictEqual(utils.blendAlpha(0xff, 0x00), 0xff);
		assert.strictEqual(utils.blendAlpha(0x00, 0xff), 0xff);
		assert.strictEqual(utils.blendAlpha(0xff, 0xff), 0xff);
	})
});
