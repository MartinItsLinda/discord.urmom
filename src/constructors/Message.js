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

        this.createdAt = data.timestamp;

        this.pinned = data.pinned;

        this.attachments = data.attachments;

        this.guild = new Guild(client, data.guild)
    }
}
module.exports = Message;