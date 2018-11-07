const getPixelDataFromBytePosition = function(
	imageBuffer,
	byteCounter,
	numberOfChannels
) {
	return imageBuffer.slice(byteCounter, byteCounter + numberOfChannels);
};

module.exports = getPixelDataFromBytePosition;
