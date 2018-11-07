const getPixelCoordinatesFromBytePosition = require('./getPixelCoordinatesFromBytePosition');
const getPixelDataFromBytePosition = require('./getPixelDataFromBytePosition');

const forEachPixel = function(
	imageBuffer,
	imageWidth,
	callback,
	numberOfChannels
) {
	for (
		let byteCounter = 0;
		byteCounter < imageBuffer.length;
		byteCounter += numberOfChannels
	) {
		const [x, y] = getPixelCoordinatesFromBytePosition(
			byteCounter,
			numberOfChannels,
			imageWidth
		);

		if (numberOfChannels < 2) {
			callback(x, y, imageBuffer[byteCounter]);
		} else {
			callback(
				x,
				y,
				getPixelDataFromBytePosition(
					imageBuffer,
					byteCounter,
					numberOfChannels
				)
			);
		}
	}
};

module.exports = forEachPixel;
