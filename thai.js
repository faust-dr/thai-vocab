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
		this.finishQuery();
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

			this.showExplanation();
			this.showAlternateMeanings();
		}

		if(!this.isParticle()) {
			this.uiHandler.showHint(this.hint(answer));
		}

		return response;
	},

	showExplanation: function() {
		if(this.currentQuery.explanation) {
			this.uiHandler.showExplanation(this.currentQuery.explanation);
		}
	}, 

	showAlternateMeanings: function() {
		if(typeof this.currentQuery.english === 'object') {
			this.uiHandler.showAlternateMeanings(this.currentQuery.english);
		}
	},

	finishQuery: function() {
		if(this.answeredCorrectly && !this.isParticle()) {
			this.hideInfo();
			this.nextQuery();
		}

		if(this.isParticle()) {
			this.showInfo();

			if(this.particleShown) {
				this.hideInfo();
				this.nextQuery();
				this.particleShown = false;
			} else {
				this.particleShown = true;
			}
		}
	},

	showInfo: function() {
		this.uiHandler.showCongrats();
		this.uiHandler.showPronunciation(this.currentQuery.pronunciation);
		this.showExplanation();
		this.showAlternateMeanings();
	},

	hideInfo: function() {
		this.uiHandler.hideCongrats();
		this.uiHandler.hidePronunciation();
		this.uiHandler.hideExplanation();
		this.uiHandler.hideAlternateMeanings();

		this.uiHandler.clearInput();
		this.uiHandler.clearHint();
	},

	isParticle: function() {
		return !this.currentQuery.english && !this.currentQuery.german;
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
