const Base = require("./Base");

class Emoji extends Base {
    constructor(client, data) {
        super();
        
        this.client = client;
        this.id = Number(data.id);
        this.requireColons = data.require_colons;
        this.managed = data.managed;
        this.animated = data.animated;
        this.available = data.available;
        this.roles = data.roles.map(Number);
    }
}

module.exports = Emoji;