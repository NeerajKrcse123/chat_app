import { useEffect } from "react";
import Sound from "../assets/notifications.wav";
import UseConversation from "../components/zustand/UseConversation";
import { useSocketContext } from "./SocketContext";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = UseConversation((state) => ({
    messages: state.messages,
    setMessages: state.setMessages,
  }));

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      const notification = new Audio(Sound);
      notification.play();
      setMessages([...messages, newMessage]);
    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket, messages, setMessages]);
};

export default useGetSocketMessage;
