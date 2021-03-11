const c = require(`./Client`);
const client = new c({
    token: 'ODE5MzI0NDUwNDAyODYxMTM2.YEk9Ww.B_fgeqUnTQVeKTq0OcHl2d0_064',
    intents: ['GUILD_MESSAGES'],
    shardCount: 1,
    partials: [''],
    restWsBridgeTimeout: 1,
    restRequestTimeout: 1,
    restSweepInterval: 1,
    retryLimit: 0
});
client.on('ready', () => {
    client.socket.send(JSON.stringify({
        op: 8,

        d: {
            guild_id:'818982749981114420',
            query: "",
            limit: 0,
        }
    }))
})
client.on('debug', console.log)
client.on('error', console.log)
client.on('message', m => {
    console.log(m.attachments[0].url)
})
client.on('raw', (d, t) => {
    console.log(d)
    console.log(t)
})
client.connect();