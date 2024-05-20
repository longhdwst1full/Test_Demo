const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const multer = require('multer');

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

router.post('/send-file', upload.single('file'), chatController.sendFile);
router.post('/send-image', upload.single('image'), chatController.sendImage);
router.post('/delete-chat', chatController.deleteChat);
router.get('/search-chat', chatController.searchChat);

module.exports = router;
