const { Schema, model } = require('mongoose');
const config = require('../config.json');

const User = Schema({
    id: String,
    admin: {
        type: Boolean,
        default: false
    },
    username: {
        type: String,
        default: "User#0000"
    },
    profileImage: {
        type: String,
        default: config.iconUrl
    }
});

module.exports = model('User', User);