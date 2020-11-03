const { Schema, model } = require('mongoose');
const config = require('../config.json');

const levels = Schema({
    userID: { type: String },
    guildID: { type: String },
    userTag: { type: String },
    userImage: { type: String },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: new Date() }
});

module.exports = model('levels', levels);