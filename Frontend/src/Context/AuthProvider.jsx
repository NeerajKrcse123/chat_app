// import Cookies from "js-cookie";
// import { createContext, useContext, useState } from "react";
// export const AuthContext = createContext();
// export const AuthProvider = ({ children }) => {
//   const initialValueUser =
//     Cookies.get("token") || localStorage.getItem("chatapp");

//   const [authUser, setAuthUser] = useState(
//     initialValueUser ? JSON.parse(initialValueUser) : undefined
//   );
//   return (
//     <AuthContext.Provider value={[authUser, setAuthUser]}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   useContext(AuthContext);
// };
