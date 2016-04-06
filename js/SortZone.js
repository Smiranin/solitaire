"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SortZone = function (_Zone) {
    _inherits(SortZone, _Zone);

    function SortZone(options) {
        _classCallCheck(this, SortZone);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SortZone).call(this, options));

        _this._ZONE_LENGTH = _this._el.children.length;

        return _this;
    }

    _createClass(SortZone, [{
        key: "_addCardsInSortZoneAtGameStart",
        value: function _addCardsInSortZoneAtGameStart(arr) {

            var cnt = arr.length - 1;
            for (var i = 0; i < this._ZONE_LENGTH; i++) {

                this._addOneCardInEachBox(i, arr, cnt);
                cnt = cnt - (this._ZONE_LENGTH - i);
            }
        }
    }, {
        key: "_addOneCardInEachBox",
        value: function _addOneCardInEachBox(cell, arr, cnt) {

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
    }, {
        key: "_addStyleToCard",
        value: function _addStyleToCard(i, k) {
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
    }]);

    return SortZone;
}(Zone);