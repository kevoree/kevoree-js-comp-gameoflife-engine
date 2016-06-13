var AbstractComponent = require('kevoree-entities').AbstractComponent;

/**
 * Kevoree component
 * @type {GameOfLifeEngine}
 */
var GameOfLifeEngine = AbstractComponent.extend({
    toString: 'GameOfLifeEngine',

    /**
     * this method will be called by the Kevoree platform when your component has to start
     * @param {Function} done
     */
    start: function (done) {
        this.log.debug(this.toString(), 'START');
        done();
    },

    /**
     * this method will be called by the Kevoree platform when your component has to stop
     * @param {Function} done
     */
    stop: function (done) {
        this.log.debug(this.toString(), 'STOP');
        done();
    },
    
    in_tick: function (msg) {
        // TODO do something with incoming message
    }
});

module.exports = GameOfLifeEngine;
