var assert = require('assert'),
	funPaint = require('../dist/index.js'),
	utils = require('../dist/utils.js'),
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

	it('should color the canvas all white', function() {
		let imageBuffer = PNG.sync.read(fs.readFileSync('./test/images/white.png')).data;

		canvas = funPaint.drawRect(canvas, 0, 0, 16, 16, [0xff, 0xff, 0xff, 0xff]);
		canvas2 = funPaint.drawRect(canvas2, 0, 0, 16, 16, [0xff, 0xff, 0xff, 0]);
		canvas = funPaint.drawCanvas(canvas, canvas2, 0, 0);
		assert.deepEqual(imageBuffer, canvas.data);
	});

	it('should draw a black square in the middle', function() {
		let imageBuffer = PNG.sync.read(fs.readFileSync('./test/images/black_square.png')).data;

		canvas = funPaint.drawRect(canvas, 0, 0, 16, 16, [255, 255, 255, 0]);
		canvas = funPaint.drawRect(canvas, 4, 4, 8, 8, [0, 0, 0, 255]);

		canvas2 = funPaint.drawRect(canvas2, 0, 0, 16, 16, [0xff, 0xff, 0xff, 0]);

		canvas = funPaint.drawCanvas(canvas, canvas2, 0, 0);

		assert.deepEqual(imageBuffer, canvas.data);
	});

	it('should draw a black square in the middle', function() {
		let imageBuffer = PNG.sync.read(fs.readFileSync('./test/images/black_square.png')).data;

		canvas = funPaint.drawRect(canvas, 0, 0, 16, 16, [255, 255, 255, 0]);
		let canvas3 = funPaint.createCanvas(8, 8);
		canvas3 = funPaint.drawRect(canvas3, 0, 0, 8, 8, [0, 0, 0, 255]);
		canvas = funPaint.drawCanvas(canvas, canvas3, 4, 4);

		assert.deepEqual(imageBuffer, canvas.data);
	});

	it('should draw two overlapping black squares', function() {
		let imageBuffer = PNG.sync.read(fs.readFileSync('./test/images/overlapping_squares_2.png')).data;

		canvas = funPaint.drawRect(canvas, 0, 0, 16, 16, [255, 255, 255, 0]);
		let canvas3 = funPaint.createCanvas(8, 8);
		canvas3 = funPaint.drawRect(canvas3, 0, 0, 8, 8, [0, 0, 0, 255]);
		canvas = funPaint.drawCanvas(canvas, canvas3, 4, 4);
		canvas = funPaint.drawCanvas(canvas, canvas3, 8, 8);

		assert.deepEqual(imageBuffer, canvas.data);
	});

	it('should draw two overlapping black squares', function() {
		let png = PNG.sync.read(fs.readFileSync('./test/images/overlapping_squares_2.png'));
		let imageBuffer = png.data;

		canvas = funPaint.drawRect(canvas, 0, 0, 16, 16, [255, 255, 255, 0]);
		canvas = funPaint.drawRect(canvas, 4, 4, 8, 8, [0, 0, 0, 255]);

	//	canvas2 = funPaint.cloneCanvas(canvas);

	canvas2 = funPaint.drawRect(canvas2, 0, 0, 16, 16, [255, 255, 255, 0]);
	canvas2 = funPaint.drawRect(canvas2, 4, 4, 8, 8, [0, 0, 0, 255]);


		canvas = funPaint.drawCanvas(canvas, canvas2, 4, 4);

		for (let i = 0; i < imageBuffer.length; i += 4) {
			if (canvas.data[i] !== imageBuffer[i]) {
				console.log('diff:', utils.bytePosition2Coordinates(canvas, i),
					[canvas.data[i], canvas.data[i + 1], canvas.data[i + 2], canvas.data[i + 3]], [imageBuffer[i], imageBuffer[i + 1], imageBuffer[i + 2], imageBuffer[i + 3]]);
			}
		}

		png.data = canvas.data;
		var buffer = PNG.sync.write(png);
		fs.writeFileSync('out.png', buffer);

		assert.deepEqual(imageBuffer, canvas.data);
	});
});
