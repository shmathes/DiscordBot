//const Discord = require('discord.js');
import Discord from 'discord.js';
const client = new Discord.Client();
import fetch from 'node-fetch';
//require('dotenv').config();
import dotenv from 'dotenv';

dotenv.config();

client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', async (msg) => {
    //if(msg.content === 'hi') 
    const greetings = getGreetings();
    const sanitizedString = sanitizeString(msg.content);
    console.log(sanitizedString);
    if(sanitizedString.split(' ').some(r => greetings.includes(r)))
    {
        const url = `https://g.tenor.com/v1/search?q=${getGreetings()[Math.floor(Math.random() * getGreetings().length)]}&key=${process.env.TENOR_API_KEY}&limit=100`;

        const response = await fetch(url);
        //console.log(response);

        const result = await response.json();
        //console.log(result);

        const index = Math.floor(Math.random() * result.results.length);

        msg.reply(result.results[index].url);
    }
})

const getGreetings = () => {
    const greetings = [
        'hey',
        'hi',
        'yo', 
        'sup',
        'hello'
    ]

    return greetings;
}

const sanitizeString = (str) => {
    return str.toLowerCase().replace(',', '').replace('.', '')
}