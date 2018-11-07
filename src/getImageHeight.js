const getImageHeight = function(imageBuffer, imageWidth, numberOfChannels) {
	const numberOfPixels = imageBuffer.length / numberOfChannels;
	return Math.ceil(numberOfPixels / imageWidth);
};

module.exports = getImageHeight;
