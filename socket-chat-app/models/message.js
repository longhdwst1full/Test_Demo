import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            require: true,
        },
        manipulatedUserIds: {
            type: [mongoose.Types.mongoose.Types.ObjectId],
            default: [],
        },
        content: {
            type: String,
            require: true,
        },
        tags: {
            type: [mongoose.Types.ObjectId],
            default: [],
        },
        // trả lời lại message user someone
        replyMessageId: mongoose.Types.ObjectId,
        type: {
            type: String,
            enum: [
                "TEXT",
                "IMAGE",
                "STICKER",
                "VIDEO",
                "FILE",
                "HTML",
                "NOTIFY",
                "VOTE",
            ],
            require: true,
        },
        reacts: {
            type: [
                {
                    userId: mongoose.Types.ObjectId,
                    type: {
                        type: Number,
                        enum: [0, 1, 2, 3, 4, 5, 6],
                    },
                },
            ],
            default: [],
        },
        options: {
            type: [
                {
                    name: String,
                    userIds: {
                        type: [mongoose.Types.ObjectId],
                        default: [],
                    },
                },
            ],
            require: false,
        },
        deletedUserIds: {
            type: [mongoose.Types.ObjectId],
            default: [],
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        //id cuộc hội thoại
        conversationId: mongoose.Types.ObjectId,
        channelId: mongoose.Types.ObjectId,
        createdAt: Date,
        updatedAt: Date,
    },
    { timestamps: true }
);

const Message = mongoose.model("message", messageSchema);

export default Message;
