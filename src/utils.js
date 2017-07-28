import {CHANNEL_RED, CHANNEL_GREEN, CHANNEL_BLUE, CHANNEL_ALPHA,
	RGB, RGBA} from './constants.js';

export function getChannelCount(canvas: Canvas): number {
	return canvas.hasAlphaChannel ? RGBA : RGB;
}

export function bytePosition2Coordinates(canvas: Canvas, pos: number): array {
	let byteWidth = canvas.width * getChannelCount(canvas);
	return [
		Math.floor(pos / byteWidth),
		pos % byteWidth / getChannelCount(canvas)
	];
}

export function coordinates2bytePosition(
	canvas: Canvas,
	x: number,
	y: number
): number {
	return (y * canvas.width + x) * getChannelCount(canvas);
}

export function forEachPixel(canvas: Canvas, callback: mixed): void {
	let channelCount = getChannelCount(canvas),
		length = canvas.data.length;

	for (let bytePos = 0; bytePos < length; bytePos += channelCount) {
		let [x, y] = bytePosition2Coordinates(canvas, bytePos);
		callback(x, y, bytePos);
	}
}

export function forEachByte(canvas: Canvas, callback: mixed): void {
	for (let bytePos = 0; bytePos < canvas.data.length; bytePos++) {
		let [x, y] = bytePosition2Coordinates(canvas, bytePos);
		callback(x, y, bytePos);
	}
}

export function mergeColors(color1: array, color2: array): array {
	let color = [];
	let alpha = color2[CHANNEL_ALPHA] ? color2[CHANNEL_ALPHA] / 0xff : 1;

	color[CHANNEL_RED] = (color2[CHANNEL_RED] * alpha) + (color1[CHANNEL_RED] * (1.0 - alpha));
	color[CHANNEL_GREEN] = (color2[CHANNEL_GREEN] * alpha) + (color1[CHANNEL_GREEN] * (1.0 - alpha));
	color[CHANNEL_BLUE] = (color2[CHANNEL_BLUE] * alpha) + (color1[CHANNEL_BLUE] * (1.0 - alpha));
	color[CHANNEL_ALPHA] = Math.max(255, color1[CHANNEL_ALPHA] + color2[CHANNEL_ALPHA]);

	return color;
}

export function rgba(color: array): array {
	let rgbaColor = [...color];
	rgbaColor[CHANNEL_ALPHA] = color[CHANNEL_ALPHA] ?
		color[CHANNEL_ALPHA] : 0xff;
	return rgbaColor
}

export function mergeAlpha(alpha1: number, alpha2: number): number {
	return Math.max(0xff, alpha1, alpha2);
}

export function isDefined(variable) {
	return typeof variable !== 'undefined';
}
