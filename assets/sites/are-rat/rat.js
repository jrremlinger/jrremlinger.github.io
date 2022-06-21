// Declare variables
let currentQuestion = 0;
let ratPower = 0;

// Get HTML elements
const quizContainer = document.getElementById("textArea");
const button = document.getElementById("button");

// Create quiz object to hold all questions and answers
const questions = [
	{
		question: "Do you like cheese?",
		answers: {
			a: "Yes!",
			b: "No"
		}
	},
	{
		question: "Are you stupid?",
		answers: {
			a: "Yes :(",
			b: "No :)"
		}
	},
	{
		question: "Are you ugly?",
		answers: {
			a: "Mhmm",
			b: "I don't think so"
		}
	},
	{
		question: "Choose your fave:",
		answers: {
			a: "Peter Griffer",
			b: "Homer Simps",
			c: "Eren Yeager",
			d: "Betty White"
		}
	},
	{
		question: "Favorite cheese?",
		answers: {
			a: "Nacho",
			b: "Colby-Jack",
			c: "Swiss",
			d: "American"
		}
	},
	{
		question: "Best FNAF?",
		answers: {
			a: "Foxy",
			b: "Fred",
			c: "Phone guy",
			d: "Peter Griffon"
		}
	},
	{
		question: "Do you have small beady eyes and an ugly face?",
		answers: {
			a: "Yes",
			b: "No",
			c: "Only the eyes",
			d: "Only an ugly ass face"
		}
	},
	{
		question: "Anime good?",
		answers: {
			a: "Yes",
			b: "No lol"
		}
	},
	{
		question: "Cheese or happy?",
		answers: {
			a: "Cheese",
			b: "Happy",
			c: "They are the same to me"
		}
	},
	{
		question: "Are you a stinky rat?",
		answers: {
			a: "Yes",
			b: "No",
			c: "Possibly",
			d: "Sans"
		}
	},
];

const showQuestion = function() {
	// Set button text
	if (currentQuestion < questions.length - 1) button.innerHTML = "Next";
	else button.innerHTML = "Submit";

	// Create string with the current question
	let output = `${questions[currentQuestion].question}<br /><br />`;

	// Add the possible choices to the string
	for (letter in questions[currentQuestion].answers) {
		output += (`
			<div class="choices">
				<label>
					<input type="radio" name="choice" value="${letter}">
					${questions[currentQuestion].answers[letter]}
				</label>
			</div>
			<br />`
		);
	}

	// Display the full string to the user
	quizContainer.innerHTML = output;
}

const next = function() {
	let selected = null;
	
	// Make sure the user has selected an answer before continuing
	if (quizContainer.querySelector(`:checked`) == null) return showQuestion();
	// Get the selected choice's letter value
	else selected = quizContainer.querySelector(`:checked`).value;

	// Add ratPower based on their selected choice
	switch (currentQuestion) {
		case 0:
			if (selected == "a") ratPower += 10;
			break;
		case 1:
			if (selected == "a") ratPower += 10;
			break;
		case 2:
			if (selected == "a") ratPower += 10;
			break;
		case 3:
			if (selected == "a") ratPower += 6;
			if (selected == "b") ratPower += 10;
			if (selected == "c") ratPower += 5;
			if (selected == "d") ratPower += 0;
			break;
		case 4:
			if (selected == "a") ratPower += 4;
			if (selected == "b") ratPower += 0;
			if (selected == "c") ratPower += 10;
			if (selected == "d") ratPower += 7;
			break;
		case 5:
			if (selected == "a") ratPower += 4;
			if (selected == "b") ratPower += 10;
			if (selected == "c") ratPower += 0;
			if (selected == "d") ratPower += 6;
			break;
		case 6:
			if (selected == "a") ratPower += 10;
			if (selected == "b") ratPower += 0;
			if (selected == "c") ratPower += 5;
			if (selected == "d") ratPower += 5;
			break;
		case 7:
			if (selected == "a") ratPower += 10;
			break;
		case 8:
			if (selected == "a") ratPower += 10;
			if (selected == "b") ratPower += 0;
			if (selected == "c") ratPower += 11;
			break;
		case 9:
			if (selected == "a") ratPower += 10;
			if (selected == "b") ratPower += 0;
			if (selected == "c") ratPower += 5;
			if (selected == "d") ratPower -= 1;
			break;
	}

	// Go to the next question. If finished, show the results
	currentQuestion++;
	if (currentQuestion >= questions.length) showResults();
	else showQuestion();
}

const showResults = function(){
	// Show the final result and hide the button
	quizContainer.innerHTML = (`
	Thank you for taking my rat test!<br /><br />
	Your results show you are ${ratPower}% rat!`
	);
	button.style.display = "none";
}

// Kick it off!
showQuestion();