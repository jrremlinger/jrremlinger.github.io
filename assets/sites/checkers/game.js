// Declare variables
let board = document.querySelector("#gameArea");
let sTile = null;
let validSpots = [];
let killSpots = [];
let turn = Math.floor(Math.random() * 2);
let killLock = null;
let redChips = null;
let whiteChips = null;
let freePlay = false;

// Create the background tiles and add the chips into their correct places
const buildBoard = function() {
	let swap = false;
	for (let i = 0; i < 8; i++) {
		for (let ii = 0; ii < 8; ii++) {
			board.innerHTML += `<div onclick="selectTile(${ii}, ${i})" class=${swap ? "tile2" : "tile1"} id="${"h" + ii + "v" + i}"></div>`;
			if (i < 3 && !swap) { createChip(ii, i, "white") }
			else if (i > 4 && !swap) { createChip(ii, i, "red") }
			swap = !swap;
		}
		swap = !swap;
	}
	check();
}

// Create a chip at a given location and keep the kinged status if it has it
const createChip = function(h, v, color, c) {
	let myElement = document.querySelector(`#h${h}v${v}`);
	myElement.innerHTML = `<img src="imgs/${color}.png" alt="${color}" class="${c}">`;
	if (c != "king") { myElement.querySelector("img").removeAttribute("class") }
}

// Delete the given chip
const deleteChip = function(h, v) { document.querySelector(`#h${h}v${v}`).innerHTML = ""; }

const selectTile = function(h, v) {
	let myTile = document.querySelector(`#h${h}v${v}`);
	let tempTile = null;
	let goAgain = null;

	// Check if the clicked tile has a chip on it
	if (!killLock) {
		if (myTile.querySelector("img") && ((myTile.querySelector("img").alt == "white" && !turn) || ((myTile.querySelector("img").alt == "red" && turn)) || freePlay)) {
			if (sTile) {
				// If you select the same chip twice, deselect it
				if (myTile.id == sTile[0]) {
					document.querySelectorAll(".valid,.kill,.selected").forEach(element => element.className = "tile1");
					sTile = null;
				}
				// Deselect and then reselect a different chip
				else {
					document.querySelectorAll(".valid,.kill,.selected").forEach(element => element.className = "tile1");
					sTile = [`h${h}v${v}`, myTile.className];
					myTile.className = "selected";
					showMovement();
				}
			}
			// If nothing is selected already, just select the chip
			else {
				sTile = [`h${h}v${v}`, myTile.className];
				myTile.className = "selected";
				showMovement();
			}
		}
		// If you already have a chip selected and are able to move it
		else if ((validSpots.length > 0 || killSpots.length > 0) && sTile) {
			let color = document.querySelector(`#${sTile[0]} > img`).alt;
	
			// Check if you are trying to move to an available tile
			for (let i = 0; i < validSpots.length; i++) {
				if (validSpots[i] == myTile.id) {
					goAgain = move(color, validSpots[i], false);
					tempTile = [parseInt(validSpots[i].charAt(3)), color, `h${parseInt(validSpots[i].charAt(1))}v${parseInt(validSpots[i].charAt(3))}`];
				}
			}
			for (let i = 0; i < killSpots.length; i++) {
				if (killSpots[i] == myTile.id) {
					goAgain = move(color, killSpots[i], true);
					tempTile = [parseInt(killSpots[i].charAt(3)), color, `h${parseInt(killSpots[i].charAt(1))}v${parseInt(killSpots[i].charAt(3))}`];
				}
			}
	
			// Reset background tiles and deselect the chip
			document.querySelectorAll(".valid,.kill,.selected").forEach(element => element.className = "tile1");
			sTile = null;
		}
		if (goAgain) { extraJump(goAgain); }
	}
	// If they can multi-jump, make sure that's all they can do
	else {
		let color = document.querySelector(`#${sTile[0]} > img`).alt;
		for (let i = 0; i < killSpots.length; i++) {
			if (killSpots[i] == myTile.id) {
				goAgain = move(color, killSpots[i], true);
				tempTile = [parseInt(killSpots[i].charAt(3)), color, `h${parseInt(killSpots[i].charAt(1))}v${parseInt(killSpots[i].charAt(3))}`];
			}
		}
		if (goAgain) { extraJump(goAgain); }
	}
	check();
}

// Allow the user to kill multiple chips on the same movement
const extraJump = function(newPos) {
	killLock = false;
	turn = !turn;
	selectTile(parseInt(newPos.charAt(1)), parseInt(newPos.charAt(3)));
	validSpots = [];
	document.querySelectorAll(".valid").forEach(element => element.className = "tile1");
	killLock = true;
	if (killSpots.length <= 0) {
		turn = !turn;
		document.querySelectorAll(".valid,.kill,.selected").forEach(element => element.className = "tile1");
		sTile = null;
		killLock = false;
	}
}

// Move the chip to the chosen position, and kill the enemy chip if needed
const move = function(color, spot, isKill) {
	turn = !turn;
	createChip(parseInt(spot.charAt(1)), parseInt(spot.charAt(3)), color, document.querySelector(`#${sTile[0]} > img`).className);
	deleteChip(parseInt(sTile[0].charAt(1)), parseInt(sTile[0].charAt(3)));
	document.querySelectorAll(".valid,.kill,.selected").forEach(element => element.className = "tile1");

	// If you're killing an enemy chip, calculate the correct chip to kill
	if (isKill) {
		if (parseInt(sTile[0].charAt(1)) - 2 == parseInt(spot.charAt(1)) && parseInt(sTile[0].charAt(3)) - 2 == parseInt(spot.charAt(3))) {
			deleteChip(parseInt(sTile[0].charAt(1)) - 1, parseInt(sTile[0].charAt(3)) - 1);
		}
		else if (parseInt(sTile[0].charAt(1)) + 2 == parseInt(spot.charAt(1)) && parseInt(sTile[0].charAt(3)) + 2 == parseInt(spot.charAt(3))) {
			deleteChip(parseInt(sTile[0].charAt(1)) + 1, parseInt(sTile[0].charAt(3)) + 1);
		}
		else if (parseInt(sTile[0].charAt(1)) - 2 == parseInt(spot.charAt(1)) && parseInt(sTile[0].charAt(3)) + 2 == parseInt(spot.charAt(3))) {
			deleteChip(parseInt(sTile[0].charAt(1)) - 1, parseInt(sTile[0].charAt(3)) + 1);
		}
		else { deleteChip(parseInt(sTile[0].charAt(1)) + 1, parseInt(sTile[0].charAt(3)) - 1); }
		return spot;
	}
	return null;
}

// Show valid movements based on selected chip
const showMovement = function() {
	let h = parseInt(sTile[0].charAt(1));
	let v = parseInt(sTile[0].charAt(3));
	validSpots = [];
	killSpots = [];
	let myColor = document.querySelector(`#${sTile[0]} > img`).alt;
	let checkSpace = null;

	if (myColor == "red" || (myColor == "white" && document.querySelector(`#${sTile[0]} > img`).className == "king")) {
		if (h >= 1 && v >= 1 ) {
			checkSpace = `h${h - 1}v${v - 1}`;
			if (!document.querySelector(`#${checkSpace} > img`)) {
				document.querySelector("#" + checkSpace).className = "valid";
				validSpots.push(checkSpace);
			}
			else if (document.querySelector(`#${checkSpace} > img`).alt != myColor) {
				checkSpace = `h${h - 2}v${v - 2}`;
				if (h - 2 >= 0 && v - 2 >= 0) {
					if (!document.querySelector(`#${checkSpace} > img`)) {
						document.querySelector(`#${checkSpace}`).className = "kill";
						killSpots.push(checkSpace);
					}
				}
			}
		}
		if (h < 7 && v >= 1) {
			checkSpace = `h${h + 1}v${v - 1}`;
			if (!document.querySelector(`#${checkSpace} > img`)) {
				document.querySelector("#" + checkSpace).className = "valid";
				validSpots.push(checkSpace);
			}
			else if (document.querySelector(`#${checkSpace} > img`).alt != myColor) {
				checkSpace = `h${h + 2}v${v - 2}`;
				if (h + 2 <= 7 && v - 2 >= 0) {
					if (!document.querySelector(`#${checkSpace} > img`)) {
						document.querySelector(`#${checkSpace}`).className = "kill";
						killSpots.push(checkSpace);
					}
				}
			}
		}
	}
	if (myColor == "white" || (myColor == "red" && document.querySelector(`#${sTile[0]} > img`).className == "king")) {
		if (h >= 1 && v < 7) {
			checkSpace = `h${h - 1}v${v + 1}`;
			if (!document.querySelector(`#${checkSpace} > img`)) {
				document.querySelector("#" + checkSpace).className = "valid";
				validSpots.push(checkSpace);
			}
			else if (document.querySelector(`#${checkSpace} > img`).alt != myColor) {
				checkSpace = `h${h - 2}v${v + 2}`;
				if (h - 2 >= 0 && v + 2 <= 7) {
					if (!document.querySelector(`#${checkSpace} > img`)) {
						document.querySelector(`#${checkSpace}`).className = "kill";
						killSpots.push(checkSpace);
					}
				}
			}
		}
		if (h < 7 && v < 7) {
			checkSpace = `h${h + 1}v${v + 1}`;
			if (!document.querySelector(`#${checkSpace} > img`)) {
				document.querySelector("#" + checkSpace).className = "valid";
				validSpots.push(checkSpace);
			}
			else if (document.querySelector(`#${checkSpace} > img`).alt != myColor) {
				checkSpace = `h${h + 2}v${v + 2}`;
				if (h + 2 <= 7 && v + 2 <= 7) {
					if (!document.querySelector(`#${checkSpace} > img`)) {
						document.querySelector(`#${checkSpace}`).className = "kill";
						killSpots.push(checkSpace);
					}
				}
			}
		}
	}
}

const check = function() {
	// Count remaining chips
	whiteChips = 0;
	redChips = 0;
	for (element of document.querySelectorAll("img")) {
		if (element.alt == "white") { whiteChips++; }
		if (element.alt == "red") { redChips++; }
	}

	// King any chips that need it
	for (element of document.querySelectorAll(".tile1")) {
		if (element.querySelector("img")) {
			if ((parseInt(element.id.charAt(3)) == 0 && element.querySelector("img").alt == "red") || (parseInt(element.id.charAt(3)) == 7 && element.querySelector("img").alt == "white")) {
				element.querySelector("img").className = "king";
			}
		}
	}

	// Update UI
	document.getElementById("gameLog").innerHTML = `<h2>${turn ? "Red" : "White"}'s turn</h2>`;
	document.getElementById("freeToggle").style.backgroundColor = freePlay ? "lime" : "";
	if (whiteChips == 0 || redChips == 0) { document.getElementById("gameLog").innerHTML = `<h2>Team ${whiteChips > redChips ? "White" : "Red"} wins!</h2>`; }
}

const reset = function() {
	killSpots = [];
	validSpots = [];
	killLock = null;
	redChips = null;
	whiteChips = null;
	sTile = null;
	freePlay = false;
	turn = Math.floor(Math.random() * 2);
	document.getElementById("gameLog").innerHTML = `<h2>${turn ? "Red" : "White"}'s turn</h2>`;
	document.getElementById("gameArea").innerHTML = "";
	buildBoard();
}

const cheat = function(x) {
	switch (x) {
		case 0:
			for (element of document.querySelectorAll("img")) { element.className = "king"; }
			killLock = false;
			document.querySelectorAll(".valid,.kill,.selected").forEach(element => element.className = "tile1");
			sTile = null;
			break;
		case 1:
			freePlay = !freePlay;
			break;
		case 2:
			reset();
			whiteChips = 0;
			redChips = 0;
			let max = 8;

			// Clear the board
			for (element of document.querySelectorAll(".tile1")) { element.innerHTML = ""; }

			// Keep creating chips randomly until there are 8 of each color
			while (whiteChips != redChips || (whiteChips < max && redChips < max)) {
				for (element of document.querySelectorAll(".tile1")) {
					if (!element.querySelector("img")) {
						let myRandom = Math.floor(Math.random() * 100);
						if (myRandom == 0 && whiteChips < max) {
							if (Math.floor(Math.random() * 2)) {
								createChip(parseInt(element.id.charAt(1)), parseInt(element.id.charAt(3)), "white");
								whiteChips++;
							}
						}
						else if (myRandom == 1 && redChips < max) {
							if (Math.floor(Math.random() * 2)) {
								createChip(parseInt(element.id.charAt(1)), parseInt(element.id.charAt(3)), "red");
								redChips++;
							}
						}
					}
				}
			}
			break;
		case 3:
			turn = !turn;
			killLock = false;
			document.querySelectorAll(".valid,.kill,.selected").forEach(element => element.className = "tile1");
			sTile = null;
			break;
	}
	check();
}

buildBoard();