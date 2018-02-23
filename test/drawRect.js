var assert = require('assert'),
	funPaint = require('../dist/index.js'),
	canvas = null,
	fs = require('fs'),
	PNG = require('pngjs').PNG,
	width = 16;

beforeEach(function() {
	buffer = funPaint.createImageBuffer(16, 16);
});

describe('drawRect', function() {
	it('should be transparent', function() {
		let imageBuffer = PNG.sync.read(
			fs.readFileSync('./test/images/transparent.png')
		).data;
		buffer = funPaint.drawRect(buffer, width, true, 0, 0, 16, 16, [
			255,
			255,
			255,
			0
		]);

		assert.deepEqual(imageBuffer, buffer);
	});

	it('should draw a white canvas', function() {
		let imageBuffer = PNG.sync.read(
			fs.readFileSync('./test/images/white.png')
		).data;
		buffer = funPaint.drawRect(buffer, width, true, 0, 0, 16, 16, [
			255,
			255,
			255,
			255
		]);
		assert.deepEqual(imageBuffer, buffer);
	});

	it('should draw a black square in the middle', function() {
		let imageBuffer = PNG.sync.read(
			fs.readFileSync('./test/images/black_square.png')
		).data;
		buffer = funPaint.drawRect(buffer, width, true, 0, 0, 16, 16, [
			255,
			255,
			255,
			0
		]);
		buffer = funPaint.drawRect(buffer, width, true, 4, 4, 8, 8, [
			0,
			0,
			0,
			255
		]);
		assert.deepEqual(imageBuffer, buffer);
	});

	it('should draw two overlapping black squares', function() {
		let imageBuffer = PNG.sync.read(
			fs.readFileSync('./test/images/overlapping_squares_2.png')
		).data;
		buffer = funPaint.drawRect(buffer, width, true, 0, 0, 16, 16, [
			255,
			255,
			255,
			0
		]);
		buffer = funPaint.drawRect(buffer, width, true, 4, 4, 8, 8, [
			0,
			0,
			0,
			255
		]);
		buffer = funPaint.drawRect(buffer, width, true, 8, 8, 8, 8, [
			0,
			0,
			0,
			255
		]);
		assert.deepEqual(imageBuffer, buffer);
	});

	it('should draw red green and blue squares', function() {
		let imageBuffer = PNG.sync.read(
			fs.readFileSync('./test/images/rgb_squares.png')
		).data;
		buffer = funPaint.drawRect(buffer, width, true, 0, 0, 16, 16, [
			255,
			255,
			255,
			0
		]);
		buffer = funPaint.drawRect(buffer, width, true, 0, 0, 8, 8, [
			255,
			0,
			0,
			255
		]);
		buffer = funPaint.drawRect(buffer, width, true, 0, 8, 8, 8, [
			0,
			255,
			0,
			255
		]);
		buffer = funPaint.drawRect(buffer, width, true, 8, 8, 8, 8, [
			0,
			0,
			255,
			255
		]);
		assert.deepEqual(imageBuffer, buffer);
	});

	it('should draw overlapping squares', function() {
		let imageBuffer = PNG.sync.read(
			fs.readFileSync('./test/images/overlapping_squares.png')
		).data;
		buffer = funPaint.drawRect(buffer, width, true, 0, 0, 16, 16, [
			0,
			0,
			255,
			255
		]);
		buffer = funPaint.drawRect(buffer, width, true, 1, 1, 14, 14, [
			255,
			255,
			255,
			255
		]);
		buffer = funPaint.drawRect(buffer, width, true, 2, 2, 12, 12, [
			255,
			0,
			0,
			255
		]);
		buffer = funPaint.drawRect(buffer, width, true, 3, 3, 10, 10, [
			255,
			255,
			0,
			255
		]);
		buffer = funPaint.drawRect(buffer, width, true, 4, 4, 8, 8, [
			0,
			255,
			0,
			255
		]);
		buffer = funPaint.drawRect(buffer, width, true, 5, 5, 6, 6, [
			0,
			255,
			255,
			255
		]);
		buffer = funPaint.drawRect(buffer, width, true, 6, 6, 4, 4, [
			255,
			0,
			255,
			255
		]);
		buffer = funPaint.drawRect(buffer, width, true, 7, 7, 2, 2, [
			0,
			0,
			0,
			255
		]);
		assert.deepEqual(imageBuffer, buffer);
	});
});
