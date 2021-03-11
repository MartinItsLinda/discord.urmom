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
        this.nsfw = data.nsfw === undefined ? null : data.nsfw; //Return null instead of undefined
        this.permissions = data.permission_overwrites.map(raw => { new PermissionOverwrites(raw) });
        this.name = data.name;
        this.topic = data.topic === undefined ? null : data.topic;
        /**
         * Last Message ID
         * Rate limit per user
         * Parent ID
         * Last pin timestamp
         */
    }
}
module.exports = Channel;