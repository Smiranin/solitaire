"use strict";
class Deck {
    constructor() {
        this.VALUE_OF_CARDS = 13;
        this._NUMBER_OF_SUIT = 4;
    }

    createDeck() {
        var array = [];

        for (var i = 1; i <= this._NUMBER_OF_SUIT; i++) {

            for (var k = 0; k < this.VALUE_OF_CARDS; k++) {
                array.push(this._createOneCard(k, i));
            }
        }
        return array;
    }

    /*Create a card where value = "0 - Ace", "1 - deuce", "2 - triple", etc.
     suit = "1 - hearts", "2 - clubs", etc.
     color = "odd - red", "even numbered - black".*/
    _createOneCard(value, suite) {
        var color = suite % 2;
        return {value: value, suit: suite, color: color};
    }
}