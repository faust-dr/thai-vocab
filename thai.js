$(document).ready(init);

var currentQuery;
var correctAnswer;
var answerExplained;
var list;

function init() {
	setupLessonCheckboxes();
	generateLessonList();

	$("input.answer").focus();
	$("input.answer").keyup(evaluate);
	hideCongrats();
	hidePronunciation();
	hideExplanation();
	next();
}

function generateLessonList() {
	var activeLessons = _.compact(_.map($(".lessons .lesson input"), function(lessonSelector) {
		return lessonSelector.checked && lessonSelector.name;
	}));

	list = _.compact(_.map(everyLesson, function(lesson) {
		if(_.contains(activeLessons, lesson.name)) {
			return lesson.contents;
		}
	}));
}

function setupLessonCheckboxes() {
	_.each(everyLesson, function(lesson) {
		$(".lessons").append('<div class="lesson"><input type="checkbox" name="' + lesson.name + '" checked="true">' + lesson.name + '</div>');
	});

	$(".lessons .lesson input").click(function(e) {
		generateLessonList();
		next();
	});
}

function evaluate(e) {
	if (e.keyCode === 13 && answerIsCorrect()) {
		next();
		hideCongrats();
		hidePronunciation();
		hideExplanation();
		hideAlternateMeanings();
	} else if(!correctAnswer && e.keyCode === 13) {
		showExplanation();
		showPronunciation();
		showAlternateMeanings();
		showCongrats();
		answerExplained = true;
	} else if(correctAnswer && answerIsCorrect()) {
		showExplanation();
		showPronunciation();
		showAlternateMeanings();
		showCongrats();
		showHints();
	} else if(correctAnswer) {
		hideCongrats();
		hidePronunciation();
		hideExplanation();
		hideAlternateMeanings();
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
	if(list.length <= 0) {
		return { thai: "Selected lessons contain no words." };
	}

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
	if(!currentQuery.explanation) {
		return;
	}

	$(".explanation p").text(currentQuery.explanation);
	$(".explanation").removeClass("hidden");
}

function hideExplanation() {
	$(".explanation").addClass("hidden");
}

function showAlternateMeanings() {
	if(!correctAnswer || typeof correctAnswer === "string") {
		return;
	}

	$(".alternate-meanings").text('Also means:');

	_.each(correctAnswer, function(answer) {
		$(".alternate-meanings").append('<li>' + answer + '</li>');
	});

	$(".alternate-meanings").removeClass("hidden");
}

function hideAlternateMeanings() {
	$(".alternate-meanings").addClass("hidden");
}

function showPronunciation() {
	$(".pronunciation-container").removeClass("hidden");
	$(".pronunciation").text(currentQuery.pronunciation);
}

function hidePronunciation() {
	$(".pronunciation-container").addClass("hidden");
}
