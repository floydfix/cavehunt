function drawWalls(destContext, array, srcCanvas, srcWidthInTiles, spriteSize) {
	for (var i = 0; i < array.length; i++) {
		let arrayRow = array[i];
		for (var j = 0; j < arrayRow.length; j++) {
			let arrayCol = arrayRow[j];
			if (arrayCol != "*") {
				let x = Math.floor(arrayCol / 10000);
				let y = Math.floor(arrayCol % 10000);
			               // image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
				destContext.drawImage(srcCanvas, x * spriteSize, y * spriteSize, spriteSize, spriteSize, j * spriteSize, i * spriteSize, spriteSize, spriteSize);
			}
		}
	}
}

const scaleRange = (num, in_min, in_max, out_min, out_max) => {
	return Math.floor((num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
}