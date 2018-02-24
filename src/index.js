import {
	getChannelCount,
	coordinates2bytePosition,
	forEachPixel,
	forEachByte,
	blendColor,
	blendAlpha,
	hasCoordinates,
	isEqualColor,
	hexColorToArray,
	getHeight
} from './utils.js';
import {
	CHANNEL_RED,
	CHANNEL_GREEN,
	CHANNEL_BLUE,
	CHANNEL_ALPHA
} from './constants.js';

/**
 * Creates a new empty canvas.
 */
export function createImageBuffer(width, height) {
	return new Uint8Array(width * height * 4).fill(0x00);
}

/**
 * Sets one pixels color on the canvas.
 */
export function drawPixel(buffer, width, pixelX, pixelY, pixelColor) {
	return mapPixels(
		buffer,
		width,
		(x, y, bytePos, color) =>
			x === pixelX && y === pixelY ? pixelColor : color
	);
}

/**
 * Draws a rectangle.
 */
export function drawRect(
	buffer,
	imgWidth,
	offsetX,
	offsetY,
	width,
	height,
	rectColor
) {
	return mapPixels(
		buffer,
		imgWidth,
		(x, y, bytePos, color) =>
			x >= offsetX &&
			x < width + offsetX &&
			y >= offsetY &&
			y < height + offsetY
				? rectColor
				: color
	);
}

/**
 * Draws a canvas on another canvas.
 */
export function drawBuffer(
	destination,
	destWidth,
	source,
	srcWidth,
	offsetX,
	offsetY
) {
	return mapPixels(destination, destWidth, (x, y, bytePos, color) => {
		const srcHeight = getHeight(source, srcWidth);
		if (
			x >= offsetX &&
			x < srcWidth + offsetX &&
			y >= offsetY &&
			y < srcHeight + offsetY
		) {
			return blendColor(
				getColor(destination, destWidth, x, y),
				getColor(source, srcWidth, x - offsetX, y - offsetY)
			);
		} else {
			return color;
		}
	});
}

export function mapPixels(buffer, width, callback) {
	const height = getHeight(buffer, width);
	let workingBuffer = createImageBuffer(width, height);

	forEachPixel(buffer, width, (x, y, bytePos) => {
		let color = callback(x, y, bytePos, getColor(buffer, width, x, y));

		[
			workingBuffer[bytePos + CHANNEL_RED],
			workingBuffer[bytePos + CHANNEL_GREEN],
			workingBuffer[bytePos + CHANNEL_BLUE],
			workingBuffer[bytePos + CHANNEL_ALPHA]
		] = color;
	});

	return workingBuffer;
}

/**
 * Replaces the specified color on the canvas.
 */
export function replaceColor(buffer, width, x, y) {
	return mapPixels(
		buffer,
		width,
		(x, y, bytePos, color) =>
			isEqualColor(getColor(buffer, width, x, y), replacee)
				? replacer
				: color
	);
}

/**
 * Returns with the color of the specified coordinates.
 */
export function getColor(buffer, width, x, y) {
	const bytePos = coordinates2bytePosition(width, x, y);

	return [
		buffer[bytePos + CHANNEL_RED],
		buffer[bytePos + CHANNEL_GREEN],
		buffer[bytePos + CHANNEL_BLUE],
		buffer[bytePos + CHANNEL_ALPHA]
	];
}

export { hexColorToArray };
