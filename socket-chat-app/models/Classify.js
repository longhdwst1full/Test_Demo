import mongoose from "mongoose";
import NotFoundError from "../exception/NotFoundError.js";

const classifySchema = new mongoose.Schema({
  name: String,
  conversationIds: [mongoose.Types.ObjectId],
  colorId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
});

classifySchema.statics.checkById = async (_id, message = "Classify") => {
  const isExists = await Classify.findById(_id);

  if (!isExists) throw new NotFoundError(message);
};

classifySchema.statics.getByIdAndUserId = async (
  _id,
  userId,
  message = "Classify"
) => {
  const classify = await Classify.findOne({ _id, userId });
  if (!classify) throw new NotFoundError(message);

  return classify;
};

const Classify = mongoose.model("classify", classifySchema);

export default Classify;
