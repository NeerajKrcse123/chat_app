import { CiMenuFries } from "react-icons/ci";
import { useSocketContext } from "../../Context/SocketContext.jsx";
import UseConversation from "../zustand/UseConversation.js";
const ChatUser = () => {
  const { onlineUsers } = useSocketContext();

  const selectedConversation = UseConversation(
    (state) => state.selectedConversation
  );

  const getOnlineUsersStatus = (userId) => {
    const isOnline = onlineUsers.includes(userId);
    return isOnline ? "Online" : "Offline";
  };
  return (
    <>
      <div className="relative flex items-center h-[8%] justify-center gap-4 bg-slate-800  duration-300 ">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-white text-xl" />
        </label>
        <div className="flex space-x-3 items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300">
          <div
            className={`avatar ${
              onlineUsers.includes(selectedConversation._id) ? "online" : ""
            }`}
          >
            <div className="w-12 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">
              {selectedConversation?.fullname || "select the user"}
            </h1>
            <p className="text-white text-sm">
              {getOnlineUsersStatus(selectedConversation._id)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatUser;
