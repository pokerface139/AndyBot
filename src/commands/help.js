module.exports = {
    name: 'help',
    description: 'A command to show how (h)Andy this bot is',
    execute: (client, message, args) => {
        const embed = {
            color: 3447003,
            description: this.description,
            fields: []
        };

        const commands = !args[0] ? client.commands : [client.commands.find('name', args[0])];
        commands.forEach(cmd => {
            embed.fields.push({ name: cmd.name, value: cmd.description });
        });

        return message.channel.send({ embed });
    }
};