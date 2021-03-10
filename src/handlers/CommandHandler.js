const EventEmitter = require(`events`)
const { readDirSync } = require(`fs`);
const { readdirSync } = require("node:fs");
class CommandHandler extends EventEmitter {
    constructor(client) {
        this.client = client;

        this.commands = new Map();
        this.aliases = new Map();
        this.built = false;

        this.build();
    }
    /**
     * @returns {Map<commands>&Map<aliases>} Commands and Aliases
     */
    build(options = {}) {
        if(this.built) return new Error(`Cannot build command handler if already initiated.`);
        if(options.filelocation) return new TypeError(`filelocation must be defined`);
        const commands = readdirSync()
    }
    /**
     * Rebuild command handler (reruns build)
     */
    rebuild() {
        this.built = false;
        this.build();
    }
}