module.exports = {
    Events: {
        MESSAGE: 'messageCreate'
    },
    validAvatarFormats: [`jpg`, `jpeg`, `png`, `webp`, `gif`],
    baseURL: 'https://discord.com/api/v7',
    defaultTimers: {
        restart: 5000, //In MS, restart after 5 seconds of execution.
    }
}