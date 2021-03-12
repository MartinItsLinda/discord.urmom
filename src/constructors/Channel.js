const Base = require("./Base");
const PermissionOverwrites = require("./PermissionOverwrites");

class Channel extends Base {
    constructor(client, data) {
        super();
        this.client = client;
        this.id = data.id;
        this.type = channelTypes[data.type][1]; //Call 
        this.guild = client.guilds.get(data.guild_id);
        this.position = data?.position;
        this.nsfw = data.nsfw || null;
        this.permissions = data.permission_overwrites.map(raw => { new PermissionOverwrites(raw) });
        this.name = data.name;
        this.topic = data.topic || null;
        /**
         * Last Message ID
         * Rate limit per user
         * Parent ID
         * Last pin timestamp
         */
    }
    
    async send(content, embed) {
        return await this.client.api.sendMessage(this.id, content, embed);
    }
}
module.exports = Channel;