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
  try {
    let ServerNUM = bot.guilds.cache.size;
    response.render("../views/index.ejs", {
      SiteName: config.siteName,
      icon: config.iconUrl,
      ServerCount: ServerNUM
    });
  } catch (error) {
    res.render("../views/errors/404.ejs", {icon: config.iconUrl, SiteName: config.siteName, Error: error.message});
  }

});

router.get("/invite", function(request, response) {
  response.redirect("https://discordapp.com/api/oauth2/authorize?client_id="+config.bot.id +"&permissions=8&scope=bot", {
    icon: config.iconUrl,  
    SiteName: config.siteName
  });
});
router.get("/easter", function(request, response){
  try { 
    response.render("../views/easteregg.ejs", {
      icon: config.iconUrl,
      SiteName: config.siteName
    });
  } catch (error) {
    res.render("../views/errors/404.ejs", {icon: config.iconUrl, SiteName: config.siteName, Error: error.message});
  }

});
router.get("/users", async (req, res, next) => {
  try {
    const users = await UserModel.find({}).sort({$natural:-1});
    
    let data = {
      users: users,
      icon: config.iconUrl,
      SiteName: config.siteName
    }
    res.render("../views/dashboard/users.ejs", data);
  } catch (error) {
    res.render("../views/errors/404.ejs", {icon: config.iconUrl, SiteName: config.siteName, Error: error.message});
  }
});
router.get("/user/:id", async (req, res, next) => {
    const user = await bot.users.fetch(req.params.id);
    if (!user) return res.render("../views/errors/404.ejs", {icon: config.iconUrl, SiteName: config.siteName})
    const userListed = await UserModel.findOne({ id: req.params.id });
    try {
      if(userListed){
          let VERIFIED_DEVELOPER = (await user.fetchFlags()).has("VERIFIED_DEVELOPER")
            
          if(userListed.bio == "" || userListed.bio == undefined || userListed.bio == null){
            var userBio = "This user does not have a bio yet.";
          } else {
            var userBio = userListed.bio;
          }

            let data = {
                user: req.user,
                userProfile: user,
                developer: VERIFIED_DEVELOPER ,
                isProfile: true,
                avatar: user.displayAvatarURL(),
                username: user.tag,
                admin: userListed.admin,
                bio: userBio,
                icon: config.iconUrl,
                SiteName: config.siteName
            }
        res.render("../views/dashboard/user.ejs", data);
      } else {
        res.render("../views/errors/404.ejs", {icon: config.iconUrl, SiteName: config.siteName, Error: error.message});
      }
    } catch (error) {
      res.render("../views/errors/404.ejs", {icon: config.iconUrl, SiteName: config.siteName, Error: error.message});
  }
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