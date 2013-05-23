describe('Thaimemo', function() {
	var app;
	var uiHandler;
	var testList;

	beforeEach(function() {
		uiHandler = {
			setupLessonCheckboxes: jasmine.createSpy('setupLessonCheckboxes'),
			setQuery: jasmine.createSpy('setQuery'),
			setInstructions: jasmine.createSpy('setInstructions'),
			hideCongrats: jasmine.createSpy('hideCongrats'),
			hidePronunciation: jasmine.createSpy('hidePronunciation'),
			hideExplanation: jasmine.createSpy('hideExplanation'),
			hideAlternateMeanings: jasmine.createSpy('hideAlternateMeanings'),
			setKeyboardFocus: jasmine.createSpy('setKeyboardFocus'),
			registerEvents: jasmine.createSpy('registerEvents'),
			showPronunciation: jasmine.createSpy('showPronunciation'),
			showCongrats: jasmine.createSpy('showCongrats'),
			showExplanation: jasmine.createSpy('showExplanation'),
			showAlternateMeanings: jasmine.createSpy('showAlternateMeanings'),
		};

		app = Thaimemo.init(uiHandler);
		testList = [ [ { english: "cost", thai: "ค่า", pronunciation: "kah" } ] ];
		app.load(testList);
	});

	describe('initialize', function() {
		it('sets up lesson checkboxes', function() {
			expect(uiHandler.setupLessonCheckboxes).toHaveBeenCalled();
		});

		it('hides Congrats, Pronunciation, Explanation, Alternate Meanings', function() {
			expect(uiHandler.hideCongrats).toHaveBeenCalled();
			expect(uiHandler.hidePronunciation).toHaveBeenCalled();
			expect(uiHandler.hideExplanation).toHaveBeenCalled();
			expect(uiHandler.hideAlternateMeanings).toHaveBeenCalled();
		});

		it('sets keyboard focus on the input field', function() {
			expect(uiHandler.setKeyboardFocus).toHaveBeenCalled();
		});

		it('registers the keyup event on the input field with a callback', function() {
			expect(uiHandler.registerEvents).toHaveBeenCalled();
		});
	});

	describe('re-formatting the word list', function() {
		it('produces the right format', function() {
			var oneLesson = [
				{ english: "menu", thai: "เมนู", pronunciation: "may-nuh" },
				{ english: "like to", thai: "อยากจะ", pronunciation: "yahk ja" },
				{ explanation: "(formal)", english: "to eat", thai: "ทาน", pronunciation: "tahn" },
			];

			var everyLesson = [
				{ name: "The test lesson", contents: oneLesson },
			];

			expect(app.generateLessonList(everyLesson)).toEqual([
				[
					{ english: "menu", thai: "เมนู", pronunciation: "may-nuh" },
					{ english: "like to", thai: "อยากจะ", pronunciation: "yahk ja" },
					{ explanation: "(formal)", english: "to eat", thai: "ทาน", pronunciation: "tahn" },
				]
			]);
		});
	});
	
	describe('when asking for a query', function() {
		it('shows a word', function() {
			app.nextQuery();
			expect(uiHandler.setQuery).toHaveBeenCalledWith('ค่า');
			expect(uiHandler.setInstructions).toHaveBeenCalledWith('Pronounce, then type translation');
		});
	});

	describe('different instructions for different queries', function() {
		it('shows a word', function() {
			var testList = [ [ { english: "cost", thai: "ค่า", pronunciation: "kah" } ] ];
			app.load(testList);
			app.nextQuery();
			expect(uiHandler.setQuery).toHaveBeenCalledWith('ค่า');
			expect(uiHandler.setInstructions).toHaveBeenCalledWith('Pronounce, then type translation');
		});

		it('shows a particle', function() {
			var testList = [ [ { explanation: "(male polite particle)", thai: "ครับ", pronunciation: "krap" } ] ];
			app.load(testList);
			app.nextQuery();
			expect(uiHandler.setQuery).toHaveBeenCalledWith('ครับ');
			expect(uiHandler.setInstructions).toHaveBeenCalledWith('Pronounce, then hit enter');
		});

		it('shows a consonant/vowel', function() {
			var testList = [ [ { german: "k", thai: "ฆ", pronunciation: "ko (low)" } ] ];
			app.load(testList);
			app.nextQuery();
			expect(uiHandler.setQuery).toHaveBeenCalledWith('ฆ');
			expect(uiHandler.setInstructions).toHaveBeenCalledWith('Pronounce, then type romanization');
		});
	});

	describe('user enters an answer', function() {
		beforeEach(function() {
			app.nextQuery();
		});

		it('returns that the answer is correct', function() {
			expect(app.answer('cost')).toEqual({ hint: 'cost', pronunciation: 'kah', correct: true });
			expect(uiHandler.showPronunciation).toHaveBeenCalled();
			expect(uiHandler.showCongrats).toHaveBeenCalled();
		});

		it('returns that the answer is incorrect', function() {
			expect(app.answer('fish')).toEqual({ hint: '____', correct: false });
			expect(uiHandler.showPronunciation).not.toHaveBeenCalled();
			expect(uiHandler.showCongrats).not.toHaveBeenCalled();
		});

		it('returns that the answer is partially correct', function() {
			expect(app.answer('coll')).toEqual({ hint: 'co__', correct: false });
			expect(uiHandler.showPronunciation).not.toHaveBeenCalled();
			expect(uiHandler.showCongrats).not.toHaveBeenCalled();
		});
	});

	describe('different kinds of information for answers', function() {
		it('has an explanation', function() {
			var testList = [ [ { explanation: "an explanation", english: "cost", thai: "ค่า", pronunciation: "kah" } ] ];
			app.load(testList);
			app.nextQuery();
			app.answer('cost');
			expect(uiHandler.showExplanation).toHaveBeenCalledWith('an explanation');
		});

		it('has no explanation', function() {
			app.nextQuery();
			app.answer('cost');
			expect(uiHandler.showExplanation).not.toHaveBeenCalled();
		});

		it('has alternate meanings', function() {
			var testList = [ [ { english: ["cost", "testMeaning"], thai: "ค่า", pronunciation: "kah" } ] ];
			app.load(testList);
			app.nextQuery();
			app.answer('cost');
			expect(uiHandler.showAlternateMeanings).toHaveBeenCalledWith(["cost", "testMeaning"]);
		});

		it('has no alternate meanings', function() {
			app.load(testList);
			app.nextQuery();
			app.answer('cost');
			expect(uiHandler.showAlternateMeanings).not.toHaveBeenCalled();
		});
	});
});
