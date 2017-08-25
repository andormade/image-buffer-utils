import {getChannelCount, coordinates2bytePosition, forEachPixel, forEachByte,
	blendColor, getAlpha, blendAlpha, hasCoordinates, isRGBA, isEqualColor,
	hexColorToArray, getHeight } from './utils.js';
import {CHANNEL_RED, CHANNEL_GREEN, CHANNEL_BLUE, CHANNEL_ALPHA,
	RGB, RGBA} from './constants.js';

/**
 * Creates a new empty canvas.
 */
export function createImageBuffer(width, height, hasAlpha = true) {
	let channels = getChannelCount(hasAlpha)
	return new Uint8Array(width * height * channels).fill(0x00);
}

/**
 * Sets one pixels color on the canvas.
 */
export function drawPixel(buffer, width, hasAlpha, pixelX, pixelY, pixelColor) {
	return mapPixels(buffer, width, hasAlpha, (x, y, bytePos, color) => (
		x === pixelX && y === pixelY ? pixelColor : color
	));
}

/**
 * Draws a rectangle.
 */
export function drawRect(
	buffer, imgWidth, hasAlpha, offsetX, offsetY, width, height, rectColor
) {
	return mapPixels(buffer, imgWidth, hasAlpha, (x, y, bytePos, color) => (
		(
			x >= offsetX && x < width + offsetX &&
			y >= offsetY && y < height + offsetY
		) ? rectColor : color
	));
}

/**
 * Draws a canvas on another canvas.
 */
export function drawBuffer(
	destination, destWidth, destHasAlpha,
	source, srcWidth, srcHasAlpha,
	offsetX, offsetY
) {
	return mapPixels(destination, destWidth, destHasAlpha, (x, y, bytePos, color) => {
		let srcHeight = getHeight(source, srcWidth, srcHasAlpha);
		if (
			x >= offsetX && x < srcWidth + offsetX &&
			y >= offsetY && y < srcHeight + offsetY
		) {
			return blendColor(
				getColor(destination, destWidth, destHasAlpha, x , y),
				getColor(source, srcWidth, srcHasAlpha, x - offsetX, y - offsetY)
			)
		}
		else {
			return color;
		}
	});
}

export function mapPixels(buffer, width, hasAlpha, callback) {
	let height = getHeight(buffer, width, hasAlpha);
	let workingBuffer = createImageBuffer(width, height, hasAlpha);


	forEachPixel(buffer, width, hasAlpha, (x, y, bytePos) => {
		let color = callback(
			x, y, bytePos,
			getColor(buffer, width, hasAlpha, x, y)
		);

		[
			workingBuffer[bytePos + CHANNEL_RED],
			workingBuffer[bytePos + CHANNEL_GREEN],
			workingBuffer[bytePos + CHANNEL_BLUE]
		] = color;

		if (isRGBA(color) && hasAlpha) {
			workingBuffer[bytePos + CHANNEL_ALPHA] = color[CHANNEL_ALPHA];
		}
		else if (!isRGBA(color) && hasAlpha) {
			workingBuffer[bytePos + CHANNEL_ALPHA] = 0xff;
		}
	});

	return workingBuffer;
}

/**
 * Replaces the specified color on the canvas.
 */
export function replaceColor(buffer, width, hasAlpha, x, y) {
	return mapPixels(buffer, width, hasAlpha, (x, y, bytePos, color) => (
		isEqualColor(
			getColor(buffer, width, hasAlpha, x, y), replacee
		) ? replacer : color
	));
}

/**
 * Returns with the color of the specified coordinates.
 */
export function getColor(buffer, width, hasAlpha, x, y) {
	let bytePos = coordinates2bytePosition(width, hasAlpha, x, y);
	let color = [
		buffer[bytePos + CHANNEL_RED],
		buffer[bytePos + CHANNEL_GREEN],
		buffer[bytePos + CHANNEL_BLUE]
	];

	if (hasAlpha) {
		color[CHANNEL_ALPHA] = buffer[bytePos + CHANNEL_ALPHA];
	}

	return color;
}

export { hexColorToArray };
