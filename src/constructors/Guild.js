const Base = require(`./Base`)
const { validIconFormats, validBannerFormats } = require(`../utils/Constants`);
const Emoji = require("./Emoji");
const Role = require("./Role");

class Guild extends Base {
    constructor(client, data) {
        super();
        this.client = client;
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.vanityURLCode = data.vanity_url_code;
        this.premiumTier = data.premium_tier;
        this.preferredLocale = data.preferred_locale;
        this.banner = data.banner;
        this.icon = data.icon;
        this.region = data.region;
        this.MFALevel = data.mfa_level;
        this.verificationLevel = data.verification_level;
        this.defaultMessageNotifications = data.default_message_notifications;
        this.explicitContentFilter = data.explicit_content_filter;
        
        this.publicUpdatesChannel = { id: Number(data.public_updates_channel_id) };
        this.afkChannel = { id: Number(data.afk_channel_id) };
        this.rulesChannel = { id: Number(data.rules_channel_id) };
        this.systemChannel = { id: Number(data.system_channel_id) };
        
        this.afkTimeout = data.afk_timeout;
        this.features = data.features;
        
        this.emojis = data.emojis?.map(raw => new Emoji(client, raw));
        this.roles = data.roles?.map(raw => new Role(client, raw));
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