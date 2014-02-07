// This function is completely covered
exports.all = function () {
    var x = 0;

    for (var i = 0; i < 5; i++) {
        x++;
    }

    return x;
};

// This function is only half covered
exports.half = function (n) {
    var x = 0;

    for (var i = 0; i < n; i++) {
        x++;
    }

    if (x == 5) {
        return x;
    }

    for (var i = 0; i < 5; i++) {
        x++;
    }

    return x;
};

// This function isn't covered at all
exports.none = function () {
    var x = 0;

    for (var i = 0; i < 5; i++) {
        x--;
    }

    return x;
};
