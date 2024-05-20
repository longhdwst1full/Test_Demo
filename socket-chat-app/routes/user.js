const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/search-friends', userController.searchFriends);
router.post('/delete-friend', userController.deleteFriend);
router.post('/update-profile', userController.updateProfile);

module.exports = router;
