const axios = require('axios');

module.exports = {
    name: 'learn',
    description: 'Give a random article on wikipedia',
    async execute(client, message, args) {
        const { data } = await axios.get('https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=1');
        const article = data.query.random[0];
        const url = `http://en.wikipedia.org/wiki?curid=${article.id}`;

        // Send
        message.channel.send(`**${article.title}**\n${url}`);

        // Open in browser
        if (args[0] === 'open') {
            require('opn')(url);
        }
    }
};