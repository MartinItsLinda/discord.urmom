const Base = require("./Base");
const User = require("./User");
const Guild = require("./Guild");

class Message extends Base {
    constructor(client, data) {
        super();
        this.client = client;
        
        this.id = Number(data.id);
        this.content = data.content;
        this.tts = data.tts;
        this.mentionEveryone = data.mention_everyone;
        this.roleMentions = data.mention_roles.map(Number);
        this.pinned = data.pinned;
        this.type = data.type;
        this.author = new User(client, data.author);
        
        this.channel = { id: data.channel_id };
        
        this.createdTimestamp = new Date(data.timestamp);
        this.editedTimestamp = data.edited_timestamp ? new Date(data.edited_timestamp) : null;
    }
    
    async reply(content, embed) {
        return await this.client.api.sendMessage(this.channel.id, content, embed);
    }
}

module.exports = Message;