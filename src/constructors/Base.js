const defaults = require('./util/Constants.js');

class Base {
    constructor(client) {
        this.defaults = defaults;
    }
}

module.exports = Base;
