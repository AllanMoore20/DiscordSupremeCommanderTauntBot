const Discord = require('discord.js');
const bot = new Discord.Client();
let jsonData = require('./settings.json');

bot.login(jsonData.token);

bot.on('ready', () =>{
    console.log('This bot is online');
    console.log(jsonData);
})

bot.on ('message', msg => {
        if(msg.content.startsWith(jsonData.prefix)){
            x = msg.content.substr(jsonData.prefix.length);
            if(jsonData.taunts.hasOwnProperty(x))
            {
                msg.reply(jsonData.taunts[x])
            }else
            {
                msg.reply(jsonData.taunts['def'])
            }
        }
})