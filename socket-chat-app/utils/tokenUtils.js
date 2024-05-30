import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import MyError from "../exception/MyError.js";
dotenv.config();

export const tokenUtils = {
  generateToken: async (data, tokenLife) => {
    if (!data) return null;
    return await jw.sign(
      { ...data, createdAt: new Date() },
      process.env.JWT_KEY,
      {
        expiresIn: tokenLife,
      }
    );
  },

  verifyToken: async (token) => {
    if (!token) return new MyError("Token invalid");

    return await jwt.verify(token, process.env.JWT_KEY);
  },
};
