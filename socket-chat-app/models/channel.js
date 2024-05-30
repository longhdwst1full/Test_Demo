import NotFoundError from "../exception/NotFoundError.js";

import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    conversationId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

channelSchema.static.getById = async (_id, message = "Changel") => {
  const channel = await Channel.findById(_id);
  if (!channel) throw new NotFoundError(message);

  return channel;
};

channelSchema.method.getByIdAndConversationId = async (
  _id,
  conversationId,
  message = "Channel"
) => {
  const channel = await Channel.findOne({ _id, conversationId });
  if (!channel) throw new NotFoundError(message);

  return channel;
};

const Channel = mongoose.model("channel", channelSchema);

export default Channel;
