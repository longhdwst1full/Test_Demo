import mongoose from "mongoose";
const mongoDBConnect = () => {
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/chatAppZalo", {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("MongoDB - Connected");
    } catch (error) {
        console.log("Error - MongoDB Connection " + error);
    }
};
export default mongoDBConnect;
