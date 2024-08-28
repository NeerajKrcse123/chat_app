import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socketIO/server.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id; // current logged in user is the sender

        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
        })
        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId]
            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }
        await Promise.all([conversation.save(),
        newMessage.save()])
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json({
            message: "Message sent successfully",
            newMessage
        })


    } catch (error) {
        console.log("Error in sending message", error);
        res.status(500).json({ error: "Internal server error" })
    }
}


export const getMessage = async (req, res) => {
    try {
        const { id: chatUser } = req.params;
        const senderId = req.user._id;

        // Find the conversation
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, chatUser] }
        }).populate("messages");

        // If no conversation is found, respond with an empty array
        if (!conversation) {
            return res.status(200).json([]);
        }

        // Return the messages if the conversation exists
        const messages = conversation.messages;
        return res.status(200).json(messages);

    } catch (error) {
        console.error("Error in getMessage", error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};
