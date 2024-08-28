import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const SecureRoute = async (req, res, next) => {
    try {

        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: "No token, authorization denied" });
        }
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_TOKEN);

        if (!decoded) {
            return res.status(401).json({ error: "Invalid token" });
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ error: "No user found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in secure route", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
