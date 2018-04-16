const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Initialize client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Load commands
const commandFiles = fs.readdirSync('src/commands');
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('AndyBot, ready to serve!');
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;
    try {
        console.log(`Executing command : ${command}`);
        await client.commands.get(command).execute(client, message, args);
    }
    catch (error) {
        console.error(error);
        message.reply('There was an error while executing your command');
    }
});

client.login(process.env.BOT_TOKEN);