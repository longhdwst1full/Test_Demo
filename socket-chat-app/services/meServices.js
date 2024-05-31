import MyError from "../exception/MyError";
import User from "../models/userModel.js";
import userValidate from "../validate/validate";

class MeService {
  async getProfile(_id) {
    const user = await User.getById(_id);

    return user;
  }

  async updateProfile(_id, profile) {
    if (!profile) throw new MyError("Profile invalid");

     const profileWasValidate = userValidate.checkProfile(profile);

    // check user
    await User.getById(_id);

    await User.updateOne({ _id }, { ...profileWasValidate });
  }
}

export default new MeService();
