const express = require("express");
const router = express.Router();
const discordBot = require("../bot");
const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('../config.json');
const app = express();
app.set('view engine', 'ejs');
const Levels = require('discord-xp');
const UserMod = require('../models/User')

router.get("/", function(request, response) {
  let ServerNUM = bot.guilds.cache.size;
  response.render("../views/index.ejs", {
    SiteName: config.siteName,
    icon: config.iconUrl,
    ServerCount: ServerNUM
  });
});

router.get("/invite", function(request, response) {
  response.redirect("https://discordapp.com/api/oauth2/authorize?client_id="+config.bot.id +"&permissions=8&scope=bot", {
    icon: config.iconUrl,  
    SiteName: config.siteName
  });
});
router.get("/easter", function(request, response){
  response.render("../views/easteregg.ejs", {
    icon: config.iconUrl,
    SiteName: config.siteName
  });
});
// router.get("/:id/leaderboard", async (req, res) => {
//   try {
//     const rawLeaderBoard = await Levels.fetchLeaderboard(req.params.id, 10);
//     if(rawLeaderBoard.length < 1) return message.reply('Nobody\'s on the leaderboard yet...');

//     const leaderboard = Levels.computeLeaderboard(bot, rawLeaderBoard);
//     const lb = leaderboard.map(e => 
//       `**${e.position}. ${bot.users.fetch(e.userID).tag}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}**`      
//     );
//     const send = lb.join("<br>");
//     res.render("../views/dashboard/leaderboard.ejs", {
//       icon: config.iconUrl,
//       SiteName: config.siteName,
//       leaderboard: send
//     })
//   } catch (error) {
//     res.render("../views/errors/404.ejs",{
//       icon: config.iconUrl,
//       SiteName: config.siteName 
//     });
//   }
// });
// if 404
router.get("*", function(request, response) {
  response.render("../views/errors/404.ejs", {
    icon: config.iconUrl,
    SiteName: config.siteName
  });
});

bot.login(config.bot.token)
console.log('------------[ACTIVATING]-------------\nSHARD: guides.js ONLINE - This is a standalone shard!\n-------------------------')
module.exports = router;