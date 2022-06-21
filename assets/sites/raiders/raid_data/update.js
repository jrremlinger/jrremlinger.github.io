//Updates all div displays in the HTML.
function updateDisplay() {
	document.getElementById("rngDisp1").innerHTML = "currTypeRng: " + currTypeRng;
	document.getElementById("rngDisp2").innerHTML = "currValRng: " + currValRng;
	document.getElementById("wtDisp").innerHTML = "winType: " + winType;
	document.getElementById("wvDisp").innerHTML = "winValue: " + winValue;
	document.getElementById("rarDisp").innerHTML = "rarity: " + rarity;
	document.getElementById("goldDisp").innerHTML = "Gold: " + gold + cSym4;
	document.getElementById("silvDisp").innerHTML = "Silver: " + silver + cSym3;
	document.getElementById("coppDisp").innerHTML = "Copper: " + copper + cSym2;
	document.getElementById("clickDisp").innerHTML = "clicks: " + clicks;
	document.getElementById("wlRngDisp").innerHTML = "winLoseRng: " + winLoseRng;
	document.getElementById("winDisp").innerHTML = "win: " + win;
	document.getElementById("bLuckDisp").innerHTML = "badLuck: " + badLuck;
	document.getElementById("diamDisp").innerHTML = "Diamonds: " + diamond;
	document.getElementById("diamRngDisp").innerHTML = "diamRng: " + diamRng;
}