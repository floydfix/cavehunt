// wait until the page is loaded
$(document).ready(() => {
	/////////////////////////////////////////
	// CONSTANTS
	const canvas = $('canvas')[0];
	const context = canvas.getContext('2d');
	const spritesHidden = document.getElementById("spritesHidden");
	const hiddenContext = spritesHidden.getContext('2d');
	const charsHidden = document.getElementById("charsHidden");
	const charsContext = charsHidden.getContext('2d');
	const scale = 3;
	const spriteSize = 16;
	const DOWN = 2;
	const UP = 0;
	const RIGHT = 1;
	const LEFT = 3;
	const INVITEMS = JSON.parse('{"!": {"score":300}}');
	const LEVEL1 = [[["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","17","17","17","17","17","17","17","17","17","17","17","17","17","*"],["*","17","17","17","17","17","17","17","17","17","17","17","17","17","*"],["*","17","17","17","17","17","17","17","17","17","17","17","17","17","17"],["*","17","17","17","17","17","17","17","17","17","17","17","17","17","*"],["*","17","17","17","17","17","17","17","17","17","17","17","17","17","*"],["*","*","*","17","17","17","17","17","*","*","*","*","*","*","*"],["129","114","*","17","17","17","17","17","*","112","129","113","129","113","129"],["129","129","*","17","17","17","17","17","*","128","129","129","129","129","129"],["129","130","*","17","17","17","17","17","*","129","129","128","129","129","129"],["144","129","*","*","17","17","17","*","*","129","129","129","129","129","130"],["129","129","114","*","17","17","17","*","112","129","129","129","144","129","129"],["129","129","129","*","17","17","17","*","129","129","129","129","129","129","129"],["128","129","129","*","17","17","17","*","129","129","128","129","129","129","146"],["129","129","145","*","17","17","17","*","128","129","129","129","129","129","129"]],[["162","163","163","163","163","163","163","163","163","163","163","163","163","163","164"],["178","*","*","*","*","*","*","*","*","*","*","*","*","*","180"],["178","*","*","*","*","*","*","*","*","*","*","*","*","*","180"],["178","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["178","*","*","*","*","*","*","*","*","*","*","*","*","*","180"],["178","*","*","*","*","*","*","*","*","*","*","*","*","*","180"],["194","195","210","*","*","*","*","*","211","195","195","195","195","195","196"],["*","*","178","*","*","*","*","*","180","*","*","*","*","*","*"],["*","*","178","*","*","*","*","*","180","*","*","*","*","*","*"],["*","*","178","*","*","*","*","*","180","*","*","*","*","*","*"],["*","*","194","210","*","*","*","211","196","*","*","*","*","*","*"],["*","*","*","178","*","*","*","180","*","*","*","*","*","*","*"],["*","*","*","178","*","*","*","180","*","*","*","*","*","*","*"],["*","*","*","178","*","*","*","180","*","*","*","*","*","*","*"],["*","*","*","194","195","*","195","196","*","*","*","*","*","*","*"]],[["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","*","243","*","*","*","*","*","*","*","*","*","*","*","*"],["*","243","243","*","*","*","*","*","*","*","*","*","*","*","*"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","176"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","*","*","*","*","116","*","*","*","*","*","*","*","*","*"]],[["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","84","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","36"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","52"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","68"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],["*","*","*","*","64","65","66","*","*","*","*","*","*","*","*"]]];
	const PLAYER1 = [];
	//////////////////////////////////////////
	// VARIABLES
	let counter;
	let foundTreasure = [];
	let collectedTreasure = [];
	let playerPos;
	let level;
	let lastTime = 0;
	let score;
	let startedPlayer = false;

	///////////////////////////////////////////
	// EVENT LISTENERS

	// key presses
	$(document).keydown((event) => {
		switch(event.keyCode) {
			// up arrow
			case 38:
				movePlayer(UP);
			break;
			// right arrow
			case 39:
				movePlayer(RIGHT);
			break;
			// down arrow
			case 40:
				movePlayer(DOWN);
			break;
			// left arrow
			case 37:
				movePlayer(LEFT);
			break;
		}
	});

	// clicking the game over screen
	$('#gameOver').click((event) => {
		// hiding the game over screen
		$('#gameOver').hide();

		// start a new game
		newLevel();
		
		// start the update loop
		// look for function update()
		requestAnimationFrame(update);
	});
	
	///////////////////////////////////////////
	// FUNCTIONS

	// the main draw function
	function draw() {
		for (var i = 0; i < LEVEL1.length; i++) {
			drawWalls(context, LEVEL1[i], spritesHidden, spriteSize);
		}
						// image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
		context.drawImage(charsHidden, 8 * spriteSize, 1 * spriteSize, spriteSize, spriteSize, playerPos[0] * spriteSize, playerPos[1] * spriteSize, spriteSize, spriteSize);
		
	}

	//the function to move the player
	function movePlayer(direction) {
		let newPos = [];

		// depending on the direction to tell us where it goes
		switch(direction) {
			case UP:
			newPos[0] = playerPos[0];
			newPos[1] = playerPos[1] - 1;
			break;
			case RIGHT:
			newPos[0] = playerPos[0] + 1;
			newPos[1] = playerPos[1];
			break;
			case DOWN:
			newPos[0] = playerPos[0];
			newPos[1] = playerPos[1] + 1;
			break;
			case LEFT:
			newPos[0] = playerPos[0] - 1;
			newPos[1] = playerPos[1];
			break;
		}

		// check collide with wall
		if (wallCollider(newPos))
			return;

		// redraw the players last position
		context.clearRect(
				playerPos[0],
				playerPos[1], 
				1, 1);

		// swap in new position
		playerPos = newPos;

		drawPlayer();
	}

	function drawPlayer() {
		context.fillStyle = "#0000FF";
		context.fillRect(
			playerPos[0],
			playerPos[1], 
			1, 1);
	}

	// resetting the game
	function gameOver() {
		// show the game over screen
		$('#gameOver').show();
		
		// TODO: save high score locally
		level = -1;
		score = 0;
		playerPos = [5,5];
		counter = 0;
	}

	async function loadTiles() {
		tilesImg = await loadImage("./img/DungeonStarter.png");
		hiddenContext.drawImage(tilesImg, 0, 0);
	}

	async function loadChars() {
		let charsImg = await loadImage("./img/Dungeon2.png");
		charsContext.drawImage(charsImg, 0, 0);
	}

	function loadImage(url) {
		return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
	}

	// this function advances to the next level
	function newLevel() {
		level += 1;
		startedPlayer = false;
	}

	function wallCollider(position) {
		let currLevel = walls[level];
		// get row
		let currRow = currLevel[position[1]];

		let currPos = currRow.split('')[position[0]];

		if (currPos == "E")
			gameOver();

		let check = position[0] + "|" + position[1];
		if (currPos == "!" && !foundTreasure.includes(check) && !collectedTreasure.includes(check))
			foundTreasure.push(check);
		else if (currPos == "!") {
			addToInventory(currPos, check);
		}
		// check col and return true if it is a 1
		return currPos == 1;
	}

	function addToInventory(item, position) {
		for(var i = 0; i < foundTreasure.length; i++)
			if (foundTreasure[i] === item)
				foundTreasure.splice(i, 1);

		collectedTreasure.push(position);
		score += INVITEMS[item].score;
	}

	// this is the main game loop
	function update(time) {
		$('#score').html(score);

		// check how long it has been since we last ran this function
		let diff = lastTime == 0 ? 1000 : time - lastTime;
		counter += diff;
		// only update the screen every 1 second
		if (counter >= 1000) {
			draw()
			counter = 0;
		}
		// keep track of the last time
		lastTime = time;
		
		// // loop back into this function
		requestAnimationFrame(update);
	}

	///////////////////////////////////////////
	context.imageSmoothingEnabled = false;
	
	loadTiles();
	loadChars();

	// make the canvas context scale to get 1 pixel to look like a big square
	context.scale(scale, scale);

	// Start the game by calling gameOver();
	gameOver();

});