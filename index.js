//const Discord = require('discord.js');
import Discord from 'discord.js';
const client = new Discord.Client();
import fetch from 'node-fetch';
//require('dotenv').config();
import dotenv from 'dotenv';
import {getGreetings, addGreeting} from './helpers/data.js'
import {sanitizeString, cleanString} from './helpers/helperFunctions.js';

dotenv.config();

client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', async (msg) => {
    if(msg.content.startsWith('!add'))
    {
        addGreeting(cleanString(msg.content, '!add'));
        msg.reply(`Added ${msg.content} to greetings list`);
        console.log(getGreetings());
    } else if(msg.content.startsWith('!list')){
        msg.reply(`List of greetings... \n ${getGreetings()}`);
    }else{
        const greetings = getGreetings();
        const sanitizedString = sanitizeString(msg.content);
        const filteredWords = sanitizedString.split(' ').filter((val) => {
            return greetings.includes(val);
        });

        if(filteredWords.length > 0)
        {
            console.log(filteredWords[0]);
            const url = `https://g.tenor.com/v1/search?q=${filteredWords[0]}&key=${process.env.TENOR_API_KEY}&limit=100`;

            const response = await fetch(url);
            //console.log(response);

            const result = await response.json();
            //console.log(result);

            const index = Math.floor(Math.random() * result.results.length);

            msg.reply(result.results[index].url);
        }
    }
});

client.on('typingStart', async (typing) => {
    const channelId = typing.id;
    const channel = await client.channels.fetch(channelId);
    let userName;

    // typing._typing.forEach((t) => {
    //     console.log(t.user.username);
    // })

    //Need to clean this up to pull user name
    for(let entry of typing._typing.entries()){
        const userId = entry[0];
        const user = await client.users.cache.get(userId);
        userName = user.username;
    }
    channel.send(`:shushing_face: QUIET! ${userName} has something very important to say.`);

})

client.on('presenceUpdate', (oldPresence, newPresence) => {
    console.log(oldPresence);
    console.log(newPresence);
});

client.on('userUpdate', (oldUser, newUser) => {
    console.log(oldUser);
    console.log(newUser);
});