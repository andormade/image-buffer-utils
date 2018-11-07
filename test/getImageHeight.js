const { getImageHeight } = require('..');
const assert = require('assert');
const fs = require('fs');
const { PNG } = require('pngjs');

const { data: imageBuffer } = PNG.sync.read(
	fs.readFileSync('./test/images/transparent.png')
);

describe('getImageHeight', function() {
	it('should return the correct height', function() {
		assert.strictEqual(getImageHeight(imageBuffer, 16, 4), 16);
	});
});
