
import dotenv from "dotenv";
import { tokenUtils } from "../utils/tokenUtils.js";
import User from "../models/userModel.js";

dotenv.config();
export const Auth = async (req, res, next) => {
  const source = req.headers['user-agent'];
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = await tokenUtils.verifyToken(token);
    console.log(data, "data")
    const user = await User
      .findOne({
        _id: data._id,
        // isActived: true,
        isDeleted: false,
      })
      console.log(user, "user")
    const { timeRevokeToken } = user;
    const { createdAt } = data;

    if (
      !user ||
      !data.source ||
      source !== data.source ||
      !createdAt ||
      new Date(createdAt) < new Date(timeRevokeToken)
    ) {
      console.log('source !== data.source: ', source !== data.source);
      throw new Error();
    }

    req._id = data._id;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: 401,
      error: 'Not authorized to access this resource',
    });
  }
};
