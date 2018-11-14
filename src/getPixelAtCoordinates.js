const getPixelPositionInBuffer = require('./getPixelPositionInBuffer');

const getPixelAtCoordinates = function(buffer, width, channels, x, y) {
	const position = getPixelPositionInBuffer(width, channels, x, y);
	if (channels === 1) {
		return buffer[position];
	}
	else {
		const pixel = new Buffer(channels);
		for (let i = 0; i < channels; i++) {
			pixel[i] = buffer[position + i];
		}
		return pixel;
	}
};

module.exports = getPixelAtCoordinates;
