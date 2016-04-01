"use strict";
class SortZone extends Zone {
    constructor(options) {
        super(options);
        this._ZONE_LENGTH = this._el.children.length;

    }

    _addCardsInSortZoneAtGameStart(arr) {

        var cnt = arr.length - 1;
        for (var i = 0; i < this._ZONE_LENGTH; i++) {

            this._addOneCardInEachBox(i, arr, cnt);
            cnt = cnt - (this._ZONE_LENGTH - i);
        }
    }

    _addOneCardInEachBox(cell, arr, cnt) {

        var coll = cell;
        var a = 0;
        while (coll < this._ZONE_LENGTH) {
            this._el.children[coll].children[cell].value = arr[cnt - a].value;
            this._el.children[coll].children[cell].suit = arr[cnt - a].suit;
            this._el.children[coll].children[cell].color = arr[cnt - a].color;
            this._addStyleToCard(cell, coll);
            coll++;
            a++;
        }
    }

    _addStyleToCard(i, k) {
        var elem = this._el.children[k].children[i];
        var margin = i * this.MARGIN;
        if (i != 0) {
            elem.style.marginTop = margin + 'px';
        }

        if (i == k) {
            //A unique way for each card
            elem.style.backgroundImage = this.PATH_PREFIX + "/" + elem.suit + "/" + elem.value + this.PATH_POSTFIX;
            elem.className = "active";
        }
    }
}