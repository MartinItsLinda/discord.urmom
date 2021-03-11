const Base = require("./Base");
const Guild = require("./Guild");

class Message extends Base {
    constructor(client, data, channel) {
        super();
        /**
         * If the message is ACTIVE (not deleted) or not.
         * @type {boolean}
         */
        this.client = client;

        this.active = true;

        this.id = data.id;
        this.content = data.content;
        this.createdAt = data.timestamp;

        this.pinned = data.pinned;
        this.author = {
            username: data.author.username,
            id: data.author.id,
            discriminator: data.author.discriminator,
        }
        this.channel = {
            id: data.channel_id
        }
        this.attachments = data.attachments;

    }
}
module.exports = Message;