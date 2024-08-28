import { CiMenuFries } from "react-icons/ci";
import UseConversation from "../zustand/UseConversation";
import ChatUser from "./ChatUser";
import Messages from "./Messages";
import TypeSend from "./TypeSend";
const Right = () => {
  const { selectedConversation } = UseConversation((state) => ({
    selectedConversation: state.selectedConversation,
  }));

  return (
    <>
      {!selectedConversation ? (
        <div className="w-full bg-[#000046] ">
          <NoChatSelected />
        </div>
      ) : (
        <div className="w-full bg-[#000046] ">
          <ChatUser />
          <div
            className=" overflow-y-auto flex-1"
            style={{ maxHeight: "calc(92vh - 8vh" }}
          >
            <Messages />
          </div>
          <TypeSend />
        </div>
      )}
    </>
  );
};

export default Right;

const NoChatSelected = () => {
  const auth = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="relative">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-white text-xl" />
        </label>
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-center text-white">
            Welcome{" "}
            <span className="font-semibold text-xl">{auth.fullname}</span>
            <br />
            No chat selected, please start conversation by selecting anyone to
            your contacts
          </h1>
        </div>
      </div>
    </>
  );
};
