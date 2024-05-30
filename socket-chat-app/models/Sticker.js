import mongoose from "mongoose";
import NotFoundError from "../exception/NotFoundError.js";

const stickerSchema = new mongoose.Schema({
    name: String,
    description: {
        type: String,
        default: "",
    },
    stickers: {
        type: [String],
        default: [],
    },
});

stickerSchema.statics.getById = async (_id) => {
    const stickerGroup = await Sticker.findById(_id);
    if (!stickerGroup) throw new NotFoundError("Sticker group");

    return stickerGroup;
};

const Sticker = mongoose.model("sticker", stickerSchema);

module.exports = Sticker;
