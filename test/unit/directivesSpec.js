describe('directives', function () {
    beforeEach(module('timesheik.directives'));

    describe('s5bSpinAllowance', function () {

        it('should toggle the allowance value when pressing the plus key', function () {
            spyOn(s5b, 'navigation');
            inject(function($compile, $rootScope) {
                $rootScope.myTarget = 'No';
                var element = $compile('<span id="me_0" ng-model="myTarget" s5b-spin-allowance="2,0,me,lefty,righty">{{myTarget}}</span>')($rootScope);
                expect(element.attr('contenteditable')).toBe('true');
//                expect(element.attr('keydown')).toBe(0);
                for (var thing in element[0]) {
                    if (element[0].hasOwnProperty(thing)) {
//                        console.log('----->> ' + thing);
//                        console.log(element[0][thing]);
                    }
                }

//                $(element).trigger('keydown');
//                expect(s5b.navigation).toHaveBeenCalled();

            });
        });
    });
});
