import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import UseConversation from "../zustand/UseConversation.js";
const Search = () => {
  const [search, setSearch] = useState("");
  const { users, setSelectedConversation } = UseConversation((state) => ({
    users: state.users,
    setSelectedConversation: state.setSelectedConversation,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = users.find((user) =>
      user.fullname.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <>
      <div className="">
        <div className="px-6 py-4">
          <form onSubmit={handleSubmit}>
            <div className="flex space-x-3">
              <label className="input input-bordered flex items-center gap-2 w-[80%] mx-auto">
                <input
                  type="text"
                  className="grow"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
              <button>
                <FaSearch className="text-4xl p-2 hover:bg-[#000046] hover:text-white rounded-full duration-300" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Search;
