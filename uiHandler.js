UiHandler = {
	init: function() {
		return this;
	},

	setupLessonCheckboxes: function() {
	},

	setKeyboardFocus: function() {
		$("input.answer").focus();
	},

	registerEvents: function(callback) {
		this.evaluateCallback = callback;
		$("input.answer").keyup(_.bind(this.sendAnswer, this));
	},

	sendAnswer: function() {
		if(!this.evaluateCallback) {
			throw("No callback method set from UiHandler to Thaimemo.");
		}
		this.evaluateCallback($("input.answer").val());
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
		$(".congrats").hide();
	},

	hideAlternateMeanings: function() {
		$(".alternate-meanings").hide();
	},
};
