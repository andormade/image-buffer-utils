const { getHeight } = require('..');
const assert = require('assert');
const fs = require('fs');
const { PNG } = require('pngjs');

const { data: imageBuffer } = PNG.sync.read(
	fs.readFileSync('./test/images/transparent.png')
);

describe('getHeight', function() {
	it('should return the correct height', function() {
		assert.strictEqual(getHeight(imageBuffer, 16, 4), 16);
	});
});
