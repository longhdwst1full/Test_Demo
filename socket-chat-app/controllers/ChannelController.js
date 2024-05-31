import ChannelService from "../services/ChannelService.js";

class ChannelController {
  constructor(io) {
    this.io = io;
    this.add = this.add.bind(this);
    // this.update = this.update.bind(this);
    // this.deleteById = this.deleteById.bind(this);
  }

  async add(req, res, next) {
    const { _id } = req;

    try {
      const { channel, message } = await ChannelService.add(req.body, _id);
      const { conversationId } = channel;
    } catch (error) {
      next(error);
    }
  }
}

export default new ChannelController();
