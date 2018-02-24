import {
	CHANNEL_RED,
	CHANNEL_GREEN,
	CHANNEL_BLUE,
	CHANNEL_ALPHA
} from './constants.js';

export function bytePosition2Coordinates(width, pos) {
	let byteWidth = width * 4;
	return [Math.floor((pos % byteWidth) / 4), Math.floor(pos / byteWidth)];
}

export function coordinates2bytePosition(width, x, y) {
	return (y * width + x) * 4;
}

export function forEachPixel(buffer, width, callback) {
	for (let bytePos = 0; bytePos < buffer.length; bytePos += 4) {
		let [x, y] = bytePosition2Coordinates(width, bytePos);
		callback(x, y, bytePos);
	}
}

export function forEachByte(buffer, width, callback) {
	for (let bytePos = 0; bytePos < buffer.length; bytePos++) {
		let [x, y] = bytePosition2Coordinates(width, bytePos);
		callback(x, y, bytePos);
	}
}

export function blendColor(color1, color2) {
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
		blendChannel(color1[CHANNEL_BLUE], color2[CHANNEL_BLUE], alpha1, alpha2)
	];

	color[CHANNEL_ALPHA] = blendAlpha(alpha1, alpha2);

	return color;
}

export function blendChannel(dstRGB, srcRGB, dstA = 0xff, srcA = 0xff) {
	dstRGB = dstRGB / 0xff;
	srcRGB = srcRGB / 0xff;
	let outA = blendAlpha(dstA, srcA) / 0xff;
	dstA = dstA / 0xff;
	srcA = srcA / 0xff;

	if (outA === 0) {
		return dstRGB * 0xff;
	}

	return (srcRGB * srcA + dstRGB * dstA * (1 - srcA)) / outA * 0xff;
}

export function blendAlpha(dstA, srcA) {
	srcA = srcA / 0xff;
	dstA = dstA / 0xff;
	return Math.min(srcA + dstA * (1 - srcA), 1) * 0xff;
}

export function getAlpha(color) {
	return color[CHANNEL_ALPHA];
}

export function hasCoordinates(buffer, width, x, y) {
	let height = getHeight(buffer, width);
	return x < width && y < height;
}

/**
 * Compares two colors.
 */
export function isEqualColor(color1, color2) {
	return (
		color1[CHANNEL_RED] === color2[CHANNEL_RED] &&
		color1[CHANNEL_GREEN] === color2[CHANNEL_GREEN] &&
		color1[CHANNEL_BLUE] === color2[CHANNEL_BLUE]
	);
}

export function hexColorToArray(hexColor, alpha = 1) {
	let regex = /#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})/,
		[, red, green, blue] = hexColor.match(regex);

	return [
		parseInt(red, 16),
		parseInt(green, 16),
		parseInt(blue, 16),
		alpha * 255
	];
}

export function getHeight(buffer, width) {
	return Math.ceil(buffer.length / width / 4);
}
