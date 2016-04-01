'use strict';

Array.prototype.shuffle = function (b) {
    var i = this.length,
        j,
        t;
    while (i) {
        j = Math.floor(i-- * Math.random());
        t = b && typeof this[i].shuffle !== 'undefined' ? this[i].shuffle() : this[i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
};

function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}