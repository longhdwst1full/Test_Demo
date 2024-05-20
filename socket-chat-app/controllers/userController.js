const User = require('../models/User');

exports.searchFriends = async (req, res) => {
    const { keyword } = req.query;

    const users = await User.find({ username: { $regex: keyword, $options: 'i' } });

    res.status(200).json(users);
};

exports.deleteFriend = async (req, res) => {
    const { userId, friendId } = req.body;

    await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });

    res.status(200).json({ message: 'Friend deleted successfully' });
};

exports.updateProfile = async (req, res) => {
    const { userId, profile } = req.body;

    await User.findByIdAndUpdate(userId, { profile });

    res.status(200).json({ message: 'Profile updated successfully' });
};
