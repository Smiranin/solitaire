"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Deck = function () {
    function Deck() {
        _classCallCheck(this, Deck);

        this.VALUE_OF_CARDS = 13;
        this._NUMBER_OF_SUIT = 4;
    }

    _createClass(Deck, [{
        key: "createDeck",
        value: function createDeck() {
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

    }, {
        key: "_createOneCard",
        value: function _createOneCard(value, suite) {
            var color = suite % 2;
            return { value: value, suit: suite, color: color };
        }
    }]);

    return Deck;
}();