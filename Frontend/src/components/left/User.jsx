// import axios from "axios";
// import Cookies from "js-cookie";
// import { useEffect, useState } from "react";
// import { useSocketContext } from "../../Context/SocketContext.jsx";
// import UseConversation from "../zustand/UseConversation.js";

// const User = () => {
//   const { onlineUsers } = useSocketContext();
//   const token = Cookies.get("token");
//   const [users, setUsers] = useState([]);
//   const setSelectedConversation = UseConversation(
//     (state) => state.setSelectedConversation
//   );

//   const getUsers = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/user/allUsers",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setUsers(response.data.filterUsers);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       getUsers();
//     }
//   }, [token]);

//   return (
//     <>
//       <div>
//         {users.map((user) => {
//           // Check if the user is online
//           const isOnline = onlineUsers.includes(user._id);

//           return (
//             <div
//               key={user._id}
//               className={`flex space-x-4 px-6 py-3 hover:bg-slate-700 duration-300 cursor-pointer`}
//               onClick={() => setSelectedConversation(user)}
//             >
//               <div className={`avatar ${isOnline ? "online" : ""}`}>
//                 <div className="w-12 rounded-full">
//                   <img
//                     src={
//                       user.profilePicture ||
//                       "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//                     }
//                     alt={`${user.fullname}'s profile`}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <h1 className="text-white font-semibold">{user.fullname}</h1>
//                 <span className="text-white">{user.email}</span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default User;

import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useSocketContext } from "../../Context/SocketContext.jsx";
import UseConversation from "../zustand/UseConversation.js";

const User = () => {
  const { onlineUsers } = useSocketContext();
  const token = Cookies.get("token");
  const { setSelectedConversation, setUsers, users } = UseConversation(
    (state) => ({
      setSelectedConversation: state.setSelectedConversation,
      setUsers: state.setUsers,
      users: state.users,
    })
  );

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/allUsers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data.filterUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getUsers();
    }
  }, [token]);

  return (
    <div>
      {users.map((user) => {
        // Check if the user is online
        const isOnline = onlineUsers.includes(user._id);

        return (
          <div
            key={user._id}
            className={`flex space-x-4 px-6 py-3 hover:bg-[#000046] duration-300 cursor-pointer   hover:text-white`}
            onClick={() => setSelectedConversation(user)}
          >
            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="w-12 rounded-full">
                <img
                  src={
                    user.profilePicture ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt={`${user.fullname}'s profile`}
                />
              </div>
            </div>
            <div>
              <h1 className="   font-semibold">{user.fullname}</h1>
              <span className="">{user.email}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default User;
