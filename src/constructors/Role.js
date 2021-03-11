const Base = require("./Base");

class Role extends Base {
    constructor(client, data) {
        super();
        
        this.client = client;
        this.id = Number(data.id);
        this.name = data.name;
        this.permissions = data.permissions;
        this.position = data.position;
        this.color = data.color;
        this.hoist = data.hoist;
        this.managed = data.managed;
        this.mentionable = data.mentionable;
    }
}