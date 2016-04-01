"use strict";
class Zone {
    constructor(options) {
        this._el = options.element;
        this._dropObj = {};

        this.MARGIN = 10;
        this.PATH_PREFIX = "url(../img";
        this.PATH_POSTFIX = '.png)';
    }

}
