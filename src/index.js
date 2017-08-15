import {getChannelCount, coordinates2bytePosition, forEachPixel, forEachByte,
	blendColor, getAlpha, blendAlpha, hasCoordinates, isRGBA, isEqualColor,
	hexColorToArray } from './utils.js';
import {CHANNEL_RED, CHANNEL_GREEN, CHANNEL_BLUE, CHANNEL_ALPHA,
	RGB, RGBA} from './constants.js';

/**
 * Creates a new empty canvas.
 */
export function createCanvas(
	width: number,
	height: number,
	hasAlphaChannel: boolean = true
): Canvas {
	let channels = hasAlphaChannel ? RGBA : RGB;

	return {
		width           : width,
		height          : height,
		hasAlphaChannel : hasAlphaChannel,
		data            : new Uint8Array(width * height * channels).fill(0x00)
	};
}

/**
 * Creates a new canvas object from an image buffer.
 */
export function createCanvasFromImageBuffer(
	imageBuffer: array,
	width: number,
	height: number,
	hasAlphaChannel: boolean = true
): Canvas {
	let canvas = createCanvas(width, height, hasAlphaChannel);
	canvas.data = [...imageBuffer];
	return canvas;
}

/**
 * Clones the canvas object.
 */
export function cloneCanvas(canvas: Canvas): Canvas {
	return createCanvasFromImageBuffer(
		canvas.data, canvas.width, canvas.height, canvas.hasAlphaChannel
	);
}

/**
 * Sets one pixels color on the canvas.
 */
export function drawPixel(
	canvas: Canvas,
	pixelX: number,
	pixelY: number,
	pixelColor: array
): Canvas {
	return mapPixels(canvas, (x, y, bytePos, color) => (
		x === pixelX && y === pixelY ? pixelColor : color
	));
}

/**
 * Draws a rectangle.
 */
export function drawRect(
	canvas: Canvas,
	offsetX: number,
	offsetY: number,
	width: number,
	height: number,
	rectColor: array
): Canvas {
	return mapPixels(canvas, (x, y, bytePos, color) => (
		(
			x >= offsetX && x < width + offsetX &&
			y >= offsetY && y < height + offsetY
		) ? rectColor : color
	));
}

/**
 * Draws a canvas on another canvas.
 */
export function drawCanvas(
	destination: Canvas,
	source: Canvas,
	offsetX: number,
	offsetY: number
): Canvas {
	return mapPixels(destination, (x, y, bytePos, color) => {
		if (
			x >= offsetX && x < source.width + offsetX &&
			y >= offsetY && y < source.height + offsetY
		) {
			return blendColor(
				getColor(destination, x , y),
				getColor(source, x - offsetX, y - offsetY)
			)
		}
		else {
			return color;
		}
	});
}

export function mapPixels(canvas, callback) {
	let workingCanvas = cloneCanvas(canvas);

	forEachPixel(canvas, (x, y, bytePos) => {
		let color = callback(x, y, bytePos, getColor(canvas, x, y));

		[
			workingCanvas.data[bytePos + CHANNEL_RED],
			workingCanvas.data[bytePos + CHANNEL_GREEN],
			workingCanvas.data[bytePos + CHANNEL_BLUE]
		] = color;

		if (isRGBA(color) && canvas.hasAlphaChannel) {
			workingCanvas.data[bytePos + CHANNEL_ALPHA] = color[CHANNEL_ALPHA];
		}
		else if (!isRGBA(color) && canvas.hasAlphaChannel) {
			workingCanvas.data[bytePos + CHANNEL_ALPHA] = 0xff;
		}
	});

	return workingCanvas;
}

/**
 * Replaces the specified color on the canvas.
 */
export function replaceColor(
	canvas: Canvas,
	replacee: array,
	replacer: array
): Canvas {
	return mapPixels(canvas, (x, y, bytePos, color) => (
		isEqualColor(getColor(canvas, x, y), replacee) ? replacer : color
	));
}

/**
 * Returns with the color of the specified coordinates.
 */
export function getColor(canvas: Canvas, x: number, y: number): array {
	let bytePos = coordinates2bytePosition(canvas, x, y),
		color = [
			canvas.data[bytePos + CHANNEL_RED],
			canvas.data[bytePos + CHANNEL_GREEN],
			canvas.data[bytePos + CHANNEL_BLUE]
		];

	if (canvas.hasAlphaChannel) {
		color[CHANNEL_ALPHA] = canvas.data[bytePos + CHANNEL_ALPHA];
	}

	return color;
}

export { hexColorToArray };
