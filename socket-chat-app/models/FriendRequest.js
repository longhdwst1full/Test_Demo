import mongoose from "mongoose";
import NotFoundError from "../exception/NotFoundError.js";

const friendRequestSchema = new mongoose.Schema(
    {
        senderId: mongoose.Types.ObjectId,
        receiverId: mongoose.Types.ObjectId,
    },
    { timestamps: true }
);

friendRequestSchema.statics.existsByIds = async (senderId, receiverId) => {
    const isExists = await FriendRequest.findOne({
        senderId,
        receiverId,
    });

    if (isExists) return true;

    return false;
};

friendRequestSchema.statics.checkByIds = async (
    senderId,
    receiverId,
    message = 'Invite'
) => {
    const isExists = await FriendRequest.findOne({
        senderId,
        receiverId,
    });

    if (!isExists) throw new NotFoundError(message);
};

friendRequestSchema.statics.deleteByIds = async (
    senderId,
    receiverId,
    message = 'Invite'
) => {
    const queryResult = await FriendRequest.deleteOne({ senderId, receiverId });

    const { deletedCount } = queryResult;
    if (deletedCount === 0) throw new NotFoundError(message);
};

const FriendRequest = mongoose.model('friendRequest', friendRequestSchema);

export default FriendRequest;
