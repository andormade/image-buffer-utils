const CHANNEL_RED = 0;
const CHANNEL_GREEN = 1;
const CHANNEL_BLUE = 2;
const CHANNEL_ALPHA = 3;
const RGB = 3;
const RGBA = 4;

function getChannelCount(canvas) {
	return canvas.hasAlphaChannel ? RGBA : RGB;
}

function bytePosition2Coordinates(canvas, pos) {
	let byteWidth = canvas.width * getChannelCount(canvas);
	return [
		Math.floor(pos / byteWidth),
		pos % byteWidth / getChannelCount(canvas)
	];
}

function coordinates2bytePosition(canvas, x, y) {
	return y * canvas.width * getChannelCount(canvas) + x;
}

function forEachPixel(canvas, callback) {
	for (let bytePos = 0; bytePos < canvas.data.length; bytePos += getChannelCount(canvas)) {
		let [x, y] = bytePosition2Coordinates(canvas, bytePos);
		callback(x, y, bytePos);
	}
}

function forEachByte(canvas, callback) {
	for (let bytePos = 0; bytePos < canvas.data.length; bytePos++) {
		let [x, y] = bytePosition2Coordinates(canvas, bytePos);
		callback(x, y, bytePos);
	}
}

export function createCanvas(width, height, hasAlphaChannel = true) {
	let channels = hasAlphaChannel ? RGBA : RGB;

	return {
		width           : width,
		height          : height,
		hasAlphaChannel : hasAlphaChannel,
		data            : new Uint8Array(width * height * channels).fill(0)
	};
}

export function createCanvasFromImageBuffer(imageBuffer, width, height, hasAlphaChannel = true) {
	let canvas = createCanvas(width, height, hasAlphaChannel);
	canvas.data = [...imageBuffer];
	return canvas;
}

export function cloneCanvas(canvas) {
	return createCanvasFromImageBuffer(
		[...canvas.data], canvas.width, canvas.height, canvas.hasAlphaChannel
	);
}

export function isEqualColor(color1, color2) {
	return (
		color1[CHANNEL_RED] === color2[CHANNEL_RED] &&
		color1[CHANNEL_GREEN] === color2[CHANNEL_GREEN] &&
		color1[CHANNEL_BLUE] === color2[CHANNEL_BLUE]
	);
}

export function drawPixel(canvas, x, y, color) {
	let workingCanvas = cloneCanvas(canvas),
		bytePos = coordinates2bytePosition(canvas, x, y);

	[
		workingCanvas.data[bytePos + CHANNEL_RED],
		workingCanvas.data[bytePos + CHANNEL_GREEN],
		workingCanvas.data[bytePos + CHANNEL_BLUE]
	] = color;

	return workingCanvas;
}

export function drawRect(canvas, x, y, width, height, color) {
	let workingCanvas = cloneCanvas(canvas);

	for (let i = x; i < x + width; i++) {
		for (let j = y; j < y + height; j++) {
			let bytePos = coordinates2bytePosition(canvas, i, j);
			[
				workingCanvas.data[bytePos + CHANNEL_RED],
				workingCanvas.data[bytePos + CHANNEL_GREEN],
				workingCanvas.data[bytePos + CHANNEL_BLUE]
			] = color;
 		}
	}

	return workingCanvas;
}

export function drawCanvas(destination, source, offsetX, offsetY) {
	let workingCanvas = cloneCanvas(destination);

	forEachPixel(source, (x, y, bytePos) => {
		if (typeof destination.data[destBytePos] === 'undefined') {
			return;
		}

		let destBytePos = coordinates2bytePosition(x + offsetX, y + offsetY);

		workingCanvas.data[destBytePos + CHANNEL_RED] = source.data[bytePos + CHANNEL_RED];
		workingCanvas.data[destBytePos + CHANNEL_GREEN] = source.data[bytePos + CHANNEL_GREEN];
		workingCanvas.data[destBytePos + CHANNEL_BLUE] = source.data[bytePos + CHANNEL_BLUE];

		if (source.hasAlphaChannel && destination.hasAlphaChannel) {
			newCanvas.data[destBytePos + CHANNEL_ALPHA] = source.data[bytePos + CHANNEL_ALPHA];
		}
		else if (!source.hasAlphaChannel && destination.hasAlphaChannel) {
			newCanvas.data[destBytePos + CHANNEL_ALPHA] = 0xff;
		}
	});

	return workingCanvas;
}

export function replaceColor(canvas, replacee, replacer) {
	let workingCanvas = cloneCanvas(canvas);

	forEachPixel(canvas, (x, y, bytePos) => {
		if (isEqualColor(getColor(canvas, x, y), replacee)) {
			[
				workingCanvas.data[bytePos + CHANNEL_RED],
				workingCanvas.data[bytePos + CHANNEL_GREEN],
				workingCanvas.data[bytePos + CHANNEL_BLUE]
			] = replacer;
		}
	});

	return workingCanvas;
}

export function getColor(canvas, x, y) {
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
