"use strict";
(function (LifeOperationType) {
    LifeOperationType[LifeOperationType["New"] = 0] = "New";
    LifeOperationType[LifeOperationType["Dead"] = 1] = "Dead";
})(exports.LifeOperationType || (exports.LifeOperationType = {}));
var LifeOperationType = exports.LifeOperationType;
function newCell(x, y, qualifier) {
    return {
        x: x,
        y: y,
        qualifier: qualifier,
        type: LifeOperationType.New
    };
}
exports.newCell = newCell;
function deadCell(x, y, qualifier) {
    return {
        x: x,
        y: y,
        qualifier: qualifier,
        type: LifeOperationType.Dead
    };
}
exports.deadCell = deadCell;
