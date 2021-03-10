const Base = require("./Base");

class User extends Base {
    constructor(client, data) {
        super();
        this.client = client;
        this.username = data.username;
        this.tag = data.username + '#' + data.discriminator;
        this.discriminator = data.discriminator;
        
    }
}
module.exports = User;