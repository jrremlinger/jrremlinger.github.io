//Generates random numbers and then updates the ui text.
function roll() {
	currTypeRng = Math.floor(Math.random() * 100) + 1;
	currValRng = Math.floor(Math.random() * 100) + 1;
	winLoseRng = Math.floor(Math.random() * 100) + 1;
	diamRng = Math.floor(Math.random() * 1000) + 1;
	
	//If the user has more than 75 "badLuck", the bad luck will begin to effect "winLoseRng".
	if (badLuck >= 75) {
		winLoseRng = (badLuck - 75) + winLoseRng;
	}
	
	//If the "winLoseRng" is above 90, the player will fail the raid, if not they will win!
	if (winLoseRng >= 90) {
		win = false;
		//winValue *= 2;
	}
	else {
		win = true;
	}
	updateDisplay();
}