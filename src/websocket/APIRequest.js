const { baseURL } = require(`../utils/Constants`)
const fetch = require(`node-fetch`)
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
    async sendmessage(client, channel, content, embed) {

    }
}
module.exports = APIrequest;