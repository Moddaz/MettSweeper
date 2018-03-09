'use strict';


class Game {

    constructor(height, width, mines) {

        this.fields = [];
        this.height = height;
        this.width = width;
        this.mines = mines;
        document.getElementById("mineCounter").innerHTML = this.mines;
        this.timer = new Timer();
        this.generateGameboard();

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

}

class Field {

    constructor(element, x, y) {

        this.element = element;
        this.pos = new Pos(x, y);
        this.covered = true;
        this.mine = false;
        this.setImage("images/field_covered.png");

    }

    setImage(path) {
        this.element.setAttribute("src", path);
    }

}

class Pos {

    constructor(x, y) {

        this.x = x;
        this.y = y;

    }

}

class Timer {

    constructor() {
        this.intervalFunction = null;
        this.updateSeconds();
    }

    updateSeconds() {
        var seconds = 0;
        this.intervalFunction = setInterval(function () {
            seconds++;
            document.getElementById("secCounter").innerHTML = "" + seconds;
        }, 1000);
        //Wird jede Sekunde ausgeführt
    }

    end() {
        clearInterval(this.intervalFunction);
    }

}