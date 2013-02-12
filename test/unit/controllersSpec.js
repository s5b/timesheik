describe('Timesheik', function () {
    var timesheik;
    var scope;

    beforeEach(function () {
        scope = {};
        timesheik = new Timesheik(scope);
    });

    it('should initialise seven days', function () {
        expect(scope.days.length).toBe(7);
    });

    it('should calculate the normal working hours', function () {
        scope.days[0].start = '9:45';
        scope.days[0].finish = '18:15';
        scope.days[0].break_time = '0:45';
        scope.days[0].overtime = '1:30';

        expect(scope.normal(0)).toBe('6:15');
    });

    it('should calculate the total number of normal hours', function () {
        expect(scope.totalNormal()).toBe('40:00');
    });

    it('should calculate the total number of overtime hours', function () {
        scope.days[2].overtime = '1:15';
        scope.days[3].overtime = '2:30';

        expect(scope.totalOvertime()).toBe('3:45');
    });

    it('should provide consecutive days of the week starting with Saturday', function () {
        expect(scope.dayOfTheWeek(0)).toBe('Saturday');
        expect(scope.dayOfTheWeek(1)).toBe('Sunday');
        expect(scope.dayOfTheWeek(2)).toBe('Monday');
        expect(scope.dayOfTheWeek(3)).toBe('Tuesday');
        expect(scope.dayOfTheWeek(4)).toBe('Wednesday');
        expect(scope.dayOfTheWeek(5)).toBe('Thursday');
        expect(scope.dayOfTheWeek(6)).toBe('Friday');
    });

    it('should format the date in D MMM YY format', function () {
        expect(scope.dayDate(0)).toMatch(/\d+ (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d\d/);
    });
});
