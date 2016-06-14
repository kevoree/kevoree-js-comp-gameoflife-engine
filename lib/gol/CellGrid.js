"use strict";
var lodash_1 = require("lodash");
var Cell_1 = require("./Cell");
var CellGrid = (function () {
    function CellGrid(cellGrid, cell) {
        this.cells = [];
        this.nextTime = [];
        if (cellGrid) {
            this.cells = this.mergeValues(this.cells, cellGrid.cells);
            this.nextTime = this.mergeValues(this.nextTime, cellGrid.nextTime);
        }
        if (cell) {
            this.cells = this.mergeValues(this.cells, [cell]);
            this.addAllAndMe(cell);
        }
    }
    CellGrid.prototype.mergeValues = function (fst, snd) {
        return lodash_1.uniqWith(lodash_1.union(fst, snd), function (e, f) { return e.x === f.x && e.y === f.y; });
    };
    CellGrid.prototype.addAllAndMe = function (cell) {
        this.nextTime = this.mergeValues(this.nextTime, cell.getNeighbours());
        this.nextTime = this.mergeValues(this.nextTime, [cell]);
    };
    CellGrid.prototype.CellGrid = function (cg1, cg2) {
        this.cells = this.mergeValues(this.cells, cg1.cells);
        this.nextTime = this.mergeValues(this.nextTime, cg1.nextTime);
        this.cells = this.mergeValues(this.cells, cg2.cells);
        this.nextTime = this.mergeValues(this.nextTime, cg2.nextTime);
    };
    CellGrid.prototype.add = function (o) {
        return new CellGrid(this, o);
    };
    CellGrid.prototype.isAlive = function (x, y) {
        return lodash_1.find(this.cells, function (e) { return x === e.x && y === e.y; }) !== undefined;
    };
    CellGrid.prototype.countNeighbourAlive = function (x, y) {
        var neighbours = new Cell_1["default"](x, y, null).getNeighbours();
        return lodash_1.intersectionWith(this.cells, neighbours, function (e, f) { return e.x === f.x && e.y === f.y; }).length;
    };
    CellGrid.prototype.get = function (x, y) {
        var fltr = lodash_1.filter(this.cells, function (e) { return e.x === x && e.y === y; });
        if (fltr.length === 0) {
            return new Cell_1["default"](x, y, null);
        }
        else {
            return fltr[0];
        }
    };
    return CellGrid;
}());
exports.CellGrid = CellGrid;
