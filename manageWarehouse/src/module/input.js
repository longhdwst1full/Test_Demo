import mongoose from "mongoose";

const inputInfo = new mongoose.Schema(
    {
        name: { type: String },
        count: { type: Number },
        inputPrice: { type: String },
        outputPrice: { type: String },
        idProduct:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const inputInfo4 = mongoose.model("InputInfo", inputInfo);
export default inputInfo4;
