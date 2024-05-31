import User from "../models/userModel.js";
import commonUtils from "../utils/commont.js";
import { tokenUtils } from "../utils/tokenUtils.js";
import dotenv from "dotenv";
import userValidate from "../validate/validate.js";
dotenv.config();

const OTP_EXPIRE_MINUTE = parseInt(process.env.OTP_EXPIRE_MINUTE);

class AuthServices {
  async login(username, password, source) {
    const { _id } = await User.findByCredentials(username, password);
    console.log(source, "source: " + JSON.stringify(source));
    return await this.generateAndUpdateAccessTokenAndRefreshToken(_id, source);
  }

  async generateAndUpdateAccessTokenAndRefreshToken(_id, source) {
    const token = await tokenUtils.generateToken(
      { _id, source },
      process.env.JWT_LIFE_ACCESS_TOKEN
    );
    const refreshToken = await tokenUtils.generateToken(
      { _id, source },
      process.env.JWT_LIFE_REFRESH_TOKEN
    );

    // xóa phần tử ra khỏi mảng (pull)
    await User.updateOne({ _id }, { $pull: { refreshTokens: { source } } });
    // update thêm phần tử vào mảng với điều kiện _id
    await User.updateOne(
      { _id },
      { $push: { refreshTokens: { token: refreshToken, source } } }
    );
    return {
      token,
      refreshToken,
    };
  }

  async registerUser(userInfo) {
    // check validate data
    // const registryInfo = await userValidate.checkRegistryInfo(userInfo);

    const newUser = new User({
      ...userInfo,
      isActived: true,
    });
    const saveUser = await newUser.save();
    const { _id, username } = saveUser;
    // send otp check account
    // this.sendOTP(_id, username)
    return saveUser;
  }

  async sendOTP(id, username) {
    // email : true -> check
    let type = true;

    if (userValidate.validatePhone(username)) {
      type = false;
      const otp = commonUtils.getRandomOTP();
      const otpTime = new Date();
      otpTime.setMinutes(otpTime.getMinutes() + OTP_EXPIRE_MINUTE);
      await User.updateOne({ _id }, { otp, otpTime });
    }
    // if(type){

    // }
  }
}

export default new AuthServices();
