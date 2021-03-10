const EventEmitter = require(`events`)
const { readDirSync } = require(`fs`);
const { readdirSync } = require("node:fs");
const { defaultCommandOptions } = require(`../utils/Constants`)
class CommandHandler extends EventEmitter {
    constructor(client) {
        this.client = client;

        this.commands = new Map();
        this.aliases = new Map();
        this.categories = new Map();
        this.built = false;

        this.build();
    }
    /**
     * @returns {Map<commands>&Map<aliases>} Commands and Aliases
     */
    build(options = {}) {
        if (this.built) return new Error(`Cannot build command handler if already initiated.`);
        if (options.filelocation) return new TypeError(`filelocation must be defined`);
        const commands = readdirSync();
    }
    rebuild() {
        this.built = false;
        this.build();
    }
    /**
     * Find a command, alias, category, etc. from the command handlers loaded commands.
     * @param {string?} search 
     * @param {array?} options
     */
    find(search, options) {
        let data;
        if (!options) options = defaultCommandOptions.findOptions;
        if (options.findtype === 'alias') data = this.aliases.get(search);
        if (options.findtype === 'command') data = this.commands.get(search);
        if (options.findtype === 'category') data = this.categories.get(search);
        if (options.findtype === 'multiple') data = {
            aliases: this.aliases.get(search),
            commands: this.commands.get(search),
            categories: this.categories.get(search)
        }
        if(options.hasPerms) data = {
            //Filter through map of aliases + commands
        }
    }
    /**
     * @param {array?} options 
     * @returns {void}
     */
    clear(options) {
        if(!options) options = defaultCommandOptions.clearOptions;
        
    }
}