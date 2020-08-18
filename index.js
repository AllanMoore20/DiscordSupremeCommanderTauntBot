const Discord = require('discord.js');
const bot = new Discord.Client();
let jsonData = require('./settings.json');

bot.login(jsonData.token_test);

bot.on('ready', () =>{
    console.log('This bot is online');
    console.log(jsonData);
})

bot.on ('message', msg => {
        bot.isReady = false;
        if(msg.content.startsWith(jsonData.prefix)){
            if(jsonData.sound)
            {
                playMusic(msg);
            }
            else
            {
                replyMsg(msg);
            }
        }
        bot.isReady = true;
})

function playMusic(msg){
    var voiceChannel = msg.member.voice.channel;
    x = msg.content.substr(jsonData.prefix.length);
    if(jsonData.taunts.hasOwnProperty(x) && voiceChannel)
    {
        voiceChannel.join().then( connection =>{
            const dispatcher  = connection.play('./sound/'+ x + '.mp3');
            dispatcher.on('finish', end => voiceChannel.leave());
        })
        .catch(console.error);        
    }else
    {
        msg.reply(jsonData.taunts['def'])
    }
};

function replyMsg(msg){
    x = msg.content.substr(jsonData.prefix.length);
    if(jsonData.taunts.hasOwnProperty(x))
    {
        msg.reply(jsonData.taunts[x])
    }else
    {
        msg.reply(jsonData.taunts['def'])
    }
};