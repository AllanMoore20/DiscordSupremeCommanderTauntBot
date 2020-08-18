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
    let voiceChannel = msg.member.voice.channel;
    let x = msg.content.substr(jsonData.prefix.length);
    if(jsonData.taunts.hasOwnProperty(x) && voiceChannel)
    {
        play(voiceChannel, x)
    }else if(x === '0')
    {
        let command = Math.random() * 100;
        if (command > 98){
            command = 98;
        }else if (command < 1)
        {
            command = 1;
        }
        console.log(command);
        play(voiceChannel, Math.round(command).toString());
    }else
    {
        msg.reply(jsonData.taunts['def'])
    }
};

function play(voiceChannel,msg){
    voiceChannel.join().then( connection =>{
        const dispatcher  = connection.play('./sound/' + msg + '.mp3');
        dispatcher.on('finish', end => voiceChannel.leave());
    })
    .catch(console.error);        
}

function replyMsg(msg){
    const x = msg.content.substr(jsonData.prefix.length);
    if(jsonData.taunts.hasOwnProperty(x))
    {
        msg.reply(jsonData.taunts[x])
    }else
    {
        msg.reply(jsonData.taunts['def'])
    }
};