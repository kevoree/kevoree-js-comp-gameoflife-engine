"use strict";
var lodash_1 = require("lodash");
var LifeOperation_1 = require("./LifeOperation");
var GameOfLifeService = (function () {
    function GameOfLifeService() {
    }
    GameOfLifeService.prototype.doLife = function (cellGrid) {
        return lodash_1.flatMap(cellGrid.nextTime, function (cell) {
            var lifeOperations = [];
            var x = cell.x;
            var y = cell.y;
            if (cellGrid.isAlive(x, y)) {
                var cpt = cellGrid.countNeighbourAlive(x, y);
                if (cpt < 2 || cpt > 3) {
                    var qualifier = cellGrid.get(cell.x, cell.y).qualifier;
                    lifeOperations.push(LifeOperation_1.deadCell(cell.x, cell.y, qualifier));
                }
            }
            else {
                var cpt = cellGrid.countNeighbourAlive(x, y);
                if (cpt == 3) {
                    var qualifier = cell.qualifier;
                    lifeOperations.push(LifeOperation_1.newCell(x, y, qualifier));
                }
            }
            return lifeOperations;
        });
    };
    return GameOfLifeService;
}());
exports.__esModule = true;
exports["default"] = GameOfLifeService;
