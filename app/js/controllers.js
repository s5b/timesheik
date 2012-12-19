'use strict';

/* Controllers */


function Timesheet($scope) {

    var index;
    var row;

    var total_column = function (modulo, column_reference) {
        var total = s5b.time_arithmetic('0:00');
        for (index = 0; index < modulo; index += 1) {
            total.add(column_reference(index));
        }
        return total.value();
    };

    var init_base_date = function () {
        var base_date = moment();
        var dow = parseInt(base_date.format('d'), 10);
        base_date = base_date.subtract('days', (dow + 1) % 7 + 7);
        return base_date;
    };

    $scope.base_date = init_base_date();
    $scope.days = [
        { start: '0:00', finish: '0:00',  break_time: '0:00', overtime: '0:00', allowance: 'No' },
        { start: '0:00', finish: '0:00',  break_time: '0:00', overtime: '0:00', allowance: 'No' },
        { start: '8:30', finish: '17:30', break_time: '1:00', overtime: '0:00', allowance: 'No' },
        { start: '8:30', finish: '17:30', break_time: '1:00', overtime: '0:00', allowance: 'No' },
        { start: '8:30', finish: '17:30', break_time: '1:00', overtime: '0:00', allowance: 'No' },
        { start: '8:30', finish: '17:30', break_time: '1:00', overtime: '0:00', allowance: 'No' },
        { start: '8:30', finish: '17:30', break_time: '1:00', overtime: '0:00', allowance: 'No' }
    ];

    $scope.normal = function (index) {
        row = this.days[index];
        return s5b.time_arithmetic(row.finish).subtract(row.start).subtract(row.break_time).subtract(row.overtime).value();
    };

    $scope.totalNormal = function () {
        return total_column($scope.days.length, function (index) { return $scope.normal(index)});
    };

    $scope.totalOvertime = function () {
        return total_column($scope.days.length, function (index) { return $scope.days[index].overtime});
    };

    $scope.dayOfTheWeek = function (index) {
        return this.base_date.clone().add('days', index).format('dddd');
    };

    $scope.dayDate = function (index) {
        return this.base_date.clone().add('days', index).format('D MMM YY');
    }
}

Timesheet.$inject = ['$scope'];
