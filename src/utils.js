const {
	CHANNEL_RED,
	CHANNEL_GREEN,
	CHANNEL_BLUE,
	CHANNEL_ALPHA,
} = require('./constants');

const bytePosition2Coordinates = function(width, pos) {
	let byteWidth = width * 4;
	return [Math.floor((pos % byteWidth) / 4), Math.floor(pos / byteWidth)];
};

const coordinates2bytePosition = function(width, x, y) {
	return (y * width + x) * 4;
};

const forEachPixel = function(buffer, width, callback) {
	for (let bytePos = 0; bytePos < buffer.length; bytePos += 4) {
		let [x, y] = bytePosition2Coordinates(width, bytePos);
		callback(x, y, bytePos);
	}
};

const forEachByte = function(buffer, width, callback) {
	for (let bytePos = 0; bytePos < buffer.length; bytePos++) {
		let [x, y] = bytePosition2Coordinates(width, bytePos);
		callback(x, y, bytePos);
	}
};

const blendAlpha = function(dstA, srcA) {
	srcA = srcA / 0xff;
	dstA = dstA / 0xff;
	return Math.min(srcA + dstA * (1 - srcA), 1) * 0xff;
};

const blendChannel = function(dstRGB, srcRGB, dstA = 0xff, srcA = 0xff) {
	dstRGB = dstRGB / 0xff;
	srcRGB = srcRGB / 0xff;
	let outA = blendAlpha(dstA, srcA) / 0xff;
	dstA = dstA / 0xff;
	srcA = srcA / 0xff;

	if (outA === 0) {
		return dstRGB * 0xff;
	}

	return ((srcRGB * srcA + dstRGB * dstA * (1 - srcA)) / outA) * 0xff;
};

const getAlpha = color => color[CHANNEL_ALPHA];

const blendColor = function(color1, color2) {
	let alpha1 = getAlpha(color1),
		alpha2 = getAlpha(color2);

	let color = [
		blendChannel(color1[CHANNEL_RED], color2[CHANNEL_RED], alpha1, alpha2),
		blendChannel(
			color1[CHANNEL_GREEN],
			color2[CHANNEL_GREEN],
			alpha1,
			alpha2
		),
		blendChannel(
			color1[CHANNEL_BLUE],
			color2[CHANNEL_BLUE],
			alpha1,
			alpha2
		),
	];

	color[CHANNEL_ALPHA] = blendAlpha(alpha1, alpha2);

	return color;
};

const hasCoordinates = function(buffer, width, x, y) {
	let height = getHeight(buffer, width);
	return x < width && y < height;
};

/**
 * Compares two colors.
 */
const isEqualColor = (color1, color2) =>
	color1[CHANNEL_RED] === color2[CHANNEL_RED] &&
	color1[CHANNEL_GREEN] === color2[CHANNEL_GREEN] &&
	color1[CHANNEL_BLUE] === color2[CHANNEL_BLUE];

const hexColorToArray = function(hexColor, alpha = 1) {
	let regex = /#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})/,
		[, red, green, blue] = hexColor.match(regex);

	return [
		parseInt(red, 16),
		parseInt(green, 16),
		parseInt(blue, 16),
		alpha * 255,
	];
};

const getHeight = (buffer, width) => Math.ceil(buffer.length / width / 4);

module.exports = {
	getHeight,
	hexColorToArray,
	isEqualColor,
	hasCoordinates,
	getAlpha,
	blendAlpha,
	blendChannel,
	blendColor,
	forEachByte,
	forEachPixel,
	coordinates2bytePosition,
	bytePosition2Coordinates,
};
