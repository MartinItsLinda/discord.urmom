const Base = require("./Base");
const { validAvatarFormats } = require('../utils/Constants');

class User extends Base {
    constructor(client, data) {
        super();
        this.client = client;
        this.id = Number(data.id);
        this.username = data.username;
        this.tag = data.username + '#' + data.discriminator;
        this.discriminator = data.discriminator;
        this.bot = data.bot || false;
		this.avatar = data.avatar;
    }
    
    /**
     * @param {object?} Optional options for changing the avatar URL.
     * @returns {string} the avatar URL given.
     */
    avatarURL(options) {
        if (!options) return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}${this.avatar.startsWith('a_') ? '.gif' : '.png'}`;
		
		let format = (options.format || (this.avatar.startsWith('a_') ? 'gif' : 'png')).toLowerCase();
		if (format.startsWith('.')) format = format.slice(1);
		
		const size = Number(options.size) || null;
		if (!validAvatarFormats.includes(format)) throw new TypeError(`Invalid image format: ${format}`);
		if ((size & (size - 1)) || ((size < 16) || (size > 4096))) throw new TypeError(`The size must be a power of two between 16 and 4096.`);
		
		return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${format}${size ? '?size=' + size : ''}`;
	}
}
module.exports = User;