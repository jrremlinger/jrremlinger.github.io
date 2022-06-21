//Adds 10 "badLuck" each click.
function giveBadLuck() {
	badLuck += 5;
	updateDisplay();
}

//Removes 1 from badLuck constantly until it equals 0.
function loopedDel() {
	for (x = 0; badLuck > x; wait()) {		//Cheeky "wait()" thrown in which for some reason is the only thing making this work!
		badLuck--;
		updateDisplay();
	}	
}

function goodLuck() {
	if (badLuck >= 25) {
		badLuck -= 25;
	}
	else {
		badLuck = 0;
	}
	updateDisplay();
}