$(document).ready(init);

var currentQuery;

function init() {
	$("input.answer").focus();
	$("input.answer").keyup(evaluate);
	hideCongrats();
	next();
}

function evaluate(e) {
	if (e.keyCode === 13 && correctAnswer()) {
		next();
		hideCongrats();
		return;
	} else if(correctAnswer()) {
		showCongrats();
	}

	var answer = $("input.answer").val();

	$(".hint").text("");	

	var correctLetter = currentQuery.english.charAt(0);
	var typedLetter = answer.charAt(0);

	if(correctLetter === typedLetter) {
		add_hint_letter(correctLetter);
	} else {
		add_hint_letter("_");
	}
}

function add_hint_letter(letter) {
	$(".hint").text($(".hint").text() + letter);	
}

function correctAnswer() {
	return $(".answer").val() === currentQuery.english;
}

function next() {
	currentQuery = randomizeQuery();

	$(".hint").text("");
	$(".answer").val("");
	$(".thai").text(currentQuery.thai + " " + currentQuery.romanization);
}

function randomizeQuery() {
	var id = Math.floor(Math.random() * numbers.length);
	return numbers[id];
}

function showCongrats() {
	$(".alert").removeClass("hidden");
}

function hideCongrats() {
	$(".alert").addClass("hidden");
}
