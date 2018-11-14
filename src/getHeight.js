const getHeight = function(imageBuffer, imageWidth, numberOfChannels) {
	const numberOfPixels = imageBuffer.length / numberOfChannels;
	return Math.ceil(numberOfPixels / imageWidth);
};

module.exports = getHeight;
