const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    userId: String,
    message: String,
    file: String,
    image: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chat', chatSchema);