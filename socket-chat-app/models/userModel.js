import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import NotFoundError from "../exception/NotFoundError.js";
import { isAxiosError } from "axios";
dotenv.config();

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            // required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: "",
        },
        avatarColor: {
            type: String,
            default: "white",
        },
        coverImage: String,
        type: Boolean,
        dateOfBirth: {
            type: Date,
            default: new Date("2000-01-01"),
        },
        gender: {
            type: Boolean,
            default: false,
        },
        profilePic: {
            type: String,
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        refreshTokens: {
            type: [
                {
                    token: String,
                    source: String,
                },
            ],
            default: [],
        },
        phoneBooks: {
            type: [{ name: String, phone: String }],
            default: [],
        },
        otp: String,
        otpTime: Date,
        isActived: Boolean,
        isDeleted: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        timeRevokeToken: {
            type: Date,
            default: new Date(),
        },
    },
    {
        timestamps: true,
    }
);
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hashSync(this.password, 12);
    }
    next();
});

userSchema.statics.findByCredentials = async (username, password) => {
    console.log(username, password,"eeeeee");
    const user = await User.findOne({
        username,
        // isActived: true,
        isDeleted: false,
    });
console.log(user,"EEEEEEEEE")
    if (!user) throw new NotFoundError("User");

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw new MyError("Password invalid");

    return user;
};

userSchema.statics.exitsById = async (_id) => {
    const user = User.findOne({
        _id,
        isActived: true
    });
    if (user) return true;
    return false;
};

userSchema.statics.checkByIds = async (ids, message = "User") => {
    for (const idEle of ids) {
        const user = await User.findOne({
            _id: idEle,
            isActived: true,
            isDeleted: false,
        });
        if (!user) throw new NotFoundError(message);
    }
};

userSchema.statics.getById = async (id, message = "User") => {
    const user = await User.findOne({
        _id,
        isActived: true,
        isActived: true
    });
    if (!user) throw new NotFoundError(message);

    const {
        name,
        username,
        dateOfBirth,
        gender,
        avatar,
        avatarColor,
        coverImage,
        isAdmin,
        phoneBooks,
    } = user;

    return {
        _id,
        name,
        username,
        dateOfBirth: dateUtils.toObject(dateOfBirth),
        gender,
        avatar,
        avatarColor,
        coverImage,
        isAdmin,
        phoneBooks,
    };
};

userSchema.statics.existsByUsername = async (username) => {
    const user = await User.findOne({
        username,
        isActived: true,
    });
    if (user) return true;
    return false;
};

userSchema.statics.findByUsername = async (username, message = "User") => {
    const user = await User.findOne({
        username,
        isActived: true,
    });

    if (!user) throw new NotFoundError(message);

    const { _id, name, dateOfBirth, gender, avatar, avatarColor, coverImage } =
        user;
    return {
        _id,
        name,
        username,
        dateOfBirth: dateUtils.toObject(dateOfBirth),
        gender,
        avatar,
        avatarColor,
        coverImage,
    };
};

userSchema.statics.checkById = async (_id, message = "User") => {
    const user = await User.findOne({
        _id,
        isActived: true
    });

    if (!user) throw new NotFoundError(message);

    return user;
};

userSchema.statics.getSummaryId = async (_id, message = "User") => {
    const user = await User.findOne({
        _id,
        isActived: true
    });
    if (!user) throw new NotFoundError(message);

    const { name, avatar } = user;
    return {
        _id,
        name,
        avatar,
    };
};
userSchema.methods.generateAuthToken = async function () {
    try {
        console.log(this._id, this.email);
        let token = jwt.sign(
            {
                id: this._id,
                email: this.email
            },
            process.env.SECRET,
            {
                expiresIn: "24h",
            }
        );

        return token;
    } catch (error) {
        console.log("error while generating token");
    }
};

const User = mongoose.model("User", userSchema);
export default User;
