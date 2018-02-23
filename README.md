[![npm version][npm-svg]][npm-url]
[![Build Status][travis-svg]][travis-url]
[![Dev dependency Status][david-devdeps-svg]][david-devdeps-url]

# functional-paint

This is a JavaScript library for manipulating image buffers with pure functions. It's not the most efficient way of doing this, and you probably won't be able to use this library in a performance-critical project. It's just for practicing image processing algorithms and functional programming.

## Installation
This module is distributed via npm:
```
npm install functional-paint
```

## Usage
```
import FunPaint from 'functional-paint';

const canvas = FunPaint.createImageBuffer(16, 16);
const color = [0, 0, 0, 0];

FunPaint.drawRect(canvas, 16, true, 0, 0, 16, 16, color);
```

This code is released under the MIT license, feel free to do whatever you want with it.

[npm-svg]: https://img.shields.io/npm/v/functional-paint.svg
[npm-url]: https://www.npmjs.com/package/functional-paint
[travis-svg]: https://travis-ci.org/andormade/functional-paint.svg?branch=master
[travis-url]: https://travis-ci.org/andormade/functional-paint
[david-devdeps-svg]: https://david-dm.org/andormade/functional-paint/dev-status.svg
[david-devdeps-url]: https://david-dm.org/andormade/functional-paint#info=devDependencies
