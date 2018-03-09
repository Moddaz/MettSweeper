'use strict';


class Game {

    /**
     * creates new game
     * @param height height of gameboard
     * @param width width of gameboard
     * @param mines amount of mines
     */
    constructor(height, width, mines) {

        this.fields = [];
        this.height = height;
        this.width = width;
        this.mines = mines;
        document.getElementById("mineCounter").innerHTML = this.mines;
        this.timer = new Timer();
        this.generateGameboard();
        this.generateBombs();

    }

    /**
     * generates fields
     */
    generateGameboard() {

        var table = document.getElementById("gameboard");

        for (var rows = 0; rows < this.height; rows++) {
            var row = document.createElement("tr");

            for (var cols = 0; cols < this.width; cols++) {
                var data = document.createElement("td");
                var newElement = document.createElement("img");
                this.fields.push(new Field(this, newElement, rows, cols));
                data.appendChild(newElement);
                row.appendChild(data);
            }
            table.appendChild(row);
        }

    }

    /**
     * spreads mines over the fields randomly
     */
    generateBombs() {

        for (var mineCounter = 0; mineCounter < this.mines; mineCounter++) {
            var field;
            do {
                var x = Math.floor(Math.random() * this.height);
                var y = Math.floor(Math.random() * this.width);
                field = this.getFieldFromPos(x,y);
            } while(field.mine);
            field.setAsMine();
        }
    }

    /**
     * search the field with the position
     * @param x x from position
     * @param y y from position
     * @returns {*}
     */
    getFieldFromPos(x,y) {

        var field;
        for (var index in this.fields) {
            field = this.fields[index];
            if (field.pos.x == x && field.pos.y == y) {
                return field;
            }
        }
        return null;

    }

    end() {
        //TODO: alle aufdecken
        this.timer.stop();
    }

}

class Field {

    constructor(game, element, x, y) {

        this.game = game;
        this.element = element;
        this.pos = new Pos(x, y);
        this.covered = true;
        this.mine = false;
        this.setImage("images/field_blank.png");

        element.addEventListener("click", function (ev) {
            alert(this.pos.x + " " + this.pos.y);
        });

    }

    uncover() {
        this.covered = false;

    }

    setImage(path) {
        this.element.setAttribute("src", path);
    }

    setAsMine() {
        this.mine = true;
        this.setImage("images/mine.png");
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

    stop() {
        clearInterval(this.intervalFunction);
    }

}

function printDebugMessage(message) {
    var child = document.createElement("p");
    child.innerHTML = message;
    document.getElementById("test").appendChild(child);
}