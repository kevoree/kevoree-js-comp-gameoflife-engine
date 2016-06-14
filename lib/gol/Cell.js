"use strict";
var Cell = (function () {
    function Cell(x, y, qualifier) {
        this.x = 0;
        this.y = 0;
        this.qualifier = "";
        this.x = parseInt(x, 10);
        this.y = parseInt(y, 10);
        this.qualifier = qualifier;
    }
    Cell.prototype.getNeighbours = function () {
        var cells = new Array();
        cells.push(new Cell(this.x - 1, this.y - 1, null));
        cells.push(new Cell(this.x - 1, this.y, null));
        cells.push(new Cell(this.x - 1, this.y + 1, null));
        cells.push(new Cell(this.x, this.y - 1, null));
        cells.push(new Cell(this.x, this.y + 1, null));
        cells.push(new Cell(this.x + 1, this.y - 1, null));
        cells.push(new Cell(this.x + 1, this.y, null));
        cells.push(new Cell(this.x + 1, this.y + 1, null));
        return cells;
    };
    return Cell;
}());
exports.__esModule = true;
exports["default"] = Cell;
