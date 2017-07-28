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
	return y * canvas.width * getChannelCount(canvas) + x;
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
