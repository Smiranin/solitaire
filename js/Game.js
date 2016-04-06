"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(options) {
        _classCallCheck(this, Game);

        this._el = options.element;
        this._coordGameField = getCoords(this._el);

        this._deck = new Deck();
        this._deckZone = new DeckZone({
            element: document.getElementById('deck-zone')
        });
        this._finalZone = new FinalZone({
            element: document.getElementById('final-zone')
        });
        this._sortZone = new SortZone({
            element: document.getElementById('sort-zone')
        });

        this._DECK_ARRAY = this._deck.createDeck();
        this._dragObjects = [];

        this._el.oncontextmenu = this._topCardsToFinalZone.bind(this);
        this._el.addEventListener("mousedown", this._onMouseDown.bind(this));

        document.addEventListener("mousemove", this._onMouseMove.bind(this));
        document.addEventListener("mouseup", this._onMouseUp.bind(this));
    }

    _createClass(Game, [{
        key: '_createNewGame',
        value: function _createNewGame() {
            var numberCardsForSortZone = 28;
            var newDeck = this._DECK_ARRAY.shuffle();

            var arrForSortZone = newDeck.slice(-numberCardsForSortZone);
            var arrForDeckZone = newDeck.slice(0, -numberCardsForSortZone);

            this._sortZone._addCardsInSortZoneAtGameStart(arrForSortZone);
            this._deckZone._addCardsInDeckZoneAtGameStart(arrForDeckZone);
        }
    }, {
        key: '_onMouseDown',
        value: function _onMouseDown(event) {

            if (event.which != 1) {
                return;
            }
            var elem = event.target.closest(".active");
            if (!elem) {
                return;
            }

            var parent = elem.parentNode;
            var prevSibling = elem.previousElementSibling || 0;

            while (elem) {

                var downX = event.pageX;
                var downY = event.pageY;
                var elemCoords = getCoords(elem);

                var shiftX = downX - elemCoords.left;
                var shiftY = downY - elemCoords.top;

                this._dragObjects.push({
                    elem: elem, downX: downX, downY: downY, shiftX: shiftX, shiftY: shiftY,
                    parent: parent, marginTop: elem.style.marginTop, prevSib: prevSibling
                });

                elem = elem.nextElementSibling;
            }

            this._startDrag();
            //console.log(this._dragObjects);
            return false;
        }
    }, {
        key: '_startDrag',
        value: function _startDrag() {

            for (var i = 0; i < this._dragObjects.length; i++) {

                document.body.appendChild(this._dragObjects[i].elem);

                this._dragObjects[i].elem.style.left = this._dragObjects[i].downX - this._dragObjects[i].shiftX + "px";
                this._dragObjects[i].elem.style.top = this._dragObjects[i].downY - this._dragObjects[i].shiftY + "px";

                this._dragObjects[i].elem.style.marginTop = 0;
                this._dragObjects[i].elem.style.zIndex = 1000;
            }
        }
    }, {
        key: '_onMouseMove',
        value: function _onMouseMove(event) {

            //if(!this._dragObjects[0].elem){return false;}

            for (var i = 0; i < this._dragObjects.length; i++) {

                this._dragObjects[i].elem.style.left = event.pageX - this._dragObjects[i].shiftX + 'px';
                this._dragObjects[i].elem.style.top = event.pageY - this._dragObjects[i].shiftY + 'px';
            }
        }
    }, {
        key: '_onMouseUp',
        value: function _onMouseUp(event) {

            if (event.which != 1 && !this._dragObjects[0].elem) {
                return false;
            }

            var target = this._initZoneUnderMouseUp(event);

            if (target == false) {
                this._rollback();
            }

            if (target.zone === 1) {
                this._finishMouseUpForFinalZone(target.elem);
            }
            if (target.zone === 2) {
                this._finishMouseUpForSortZone(target.elem);
            }

            this._dragObjects.length = 0;
        }
    }, {
        key: '_initZoneUnderMouseUp',
        value: function _initZoneUnderMouseUp(event) {

            for (var i = 0; i < this._dragObjects.length; i++) {
                this._dragObjects[i].elem.style.pointerEvents = "none";
            }
            var targetElem = document.elementFromPoint(event.clientX, event.clientY);
            var dragZoneBox = targetElem.closest(".drag-zone-box");

            if (dragZoneBox && dragZoneBox.closest('#final-zone')) {
                return { zone: 1, elem: dragZoneBox };
            }
            if (dragZoneBox && dragZoneBox.closest('#sort-zone')) {
                return { zone: 2, elem: dragZoneBox };
            }
            return false;
        }
    }, {
        key: '_finishMouseUpForFinalZone',
        value: function _finishMouseUpForFinalZone(dragZoneBox) {

            if (this._dragObjects.length > 1) {
                this._rollback();
                return;
            }

            var elem = dragZoneBox.lastElementChild || 0;

            if (!elem && this._dragObjects[0].elem.value == 0 || elem.value + 1 == this._dragObjects[0].elem.value && elem.suit == this._dragObjects[0].elem.suit) {

                dragZoneBox.appendChild(this._dragObjects[0].elem);
                this._dragObjects[0].elem.style.marginTop = 0;

                this._resetStyle();
                this._openPrevSibling();

                this._isWin();
                return;
            }

            this._rollback();
        }
    }, {
        key: '_finishMouseUpForSortZone',
        value: function _finishMouseUpForSortZone(dragZoneBox) {

            var elem = dragZoneBox.lastElementChild || 0;

            if (!elem && this._dragObjects[0].elem.value == this._deck.VALUE_OF_CARDS - 1) {

                var margin = 0;
                for (var i = 0; i < this._dragObjects.length; i++) {

                    dragZoneBox.appendChild(this._dragObjects[i].elem);

                    this._dragObjects[i].elem.style.marginTop = margin + "px";
                    margin += this._sortZone.MARGIN * 3;

                    this._resetStyle(i);
                    this._openPrevSibling();
                }
                return;
            }
            if (elem.value == this._dragObjects[0].elem.value + 1 && elem.color != this._dragObjects[0].elem.color) {

                if (elem.className != 'active') {
                    this._rollback();return;
                }
                var margin2 = parseInt(elem.style.marginTop) || 0;

                for (var k = 0; k < this._dragObjects.length; k++) {

                    dragZoneBox.appendChild(this._dragObjects[k].elem);

                    margin2 += this._sortZone.MARGIN * 3;
                    this._dragObjects[k].elem.style.marginTop = margin2 + "px";

                    this._resetStyle(k);
                    this._openPrevSibling();
                }
                return;
            }

            this._rollback();
        }
    }, {
        key: '_rollback',
        value: function _rollback() {

            for (var i = 0; i < this._dragObjects.length; i++) {

                this._dragObjects[i].parent.appendChild(this._dragObjects[i].elem);
                this._dragObjects[i].elem.style.marginTop = this._dragObjects[i].marginTop;

                this._resetStyle(i);
            }
        }
    }, {
        key: '_openPrevSibling',
        value: function _openPrevSibling() {
            var i = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

            if (this._dragObjects[i].prevSib == 0) {
                return false;
            }

            var elem = this._dragObjects[i].prevSib;
            elem.className = "active";
            elem.style.backgroundImage = this._sortZone.PATH_PREFIX + "/" + elem.suit + "/" + elem.value + this._sortZone.PATH_POSTFIX;
        }
    }, {
        key: '_resetStyle',
        value: function _resetStyle() {
            var i = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

            this._dragObjects[i].elem.style.pointerEvents = "auto";
            this._dragObjects[i].elem.style.top = 0;
            this._dragObjects[i].elem.style.left = 0;
            this._dragObjects[i].elem.style.zIndex = 0;
        }
    }, {
        key: '_topCardsToFinalZone',
        value: function _topCardsToFinalZone() {

            var status = 0;
            var topElem = this._el.querySelectorAll(".zone-top > p:last-child");
            var dragBoxInFinalZone = this._finalZone._el.querySelectorAll(".drag-zone-box");

            for (var i = 0; i < topElem.length; i++) {

                for (var k = 0; k < dragBoxInFinalZone.length; k++) {

                    var finalElem = dragBoxInFinalZone[k].lastChild || 0;

                    if (finalElem == 0) {

                        if (topElem[i].value == 0) {

                            this._moveTopCard(topElem[i], dragBoxInFinalZone[k]);
                            status = 1;
                        }
                        continue;
                    }
                    if (topElem[i].value - 1 == finalElem.value && topElem[i].suit == finalElem.suit) {

                        this._moveTopCard(topElem[i], dragBoxInFinalZone[k]);
                        status = 1;
                    }
                }
            }

            if (status == 1) {
                this._topCardsToFinalZone();
                return false;
            }
            this._isWin();
            return false;
        }
    }, {
        key: '_moveTopCard',
        value: function _moveTopCard(topElem, parentFinalElem) {

            var openSibling = topElem.previousElementSibling || 0;
            topElem.style.marginTop = 0;
            parentFinalElem.appendChild(topElem);

            if (openSibling !== 0) {
                openSibling.className = "active";
                openSibling.style.backgroundImage = this._sortZone.PATH_PREFIX + "/" + openSibling.suit + "/" + openSibling.value + this._sortZone.PATH_POSTFIX;
            }
        }
    }, {
        key: '_isWin',
        value: function _isWin() {

            var win = this._finalZone._el.querySelectorAll('p').length;
            if (win == this._DECK_ARRAY.length) {
                setTimeout(function () {
                    alert("You win!!!");
                });
            }
        }
    }]);

    return Game;
}();