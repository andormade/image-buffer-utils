const getPixelCoordinatesFromBytePosition = function(
	pos,
	numberOfChannels,
	imageWidth
) {
	const byteWidth = imageWidth * numberOfChannels;
	const x = (pos % byteWidth) / numberOfChannels;
	const y = Math.floor(pos / byteWidth);
	return [x, y];
};

module.exports = getPixelCoordinatesFromBytePosition;
