module.exports = {
  name: 'approverole',
  aliases: ['approve', 'assignrole'],
  description: 'Approves a role to a user.',
  usage: '<user> <role name>',
  cooldown: 0,
  mod:true,
	execute(message, args, client) {
   try{
     if(message.mentions.members.size == 0){
       respond('Error', 'Please mention a user.', message.channel);
       return;
      }else{}
    const Discord = require('discord.js');
    const rolename = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg)).join(' ')
    const role = message.guild.roles.cache.find(role => role.name === rolename);
    const member = message.mentions.members.first();
    if(rolename == ''){
      respond('Error', 'Please provide a role name.', message.channel);
      return;
     }else{}
    try{
      member.roles.add([role]).then(
        respond('✅ Role Approved', `<@${message.mentions.members.first().id}> had the \`${rolename}\` role approved.`, message.channel)
        )
    }catch(error){
    respond('Error', 'Something went wrong.\n'+error, message.channel)
    return;
    }
  }catch(error) {
    respond('Error', 'Something went wrong.\n'+error+`\nMessage: ${message}\nArgs: ${args}\n`, message.channel)
    errorlog(error)
    // Your code broke (Leave untouched in most cases)
    console.error('an error has occured', error);
    }
  }}