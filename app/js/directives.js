'use strict';

/* Directives */

s5b = s5b || {};

s5b.navigation = function (navigation_definition, event, decrement, increment) {
//    var config = attributes['s5bSpinDate'].split(',');
    var config = navigation_definition.split(',');
    var row_count = parseInt(config[0], 10);
    var row_index = parseInt(config[1], 10);
    var id_prefix_this_column = config[2].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    var id_prefix_left_column = config[3].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    var id_prefix_right_column = config[4].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    event.preventDefault();
    switch (event.keyCode) {
        case 38:    // Up arrow.
            document.getElementById(id_prefix_this_column + '_' + ((row_index + row_count - 1) % row_count)).focus();
            break;
        case 40:    // Down arrow.
            document.getElementById(id_prefix_this_column + '_' + ((row_index + row_count + 1) % row_count)).focus();
            break;
        case 37:    // Left arrow.
            document.getElementById(id_prefix_left_column + '_' + row_index).focus();
            break;
        case 39:    // Right arrow.
            document.getElementById(id_prefix_right_column + '_' + row_index).focus();
            break;
        case 9:     // Tab key.
            break;
        case 189:   // Minus key.
            decrement();
            break;
        case 187:   // Plus key.
            increment();
            break;
        default:
            // Do nothing.
            break;
    }
};

var mydebug;


angular.module('myApp.directives', []).
    directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]).
    directive('s5bSpinDate', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attributes, ngModel) {
                element.attr('contenteditable', true);
                element.bind('keydown', function (event) {
                    s5b.navigation(attributes['s5bSpinDate'], event, function () {
//                        scope.$apply(ngModel.$setViewValue(ngModel.$viewValue.subtract('days', 7)));
                        scope.$apply(ngModel.$setViewValue(ngModel.$modelValue.subtract('days', 7)));
                    }, function () {
                        scope.$apply(ngModel.$setViewValue(ngModel.$modelValue.add('days', 7)));
                    });
                })
            }
        }
    }).
    directive('s5bSpinTime', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attributes, ngModel) {
                element.attr('contenteditable', true);
                element.bind('keydown', function (event) {
                    s5b.navigation(attributes['s5bSpinTime'], event, function () {
                        var new_value = s5b.time_arithmetic(ngModel.$modelValue).subtract('0:15').value();
                        if (new_value.charAt(0) !== '-') {
                            scope.$apply(ngModel.$setViewValue(new_value));
                        }
                    }, function () {
                        scope.$apply(ngModel.$setViewValue(s5b.time_arithmetic(ngModel.$modelValue).add('0:15').value()));
                    });
                })
            }
        }
    }).
    directive('s5bSpinAllowance', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attributes, ngModel) {
                element.attr('contenteditable', true);
                element.bind('keydown', function (event) {
                    var update_function = function () {
                        var new_value;
                        switch (ngModel.$modelValue) {
                            case 'No':
                                new_value = 'Yes';
                                break;
                            case 'Yes':
                            default:
                                new_value = 'No';
                                break;
                        }
                        scope.$apply(ngModel.$setViewValue(new_value));
                    };
                    s5b.navigation(attributes['s5bSpinAllowance'], event, update_function, update_function);
                })
            }
        }
    });
