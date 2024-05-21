
import User from "../models/userModel.js";

import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';


export const register = async (req, res) => {
    const { firstname, email, password, lastname } = req.body

    try {
        const exitingUser = await User.findOne({ email })
        if (exitingUser) {
            return res.status(400).json({ msg: "User already exists" })
        }
        const fullName = firstname + lastname
        const newUser = new User({ email, password, name: fullName })
        const token = await newUser.generateAuthToken()
        await newUser.save()

        res.json({ message: 'success', token: token });
    } catch (error) {
        console.log('Error in register ' + error);
        res.status(500).send(error);
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const valid = await User.findOne({ email })
        if (!valid) res.status(200).json({ message: 'User dont exist' });

        const validPassword = await bcrypt.compare(password, valid.password);

        if (!validPassword) {
            res.status(200).json({ message: 'Invalid Credentials' });
        }
        else {
            const token = await valid.generateAuthToken();
            console.log(token, valid,":::chekc - Password")
            await valid.save();
            res.cookie('userToken', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json({ token: token, status: 200 });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const validUser = async (req, res) => {
    try {
        const validuser = await User
            .findOne({ _id: req.rootUserId })
            .select('-password');

        if (!validuser) res.json({ message: 'user is not valid' });
        res.status(201).json({
            user: validuser,
            token: req.token,
        });

    } catch (error) {
        res.status(500).json({ error: error });
        console.log(error);
    }
}


export const googleAuth = async (req, res) => {
    try {
        const { tokenId } = req.body;
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const verify = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.CLIENT_ID,
        });

        const { email_verified, email, name, picture } = verify.payload;

        if (!email_verified) res.json({ message: 'Email Not Verified' });
        const userExist = await User.findOne({ email }).select('-password');

        if (userExist) {
            res.cookie('userToken', tokenId, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json({ token: tokenId, user: userExist });
        }
        else {
            const password = email + process.env.CLIENT_ID;
            const newUser = await user({
                name: name,
                profilePic: picture,
                password,
                email,
            });

            await newUser.save();
            res.cookie('userToken', tokenId, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });

            res
                .status(200)
                .json({ message: 'User registered Successfully', token: tokenId });
        }

    } catch (error) {
        res.status(500).json({ error: error });
        console.log('error in googleAuth backend' + error);
    }
};



export const logout = (req, res) => {
    req.rootUser.tokens = req.rootUser.tokens.filter((e) => e.token != req.token);
};


export const searchUsers = async (req, res) => {
    // const { search } = req.query;
    const search = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: 'i' } },
                { email: { $regex: req.query.search, $options: 'i' } },
            ],
        }
        : {};

    const users = await User.find(search).find({ _id: { $ne: req.rootUserId } });
    res.status(200).send(users);
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const selectedUser = await User.findOne({ _id: id }).select('-password');
        res.status(200).json(selectedUser);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateInfo = async (req, res) => {
    const { id } = req.params;
    const { bio, name } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { name, bio });
    return updatedUser;
};

