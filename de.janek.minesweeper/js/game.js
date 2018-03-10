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
        this.generateMines();

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
                newElement.setAttribute("id", rows + "-" + cols);
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
    generateMines() {

        for (var mineCounter = 0; mineCounter < this.mines; mineCounter++) {
            var field;
            do {
                var x = Math.floor(Math.random() * this.height);
                var y = Math.floor(Math.random() * this.width);
                field = this.getFieldFromPos(x,y);
            } while(field.mine);
            field.setAsMine();
        }
        this.computeFieldImages();

    }

    /**
     * computes the number of mines around of each field and sets the image
     */
    computeFieldImages() {

        for (var index in this.fields) {
            var field = this.fields[index];

            //mine images are already set
            if (!field.mine) {

                var positionsToCheck = [];
                positionsToCheck.push(new Pos(field.pos.x, field.pos.y - 1));
                positionsToCheck.push(new Pos(field.pos.x, field.pos.y + 1));
                positionsToCheck.push(new Pos(field.pos.x - 1, field.pos.y));
                positionsToCheck.push(new Pos(field.pos.x + 1, field.pos.y));
                positionsToCheck.push(new Pos(field.pos.x + 1, field.pos.y + 1));
                positionsToCheck.push(new Pos(field.pos.x + 1, field.pos.y - 1));
                positionsToCheck.push(new Pos(field.pos.x - 1, field.pos.y + 1));
                positionsToCheck.push(new Pos(field.pos.x - 1, field.pos.y - 1));

                var numberOfMinesAround = 0;
                for (var i in positionsToCheck) {
                    var pos = positionsToCheck[i];
                    //check if the positions are in the gameboard and if they are mines
                    if (pos.x >= 0 && pos.x < this.height
                        && pos.y >= 0 && pos.y < this.width) {
                        var field = this.getFieldFromPos(pos.x, pos.y);
                        alert(field.pos.x + " " + field.pos.y);
                        if (field.mine) numberOfMinesAround++;
                    }
                }

                switch (numberOfMinesAround) {
                    case 0:
                        field.imagePath = "images/field_blank.png";
                        break;
                    case 1:
                        field.imagePath = "images/one.png";
                        break;
                    case 2:
                        field.imagePath = "images/two.png";
                        break;
                    case 3:
                        field.imagePath = "images/three.png";
                        break;
                    case 4:
                        field.imagePath = "images/four.png";
                        break;
                    default:
                        field.imagePath = "images/higher.png";
                        break;
                    //TODO: die anderen halt noch @jonas
                }
            }
            field.uncover();
        }

    }

    /**
     * search the field with the position
     * @param x horizontal value
     * @param y vertical value
     * @returns field
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

    /**
     * creates new Field
     * @param game game
     * @param element element of HTML document
     * @param x horizontal value
     * @param y vertical value
     */
    constructor(game, element, x, y) {

        this.game = game;
        this.element = element;
        this.pos = new Pos(x, y);
        this.covered = true;
        this.mine = false;
        this.imagePath = null;
        //TODO: später
        //this.setImage("images/field_covered.png");
        this.setImage("images/field_blank.png");

        element.addEventListener("click",  function (ev) {
            alert(this.pos.x + " " + this.pos.y);
        });

    }

    /**
     * uncovers field and call end of game if the field is a mine
     */
    uncover() {

        this.covered = false;
        this.setImage(this.imagePath);
        //if (this.mine) this.game.end();

    }

    setImage(path) {
        this.element.setAttribute("src", path);
    }

    /**
     * sets field as a mine
     */
    setAsMine() {
        this.mine = true;
        this.setImage("images/mine.png");
    }

}

class Pos {

    /**
     * creates a new Position
     * @param x horizontal value
     * @param y vertical value
     */
    constructor(x, y) {

        this.x = x;
        this.y = y;

    }

}

class Timer {

    /**
     * creates a new Timer
     */
    constructor() {
        this.intervalFunction = null;
        this.updateSeconds();
    }

    /**
     * updates the timer element every second
     */
    updateSeconds() {
        var seconds = 0;
        this.intervalFunction = setInterval(function () {
            seconds++;
            document.getElementById("secCounter").innerHTML = "" + seconds;
        }, 1000);
    }

    /**
     * stops the timer and the end of the game
     */
    stop() {
        clearInterval(this.intervalFunction);
    }

}