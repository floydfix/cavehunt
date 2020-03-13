$(document).ready(function() {
	const DOWN = 2;
	const UP = 0;
	const RIGHT = 1;
	const LEFT = 3;
	const SDOWN = 6;
	const WUP = 4;
	const DRIGHT = 5;
	const ALEFT = 7;
	const spriteSize = 16;
	const mapWidth = 14;
	const mapHeight = 1;
	const scale = 3;

	let mapCanvas = $('#canvas')[0];
	let map = mapCanvas.getContext('2d');
	map.imageSmoothingEnabled = false;

	let animArray = [["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],
					["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"]];

	let sprites = document.getElementById("sprites");
	let tiles = sprites.getContext('2d');
	let spritesHidden = document.getElementById("spritesHidden");
	let tilesHidden = spritesHidden.getContext('2d');
	let tilesImg = null;
	let tilesWidth;
	let i;
	let mapPos = [0, 0];
	let tilesPos = [0, 0];
	let lastTime = 0;
	let counter = 0;
	let tW;
	let tH;

	map.scale(scale,scale);
	tiles.scale(scale,scale);


	///////////////////////////////////////////
	// EVENT LISTENERS

	$('#export').click(function() {
		let str = "[";
		for (var j = 0; j < animArray.length; j++) {
			str += '"' + animArray[j] + '"';
			if (j != animArray.length - 1)
				str += ",";
		}
		str += "];";
		console.log(str);		
	});

	// key presses
	$(document).keydown((event) => {
		switch(event.keyCode) {
			case 38:
				moveSelector(UP);
			break;
			case 39:
				moveSelector(RIGHT);
			break;
			case 40:
				moveSelector(DOWN);
			break;
			case 37:
				moveSelector(LEFT);
			break;
			case 87:
				moveSelector(WUP, true);
			break;
			case 68:
				moveSelector(DRIGHT, true);
			break;
			case 83:
				moveSelector(SDOWN, true);
			break;
			case 65:
				moveSelector(ALEFT, true);
			break;
			case 32:
				placeTile();
			break;
			case 67:
				placeTile("*");
			break;
		}
	});

	mapCanvas.addEventListener("mousedown", (event) => {
		var x = event.x;
		var y = event.y;

		x -= mapCanvas.offsetLeft;
		y -= mapCanvas.offsetTop;

		x = scaleRange(x, 0, mapWidth * spriteSize, 0, mapWidth * scale);
		y = scaleRange(y, 0, mapHeight * spriteSize, 0, mapHeight * scale);

		mapPos = [x, y];
		placeTile();
	}, false);

	sprites.addEventListener("mousedown", (event) => {
		var x = event.x;
		var y = event.y;

		x -= sprites.offsetLeft;
		y -= sprites.offsetTop;

		let scroll = $('.scroll')[0];
		x += scroll.scrollLeft;
		y += scroll.scrollTop;

		x = scaleRange(x, 0, i.width, 0, i.width / (spriteSize * scale));
		y = scaleRange(y, 0, i.height, 0, i.height / (spriteSize * scale));

		tilesPos = [x, y];
		placeTile();
	} , false);

	function moveSelector(direction, map = false) {
		let newPos = [0,0];
		let checkPos = tilesPos;
		let tW = tilesWidth;
		let tH = tilesHeight;
		if (map) {
			checkPos = mapPos;
			tW = mapWidth;
			tH = mapHeight;
		}	

		if (direction != null) {
			if (direction == UP || direction == WUP) {
				if (checkPos[1] > 0) {
					newPos[0] = checkPos[0];
					newPos[1] = checkPos[1] - 1;
				} else {
					newPos[0] = checkPos[0];
					newPos[1] = tH;
				}
			}
			if (direction == DOWN || direction == SDOWN) {
				if (checkPos[1] < tH) {
					newPos[0] = checkPos[0];
					newPos[1] = checkPos[1] + 1;
				} else {
					newPos[0] = checkPos[0];
					newPos[1] = 0;
				}
			}
			if (direction == LEFT || direction == ALEFT) {
				if (checkPos[0] > 0) {
					newPos[0] = checkPos[0] - 1;
					newPos[1] = checkPos[1];
				} else {
					newPos[0] = tW;
					newPos[1] = checkPos[1];
				}
			}
			if (direction == RIGHT || direction == DRIGHT) {
				if (checkPos[0] < tW) {
					newPos[0] = checkPos[0] + 1;
					newPos[1] = checkPos[1];
				} else {
					newPos[0] = 0;
					newPos[1] = checkPos[1];
				}
			}
		}
		if (map)
			mapPos = newPos;
		else
			tilesPos = newPos;
	}

	async function loadTiles() {
		tilesImg = await loadImage("./img/Dungeon2.png");
		tiles.drawImage(tilesImg, 0, 0);
		tilesHidden.drawImage(tilesImg, 0, 0);
		tilesHeight = tilesImg.height / spriteSize;
		tilesWidth = tilesImg.width / spriteSize;
	}

	function loadImage(url) {
		return new Promise(r => { i = new Image(); i.onload = (() => r(i)); i.src = url; });
	}
						//tile = x * 10000 + y;
	function placeTile(tile = tilesPos[0] * 10000 + tilesPos[1]) {
		// splice the number into the correct layers arrray
		animArray[mapPos[1]].splice(mapPos[0], 1, tile);
	}

	function draw() {
		map.fillStyle = "#FFFFFF";
		map.fillRect(0, 0, mapCanvas.width, mapCanvas.height);

		drawWalls(map, animArray, spritesHidden, tilesWidth, spriteSize);

		let x = mapPos[0] * spriteSize;
		let y = mapPos[1] * spriteSize;
		map.beginPath();
		map.moveTo(x, y);
		map.lineTo(x, y + spriteSize);
		map.lineTo(x + spriteSize, y + spriteSize);
		map.lineTo(x + spriteSize, y);
		map.lineTo(x, y);
		map.strokeStyle = "green";
		map.stroke();

		tiles.fillStyle = "#FFFFFF";
		tiles.fillRect(0, 0, sprites.height, sprites.width);
		
		if (tilesImg != null)
			tiles.drawImage(tilesImg, 0, 0);
		
		x = tilesPos[0] * spriteSize;
		y = tilesPos[1] * spriteSize;
		tiles.beginPath();
		tiles.moveTo(x, y);
		tiles.lineTo(x, y + spriteSize);
		tiles.lineTo(x + spriteSize, y + spriteSize);
		tiles.lineTo(x + spriteSize, y);
		tiles.lineTo(x, y);
		tiles.strokeStyle = "red";
		tiles.stroke();
	}

	// this is the main game loop
	function update(time) {
		// check how long it has been since we last ran this function
		let diff = lastTime == 0 ? 100 : time - lastTime;
		counter += diff;
		// only update the screen every 1 second
		if (counter >= 100) {
			draw();
			counter = 0;
		}
		// keep track of the last time
		lastTime = time;
		
		// // loop back into this function
		requestAnimationFrame(update);
	}


	loadTiles();
	requestAnimationFrame(update);
});