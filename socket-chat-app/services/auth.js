import User from "../models/userModel.js"
import { tokenUtils } from "../utils/tokenUtils.js";
import dotenv from "dotenv"
dotenv.config()


class AuthServices {
    async login(username, password, source) {
        const { _id } = await User.findByCredentials(username, password);

        return await this.generateAndUpdateAccessTokenAndRefreshToken(
            _id,
            source
        );
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
    }
}

export default AuthServices