const getHeight = require('./getHeight');

const isPixelExists = function(buffer, width, numberOfChannels, x, y) {
	return x < width && y < getHeight(buffer, width, numberOfChannels);
};

module.exports = isPixelExists;
