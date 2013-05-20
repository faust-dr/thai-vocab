$(document).ready(init);

var currentQuery;

function init() {
	$("input.answer").focus();
	$("input.answer").keyup(evaluate);
	hideCongrats();
	hidePronunciation();
	next();
}

function evaluate(e) {
	if (e.keyCode === 13 && answerIsCorrect()) {
		next();
		hideCongrats();
		hidePronunciation();
		return;
	} else if(answerIsCorrect()) {
		showPronunciation();
		showCongrats();
	}

	$(".hint").text("");	

	var correctAnswer = currentQuery.english;
	var answer = $("input.answer").val();
  var minLength = _.min([correctAnswer.length, answer.length]);	

	for(i = 0; i < minLength; i++) {
		var correctLetter = correctAnswer.charAt(i);
		var typedLetter = answer.charAt(i);

		if(correctLetter === typedLetter) {
			add_hint_letter(correctLetter);
		} else {
			add_hint_letter("_");
		}
	}
}

function add_hint_letter(letter) {
	$(".hint").text($(".hint").text() + letter);	
}

function answerIsCorrect() {
	return $(".answer").val() === currentQuery.english;
}

function next() {
	currentQuery = randomizeQuery();

	$(".hint").text("");
	$(".answer").val("");
	$(".pronunciation").val("");
	$(".thai").text(currentQuery.thai);
	if(currentQuery.english) {
		$(".instruction").text("Pronounce first, then type romanization:");
	} else {
		$(".instruction").text("Pronounce:");
	}
}

function randomizeQuery() {
	var typeId = random(list.length);
	var id = random(list[typeId].length);
	return list[typeId][id];
}

function random(limit) {
	return Math.floor(Math.random() * limit);
}

function showCongrats() {
	$(".alert").removeClass("hidden");
}

function hideCongrats() {
	$(".alert").addClass("hidden");
}

function showPronunciation() {
	$(".pronunciation-container").removeClass("hidden");
	$(".pronunciation").text(currentQuery.pronunciation);
}

function hidePronunciation() {
	$(".pronunciation-container").addClass("hidden");
}
