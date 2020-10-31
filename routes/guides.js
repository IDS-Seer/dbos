const express = require("express");
const router = express.Router();
const discordBot = require("../bot");
const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('../config.json');
const app = express();
app.set('view engine', 'ejs');
const Levels = require('discord-xp');
const UserModel = require('../models/User')

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