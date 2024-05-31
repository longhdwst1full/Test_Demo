import mongoose from "mongoose";
import NotFoundError from "../exception/NotFoundError.js";

const conversationSchema = new mongoose.Schema(
  {
    name: String,
    avatar: String,
    leaderId: mongoose.Types.ObjectId,
    managerIds: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    lastMessageId: mongoose.Types.ObjectId,
    pinMessageIds: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    members: [mongoose.Types.ObjectId],
    isJoinFromLink: {
      type: Boolean,
      default: true,
    },
    type: Boolean,
  },
  { timestamps: true }
);

conversationSchema.index({ name: "text" });

conversationSchema.statics.getListByUserId = async (userId) => {
  return await Conversation.find({
    members: { $in: [userId] },
  }).sort({ updatedAt: -1 });
};

conversationSchema.statics.getListGroupByNameContainAndUserId = async (
  name,
  userId
) => {
  return await Conversation.find({
    name: { $regex: name, $options: "i" },
    members: { $in: [userId] },
    type: true,
  }).sort({ updatedAt: -1 });
};

conversationSchema.statics.getListIndividualByNameContainAndUserId = async (
  name,
  userId
) => {
  return await Conversation.aggregate([
    {
      $match: {
        members: { $in: [ObjectId(userId)] },
        type: false,
      },
    },
    {
      $lookup: {
        from: "members",
        localField: "_id",
        foreignField: "conversationId",
        as: "users",
      },
    },
    {
      $unwind: "$users",
    },
    {
      $match: {
        "users.userId": { $ne: ObjectId(userId) },
        "users.name": { $regex: name, $options: "i" },
      },
    },
    {
      $sort: { updatedAt: -1 },
    },
    {
      $project: { _id: 1 },
    },
  ]);
};

conversationSchema.statics.getListNameAndAvatarOfMembersById = async (_id) => {
  return await Conversation.aggregate([
    {
      $match: {
        _id: ObjectId(_id),
      },
    },

    {
      $project: {
        _id: 0,
        members: 1,
      },
    },
    {
      $unwind: "$members",
    },
    {
      $lookup: {
        from: "users",
        localField: "members",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        name: "$user.name",
        avatar: "$user.avatar",
        avatarColor: "$user.avatarColor",
      },
    },
  ]);
};

conversationSchema.statics.existsIndividualConversation = async (
  userId1,
  userId2
) => {
  const conversation = await Conversation.findOne({
    type: false,
    members: { $all: [userId1, userId2] },
  });

  if (conversation) return conversation._id;
  return null;
};

conversationSchema.statics.getById = async (_id, message = "Conversation") => {
  const conversation = await Conversation.findById(_id);
  if (!conversation) throw new NotFoundError(message);

  return conversation;
};

conversationSchema.statics.existsByUserIds = async (
  _id,
  userIds,
  message = "Conversation"
) => {
  const conversation = await Conversation.findOne({
    _id,
    members: { $all: [...userIds] },
  });

  if (!conversation) throw new NotFoundError(message);

  return conversation;
};

const Conversation = mongoose.model("conversation", conversationSchema);

export default Conversation;
