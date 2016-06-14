var AbstractComponent = require('kevoree-entities').AbstractComponent;
var Cell = require("./gol/Cell");
var GameOfLifeService = require("./gol/GameOfLifeService");
var CellGrid = require("./gol/CellGrid").CellGrid;
var KevScript = require('kevoree-kevscript');
var LifeOperationType = require("./gol/LifeOperation").LifeOperationType;
var kevoree             = require('kevoree-library').org.kevoree;


/**
 * Kevoree component
 * @type {GameOfLifeEngine}
 */
var GameOfLifeEngine = AbstractComponent.extend({
  toString: 'GameOfLifeEngine',

  construct: function(group) {
    this.kevs = new KevScript();
    this.gameOfLifeService = new GameOfLifeService["default"]();
  },

  in_tick: function(msg) {
    this.log.debug(this.toString(), 'Tick');
    try {
      var cellGrid = this.scanCells();

      var lifeOperations = this.gameOfLifeService.doLife(cellGrid);
      if (lifeOperations.length !== 0) {
        var kevscript = this.toKevscript(lifeOperations);
        var factory = new kevoree.factory.DefaultKevoreeFactory(),
            cloner = factory.createModelCloner();
        var model = cloner.clone(this.getKevoreeCore().getCurrentModel());

        this.log.debug(this.toString(), 'Kevscript :');
        this.log.debug(this.toString(), kevscript);

        this.execute(kevscript, model);
      }
    } catch (expt) {
        console.log(expt);
    }
  },

  execute: function(kevscript, model) {
    var factory = new kevoree.factory.DefaultKevoreeFactory(),
      cloner = factory.createModelCloner();

    var backup = cloner.clone(this.getKevoreeCore().getCurrentModel());
    this.kevs.parse(kevscript, model, function(err, model) {
      if (err) {
        this.log.error(this.toString(), 'Unable to parse onConnect KevScript (' + err.message + '). Broadcasting model without onConnect process.');
        this.getKevoreeCore().deploy(backup);
      } else {
        this.getKevoreeCore().deploy(model);
      }
    }.bind(this));
  },

  toKevscript: function(lifeOperations) {
    var kevscriptSB = "";

    var i = 0;
    lifeOperations.forEach(function(lifeOperation) {
      if (lifeOperation.type == LifeOperationType.Dead) {
        kevscriptSB += "remove " + lifeOperation.qualifier + "\n";
      } else {
        var componentName = "%%cell" + (i++) + "%%";

        var nodeName;
        if (lifeOperation.x <= 0 && lifeOperation.y >= 0) {
          nodeName = "nodeA";
        } else if (lifeOperation.x > 0 && lifeOperation.y >= 0) {
          nodeName = "nodeB";
        } else if (lifeOperation.x <= 0 && lifeOperation.y < 0) {
          nodeName = "nodeC";
        } else {
          nodeName = "nodeD";
        }

        var fullPath = nodeName + "." + componentName;
        kevscriptSB += "add " + fullPath + " : GameOfLifeCell\n";
        kevscriptSB += "set " + fullPath + ".x = '" + lifeOperation.x + "'\n";
        kevscriptSB += "set " + fullPath + ".y = '" + lifeOperation.y + "'\n";
      }
    });

    return kevscriptSB;
  },

  scanCells: function() {
    var nodes = this.getKevoreeCore().getCurrentModel().nodes.array;

    var cellGrid = new CellGrid(); /* TODO */
    nodes.forEach(function(node) {
      var components = node.components.array;
      components.forEach(function(component) {
        // we only keeps Components which are of type GameOfLifeCell
        if ("GameOfLifeCell" === component.typeDefinition.name) {
          var values = component.dictionary.values.array;
          var dico = {};
          values.forEach(function(value) {
            dico[value.name] = value.value;
          });

          var x = dico.x;
          var y = dico.y;
          cellGrid = cellGrid.add(new Cell["default"](x, y, node.name + "." + component.name));
        }
      });
    });

    return cellGrid;
  }
});

module.exports = GameOfLifeEngine;
