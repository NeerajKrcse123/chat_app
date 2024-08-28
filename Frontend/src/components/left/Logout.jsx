import axios from "axios";
import Cookies from "js-cookie";
// import { RiLogoutCircleLine } from "react-icons/ri";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/logout");
      Cookies.remove("token");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="px-4 py-3">
      {/* <RiLogoutCircleLine
        className="text-4xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2"
        onClick={handleLogout}
      /> */}
      <button
        className="text-2xl  hover:bg-[#000046] hover:text-white duration-300 cursor-pointer rounded-lg p-2"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
