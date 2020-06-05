module.exports = {
    name: 'urban',
    aliases: ['urbandic', 'urbandictionary'],
    description: 'Searches a word in Urban Dictionary',
    usage: '',
    cooldown: 0,
    mod:false,
      execute(message, args, client) {
      const Discord = require('discord.js');
      const urban = require("relevant-urban");
      const fs = require('fs');  
      exports.run = async (client, message, args, tools) => {
            if (!args[0]) return message.channel.send(`You need to specify a word for me to search dumbass`)

            let res = await urban(args.join(' ')).catch(e => {
                return message.channel.send('This word wasn\'t found. Sad.');
            })
            const embed = new Discord.MessageEmbed()
                .setColour('RANDOM')
                .setTitle(res.word)
                .setURL(res.urbanURL)
                .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n*${res.example}*`)
                .addField('Author', res.author, true)
                .addField('Rating', `**\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown}\`**`)

            if (res.tags.length > 0 && res.tags.join(' ').length < 1024) {
                embed.addField('Tags', res.tags.join(', '), true)
            }
            message.channel.send(embed);
        }
    }
}