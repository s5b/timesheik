/* Directives */

angular.module('timesheik.directives', []).
    directive('s5bSpinDate', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attributes, ngModel) {
                element.attr('contenteditable', true);
                element.bind('keydown', function (event) {
                    s5b.navigation(attributes['s5bSpinDate'], event, function () {
                        scope.$apply(ngModel.$setViewValue(ngModel.$modelValue.subtract('days', 7)));
                    }, function () {
                        scope.$apply(ngModel.$setViewValue(ngModel.$modelValue.add('days', 7)));
                    });
                });
            }
        };
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
                });
            }
        };
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
                                new_value = 'No';
                                break;
                            default:
                                new_value = 'No';
                                break;
                        }
                        scope.$apply(ngModel.$setViewValue(new_value));
                    };
                    s5b.navigation(attributes['s5bSpinAllowance'], event, update_function, update_function);
                });
            }
        };
    });
