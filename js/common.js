function drawWalls(destContext, array, srcCanvas, spriteSize) {
	for (var i = 0; i < array.length; i++) {
		let mapRow = array[i];
		for (var j = 0; j < mapRow.length; j++) {
			let mapCol = mapRow[j];
			if (mapCol != "*") {
				let x = mapCol % spriteSize;
				let y = Math.floor(mapCol / spriteSize);
			               // image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
				destContext.drawImage(srcCanvas, x * spriteSize, y * spriteSize, spriteSize, spriteSize, j * spriteSize, i * spriteSize, spriteSize, spriteSize);
			}
		}
	}
}