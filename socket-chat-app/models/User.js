const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    friends: [String], // Array of friend user IDs
    profile: {
        name: String,
        email: String,
        avatar: String,
    }
});

module.exports = mongoose.model('User', userSchema);
