"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeckZone = function (_Zone) {
    _inherits(DeckZone, _Zone);

    function DeckZone(options) {
        _classCallCheck(this, DeckZone);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DeckZone).call(this, options));

        _this._home = document.getElementById("dz-home");
        _this._homeOpen = document.getElementById("dz-home-open");

        _this._home.addEventListener("click", _this._initClickInHome.bind(_this));

        return _this;
    }

    _createClass(DeckZone, [{
        key: "_addCardsInDeckZoneAtGameStart",
        value: function _addCardsInDeckZoneAtGameStart(arr) {

            for (var i = 0; i < arr.length; i++) {
                this._home.children[i].value = arr[i].value;
                this._home.children[i].suit = arr[i].suit;
                this._home.children[i].color = arr[i].color;
            }
        }
    }, {
        key: "_initClickInHome",
        value: function _initClickInHome() {

            var homeLength = this._home.children.length;
            if (homeLength > 0) {

                var elem = this._home.children[homeLength - 1];
                elem.style.backgroundImage = this.PATH_PREFIX + "/" + elem.suit + "/" + elem.value + this.PATH_POSTFIX;
                elem.className = "active";

                this._homeOpen.appendChild(elem);

                return;
            }

            this._backInHome();
        }
    }, {
        key: "_backInHome",
        value: function _backInHome() {

            var lastChild = this._homeOpen.children.length - 1;

            for (; lastChild >= 0; lastChild--) {

                var elem = this._homeOpen.children[lastChild];
                elem.style.backgroundImage = "";
                elem.className = "";

                this._home.appendChild(elem);
            }
        }
    }]);

    return DeckZone;
}(Zone);