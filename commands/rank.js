const Discord = require("discord.js");
const Levels = require('discord-xp');
const c = require("../colors.json");
const Canvas = require("canvas");

module.exports.run = async (bot, message, args) => {
    const user = await Levels.fetch(message.author.id, message.guild.id);

    // const embed = new Discord.MessageEmbed()
    //     .setColor(c.gold)
    //     .setAuthor(`${message.member.user.tag}`, message.author.displayAvatarURL())
    //     .setDescription(`You are currently level **${user.level}**!`)
    // message.channel.send(embed)
    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');
    
        // Declare a base size of the font
        let fontSize = 70;
    
        do {
            // Assign the font to the context and decrement it so it can be measured again
            ctx.font = `${fontSize -= 10}px sans-serif`;
            // Compare pixel width of the text to the canvas minus the approximate avatar size
        } while (ctx.measureText(text).width > canvas.width - 300);
    
        // Return the result to use in the actual canvas
        return ctx.font;
    };
    try {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');

    
        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
        // Add an exclamation point here and below
        ctx.font = applyText(canvas, `${message.member.user.tag}`);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${message.member.user.tag}`, canvas.width / 2.5, canvas.height / 2.5);
    
                // Slightly smaller text placed above the member's display name
                ctx.font = '28px sans-serif';
                ctx.fillStyle = '#ffffff';
                ctx.fillText('Level ' + user.level, canvas.width / 2.5, canvas.height / 1.8);
            
                // Slightly smaller text placed above the member's display name
                ctx.font = '28px sans-serif';
                ctx.fillStyle = '#ffffff';
                ctx.fillText('XP: ' + user.xp, canvas.width / 2.5, canvas.height / 1.4);
            

        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
    
        const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 25, 25, 200, 200);
    
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'rank-dbos.png');
    
        message.channel.send(attachment);
      } catch (error) {
        await message.channel.send(`Something happened: ${error.message}`);
      }
}

module.exports.help = {
    name: "rank",
    aliases: ["level"]
}