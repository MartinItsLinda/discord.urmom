const urmom = require(`discord-urmom`);
const { join } = require("path");

const urmom = new urmom.Client({
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
        helpCommand: true, //Enable for help command to automatically be created and put into commands Map. NOTE: OVERRIDES HELP COMMANDS THAT ARE LOADED IN
    }
});
urmom.on('messageCreate', (message) => {
    message.respond();
})

urmom.start(config.token);
