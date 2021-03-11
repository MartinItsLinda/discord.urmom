module.exports = {
    Events: {
        MESSAGE: 'messageCreate'
    },
    validAvatarFormats: [`jpg`, `jpeg`, `png`, `webp`, `gif`],
    validIconFormats: [`jpg`, `jpeg`, `png`, `webp`, `gif`],
    validBannerFormats: [`jpg`, `jpeg`, `png`, `webp`],
    baseURL: 'https://discord.com/api/v8',
    cacheOptions: {
        guildCache: true,
        userCache: true,
        guildMemberCache: true,
        channelCache: true,
        messageCache: false
    },
    defaultTimers: {
        restart: 5000 //In MS, restart after 5 seconds of execution.
    },
    defaultCommandOptions: {
        findOptions: {
            findtype: '',
            multiple: false,
            hasPerms: null
        },
        clearOptions: {
            clearAll: true,
            clearByPermissions: false,
        }
    },
    channelTypes: [
        //Received from API as type: Number. Filter through Array and access second item for name in library
        ['GUILD_TEXT', 'TEXT_CHANNEL', 'TextChannel'],
        ['DM', 'DIRECT_MESSAGE', 'TextChannel'],
        ['GUILD_VOICE', 'VOICE_CHANNEL', 'VoiceChannel'],
        ['GROUP_DM', 'UNAVAILABLE', null], //Cannot create a GROUP DM as a bot.
        ['GUILD_CATEGORY', 'CATEGORY', 'CategoryChannel'],
        ['GUILD_NEWS', 'NEWS', 'TextChannel'],
        ['GUILD_STORE', 'STORE', 'TextChannel']
    ],
    PermissionOverwriteTypes: [
        ['role', 'member']
    ]
}