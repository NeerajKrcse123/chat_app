import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import messageRouter from "./routes/message.route.js";
import userRouter from './routes/user.route.js';
import { app, server } from "./socketIO/server.js";
app.use(express.json());
app.use(cors());
app.use(cookieParser())
dotenv.config();

const port = process.env.PORT || 4000;
const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI);
    console.log('Connected to MongoDB');
}

catch (err) {
    console.log(err);
}

app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);


server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);  