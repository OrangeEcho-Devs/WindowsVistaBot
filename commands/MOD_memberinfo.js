module.exports = {
  name: 'memberinfo',
  aliases: ['infomember'],
  description: 'Gets info about mentioned user',
  usage: '<user>',
  cooldown: 0,
  mod:true,
	execute(message, args, client) {
    const Discord = require('discord.js');
    
    const fs = require('fs');
    try {const taggeduser = message.mentions.users.first().id
    const taggeduserobject = message.mentions.users.first()
    fs.readFile('./logs/'+taggeduser+'-modwarnings.log', (err, data) => {
      if (err || data.toString() == '') {
        console.error(err)
        const memberinfoembed = new Discord.MessageEmbed()
        .setColor('#00FF00')
        .setTitle('Member Information')
        .setAuthor(taggeduserobject.username)
        .addFields(
          { name: 'Punishment Log', value: 'No punishment information was found.', inline: false },
          { name: 'Other information', value: `Member ID: ${taggeduserobject.id}\nAccount creation date: ${taggeduserobject.createdAt}\nServer join date: ${message.mentions.members.first().joinedAt}`  , inline: false },
        )
        .setTimestamp()
        message.channel.send(memberinfoembed)

        return
      }
      if(data.length > 1024){
        var data = 'Punishment information is too long to send.'
      }else{var data= data}
      const memberinfoembed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle('Member Information')
      .setAuthor(taggeduserobject.username)
      .addFields(
        { name: 'Punishment Log', value: data, inline: false },
        { name: 'Other information', value: `Member ID: ${taggeduserobject.id}\nAccount creation date: ${taggeduserobject.createdAt}\nServer join date: ${message.mentions.members.first().joinedAt}`  , inline: false },
      )
      .setTimestamp()
      message.channel.send(memberinfoembed)
    }) }catch(error) {
      respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
      errorlog(error)
      // Your code broke (Leave untouched in most cases)
      console.error('an error has occured', error);
      }

 
 }}