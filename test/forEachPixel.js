const { forEachPixel } = require('..');
const assert = require('assert');
var sinon = require('sinon');
const fs = require('fs');
const { PNG } = require('pngjs');

const { data: imageBuffer } = PNG.sync.read(
	fs.readFileSync('./test/images/rgb_squares.png')
);

describe('forEachPixel', function() {
	it('callback should get called 256 times', function() {
		const callback = sinon.fake();
		forEachPixel(imageBuffer, 16, callback, 4);
		assert.strictEqual(callback.callCount, 256);
	});

	it('callback should get called 512 times', function() {
		const callback = sinon.fake();
		forEachPixel(imageBuffer, 16, callback, 1);
		assert.strictEqual(callback.callCount, 1024);
	});

	it('callback should get called with the correct arguments', function() {
		const callback = sinon.spy();
		forEachPixel(imageBuffer, 16, callback, 4);

		assert(callback.withArgs(0, 0, new Uint8Array([0xff, 0x00, 0x00, 0xff])).firstCall);
		assert(callback.withArgs(1, 0).calledOnce);
		assert(callback.withArgs(0, 1).calledOnce);
		assert(callback.withArgs(15, 15, new Uint8Array([0x00, 0x00, 0xff, 0xff])).lastCall);
	});
});
