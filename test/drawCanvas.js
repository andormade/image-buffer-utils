var assert = require('assert'),
	funPaint = require('../dist/index.js'),
	canvasa = canvasb = null,
	fs = require('fs'),
	PNG = require('pngjs').PNG;

beforeEach(function() {
	canvas = funPaint.createCanvas(16, 16);
	canvas2 = funPaint.createCanvas(16, 16);
});

describe('drawCanvas', function() {
	it('should color the canvas all white', function() {
		let imageBuffer = PNG.sync.read(fs.readFileSync('./test/images/white.png')).data;

		canvas = funPaint.drawRect(canvas, 0, 0, 16, 16, [0, 0, 0, 0]);
		canvas2 = funPaint.drawRect(canvas2, 0, 0, 16, 16, [0xff, 0xff, 0xff, 0xff]);
		canvas = funPaint.drawCanvas(canvas, canvas2, 0, 0);
		assert.deepEqual(imageBuffer, canvas.data);
	});

	it('should draw a black square in the middle', function() {
		let imageBuffer = PNG.sync.read(fs.readFileSync('./test/images/black_square.png')).data;

		canvas = funPaint.drawRect(canvas, 0, 0, 16, 16, [255, 255, 255, 0]);
		canvas2 = funPaint.cloneCanvas(canvas);
		canvas2 = funPaint.drawRect(canvas2, 4, 4, 8, 8, [0, 0, 0, 255]);
		canvas = funPaint.drawCanvas(canvas, canvas2, 0, 0);

		assert.deepEqual(imageBuffer, canvas.data);
	});
});