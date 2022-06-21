// Declare variables
let currentQuestion = 0;
let result = 0;

// Get HTML elements
const quizContainer = document.getElementById("textArea");
const button = document.getElementById("button");

const showQuestion = function() {
	// Set button text
	if (currentQuestion < questions.length - 1) button.innerHTML = "Next";
	else button.innerHTML = "Submit";

	// Create string with the current question
	let output = `<p style="text-align: center; margin: 10px;">${questions[currentQuestion].question}</p>`;

	// Add the possible choices to the string
	for (letter in questions[currentQuestion].answers) {
		output += (`
			<label style="display: block" class="choice">
				<input type="radio" name="choice" value="${letter}">
				${questions[currentQuestion].answers[letter][0]}
			</label>`
		);
	}

	// Display the full string to the user
	quizContainer.innerHTML = output;
}

const next = function() {
	// Make sure the user has selected an answer before continuing
	if (quizContainer.querySelector(`:checked`) == null) return showQuestion();
	// Get the selected choice's letter value
	else { var selected = quizContainer.querySelector(`:checked`).value; }

	// Add to result amount based on answer
	result += questions[currentQuestion].answers[selected][1]

	// Go to the next question. If finished, show the results
	currentQuestion++;
	if (currentQuestion >= questions.length) showResults();
	else showQuestion();
}

const showResults = function(){
	// Show the final result and hide the button
	quizContainer.innerHTML = (`
		Thank you for taking my test!<br /><br />
		You scored ${result}%!`
	);
	button.style.display = "none";
}

// Kick it off!
showQuestion();