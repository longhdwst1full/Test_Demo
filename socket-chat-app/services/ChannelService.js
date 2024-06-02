import NotFoundError from "../exception/NotFoundError.js";
import Conversation from "../models/Conversation.js";
import Channel from "../models/channel.js";
import Member from "../models/member.js";

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

    // check tồn tại cuộc trò chuyênnj này không
    const conversation = await Conversation.findOne({
      _id: conversationId,
      members: {
        $in: [userId],
      },
    });

    if (!conversation) throw new NotFoundError("Conversation");

    const { type } = conversation;

    // Chỉ nhóm trò chuyện
    if (!type)
      throw new MyError("Only conversation group(Chỉ nhóm trò chuyện)");

    if (await Channel.findOne({ name, conversation })) {
      throw new MyError("Channel name exists");
    }
  }

  async add(channelRequest, userId) {
    // req,body : name, conversationId
    // kiem tra channel have exist
    await this.validateChannelRequest(channelRequest, userId);

    const { name, conversationId } = channelRequest;

    // create kenh chat
    const newChannel = new Channel({
      name,
      conversationId,
    });
    const saveChannel = await newChannel.save();
    //  thêm thành viên vào data base bảng member
    await Member.updateMany(
      { conversationId },
      {
        $push: {
          lastViewOfChannels: {
            channelId: newChannel._id,
            lastView: Date.now(),
          },
        },
      }
    );
  }
}

export default new ChannelService();
