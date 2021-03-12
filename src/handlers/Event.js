const Guild = require('../constructors/Guild');
const Message = require('../constructors/Message');
const User = require('../constructors/User');
const APIHandler = require('../websocket/APIHandler');

async function handle(message, flag, client) {
  const msg = client.evaluate(message, flag);
  client._sequenceNumber = 1;
  client.emit('raw', msg.d, msg.t);
  switch (msg.t) {
    case 'READY': {
      client.emit('debug', 'Connected to the Discord gateway');
      if (!msg.d.user.bot) process.exit();
      client.user = new User(client, msg.d.user);
      client._sessionId = msg.d.session_id;
      client.guilds = new Map();
      client.api = new APIHandler(client);
      msg.d.guilds.forEach(g => {
        client.api.getGuild(g.id).then(guild => client.guilds.set(guild.id, new Guild(client, guild)));
      });
      return client.emit('ready', client.user);
    }
    case 'MESSAGE_CREATE': {
      client.emit('message', new Message(client, msg.d));
    }
  }

  switch (msg.op) {
    case 7: {
      return client.socket.send(JSON.stringify({
        op: 6,
        d: {
          session_id: client._sessionId,
          token: client.token,
          seq: client._sequenceNumber
        }
      }));
    }
    case 10: {
      if (client.hb) clearInterval(client.hb);
      client.hb = setInterval(() => {
        client.socket.send(JSON.stringify({
          op: 1,
          d: client._sequenceNumber
        }));
        return client.emit('debug', `[Heartbeat] ${msg.d.heartbeat_interval}ms`);
      }, msg.d.heartbeat_interval);
      return client.emit('debug', `Starting heartbeat at ${msg.d.heartbeat_interval}ms`);
    }
  }
}

module.exports = handle;