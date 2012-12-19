'use strict';

describe('time_arithmetic', function () {

    describe('#construction', function () {

        describe('poorly formed initial value throws an exception when', function () {

            it('is null', function () {
                expect(function () {
                    s5b.time_arithmetic(null);
                }).toThrow('Must not be null.');
            });

            it('is empty', function () {
                expect(function () {
                    s5b.time_arithmetic('');
                }).toThrow('Must not be empty.');
            });

            it('is blank', function () {
                expect(function () {
                    s5b.time_arithmetic('  ');
                }).toThrow('Must not be blank.');
            });

            it('is badly formed', function () {
                expect(function () {
                    s5b.time_arithmetic('no good');
                }).toThrow('Malformed time.');
            });

            it('is after 23:59', function () {
                expect(function () {
                    s5b.time_arithmetic('24:33');
                }).toThrow('Malformed time.');
            });

            it('is carrying too many minutes', function () {
                expect(function () {
                    s5b.time_arithmetic('4:93');
                }).toThrow('Malformed time.');
            });

        });


        it('should construct an arithmetic builder that returns the same value when no calculations are performed', function () {
            expect(s5b.time_arithmetic('8:30').value()).toBe('8:30');
        });

    });

    describe('#add', function () {

        it('should add two time values', function () {
            expect(s5b.time_arithmetic('7:45').add('0:06').value()).toBe('7:51');
        });

        it('should add two time values and carry the hours', function () {
            expect(s5b.time_arithmetic('7:45').add('2:16').value()).toBe('10:01');
        });

    });

    describe('#subtract', function () {

        it('should subtract a time value', function () {
            expect(s5b.time_arithmetic('7:45').subtract('0:06').value()).toBe('7:39');
        });

        it('should subtract a time value and carry the hour', function () {
            expect(s5b.time_arithmetic('7:05').subtract('0:37').value()).toBe('6:28');
        });

        it('should subtract a time value and carry the hour', function () {
            expect(s5b.time_arithmetic('2:00').subtract('0:01').value()).toBe('1:59');
        });

        it('should subtract a time value and carry the hour', function () {
            expect(s5b.time_arithmetic('7:45').subtract('2:46').value()).toBe('4:59');
        });

        it('should subtract a large time value and give a negative result', function () {
            expect(s5b.time_arithmetic('1:00').subtract('2:30').value()).toBe('-1:30');
        });

        it('should subtract a slightly larger time value and give a negative result', function () {
            expect(s5b.time_arithmetic('1:00').subtract('1:29').value()).toBe('-0:29');
        });

    });

    describe('chaining arithmetic', function () {

        it('should give 7:00 for nine to five with an hour off for lunch', function () {
            expect(s5b.time_arithmetic('17:00').subtract('9:00').subtract('1:00').value()).toBe('7:00');
        });

        it('should subtract start time (8:30) from finish time (17:45) and then subtract the break (0:50) giving 8:25', function () {
            expect(s5b.time_arithmetic('17:45').subtract('8:30').subtract('0:50').value()).toBe('8:25');
        });

    })

});