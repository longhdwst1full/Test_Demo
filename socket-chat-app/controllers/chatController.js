const Chat = require('../models/Chat');
const multer = require('multer');

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

exports.sendFile = async (req, res) => {
    const { userId, chatId } = req.body;
    const file = req.file;

    const chat = new Chat({ userId, file: file.path });
    await chat.save();

    res.status(200).json({ message: 'File sent successfully', chat });
};

exports.sendImage = async (req, res) => {
    const { userId, chatId } = req.body;
    const image = req.file;

    const chat = new Chat({ userId, image: image.path });
    await chat.save();

    res.status(200).json({ message: 'Image sent successfully', chat });
};

exports.deleteChat = async (req, res) => {
    const { chatId } = req.body;

    await Chat.findByIdAndDelete(chatId);

    res.status(200).json({ message: 'Chat deleted successfully' });
};

exports.searchChat = async (req, res) => {
    const { userId, keyword } = req.query;

    const chats = await Chat.find({ userId, message: { $regex: keyword, $options: 'i' } });

    res.status(200).json(chats);
};
