//Establishes new array for the text logging.
var coinz = [
"Copper", 
"Silver", 
"Gold",
"Diamond"
]

//Uses determines the current currency and symbol to use, then displays a log of what just happened.
function log(x, y, z) {
	var usedSym;
	
	y--;
	
	if (y == 0) {
		usedSym = cSym2;
	}
	else if (y == 1) {
		usedSym = cSym3;
	}
	else if(y == 2) {
		usedSym = cSym4;
	}
	else {
		usedSym = cSym1
	}
	
	if (z == "W") {
		document.getElementById("adventureLog").innerHTML = "Successful Raid! You got " + x + " " + coinz[y] + "!";
	}
	if (z == "L") {
		document.getElementById("adventureLog").innerHTML = "Raid Failed, you lost " + x + " " + coinz[y] + ".";
	}
	if (z == "D") {
		document.getElementById("adventureLog").innerHTML = "Congradulations! You got a Diamond!";
	}
	if (z == "C") {
		document.getElementById("adventureLog").innerHTML = "Continue your journey!";
	}
}