const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

//const client = new Client({ intents: [Intents.FLAGS.GUILDS]});

client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', msg => {
    if(msg.content === 'test') {
        msg.reply('The fuck you want?');
    }
})

client.login(process.env.TOKEN);