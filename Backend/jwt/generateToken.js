import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_TOKEN, { expiresIn: "20d" });
};

export default generateToken;
