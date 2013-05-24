// var currentQuery;
// var correctAnswer;
// var answerExplained;
// var list;

// function init() {
// 	setupLessonCheckboxes();
// 	generateLessonList();

// 	$("input.answer").focus();
// 	$("input.answer").keyup(evaluate);

// 	hideCongrats();
// 	hidePronunciation();
// 	hideExplanation();
// 	hideAlternateMeanings();

// 	next();
// }

// function generateLessonList() {
// 	var activeLessons = 
// 		_.compact(
// 			_.map($(".lessons .lesson input"), function(lessonSelector) {
// 				return lessonSelector.checked && lessonSelector.name;
// 			})
// 	);

// 	list = _.compact(_.map(everyLesson, function(lesson) {
// 		if(_.contains(activeLessons, lesson.name)) {
// 			return lesson.contents;
// 		}
// 	}));
// 	return list;
// }

// function setupLessonCheckboxes() {
// 	_.each(everyLesson, function(lesson) {
// 		$(".lessons").append('<div class="lesson"><input type="checkbox" name="' + lesson.name + '" checked="true">' + lesson.name + '</div>');
// 	});

// 	$(".lessons .lesson input").click(function(e) {
// 		generateLessonList();
// 		next();
// 	});
// }

// function evaluate(e) {
// 	if (e.keyCode === 13 && answerIsCorrect()) {
// 		next();
// 		hideCongrats();
// 		hidePronunciation();
// 		hideExplanation();
// 		hideAlternateMeanings();
// 	} else if(!correctAnswer && e.keyCode === 13) {
// 		showExplanation();
// 		showPronunciation();
// 		showAlternateMeanings();
// 		showCongrats();
// 		answerExplained = true;
// 	} else if(correctAnswer && answerIsCorrect()) {
// 		showExplanation();
// 		showPronunciation();
// 		showAlternateMeanings();
// 		showCongrats();
// 		showHints();
// 	} else if(correctAnswer) {
// 		hideCongrats();
// 		hidePronunciation();
// 		hideExplanation();
// 		hideAlternateMeanings();
// 		showHints();
// 	}
// }

// function showHints() {
// 	$(".hint").text("");	

// 	var answer = $("input.answer").val();
// 	var hint = getHintText(correctAnswer, answer);

// 	$(".hint").text(hint);	
// }

// function getHintText(correctAnswer, answer) {
// 	var text = "";

// 	for(i = 0; i < answer.length; i++) {
// 		var correctLetters = getCorrectLetters(correctAnswer, i, answer);
// 		var typedLetter = answer.charAt(i);
// 		if(_.contains(correctLetters, typedLetter)) {
// 			text += typedLetter;
// 		} else {
// 			text += '_';
// 		}
// 	}

// 	return text;
// }

// function getCorrectLetters(correctAnswers, i, answer) {
// 	if(typeof correctAnswers === "string") {
// 		for(j = 0; j < i ; j++) {
// 			if(correctAnswers.charAt(j) != answer.charAt(j)) {
// 				return false;
// 			}
// 		}
// 		return [correctAnswers.charAt(i)];
// 	}

// 	return _.compact(_.flatten(_.map(correctAnswers, function(items) {
// 		return getCorrectLetters(items, i, answer);
// 	})));
// }

// function answerIsCorrect() {
// 	var answer = $(".answer").val();
// 	return answerExplainedRec(correctAnswer, answer);
// }

// function answerExplainedRec(correctAnswer, answer) {
// 	if(!correctAnswer && answerExplained) {
// 		return true;
// 	}

// 	if(typeof correctAnswer === "string") {
// 		return answer === correctAnswer;
// 	}

// 	return _.find(correctAnswer, function(item) {
// 		if(answerExplainedRec(item, answer)) {
// 			return true;
// 		}
// 	});
// }

// function next() {
// 	currentQuery = randomizeQuery();
// 	correctAnswer = currentQuery.german || currentQuery.english;
// 	answerExplained = false;

// 	$(".hint").text("");
// 	$(".answer").val("");
// 	$(".pronunciation").val("");
// 	$(".thai").text(currentQuery.thai);
// 	if(currentQuery.german) {
// 		$(".instruction").text("Pronounce first, then type romanization:");
// 	} else if(currentQuery.english) {
// 		$(".instruction").text("Pronounce first, then type translation:");
// 	} else {
// 		$(".instruction").text("Pronounce, then hit enter:");
// 	}
// }

// function randomizeQuery() {
// 	if(list.length <= 0) {
// 		return { thai: "Selected lessons contain no words." };
// 	}

// 	var typeId = random(list.length);
// 	var id = random(list[typeId].length);
// 	return list[typeId][id];
// }

// function random(limit) {
// 	return Math.floor(Math.random() * limit);
// }

// function showCongrats() {
// 	$(".congrats").removeClass("hidden");
// }

// function hideCongrats() {
// 	$(".congrats").addClass("hidden");
// }

// function showExplanation() {
// 	if(!currentQuery.explanation) {
// 		return;
// 	}

// 	$(".explanation p").text(currentQuery.explanation);
// 	$(".explanation").removeClass("hidden");
// }

// function hideExplanation() {
// 	$(".explanation").addClass("hidden");
// }

// function showAlternateMeanings() {
// 	if(!correctAnswer || typeof correctAnswer === "string") {
// 		return;
// 	}

// 	$(".alternate-meanings").text('Also means:');

// 	_.each(correctAnswer, function(answer) {
// 		$(".alternate-meanings").append('<li>' + answer + '</li>');
// 	});

// 	$(".alternate-meanings").removeClass("hidden");
// }

// function hideAlternateMeanings() {
// 	$(".alternate-meanings").addClass("hidden");
// }

// function showPronunciation() {
// 	$(".pronunciation-container").removeClass("hidden");
// 	$(".pronunciation").text(currentQuery.pronunciation);
// }

// function hidePronunciation() {
// 	$(".pronunciation-container").addClass("hidden");
// }

////////////////////

Thaimemo = {
	init: function(uiHandler) {
		this.currentQuery = undefined;

		uiHandler.setupLessonCheckboxes();

		uiHandler.hideCongrats();
		uiHandler.hidePronunciation();
		uiHandler.hideExplanation();
		uiHandler.hideAlternateMeanings();
		
		uiHandler.setKeyboardFocus();
		uiHandler.registerTypeEvent(_.bind(this.evaluateCallback, this));
		uiHandler.registerEnterEvent(_.bind(this.sendEnterCallback, this));

		this.uiHandler = uiHandler;

		return this;
	},
	
	evaluateCallback: function(answer) {
		this.answer(answer);
	},

	sendEnterCallback: function() {
		if(this.answeredCorrectly) {
			this.nextQuery();
			this.uiHandler.clearInput();
			this.uiHandler.clearHint();
			this.uiHandler.hideCongrats();
			this.uiHandler.hidePronunciation();
			this.uiHandler.hideExplanation();
			this.uiHandler.hideAlternateMeanings();
		}
	},

	loadFromFile: function(list) {
		this.load(this.generateLessonList(list));
	},

	load: function(listToLoad) {
		this.lessons = listToLoad;
	},

	generateLessonList: function(lessons) {
		var activeLessons = 
			_.compact(
				_.map($(".lessons .lesson input"), function(lessonSelector) {
			return lessonSelector.checked && lessonSelector.name;
		})
		);

		list = _.compact(_.map(lessons, function(lesson) {
			// if(_.contains(activeLessons, lesson.name)) {
				return lesson.contents;
			// }
		}));

		return list;
	},

	nextQuery: function() {
		if(this.lessons.length === 0) {
			throw('Failed to load nextQuery: No lessons set.');
			return false;
		}

		var typeId = this.random(this.lessons.length);
		var id = this.random(this.lessons[typeId].length);
		var lesson = this.lessons[typeId];
		var data = lesson[id];
		this.currentQuery = data;

		this.uiHandler.setQuery(data.thai);
		this.uiHandler.setInstructions(this.instructions());
	},

	instructions: function() {
		if(this.currentQuery.german) {
			return "Pronounce, then type romanization";
		} else if(this.currentQuery.english) {
			return "Pronounce, then type translation";
		} else {
			return "Pronounce, then hit enter";
		}
	},

	random: function(limit) {
		return Math.floor(Math.random() * limit);
	},

	answer: function(answer) {
		this.answeredCorrectly = false;
		var correct = this.isAnswerCorrect(answer);
		var response = {
			hint: this.hint(answer),
			correct: correct
		};

		if(correct) {
			this.answeredCorrectly = true;
			this.uiHandler.showPronunciation();
			this.uiHandler.showCongrats();

			response.pronunciation = this.pronunciation();

			if(this.currentQuery.explanation) {
				this.uiHandler.showExplanation(this.currentQuery.explanation);
			}

			if(typeof this.currentQuery.english === 'object') {
				this.uiHandler.showAlternateMeanings(this.currentQuery.english);
			}
		}

		this.uiHandler.showHint(this.hint(answer));
		return response;
	},

	hint: function(answer) {
		var text = "";

		for(i = 0; i < answer.length; i++) {
			var correctLetters = this.getCorrectLetters(this.correctAnswer(), i, answer);
			var typedLetter = answer.charAt(i);
			if(_.contains(correctLetters, typedLetter)) {
				text += typedLetter;
			} else {
				text += '_';
			}
		}

		return text;
	},

	getCorrectLetters: function(correctAnswers, i, answer) {
		if(typeof correctAnswers === "string") {
			for(j = 0; j < i ; j++) {
				if(correctAnswers.charAt(j) != answer.charAt(j)) {
					return false;
				}
			}
			return [correctAnswers.charAt(i)];
		}

		return _.compact(_.flatten(_.map(correctAnswers, function(items) {
			return this.getCorrectLetters(items, i, answer);
		}, this)));
	},

	isAnswerCorrect: function(answer) {
		return this.answerExplainedRec(this.correctAnswer(), answer);
	},

	answerExplainedRec: function(correctAnswer, answer) {
		if(!correctAnswer && this.answerExplained) {
			return true;
		}

		if(typeof correctAnswer === "string") {
			return answer === correctAnswer;
		}

		return _.find(correctAnswer, function(item) {
			if(this.answerExplainedRec(item, answer)) {
				return true;
			}
		}, this);
	},

	correctAnswer: function() {
		return this.currentQuery.german || this.currentQuery.english;
	},

	pronunciation: function() {
		return this.currentQuery.pronunciation;
	}
};
