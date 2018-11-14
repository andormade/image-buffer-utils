const forEachPixel = require('./forEachPixel');
const isPixelExists = require('./isPixelExists');
const getPixelPositionInBuffer = require('./getPixelPositionInBuffer');
const getPixelAtCoordinates = require('./getPixelAtCoordinates');

const crop = function(
	buffer,
	originalWidth,
	channels,
	newWidth,
	newHeight,
	fill = 0
) {
	const cropped = new Uint8Array(newWidth * newHeight * channels).fill(fill);
	forEachPixel(cropped, newWidth, function(x, y) {
		if (isPixelExists(buffer, originalWidth, channels, x, y)) {
			const pos = getPixelPositionInBuffer(newWidth, channels, x, y);
			cropped[pos] = getPixelAtCoordinates(
				buffer,
				originalWidth,
				channels,
				x,
				y
			);
		}
	}, channels);
	return cropped;
};

module.exports = crop;
