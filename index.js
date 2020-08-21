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
    let id = msg.content.substr(jsonData.prefix.length);
    if(jsonData.taunts.hasOwnProperty(id) && voiceChannel)
    {
        play(voiceChannel, id, msg)
    }else if(id === '0')
    {
        let command = Math.random() * 100;
        if (command > 98){
            command = 98;
        }else if (command < 1)
        {
            command = 1;
        }
        play(voiceChannel, Math.round(command).toString(), msg);
    }else if(id === 'help')
    {
        let helpMsg = JSON.stringify(jsonData.taunts);
        let helpArray = helpMsg.split(",");
        let msgString = "";
        let clientNameLength = msg.author.tag.length;
        helpArray.forEach( item =>{
            console.log(item);
            if ((msgString.length + clientNameLength)<1900){
                console.log("FIRST IF" + item);
                msgString += item + "\n";
            }else if ((clientNameLength + msgString.length + item.length)<1999)
            {
                console.log("SECOND IF" + item);
                msgString += item + "\n";
                msg.reply(msgString);
                msgString = "";
            }else
            {
                console.log("THIRD IF" + item);
                msg.reply(msgString);
                msgString = "";
                msgString += item + "\n";
            }  
        })
        if(msgString.length){
            msg.reply(msgString)
        };
    }
    else
    {
        msg.reply(jsonData.taunts['def'])
    }
};

function play(voiceChannel, id, msg){
    msg.reply('Playing taunt ' + id + ' -> ' + jsonData.taunts[id]);
    voiceChannel.join().then( connection =>{
        const dispatcher  = connection.play('./sound/' + id + '.mp3');
        dispatcher.on('finish', end => voiceChannel.leave());
    })
    .catch(console.error);        
}

function replyMsg(msg){
    const id = msg.content.substr(jsonData.prefix.length);
    if(jsonData.taunts.hasOwnProperty(id))
    {
        msg.reply(jsonData.taunts[id])
    }else
    {
        msg.reply(jsonData.taunts['def'])
    }
};