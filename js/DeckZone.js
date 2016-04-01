"use strict";
class DeckZone extends Zone{
    constructor(options){
        super(options);

        this._home = document.getElementById("dz-home");
        this._homeOpen = document.getElementById("dz-home-open");

        this._home.addEventListener("click", this._initClickInHome.bind(this));

    }

    _addCardsInDeckZoneAtGameStart(arr){
        
        for(var i = 0; i < arr.length; i++){
            this._home.children[i].value = arr[i].value;
            this._home.children[i].suit = arr[i].suit;
            this._home.children[i].color = arr[i].color;
        }
    }

    _initClickInHome(){

        var homeLength = this._home.children.length;
        if( homeLength > 0){

                let elem = this._home.children[homeLength - 1];
                elem.style.backgroundImage = this.PATH_PREFIX + "/" + elem.suit + "/" + elem.value + this.PATH_POSTFIX;
                elem.className = "active";
                
                this._homeOpen.appendChild(elem);

            return;
        }

        this._backInHome();
    }

    _backInHome(){

        var lastChild = this._homeOpen.children.length - 1;

        for(; lastChild >= 0; lastChild-- ){

            let elem = this._homeOpen.children[lastChild];
            elem.style.backgroundImage = "";
            elem.className = "";

            this._home.appendChild(elem);
        }
    }
}