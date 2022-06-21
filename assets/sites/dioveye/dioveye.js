var progress;
var sanity;
var negativity;
var name = "You";

function init() {
	progress = -2;
	sanity = 100;
	negativity = 0;
	story();
}

function uSubmit() {
	var str = document.getElementById("uInput").value;
	if (str != "") {
		switch (progress) {
			case 2:
				name = str;
				story();
				break;
		}
	}
}

function clear() {
	var myDiv = document.getElementById("textArea");
	myDiv.innerHTML = "";
}

function write(speaker, str, options, txt1, txt2, txt3, txt4) {
	var myDiv = document.getElementById("textArea");
	var uTxt = document.getElementById("txtCont");
	var butt1 = document.getElementById("butt1");
	var butt2 = document.getElementById("butt2");
	var butt3 = document.getElementById("butt3");
	var butt4 = document.getElementById("butt4");
	
	switch (speaker) {
		case "test":
			myDiv.innerHTML = "??? ‣ " + str + "<br><br>" + myDiv.innerHTML;
			break;
		case "User":
			myDiv.innerHTML = name + " » " + str + "<br><br>" + myDiv.innerHTML;
			break;
		case 0:
			myDiv.innerHTML = str + "<br><br>" + myDiv.innerHTML;
			break;
	}
	
	switch (options) {
		case -1:
			uTxt.style.display = "block";
			butt1.style.display = "none";
			butt2.style.display = "none";
			butt3.style.display = "none";
			butt4.style.display = "none";
			break;
		case 0:
			uTxt.style.display = "none";
			butt1.style.display = "none";
			butt2.style.display = "none";
			butt3.style.display = "none";
			butt4.style.display = "none";
			break;
		case 1:
			uTxt.style.display = "none";
			butt1.style.display = "block";
			butt2.style.display = "none";
			butt3.style.display = "none";
			butt4.style.display = "none";
			break;
		case 2:
			uTxt.style.display = "none";
			butt1.style.display = "block";
			butt2.style.display = "block";
			butt3.style.display = "none";
			butt4.style.display = "none";
			break;
		case 3:
			uTxt.style.display = "none";
			butt1.style.display = "block";
			butt2.style.display = "block";
			butt3.style.display = "block";
			butt4.style.display = "none";
			break;
		case 4:
			uTxt.style.display = "none";
			butt1.style.display = "block";
			butt2.style.display = "block";
			butt3.style.display = "block";
			butt4.style.display = "block";
			break;
	}
	butt1.innerHTML = txt1;
	butt2.innerHTML = txt2;
	butt3.innerHTML = txt3;
	butt4.innerHTML = txt4;
}

function story(choice) {
	if (progress >= 0) {
		localStorage.setItem("progress", progress);
		localStorage.setItem("negativity", negativity);
		localStorage.setItem("name", name);
	}
	switch (progress++) {
		case -2:
			write(0, "Welcome to Dioveye.", 2, "Start Anew", "Load");
			break;
		case -1:
			switch (choice) {
				case 1:
					clear();
					localStorage.removeItem("progress");
					localStorage.removeItem("negativity");
					localStorage.removeItem("name");
					story();
					break;
				case 2:
					clear();
					if (localStorage.getItem("progress") !== null) {
						progress = localStorage.getItem("progress");
					}
					else {
						progress = 0;
					}
					if (localStorage.getItem("negativity") !== null) {
						negativity = localStorage.getItem("negativity");
					}
					else {
						negativity = 0;
					}
					if (localStorage.getItem("name") !== null) {
						name = localStorage.getItem("name");
					}
					else {
						name = "You";
					}
					story();
					break;
			}
			break;
		case 0:
			write(0, "Your vision slowly fades back to you, you don't know where you are. "
			+ "You feel like you're laying on something soft, it looks like dark grey grass.", 1, "Next");
			break;
		case 1:
			write(0, "Above you looms a red tinted night sky, full of stars.", 1, "Next");
			break;
		case 2:
			write("test", "Hey! There you are!.", 1, "Next");
			break;
		case 3:
			write(0, "The unknown voice calls out to you from somewhere nearby. You sit yourself up by the base of the tree beside you, "
			+ "trying to make sense of your surroundings. Everything seems colorless except the blood red sky, and you appear to be in "
			+ "some sort of forest. Ahead of you, you can see a figure walking towards you.", 2, "\"Hello?\"", "\"Who the hell are you!?\"");
			break;
		case 4:
			switch (choice) {
				case 1:
					write("User", "Hello?");
					write("test", "Hi there, it's honestly great to be finally meeting you! We've been waiting.", 2, "\"Who are you?\"", "\"Waiting?\"");
					break;
				case 2:
					negativity++;
					localStorage.setItem("negativity", negativity);
					write("User", "Who the hell are you!? And where am I???");
					write("test", "Woah there, don't worry I'm not gonna hurt you. In fact, we really need you.", 2, "\"Who are you?\"", "\"You need me?\"");
					break;
				default:
					if (negativity == 1) {
						write("User", "Who the hell are you!? And where am I???");
						write("test", "Woah there, don't worry I'm not gonna hurt you. In fact, we really need you.", 2, "\"Who are you?\"", "\"You need me?\"");
					}
					else {
						write("User", "Hello?");
						write("test", "Hi there, it's honestly great to be finally meeting you! We've been waiting.", 2, "\"Who are you?\"", "\"Waiting?\"");
					}
					break;
			}
			break;
		case 5:
			switch (choice) {
				case 1:
					progress = 7;
					story();
					break;
				case 2:
					progress = 6;
					story();
					break;
			}
			break;
		case 6:
			if (negativity == 1) {
				write("User", "What do you mean you need me? I don't even know where I am!");
			}
			else {
				write("User", "What do you mean you've been \"Waiting\"? And where am I?");
			}
			write(0, "END OF CURRENT DEMO", 0);
			break;
		case 7:
			write("User", "Who even are you?");
			write(0, "END OF CURRENT DEMO", 0);
			break;
	}
}