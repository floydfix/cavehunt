// wait until the page is loaded
$(document).ready(() => {
	/////////////////////////////////////////
	// CONSTANTS
	const canvas = $('canvas')[0];
	const context = canvas.getContext('2d');
	const scale = 20;
	const DOWN = 2;
	const UP = 0;
	const RIGHT = 1;
	const LEFT = 3;
	const INVITEMS = JSON.parse('{"!": {"score":300}}');
	const LEVEL1 = ["111111111111111111111111111111",
					"100000000000000000000000000001",
					"111111111111111000111111111111",
					"1000000000000010001000001000!1",
					"100000000000001000100000100001",
					"100000000000001000100000100001",
					"100000000000000000100000100001",
					"100000000000001000000000000001",
					"111111111111111000111111111111",
					"100000000000001000000000000001",
					"100000000000011000000000000001",
					"10000S000000110000000000000001",
					"100000000001100000000000000001",
					"100000000011000000000000000001",
					"111110111110000000000000000001",
					"100000000000000000000000000001",
					"100000000000000000000000000001",
					"100000000000000000000000000001",
					"100000000000000000000000000001",
					"100000000000000000000000000001",
					"100000000000000000000000000001",
					"100000000000000000000000000001",
					"100000000000000000000000000001",
					"100000000000000000000000000001",
					"100000000000000000000000000001",
					"100000000000000000000000000001",
					"100000000000000000000000000001",
					"100000000000000000000000000001",
					"100000000000000000000000000001",
					"111111111111111111111111111E11",]
	const walls = [LEVEL1];

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
		let currWalls = walls[level];
		for (var i = currWalls.length - 1; i >= 0; i--) {
			let currRow = currWalls[i].split('');
			for (var j = currRow.length - 1; j >= 0; j--) {
				switch (currRow[j]) {
					case "1" :
						context.fillStyle = "#000000";
						context.fillRect(
							j,
							i, 
							1, 1);
					break;
					case "E" :
						context.fillStyle = "#FF0000";
						context.fillRect(
							j,
							i, 
							1, 1);
					break;
					case "!" :
						if (foundTreasure.includes(j + "|" + i)) {
							context.fillStyle = "#00FF00";
							context.fillRect(
								j,
								i, 
								1, 1);	
						}
					break;
					case "S" :
					if (!startedPlayer) {
						startedPlayer = true;
						playerPos = [j, i];
						drawPlayer();
					}
					break;
				}
			}
		}
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
		
		// context.fillStyle = "#FFFFFF";
		// context.fillRect(
		// 	0,
		// 	0, 
		// 	canvas.width(), canvas.height());

		// TODO: save high score locally
		level = -1;
		score = 0;
		playerPos = [1,1];
		counter = 0;
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


	// make the canvas context scale to get 1 pixel to look like a big square
	context.scale(scale, scale);

	// Start the game by calling gameOver();
	gameOver();

});