const Discord = require("discord.js");
const config = require('../config.json');
module.exports.run = async (bot, message, args) => {
    try {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You do not have permission to use this command!')
         if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`Something went wrong! ${config.siteName} doesn't have the right permissions to execute this command!`)

         const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

         if(!args[0]) return message.channel.send('Please specify a user!');

         if(!member) return message.channel.send('Can\'t find this user in the server.');
         if(!member.kickable) return message.channel.send('This user can\'t be banned since they have a higher role than me.');

         if(member.id === message.author.id) return message.channel.send(`${member}, you can\'t ban yourself!`);

         let reason = args.slice(1).join(" ");

         if(reason === undefined) reason = 'Unspecified';
        
         member.ban({reason: reason})
            .catch(err => {
                const c = require("../colors.json");
                const Err_1 = new Discord.MessageEmbed()
                    .setColor(c.error)
                    .setTitle("**Error**")
                    .setDescription("I have encountered a unexpected error: `"+ error.message +"`\nplease report this to: https://dbos.flarum.cloud or https://github.com/wezacon/dbos")
                return message.channel.send(Err_1);
            })

        return message.channel.send(`${member} was successfully banned!`);

    } catch (error) {
        const c = require("../colors.json");
        const Err_1 = new Discord.MessageEmbed()
            .setColor(c.error)
            .setTitle("**Error**")
            .setDescription("I have encountered a unexpected error: `"+ error.message +"`\nplease report this to: https://dbos.flarum.cloud or https://github.com/wezacon/dbos")
        return message.channel.send(Err_1);
 }
 
}






module.exports.help = {
    name: "ban",
    aliases: []
}