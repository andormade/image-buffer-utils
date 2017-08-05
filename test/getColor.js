var assert = require('assert'),
	funPaint = require('../dist/index.js'),
	fs = require('fs'),
	PNG = require('pngjs').PNG;

describe('getColor', function() {
	it('should return with white', function() {
		let imageBuffer = PNG.sync.read(fs.readFileSync('./test/images/white.png')).data;
		let canvas = funPaint.createCanvasFromImageBuffer(imageBuffer, 16, 16);

		assert.deepEqual(funPaint.getColor(canvas, 0, 0), [0xff, 0xff, 0xff, 0xff]);
		assert.deepEqual(funPaint.getColor(canvas, 8, 8), [0xff, 0xff, 0xff, 0xff]);
		assert.deepEqual(funPaint.getColor(canvas, 15, 15), [0xff, 0xff, 0xff, 0xff]);
	});

	it('should return with transparent', function() {
		let imageBuffer = PNG.sync.read(fs.readFileSync('./test/images/transparent.png')).data;
		let canvas = funPaint.createCanvasFromImageBuffer(imageBuffer, 16, 16);

		assert.deepEqual(funPaint.getColor(canvas, 0, 0), [0xff, 0xff, 0xff, 0x00]);
		assert.deepEqual(funPaint.getColor(canvas, 8, 8), [0xff, 0xff, 0xff, 0x00]);
		assert.deepEqual(funPaint.getColor(canvas, 15, 15), [0xff, 0xff, 0xff, 0x00]);
	});

	it('should return with black', function() {
		let imageBuffer = PNG.sync.read(fs.readFileSync('./test/images/black_square.png')).data;
		let canvas = funPaint.createCanvasFromImageBuffer(imageBuffer, 16, 16);

		assert.deepEqual(funPaint.getColor(canvas, 8, 8), [0x00, 0x00, 0x00, 0xff]);
	});

	it('should return with transparent', function() {
		let imageBuffer = PNG.sync.read(fs.readFileSync('./test/images/black_square.png')).data;
		let canvas = funPaint.createCanvasFromImageBuffer(imageBuffer, 0, 0);

		assert.deepEqual(funPaint.getColor(canvas, 8, 8), [0xff, 0xff, 0xff, 0x00]);
	});
});
