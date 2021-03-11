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
    if (m.content === '!extreme') {
        console.log(m.channel)
        fetch(`https://discord.com/api/channels/${m.channel.id}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bot ${client.token}`,
                'User-Agent': `Discord.urmom`
            },
            body: JSON.stringify({
                content: "Is the best"
            })
        }).then(r => console.log(r))
    }
    if (m.content === '!debugroles') {
        fetch(`https://discord.com/api/channels/${m.channel.id}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bot ${client.token}`,
                'User-Agent': `Discord.urmom`
            },
            body: JSON.stringify({
                content: `\`\`\`js\n${client.guilds.get('818982749981114420').roles.map(r => r.id).join(' | ')}\`\`\``
            })
        })
    }
});
client.on('raw', (d, t) => {
});
client.connect();
