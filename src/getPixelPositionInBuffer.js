const getPixelPositionInBuffer = function(width, channels, x, y) {
	return (y * width + x) * channels;
};

module.exports = getPixelPositionInBuffer;
