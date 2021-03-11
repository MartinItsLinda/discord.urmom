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
    }
}