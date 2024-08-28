import bcrypt from "bcryptjs";
import generateToken from "../jwt/generateToken.js";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
    const { fullname, email, password, confirmpassword } = req.body;
    try {
        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Password and Confirm Password do not match" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await new User({ fullname, email, password: hashedPassword });
        await newUser.save();
        if (newUser) {
            const token = generateToken(newUser._id);
            return res.status(201).json({
                message: "User created successfully", user: {
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email,
                    token
                }
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!user || !isMatch) {
            return res.status(400).json({ error: "Invalid user credentials" })
        }
        const token = generateToken(user._id);
        res.status(200).json({
            message: "user logged in successfully", user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                token
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt")
        res.status(201).json({ message: "user logout successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

export const allUsers = async (req, res) => {
    try {

        const loggedInUserId = req.user._id
        const filterUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json({ filterUsers });
    }
    catch (error) {
        console.log("error in allUsers controller", error);

    }
}