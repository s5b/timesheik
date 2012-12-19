'use strict';

var s5b = s5b || {};

s5b.time_arithmetic = function (initial_value) {

    var make_exception = function (message, subject) {
        return {
            name: 'IllegalArgument',
            message: message,
            subject: subject
        }
    };

    var parse_time = function (candidate_time) {
        var result;
        if (candidate_time === null) {
            throw make_exception('Must not be null.', candidate_time);
        } else if (candidate_time === '') {
            throw make_exception('Must not be empty.', candidate_time);
        } else if (/^\s+$/.test(candidate_time)) {
            throw make_exception('Must not be blank.', candidate_time);
        }
        result = /^\s*(\d|1\d|2[0-3]):([0-5]\d)\s*$/.exec(candidate_time);
        if (result === null) {
            throw make_exception('Malformed time.', candidate_time);
        }
        return [parseInt(result[1], 10), parseInt(result[2], 10)];
    };

    var accumulator = parse_time(initial_value);
    var parameter;
    var hours;
    var minutes;
    var sign;

    var calculator = {
        add: function (time_value) {
            parameter = parse_time(time_value);
            accumulator[0] += parameter[0];
            accumulator[1] += parameter[1];
            return calculator;
        },
        subtract: function (time_value) {
            parameter = parse_time(time_value);
            accumulator[0] -= parameter[0];
            accumulator[1] -= parameter[1];
            return calculator;
        },
        value: function () {
            var result = accumulator[0] * 60 + accumulator[1];
            hours = Math.floor(Math.abs(result) / 60);
            minutes = Math.abs(result) % 60;
            sign = (result < 0) ? '-' : '';
            return '' + sign + hours + ':' + (minutes < 10 ? '0' + minutes : minutes);
        }
    };

    return calculator;
};