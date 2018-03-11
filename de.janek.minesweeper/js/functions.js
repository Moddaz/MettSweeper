/*

export { getFieldFromPos, getSurroundingPositions};
import { Pos } from "game";

/!**
 * returns an array with all surrounding positions of a field
 * @param game game
 * @param field field
 * @returns {Array}
 *!/
function getSurroundingPositions(game, field) {

    var positionsToCheck = [];
    positionsToCheck.push(new Pos(field.pos.x, field.pos.y - 1));
    positionsToCheck.push(new Pos(field.pos.x, field.pos.y + 1));
    positionsToCheck.push(new Pos(field.pos.x - 1, field.pos.y));
    positionsToCheck.push(new Pos(field.pos.x + 1, field.pos.y));
    positionsToCheck.push(new Pos(field.pos.x + 1, field.pos.y + 1));
    positionsToCheck.push(new Pos(field.pos.x + 1, field.pos.y - 1));
    positionsToCheck.push(new Pos(field.pos.x - 1, field.pos.y + 1));
    positionsToCheck.push(new Pos(field.pos.x - 1, field.pos.y - 1));

    var surroundingPositionsInGameboard = [];
    for (var index in positionsToCheck) {
        var pos = positionsToCheck[index];
        //check if the positions are in the gameboard and if they are mines
        if (pos.x >= 0 && pos.x < game.height
            && pos.y >= 0 && pos.y < game.width) {
            surroundingPositionsInGameboard.push(pos);
        }
    }
    return surroundingPositionsInGameboard;

}

/!**
 * search the field with the position
 * @param game Game
 * @param x horizontal value
 * @param y vertical value
 * @returns field
 *!/
function getFieldFromPos(game, x, y) {

    var field;
    for (var index in game.fields) {
        field = game.fields[index];
        if (field.pos.x == x && field.pos.y == y) {
            return field;
        }
    }
    return null;

}
*/
