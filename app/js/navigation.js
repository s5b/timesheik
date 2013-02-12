var s5b = s5b || {};

s5b.navigation = function (navigation_definition, event, decrement, increment) {
    var config = navigation_definition.split(',');
    var row_count = parseInt(config[0], 10);
    var row_index = parseInt(config[1], 10);
    var trim = function (subject) {
        return subject.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    };
    var id_prefix_this_column = trim(config[2]);
    var id_prefix_left_column = trim(config[3]);
    var id_prefix_right_column = trim(config[4]);
    event.preventDefault();
    console.log('keyCode: ' + event.keyCode);
    console.log('shift: ' + event.shiftKey);
    console.log(event);
    if (event.keyCode === 38) {             // Up arrow.
        document.getElementById(id_prefix_this_column + '_' + ((row_index + row_count - 1) % row_count)).focus();
    } else if (event.keyCode === 40) {      // Down arrow.
        document.getElementById(id_prefix_this_column + '_' + ((row_index + row_count + 1) % row_count)).focus();
    } else if (event.keyCode === 37) {      // Left arrow.
        document.getElementById(id_prefix_left_column + '_' + row_index).focus();
    } else if (event.keyCode === 39) {      // Right arrow.
        document.getElementById(id_prefix_right_column + '_' + row_index).focus();
    } else if (event.keyCode === 189) {     // Minus key. (chrome)
        decrement();
    } else if (event.keyCode === 109) {     // Minus key. (firefox - numeric pad)
        decrement();
    } else if (!event.shiftKey && event.keyCode === 173) {     // Minus key. (firefox - main keyboard)
        decrement();
    } else if (event.keyCode === 187) {     // Plus key. (chrome)
        increment();
    } else if (event.keyCode === 107) {     // Plus key. (firefox - numeric pad)
        increment();
    } else if (event.shiftKey && event.keyCode === 61) {     // Plus key. (firefox - main keyboard)
        increment();
    } else {
        // Do nothing;
    }
};
