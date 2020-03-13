function drawWalls(map, mapArray, spriteSheet, spriteSize) {
	for (var i = 0; i < mapArray.length; i++) {
		let mapRow = mapArray[i];
		for (var j = 0; j < mapRow.length; j++) {
			let mapCol = mapRow[j];
			if (mapCol != "*") {
				let x = mapCol % spriteSize;
				let y = Math.floor(mapCol / spriteSize);
				console.log(x,y);
			               // image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
				map.drawImage(spriteSheet, x * spriteSize, y * spriteSize, spriteSize, spriteSize, j * spriteSize, i * spriteSize, spriteSize, spriteSize);
			}
		}
	}
}