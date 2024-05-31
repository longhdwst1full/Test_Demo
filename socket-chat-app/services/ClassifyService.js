import Classify from "../models/Classify.js";
import Color from "../models/Color.js";

class ClassifyService {
  async getAllColers() {
    return await Color.find();
  }

  // validate data
  async validate(userId, classily) {
    const { _id, name, colorId } = classily;
    // check color exits
    await Color.checkById(colorId);

    // check name
    if (!name || name.length === 0 || name > 50) {
      throw new MyError("Name not valid");
    }
    let existsName;
    // update
    if (_id)
      existsName = await Classify.findOne({
        _id: { $ne: _id },
        name,
        userId,
      });
    else existsName = await Classify.findOne({ name, userId });

    if (existsName) throw new MyError("Name extis");
  }

  async add(userId, classily) {
    await this.validate(userId, classily);
  }
}

export default new ClassifyService();
