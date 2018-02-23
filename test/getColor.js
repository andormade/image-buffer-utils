var assert = require('assert'),
	funPaint = require('../dist/index.js'),
	fs = require('fs'),
	PNG = require('pngjs').PNG,
	width = 16;

describe('getColor', function() {
	it('should return with white', function() {
		let buffer = PNG.sync.read(fs.readFileSync('./test/images/white.png'))
			.data;

		assert.deepEqual(funPaint.getColor(buffer, width, true, 0, 0), [
			0xff,
			0xff,
			0xff,
			0xff
		]);
		assert.deepEqual(funPaint.getColor(buffer, width, true, 8, 8), [
			0xff,
			0xff,
			0xff,
			0xff
		]);
		assert.deepEqual(funPaint.getColor(buffer, width, true, 15, 15), [
			0xff,
			0xff,
			0xff,
			0xff
		]);
	});

	it('should return with transparent', function() {
		let buffer = PNG.sync.read(
			fs.readFileSync('./test/images/transparent.png')
		).data;

		assert.deepEqual(funPaint.getColor(buffer, width, true, 0, 0), [
			0xff,
			0xff,
			0xff,
			0x00
		]);
		assert.deepEqual(funPaint.getColor(buffer, width, true, 8, 8), [
			0xff,
			0xff,
			0xff,
			0x00
		]);
		assert.deepEqual(funPaint.getColor(buffer, width, true, 15, 15), [
			0xff,
			0xff,
			0xff,
			0x00
		]);
	});

	it('should return with black', function() {
		let buffer = PNG.sync.read(
			fs.readFileSync('./test/images/black_square.png')
		).data;

		assert.deepEqual(funPaint.getColor(buffer, width, true, 8, 8), [
			0x00,
			0x00,
			0x00,
			0xff
		]);
	});

	it('should return with transparent', function() {
		let buffer = PNG.sync.read(
			fs.readFileSync('./test/images/black_square.png')
		).data;

		assert.deepEqual(funPaint.getColor(buffer, width, true, 0, 0), [
			0xff,
			0xff,
			0xff,
			0x00
		]);
	});
});
