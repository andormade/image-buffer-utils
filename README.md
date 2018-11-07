[![npm version][npm-svg]][npm-url]
[![Build Status][travis-svg]][travis-url]
[![Dev dependency Status][david-devdeps-svg]][david-devdeps-url]

# image-buffer-utils

This is a JavaScript library for manipulating image buffers with pure functions. It's not the most efficient way of doing this, and you probably won't be able to use this library in a performance-critical project. It's just for practicing image processing algorithms and functional programming.

## Installation
This module is distributed via npm:
```
npm install image-buffer-utils
```

## Usage
```
import ImageBufferUtils from 'image-buffer-utils';

const canvas = ImageBufferUtils.createImageBuffer(16, 16);
const color = [0, 0, 0, 0];

ImageBufferUtils.drawRect(canvas, 16, true, 0, 0, 16, 16, color);
```

This code is released under the MIT license, feel free to do whatever you want with it.

[npm-svg]: https://img.shields.io/npm/v/image-buffer-utils.svg
[npm-url]: https://www.npmjs.com/package/image-buffer-utils
[travis-svg]: https://travis-ci.org/andormade/image-buffer-utils.svg?branch=master
[travis-url]: https://travis-ci.org/andormade/image-buffer-utils
[david-devdeps-svg]: https://david-dm.org/andormade/image-buffer-utils/dev-status.svg
[david-devdeps-url]: https://david-dm.org/andormade/image-buffer-utils#info=devDependencies
