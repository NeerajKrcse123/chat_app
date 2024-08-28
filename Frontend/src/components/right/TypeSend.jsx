import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import UseConversation from "../zustand/UseConversation";
const TypeSend = () => {
  const [typeMessage, setTypeMessage] = useState("");
  const token = Cookies.get("token");

  const { messages, setMessages, selectedConversation } = UseConversation(
    (state) => ({
      messages: state.messages,
      setMessages: state.setMessages,
      selectedConversation: state.selectedConversation,
    })
  );

  const sendMessages = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/message/send/${selectedConversation._id}`,

        {
          message: typeMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTypeMessage("");
      setMessages([...messages, response.data.newMessage]);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  return (
    <>
      <div className="flex space-x-2 h-[8vh] text-center mx-4 items-center">
        <div className="w-[100%] md:w-[70%]">
          <input
            type="text"
            placeholder="Type here"
            value={typeMessage}
            onChange={(e) => setTypeMessage(e.target.value)}
            className="input input-bordered w-full "
          />
        </div>
        <button onClick={sendMessages}>
          <IoMdSend className="text-2xl text-white" />
        </button>
      </div>
    </>
  );
};

export default TypeSend;
