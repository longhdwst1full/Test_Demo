import mongoose from "mongoose";
import NotFoundError from "../exception/NotFoundError.js";


const colorSchema = new mongoose.Schema({
    name: String,
    code: String,
});

colorSchema.statics.checkById = async (colorId, message = 'Color') => {
    const isExists = await Color.findById(colorId);

    if (!isExists) throw new NotFoundError(message);
};

const Color = mongoose.model('color', colorSchema);

export default Color;
