UiHandler = {
	init: function() {
		return this;
	},

	setupLessonCheckboxes: function() {
	},

	setKeyboardFocus: function() {
		$("input.answer").focus();
	},

	clearInput: function() {
		$("input.answer").val("");
	},

	registerTypeEvent: function(callback) {
		this.evaluateCallback = callback;
		$("input.answer").keyup(_.bind(this.sendAnswer, this));
	},

	registerEnterEvent: function(callback) {
		this.sendEnterCallback = callback;
		$("input.answer").keyup(_.bind(function(e) {
			if(e.keyCode === 13) {
				this.sendEnter();
			}
		}, this));
	},

	sendAnswer: function() {
		if(!this.evaluateCallback) {
			throw("No type callback method set from UiHandler to Thaimemo.");
		}
		this.evaluateCallback($("input.answer").val());
	},

	sendEnter: function() {
		if(!this.sendEnterCallback) {
			throw("No enter callback method set from UiHandler to Thaimemo.");
		}
		this.sendEnterCallback();
	},

	setQuery: function(query) {
		$(".thai").text(query);
	},

	setInstructions: function(instructions) {
		$(".instruction").text(instructions);
	},

	showPronunciation: function(pronunciation) {
		$(".pronunciation").text(pronunciation);
		$(".pronunciation").show();
	},

	showExplanation: function(explanation) {
		$(".explanation").text(explanation);
		$(".explanation").show();
	},

	showAlternateMeanings: function(meanings) {
		$(".alternate-meanings").text(meanings);
		$(".alternate-meanings").show();
	},

	showCongrats: function(congrats) {
		$(".congrats").text(congrats);
		$(".congrats").show();
	},

	hidePronunciation: function() {
		$(".pronunciation").hide();
	},

	hideExplanation: function() {
		$(".explanation").hide();
	},

	hideCongrats: function() {
		console.log('hiding congrats');
		$(".congrats").hide();
	},

	hideAlternateMeanings: function() {
		$(".alternate-meanings").hide();
	},
};
