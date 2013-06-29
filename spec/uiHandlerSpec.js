describe('UiHandler', function() {
	var uiHandler;

	beforeEach(function() {
		uiHandler = UiHandler.init();
	});

	it('sets up the lesson checkboxes', function() {
		uiHandler.setupLessonCheckboxes(['Lesson 1', 'Lesson 2 & 3']);
		expect($(".lessons")).toContainText('Lesson 1');
		expect($(".lessons")).toContainText('Lesson 2 & 3');
		expect($(".lessons .lesson input[checked=true]").length).toBe(2);
	});

	it('sets the query', function() {
		uiHandler.setQuery('รื');
		expect($(".thai")).toContainText('รื');
	});

	it('sets the instructions', function() {
		uiHandler.setInstructions('do as i say, not as i do');
		expect($(".instruction")).toContainText('do as i say, not as i do');
	});

	it('shows the hint', function() {
		uiHandler.showHint('___');
		expect($(".hint")).toContainText('___');
	});

	it('clears the hint', function() {
		$(".hint").text('try this helpful tip');
		uiHandler.clearHint();
		expect($(".hint")).toContainText('');
	});

	it('shows the pronunciation', function() {
		uiHandler.showPronunciation('hello');
		expect($(".pronunciation")).toContainText('hello');
	});

	it('shows the explanation', function() {
		uiHandler.showExplanation('explain!');
		expect($(".explanation")).toContainText('explain!');
	});

	it('shows the alternate meanings', function() {
		uiHandler.showAlternateMeanings('one and two');
		expect($(".alternate-meanings")).toContainText('one and two');
	});

	it('shows the congrats', function() {
		uiHandler.showCongrats('u rule');
		expect($(".congrats")).toContainText('u rule');
	});
});
