const urmom = require('discord-urmom');
const { join } = require('path');
// Basically your config file
// const { token } = require('path-to-config-file');

const client = new urmom.Client({
  commandHandler: {
    enabled: true,
    filepath: join(__dirname, './commands'),
    /**
     * File structure
     * index.js
     * commands
     * |-> help.js, info.js, support.js
     * node_modules
     * package.json
     */
    aliases: true,
    categories: true,
    helpCommand: true //Enable for help command to automatically be created and put into commands Map. NOTE: OVERRIDES HELP COMMANDS THAT ARE LOADED IN
  }
});

client.on('messageCreate', message => message.respond());

client.connect(token);

