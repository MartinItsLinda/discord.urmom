const c = require(`./Client`);
const fetch = require(`node-fetch`);
const config = require(`./config.json`);
const client = new c({
    token: config.token,
    intents: ['GUILD_MESSAGES', 'GUILD_EMOJIS', 'GUILDS'],
    shardCount: 1,
    partials: [''],
    restWsBridgeTimeout: 1,
    restRequestTimeout: 1,
    restSweepInterval: 1,
    retryLimit: 0,
    presence: {
        activities: [{
            name: "Activity",
            type: 0,
        }]
    }
});
client.on('ready', () => {
});
client.on('debug', console.log);
client.on('error', console.log);
client.on('message', msg => {
    if(msg.content === '!sendmessage') {
        msg.channel.sendMessage('testing 123')
    }
});
client.on('raw', (d, t) => {
});
client.connect();
