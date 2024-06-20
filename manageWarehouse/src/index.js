// app.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import routers from "./routes/index.js";

import connectMongoose from "./config/db.config.js";

dotenv.config();

const app = express();

// const corsOptions = {
//   origin: "http://localhost:3000"
// };

// app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Kết nối cơ sở dữ liệu
connectMongoose();

// Định tuyến
app.use("/api/v1/", routers);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
