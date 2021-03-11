const Base = require("./Base");
const { PermissionOverwriteTypes } = require("../utils/Constants");
const BitField = require("./BitField");
class PermissionOverwrites extends Base {
    constructor(data) {
        this.id = data.id;
        this.type = PermissionOverwriteTypes[data.type];
        this.allowed = new BitField(data.allow);
        this.denied = new BitField(data.deny);
    }
}

module.exports = PermissionOverwrites;