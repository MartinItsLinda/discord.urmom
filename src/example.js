const c = require(`./Client`);
const fetch = require(`node-fetch`);
const config = require(`./config.json`);
const client = new c({
    token: config.token,
    intents: ['GUILD_MESSAGES'],
    shardCount: 1,
    partials: [''],
    restWsBridgeTimeout: 1,
    restRequestTimeout: 1,
    restSweepInterval: 1,
    retryLimit: 0,
    presence: {
        activities: [{
            name: "poggers bro",
            type: 0,
        }]
    }
});
client.on('ready', () => {
});
client.on('debug', console.log);
client.on('error', console.log);
client.on('message', m => {
    if(m.content === '!extreme') {
        fetch(`https://discord.com/api/channels/${m.channel.id}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bot ${client.token}`,
            'User-Agent' : `Discord.urmom`
        },
        body: JSON.stringify({
            content: "Is the best"
        })
    })
    }
});
client.on('raw', (d, t) => {
});
client.connect();
