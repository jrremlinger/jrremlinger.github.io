//Returns a random number between 1 and 5, as well as having higher numbers more rare.
function oneToFive() {
	if (currValRng <= 65) {
		return 1;		//65% chance of getting 1.
	}
	if (currValRng > 65 && currValRng <= 85) {
		return 2;		//20% chance of getting 2.
	}
	if (currValRng > 85 && currValRng <= 95) {
		return 3;		//10% chance of getting 3.
	}
	if (currValRng > 95 && currValRng <= 99) {
		return 4;		//4% chance of getting 4.
	}
	if (currValRng == 100) {
		return 5;		//1% chance of 5.
	}
}

//Determines which loot gen to draw from based on current "rarity" and "winType".
function fastMafs(x) {
	rarity = oneToFive();
	
	//Copper loot gens.
	if (x == 1) {
		if (rarity == 1) {
			z = Math.floor(Math.random() * 10) + 1;		//Selects number between 1 and 10 for "rarity" value of 1.
		}
		else if (rarity == 2) {
			z = Math.floor(Math.random() * 26) + 10; 	//Selects number between 10 and 35 for "rarity" value of 2.
		}
		else if (rarity == 3) {
			z = Math.floor(Math.random() * 81) + 35; 	//Selects number between 35 and 115 for "rarity" value of 3.
		}
		else if (rarity == 4) {
			z = Math.floor(Math.random() * 386) + 115; 	//Selects number between 115 and 500 for "rarity" value of 4.
		}
		else {
			z = Math.floor(Math.random() * 501) + 500; 	//Selects number between 500 and 1000 for "rarity" value of 5.
		}
	}
	
	//Silver loot gens.
	else if (x == 2) {
		if (rarity == 1) {
			z = Math.floor(Math.random() * 25) + 1;		//Selects number between 1 and 25 for "rarity" value of 1.
		}
		else if (rarity == 2) {
			z = Math.floor(Math.random() * 26) + 25; 	//Selects number between 25 and 50 for "rarity" value of 2.
		}
		else if (rarity == 3) {
			z = Math.floor(Math.random() * 51) + 50; 	//Selects number between 50 and 100 for "rarity" value of 3.
		}
		else if (rarity == 4) {
			z = Math.floor(Math.random() * 251) + 100; 	//Selects number between 100 and 350 for "rarity" value of 4.
		}
		else {
			z = Math.floor(Math.random() * 651) + 350; 	//Selects number between 350 and 1000 for "rarity" value of 5.
		}
	}
	
	//Gold loot gens.
	else {
		if (rarity == 1) {
			z = Math.floor(Math.random() * 3) + 1; 		//Selects number between 1 and 3 for "rarity" value of 1.
		}
		else if (rarity == 2) {
			z = Math.floor(Math.random() * 75) + 1; 	//Selects number between 1 and 75 for "rarity" value of 2.
		}
		else if (rarity == 3) {
			z = Math.floor(Math.random() * 150) + 1; 	//Selects number between 1 and 150 for "rarity" value of 3.
		}
		else if (rarity == 4) {
			z = Math.floor(Math.random() * 375) + 1; 	//Selects number between 1 and 375 for "rarity" value of 4.
		}
		else {
			z = Math.floor(Math.random() * 1000) + 1; 	//Selects number between 1 and 1000 for "rarity" value of 5.
		}
	}
	return z;	 //Returns selected value.
}

//Performs a logic test to determine the type of currency to be rewarded, finds "winValue", and then adds it to the correct currency type.
function quickMafs() {
	if(win == true) {
		if(diamRng > 999) {
			winType = 4;
		}
		else {
			if (currTypeRng <= 75) {
				winType = 1;
			}
			else {
				if (currTypeRng <= 90) {
					winType = 2;
				}
				else {
					winType = 3;
				}
			}
		}
	}

	else {
		if (gold > 0) {
			winType = 3;
		}
		else {
			if (silver > 0) {
				winType = 2;
			}
			else {
				winType = 1;
			}
		}
	}

	winValue = fastMafs(winType);
	
	//Adds "winValue" to the current amount of the determined currency if "win" is True.
	if (win == true) {
		if (winType == 1) {
			copper += winValue;
			log(winValue, winType, "W");
		}
		else if (winType == 2) {
			silver += winValue;
			log(winValue, winType, "W");
		}
		else if (winType == 3) {
			gold += winValue;
			log(winValue, winType, "W");
		}
		else if (winType == 4) {
			diamond++;
			log(winValue, winType, "D");
		}
	}
	//Subtracts "winValue" from the current amount of the determined currency if "win" is False.
	else {
		if (winType == 1) {
			if (winValue > copper) {
				winValue = copper;
			}
			copper -= winValue;
		}
		else if (winType == 2) {
			if (winValue > silver) {
				winValue = silver;
			}
			silver -= winValue;
		}
		else if (winType == 3) {
			if (winValue > gold) {
				winValue = gold;
			}
			gold -= winValue;
		}
		log(winValue, winType, "L");
	}
}

//Gold to silver calculations.
function GTS() {
	if (gold > 0) {
		silver += 100;
		gold--;
		user.createKey();
		updateDisplay();
	}
}
//Silver to gold calculations.
function STG() {
	while(silver >= 100) {
		silver -= 100;
		gold++;
		user.createKey();
		updateDisplay();
	}
}
//Silver to copper calculations.
function STC() {
	if (silver > 0) {
		copper += 100;
		silver--;
		user.createKey();
		updateDisplay();
	}
}
//Copper to silver calculations.
function CTS() {
	while(copper >= 100) {
		copper -= 100;
		silver++;
		user.createKey();
		updateDisplay();
	}
}
function DTG() {
	if (diamond > 0) {
		gold += 1000;
		diamond--;
		user.createKey();
		updateDisplay();
	}
}