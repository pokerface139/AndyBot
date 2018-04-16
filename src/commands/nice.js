const ytdl = require('ytdl-core');

module.exports = {
    name: 'nice',
    description: 'A voice command to express your satisfaction',
    async execute(client, message) {
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) {
            return message.reply('You must be in a voice channel if you want to hear my sweet voice!');
        }

        // Already a connection
        let connection = client.voiceConnections.get(message.guild.id);
        if (connection) {
            if (connection.dispatcher) { return; }
        }
        else {
            connection = await voiceChannel.join();
        }

        const dispatcher = connection.playStream(ytdl('https://www.youtube.com/watch?v=3WAOxKOmR90', { filter: 'audioonly' }));
        dispatcher.once('end', () => {
            voiceChannel.leave();
        });
    }
};