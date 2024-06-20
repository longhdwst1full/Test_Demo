import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
// config/db.config.js

const connectMongoose = () =>
  mongoose
    .connect(process.env.API_DB)
    .then(() => {
      console.log("Database connected");
    })
    .catch(() => {
      console.log("Database connect failed");
    });
export default connectMongoose