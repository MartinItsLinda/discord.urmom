const Base = require(`./Base`)
const { validIconFormats, validBannerFormats } = require(`../utils/Constants`);
class Guild extends Base {
    constructor(client, data) {
        super();
        this.id = data.id
        this.banner = data.banner;
        this.icon = data.icon;
    }
    iconURL(options) {
        if (!this.icon) return null;
        else if (!options) return `https://cdn.discordapp.com/icons/${this.id}/${this.icon}${this.icon.startsWith('a_') ? '.gif' : '.png'}`

        let format = (options.format || (this.icon.startsWith('a_') ? 'gif' : 'png')).toLowerCase();
        if (format.startsWith('.')) format = format.slice(1);

        const size = Number(options.size) || null;
        if (!validIconFormats.includes(format)) throw new TypeError(`Invalid image format: ${format}`);
        if ((size & (size - 1)) || ((size < 16) || (size > 4096))) throw new TypeError(`Size must be a power of two between 16 to 4096.`)

        return `https://cdn.discordapp.com/icons/${this.id}/${this.avatar}.${format}${size ? '?size=' + size : ''}`;
    }
    bannerURL(options) {
        if (!this.banner) return null;
        else if (!options) return `https://cdn.discordapp.com/icons/${this.id}/${this.banner}.png`

        let format = options.format.toLowerCase();
        if (format.startsWith('.')) format = format.slice(1);

        const size = Number(options.size) || null;
        if (!validBannerFormats.includes(format)) throw new TypeError(`Invalid image format: ${format}`);
        if ((size & (size - 1)) || ((size < 16) || (size > 4096))) throw new TypeError(`Size must be a power of two between 16 to 4096.`)

        return `https://cdn.discordapp.com/banner/${this.id}/${this.banner}.${format}${size ? '?size=' + size : ''}`;
    }
}
module.exports = Guild;