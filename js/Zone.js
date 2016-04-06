"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Zone = function Zone(options) {
    _classCallCheck(this, Zone);

    this._el = options.element;
    this._dropObj = {};

    this.MARGIN = 10;
    this.PATH_PREFIX = "url(../img";
    this.PATH_POSTFIX = '.png)';
};