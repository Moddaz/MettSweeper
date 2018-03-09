'use strict';

class Game {

    constructor(height, width, mines) {

        this.fields = [];
        this.height = height;
        this.width = width;
        this.mines = mines;
        this.generateGameboard();
        this.generateHeader();

    }

    generateGameboard() {

        var table = document.getElementById("gameboard");

        for (var rows = 0; rows < this.height; rows++) {
            var row = document.createElement("tr");

            for (var cols = 0; cols < this.width; cols++) {
                var data = document.createElement("td");
                var newField = document.createElement("img");
                this.fields.concat(new Field(newField, rows, cols));
                data.appendChild(newField);
                row.appendChild(data);
            }
            table.appendChild(row);
        }

    }

    generateHeader() {
        document.getElementById("mineCounter").innerHTML = this.mines;
        this.updateSeconds();
    }

    updateSeconds() {
        var seconds = 0;
        setInterval(function () {
            seconds++;
            document.getElementById("secCounter").innerHTML = "" + seconds;
        }, 1000);
        //Wird jede Sekunde ausgeführt
    }

}

class Field {

    constructor(element, x, y) {

        this.element = element;
        this.pos = new Pos(x, y);
        this.covered = true;
        this.mine = false;

        element.setAttribute("src", "images/field_covered.png");

    }

}

class Pos {

    constructor(x, y) {

        this.x = x;
        this.y = y;

    }

}