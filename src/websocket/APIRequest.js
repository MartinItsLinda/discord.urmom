const { baseURL } = require(`../utils/Constants`)
const fetch = require(`node-fetch`);
const Message = require("../constructors/Message");
class APIrequest {
    constructor() {
    }

    async getguild(client, id) {
        const fetched = await fetch(`https://discord.com/api/guilds/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bot ${client.token}`,
                'User-Agent' : `Discord.urmom`
            },
        })
        return fetched.json();
    }
    async make(client, options) {
        const made = await fetch(baseURL + options.url, {
            method: options.method,
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bot ${client.token}`,
                'User-Agent' : `Discord.urmom`
            },
            body: JSON.stringify(options.body)
        })
        return new Message(made.json())
    }
}
module.exports = APIrequest;