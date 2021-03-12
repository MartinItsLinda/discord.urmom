const { baseURL } = require(`../utils/Constants`);
const fetch = require(`node-fetch`);
const Message = require('../constructors/Message');

class APIHandler {
    constructor(client) {
        this.client = client;
    }
    
    request(method, path, body) {
        return fetch(baseURL + path, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bot ${this.client.token}`,
                'User-Agent': `Discord.urmom`
            },
            body: body ? JSON.stringify(body) : null
        }).then(res => res.json());
    }

    async getGuild(guildID) {
        return await this.request(`GET`, `/guilds/${guildID}`);
    }
    
    async sendMessage(channelID, content, embed) {
        const response = await this.request(`POST`, `/channels/${channelID}/messages`, { content: content, embed: embed });
        return new Message(this.client, response);
    }
}

module.exports = APIHandler;