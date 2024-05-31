import NotFoundError from "../exception/NotFoundError.js";
import Conversation from "../models/Conversation.js";

class ChannelService {
  async validateChannelRequest(channelRequest, userId) {
    const { name, conversationId } = channelRequest;
    if (
      !name ||
      typeof name !== "string" ||
      name.length === 0 ||
      name.length > 100
    )
      throw new MyError("Channel name invalid,  0 < length <= 100 ");
  }

  async add(channelRequest, userId) {
    // req,body : name, conversationId
    await this.validateChannelRequest(channelRequest, userId);

    const conversation = await Conversation.findOne({
      _id,
      members: { $in: [userId] },
    });

    if (!conversation) throw new NotFoundError((message = "Conversation"));

    const { type } = conversation;
  }
}

export default new ChannelService();
