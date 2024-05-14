import express from "express";
import cors from "cors";
import morgan from "morgan"
import mongoose from "mongoose";
import router from "./routes/index.js";

const app = express();
app.use(morgan("common")); 
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
const connectDb = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/warehouse")
   
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));
};
app.use("/", router)
connectDb();











const port = process.env.PORT || 5000;

app.listen(port, async () => {
  try {
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
