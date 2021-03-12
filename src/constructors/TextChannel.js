const APIrequest = require("../websocket/APIRequest");
const Base = require("./Base");
const PermissionOverwrites = require("./PermissionOverwrites");

class TextChannel extends Base {
    /**
     * @param {object} client Client constructor
     * @param {json} data Data from Discord API
     * @returns {TextChannel} Text Channel Information
     */
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
        
        this.lastMessageID = data.last_message_id === undefined ? null : data.last_message_id;
        
        this.slowmodetime = data.rate_limit_per_user === undefined ? null : data.rate_limit_per_user;
        
        this.parent = this.guild.parents.get(data.parent_id);

        this.lastPinned  = this.last_pin_timestamp;
    }

    sendMessage(content, options) {
        const API = new APIrequest();
        API.make(this.client, {
            url: `/channels/${this.id}/messages`,
            method: 'POST',
            body: {
                content: content
            }
        })
    }
}
module.exports = TextChannel;