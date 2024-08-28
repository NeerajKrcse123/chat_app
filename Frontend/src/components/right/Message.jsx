import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef } from "react";
import useGetSocketMessage from "../../Context/useGetSocketMessage.jsx";
import UseConversation from "../zustand/UseConversation.js";

const Message = () => {
  const auth = JSON.parse(localStorage.getItem("user"));
  const token = Cookies.get("token");
  const { messages, setMessages, selectedConversation } = UseConversation(
    (state) => ({
      messages: state.messages,
      setMessages: state.setMessages,
      selectedConversation: state.selectedConversation,
    })
  );

  const handleMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/message/get/${selectedConversation._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if (selectedConversation) {
      handleMessages();
    }
  }, [selectedConversation]);

  useGetSocketMessage();
  const lastMessage = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMessage.current) {
        lastMessage.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  return (
    <>
      <div>
        <div className="p-4">
          {messages.map((message) => {
            const itsMe = auth?._id === message.senderId;
            const chatName = itsMe ? "chat-end" : "chat-start";
            const chatColor = itsMe ? "bg-blue-500" : "bg-gray-500";
            const createdAt = new Date(message.createdAt);
            const formattedTime = createdAt.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={message._id}
                ref={lastMessage}
                className={`chat ${chatName}`}
              >
                <div className={`chat-bubble text-white ${chatColor}`}>
                  {message.message}
                </div>
                <div className=" chat-footer text-xs text-gray-400 mt-1">
                  {formattedTime}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Message;
