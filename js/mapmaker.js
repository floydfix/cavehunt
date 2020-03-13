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
	const mapWidth = 15;

	const scale = (num, in_min, in_max, out_min, out_max) => {
	  return Math.floor((num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
	}

	let mapCanvas = $('#canvas')[0];
	let map = mapCanvas.getContext('2d');
	let mapArray = [['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
					['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
					['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
					['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
					['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
					['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
					['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
					['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
					['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
					['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
					['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
					['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
					['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
					['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
					['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*']];
	let sprites = document.getElementById("sprites");
	let tiles = sprites.getContext('2d');
	let spritesHidden = document.getElementById("spritesHidden");
	let tilesHidden = spritesHidden.getContext('2d');
	let tilesImg = null;
	let i;
	let mapPos = [0, 0];
	let tilesPos = [0, 0];
	let lastTime = 0;
	let counter = 0;
	map.scale(3,3);
	tiles.scale(3,3);


	///////////////////////////////////////////
	// EVENT LISTENERS

	$('#export').click(function() {
		let str = "[";
		for (var i = 0; i < mapWidth; i++) {
			str += "[";
			for (var j = 0; j < mapWidth; j++) {
				str += '"' + mapArray[i][j] + '"';
				if (j != mapWidth - 1)
					str += ",";
			}
			str += "]";
			if (i != mapWidth - 1)
				str += ",";
		}
		str += "]";
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
		}
	});

	function moveSelector(direction, map = false) {
		let newPos = [0,0];
		let checkPos = tilesPos;
		let tileLength = 10;
		if (map) {
			checkPos = mapPos;
			tileLength = 14;
		}	

		if (direction != null) {
			if (direction == UP || direction == WUP) {
				if (checkPos[1] > 0) {
					newPos[0] = checkPos[0];
					newPos[1] = checkPos[1] - 1;
				} else {
					newPos[0] = checkPos[0];
					newPos[1] = tileLength;
				}
			}
			if (direction == DOWN || direction == SDOWN) {
				if (checkPos[1] < tileLength) {
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
					newPos[0] = tileLength;
					newPos[1] = checkPos[1];
				}
			}
			if (direction == RIGHT || direction == DRIGHT) {
				if (checkPos[0] < tileLength) {
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

	mapCanvas.addEventListener("mousedown", (event) => {
	  var x = event.x;
	  var y = event.y;

	  x -= mapCanvas.offsetLeft;
	  y -= mapCanvas.offsetTop;

	  x = scale(x, 0, i.width, 0, i.width / (spriteSize * 3));
	  y = scale(y, 0, i.width, 0, i.width / (spriteSize * 3));

	  mapPos = [x, y];
	  placeTile();
	}, false);

	sprites.addEventListener("mousedown", (event) => {
	  var x = event.x;
	  var y = event.y;

	  x -= sprites.offsetLeft;
	  y -= sprites.offsetTop;

	  x = scale(x, 0, i.width, 0, i.width / (spriteSize * 3));
	  y = scale(y, 0, i.width, 0, i.width / (spriteSize * 3));

	  tilesPos = [x, y];
	  placeTile();
	} , false);

	function loadImage(url) {
	  return new Promise(r => {  i = new Image(); i.onload = (() => r(i)); i.src = url; });
	}

	async function loadTiles() {
		tilesImg = await loadImage("./img/Dungeon_Tileset.png");
		tiles.drawImage(tilesImg, 0, 0);
		tilesHidden.drawImage(tilesImg, 0, 0);
	}

	function placeTile() {
		mapArray[mapPos[1]].splice(mapPos[0], 1, tilesPos[0] + (tilesPos[1] % spriteSize) * spriteSize);
	}

	function draw() {
		map.fillStyle = "#FFFFFF";
		map.fillRect(0, 0, mapCanvas.height, mapCanvas.width);

		drawWalls(map, mapArray, spritesHidden, spriteSize);
	
		let x = mapPos[0] * spriteSize;
		let y = mapPos[1] * spriteSize;
		map.beginPath();
		map.moveTo(x, y);
		map.lineTo(x, y + spriteSize);
		map.lineTo(x + spriteSize, y + spriteSize);
		map.lineTo(x + spriteSize, y);
		map.lineTo(x, y);
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