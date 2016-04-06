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

function reloadGame() {

    document.body.innerHTML = '<div id="game-field"><div id="btn"></div><div onclick="reloadGame()" id="reload">Новая игра</div><div id="text">Косынка</div> <div id="deck-zone"> <div id="dz-home" class="box"> <p></p> <p></p> <p></p> <p></p> <p></p> <p></p> <p></p> <p></p> <p></p> <p></p> <p></p> <p></p> <p></p> <p></p> <p></p> <p></p> <p></p> <p></p> <p></p> <p></p> <p></p> <p></p> <p></p> <p></p> </div> <div id="dz-home-open" class="box drag-zone-box zone-top"> </div> </div> <div id="final-zone"> <div class="box drag-zone-box"></div> <div class="box drag-zone-box"></div> <div class="box drag-zone-box"></div> <div class="box drag-zone-box"></div> </div> <div id="sort-zone"> <div id="sz-1" class="box drag-zone-box zone-top"> <p></p> </div> <div id="sz-2" class="box drag-zone-box zone-top"> <p></p> <p></p> </div> <div id="sz-3" class="box drag-zone-box zone-top"> <p></p> <p></p> <p></p> </div> <div id="sz-4" class="box drag-zone-box zone-top"> <p></p> <p></p> <p></p> <p></p> </div> <div id="sz-5" class="box drag-zone-box zone-top"> <p></p> <p></p> <p></p> <p></p> <p></p> </div> <div id="sz-6" class="box drag-zone-box zone-top"> <p></p> <p></p> <p></p> <p></p> <p></p> <p></p> </div> <div id="sz-7" class="box drag-zone-box zone-top"> <p></p> <p></p> <p></p> <p></p> <p></p> <p></p> <p></p> </div> </div> </div>';

    var newGame = new Game({
        element: document.getElementById('game-field')
    });
    newGame._createNewGame();
    var btn = document.getElementById("reload");
    btn.onclick = reloadGame;
}