describe('navigation', function () {

    var event;
    var nav_def;

    beforeEach(function () {
        event = { preventDefault: function () { } };
        nav_def = '3,1,me,lefty,righty';
        spyOn(event, 'preventDefault');
    });

    afterEach(function () {
        expect(event.preventDefault).toHaveBeenCalled();
    });

    describe('arrow key navigation', function () {

        var element;

        beforeEach(function () {
            element = { focus: function () { } };

            spyOn(document, 'getElementById').andReturn(element);
            spyOn(element, 'focus');
        });

        afterEach(function () {
            expect(element.focus).toHaveBeenCalled();
        });

        describe('up arrow key press', function () {

            beforeEach(function () {
                event.keyCode = 38;
            });

            it('should focus on the element above when the event is an up arrow key press', function () {
                s5b.navigation(nav_def, event, null, null);
                expect(document.getElementById).toHaveBeenCalledWith('me_0');
            });

            it('should focus on the last element above when the event is an up arrow key press on the first element', function () {
                nav_def = '3,0,me,lefty,righty';
                s5b.navigation(nav_def, event, null, null);
                expect(document.getElementById).toHaveBeenCalledWith('me_2');
            });

        });

        describe('down arrow key press', function () {

            beforeEach(function () {
                event.keyCode = 40;
            });

            it('should focus on the element below when the event is a down arrow key press', function () {
                s5b.navigation(nav_def, event, null, null);
                expect(document.getElementById).toHaveBeenCalledWith('me_2');
            });

            it('should focus on the first element when the event is a down arrow key press on the last element', function () {
                nav_def = '3,2,me,lefty,righty';
                s5b.navigation(nav_def, event, null, null);
                expect(document.getElementById).toHaveBeenCalledWith('me_0');
            });

        });

        describe('left arrow key press', function () {

            it('should focus on the left element when the event is a left arrow key press', function () {
                event.keyCode = 37;
                s5b.navigation(nav_def, event, null, null);
                expect(document.getElementById).toHaveBeenCalledWith('lefty_1');
            });

        });

        describe('right arrow key press', function () {

            it('should focus on the right element when the event is a right arrow key press', function () {
                event.keyCode = 39;
                s5b.navigation(nav_def, event, null, null);
                expect(document.getElementById).toHaveBeenCalledWith('righty_1');
            });

        });
    });

    describe('mutating key press', function () {

        var action;

        beforeEach(function () {
            action = { decrement: function () {}, increment: function () {} };
            spyOn(action, 'decrement');
            spyOn(action, 'increment');
        });

        describe('Chrome keydown events', function () {

            it('should call the decrement function when the CHROME minus key is pressed', function () {
                event.keyCode = 189;
                s5b.navigation(nav_def, event, action.decrement, action.increment);
                expect(action.decrement).toHaveBeenCalled();
                expect(action.increment).not.toHaveBeenCalled();
            });

            it('should call the increment function when the CHROME plus key is pressed', function () {
                event.keyCode = 187;
                s5b.navigation(nav_def, event, action.decrement, action.increment);
                expect(action.decrement).not.toHaveBeenCalled();
                expect(action.increment).toHaveBeenCalled();
            });

        });

    });

});