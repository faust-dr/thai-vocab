$(document).ready(init);

var currentQuery;
var correctAnswer;
var answerExplained;

function init() {
	$("input.answer").focus();
	$("input.answer").keyup(evaluate);
	hideCongrats();
	hidePronunciation();
	hideExplanation();
	next();
}

function evaluate(e) {
	if (e.keyCode === 13 && answerIsCorrect()) {
		next();
		hideCongrats();
		hidePronunciation();
		hideExplanation();
		return;
	} else if(!correctAnswer && e.keyCode === 13) {
		showExplanation();
		answerExplained = true;
	} else if(correctAnswer && answerIsCorrect()) {
		showPronunciation();
		showCongrats();
		showHints();
	} else if(correctAnswer) {
		hideCongrats();
		hidePronunciation();
		showHints();
	}
}

function showHints() {
	$(".hint").text("");	

	var answer = $("input.answer").val();
	var hint = getHintText(correctAnswer, answer);

	$(".hint").text(hint);	
}

function getHintText(correctAnswer, answer) {
	var text = "";

	for(i = 0; i < answer.length; i++) {
		var correctLetters = getCorrectLetters(correctAnswer, i, answer);
		var typedLetter = answer.charAt(i);
		if(_.contains(correctLetters, typedLetter)) {
			text += typedLetter;
		} else {
			text += '_';
		}
	}

	return text;
}

function getCorrectLetters(correctAnswers, i, answer) {
	if(typeof correctAnswers === "string") {
		for(j = 0; j < i ; j++) {
			if(correctAnswers.charAt(j) != answer.charAt(j)) {
				return false;
			}
		}
		return [correctAnswers.charAt(i)];
	}

	return _.compact(_.flatten(_.map(correctAnswers, function(items) {
		return getCorrectLetters(items, i, answer);
	})));
}

function answerIsCorrect() {
	var answer = $(".answer").val();
	return answerExplainedRec(correctAnswer, answer);
}

function answerExplainedRec(correctAnswer, answer) {
	if(!correctAnswer && answerExplained) {
		return true;
	}

	if(typeof correctAnswer === "string") {
		return answer === correctAnswer;
	}

	return _.find(correctAnswer, function(item) {
		if(answerExplainedRec(item, answer)) {
			return true;
		}
	});
}

function next() {
	currentQuery = randomizeQuery();
	correctAnswer = currentQuery.german || currentQuery.english;
	answerExplained = false;

	$(".hint").text("");
	$(".answer").val("");
	$(".pronunciation").val("");
	$(".thai").text(currentQuery.thai);
	if(currentQuery.german) {
		$(".instruction").text("Pronounce first, then type romanization:");
	} else if(currentQuery.english) {
		$(".instruction").text("Pronounce first, then type translation:");
	} else {
		$(".instruction").text("Pronounce, then hit enter:");
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
	$(".congrats").removeClass("hidden");
}

function hideCongrats() {
	$(".congrats").addClass("hidden");
}

function showExplanation() {
	$(".explanation p").text(currentQuery.pronunciation + " " + currentQuery.explanation);
	$(".explanation").removeClass("hidden");
}

function hideExplanation() {
	$(".explanation").addClass("hidden");
}

function showPronunciation() {
	$(".pronunciation-container").removeClass("hidden");
	$(".pronunciation").text(currentQuery.pronunciation);
}

function hidePronunciation() {
	$(".pronunciation-container").addClass("hidden");
}
