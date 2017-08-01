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

export function blendColor(color1: array, color2: array): array {
	let alpha1 = getAlpha(color1),
		alpha2 = getAlpha(color2);

	let color = [
		blendChannel(color1[CHANNEL_RED], color2[CHANNEL_RED], alpha1, alpha2),
		blendChannel(color1[CHANNEL_GREEN], color2[CHANNEL_GREEN], alpha1, alpha2),
		blendChannel(color1[CHANNEL_BLUE], color2[CHANNEL_BLUE], alpha1, alpha2)
	];

	if (isRGBA(color1)) {
		color[CHANNEL_ALPHA] = blendAlpha(alpha1, alpha2);
	}

	return color;
}

export function rgba(color: array): array {
	let rgbaColor = [...color];
	rgbaColor[CHANNEL_ALPHA] = color[CHANNEL_ALPHA] ?
		color[CHANNEL_ALPHA] : 0xff;
	return rgbaColor;
}

export function blendChannel(
	color2: number,
	color1: number,
	alpha1: number = 0xff,
	alpha2: number = 0xff
) {
	return (
		(
			(color1 / 255) * (alpha1 / 255)
		) + (
			(color2 / 255) * (alpha2 / 255) * (1 - (alpha1 / 255))
		)
	) * 255;
}

export function blendAlpha(alpha1: number, alpha2: number): number {
	return Math.min(0xff, alpha1 + alpha2);
}

export function isRGBA(color: array): boolean {
	return color.length === 4;
}

export function getAlpha(color) {
	return isRGBA(color) ? color[CHANNEL_ALPHA] : 0xff;
}
