var assert = require('assert'),
	funPaint = require('../dist/index.js'),
	utils = require('../dist/utils.js'),
	canvasa = (canvasb = null),
	fs = require('fs'),
	width = 16;
PNG = require('pngjs').PNG;

beforeEach(function() {
	canvas = funPaint.createImageBuffer(16, 16);
	canvas2 = funPaint.createImageBuffer(16, 16);
});

describe('drawCanvas', function() {
	it('should color the canvas all white', function() {
		let imageBuffer = PNG.sync.read(
			fs.readFileSync('./test/images/white.png')
		).data;

		canvas = funPaint.drawRect(canvas, width, true, 0, 0, 16, 16, [
			0,
			0,
			0,
			0
		]);
		canvas2 = funPaint.drawRect(canvas2, width, true, 0, 0, 16, 16, [
			0xff,
			0xff,
			0xff,
			0xff
		]);
		canvas = funPaint.drawBuffer(
			canvas,
			width,
			true,
			canvas2,
			width,
			true,
			0,
			0
		);
		assert.deepEqual(imageBuffer, canvas);
	});

	it('should color the canvas all white', function() {
		let imageBuffer = PNG.sync.read(
			fs.readFileSync('./test/images/white.png')
		).data;

		canvas = funPaint.drawRect(canvas, width, true, 0, 0, 16, 16, [
			0xff,
			0xff,
			0xff,
			0xff
		]);
		canvas2 = funPaint.drawRect(canvas2, width, true, 0, 0, 16, 16, [
			0xff,
			0xff,
			0xff,
			0
		]);
		canvas = funPaint.drawBuffer(
			canvas,
			width,
			true,
			canvas2,
			width,
			true,
			0,
			0
		);
		assert.deepEqual(imageBuffer, canvas);
	});

	it('should draw a black square in the middle', function() {
		let imageBuffer = PNG.sync.read(
			fs.readFileSync('./test/images/black_square.png')
		).data;

		canvas = funPaint.drawRect(canvas, width, true, 0, 0, 16, 16, [
			255,
			255,
			255,
			0
		]);
		canvas = funPaint.drawRect(canvas, width, true, 4, 4, 8, 8, [
			0,
			0,
			0,
			255
		]);

		canvas2 = funPaint.drawRect(canvas2, width, true, 0, 0, 16, 16, [
			0xff,
			0xff,
			0xff,
			0
		]);

		canvas = funPaint.drawBuffer(
			canvas,
			width,
			true,
			canvas2,
			width,
			true,
			0,
			0
		);

		assert.deepEqual(imageBuffer, canvas);
	});

	it('should draw a black square in the middle', function() {
		let imageBuffer = PNG.sync.read(
			fs.readFileSync('./test/images/black_square.png')
		).data;

		canvas = funPaint.drawRect(canvas, width, true, 0, 0, 16, 16, [
			255,
			255,
			255,
			0
		]);
		let canvas3 = funPaint.createImageBuffer(8, 8);
		canvas3 = funPaint.drawRect(canvas3, 8, true, 0, 0, 8, 8, [
			0,
			0,
			0,
			255
		]);
		canvas = funPaint.drawBuffer(
			canvas,
			width,
			true,
			canvas3,
			8,
			true,
			4,
			4
		);

		assert.deepEqual(imageBuffer, canvas);
	});

	it('should draw two overlapping black squares', function() {
		let imageBuffer = PNG.sync.read(
			fs.readFileSync('./test/images/overlapping_squares_2.png')
		).data;

		canvas = funPaint.drawRect(canvas, width, true, 0, 0, 16, 16, [
			255,
			255,
			255,
			0
		]);
		let canvas3 = funPaint.createImageBuffer(8, 8);
		canvas3 = funPaint.drawRect(canvas3, 8, true, 0, 0, 8, 8, [
			0,
			0,
			0,
			255
		]);
		canvas = funPaint.drawBuffer(
			canvas,
			width,
			true,
			canvas3,
			8,
			true,
			4,
			4
		);
		canvas = funPaint.drawBuffer(
			canvas,
			width,
			true,
			canvas3,
			8,
			true,
			8,
			8
		);

		assert.deepEqual(imageBuffer, canvas);
	});

	it('should draw two overlapping black squares', function() {
		let png = PNG.sync.read(
			fs.readFileSync('./test/images/overlapping_squares_2.png')
		);
		let imageBuffer = png.data;

		canvas = funPaint.drawRect(canvas, width, true, 0, 0, 16, 16, [
			255,
			255,
			255,
			0
		]);
		canvas = funPaint.drawRect(canvas, width, true, 4, 4, 8, 8, [
			0,
			0,
			0,
			255
		]);

		canvas2 = [...canvas];
		canvas = funPaint.drawBuffer(
			canvas,
			width,
			true,
			canvas2,
			width,
			true,
			4,
			4
		);

		assert.deepEqual(imageBuffer, canvas);
	});

	it('should draw a red rectangle', function() {
		let png = PNG.sync.read(
			fs.readFileSync('./test/images/red_rectangle.png')
		);
		let imageBuffer = png.data;

		let canvas4 = funPaint.createImageBuffer(16, 32);
		canvas4 = funPaint.drawRect(canvas4, width, true, 0, 0, 16, 32, [
			255,
			255,
			255,
			0
		]);

		canvas4 = funPaint.drawBuffer(
			canvas4,
			width,
			true,
			imageBuffer,
			width,
			true,
			0,
			0
		);

		assert.deepEqual(imageBuffer, canvas4);
	});
});
