import Logout from "./Logout";
import Search from "./Search";
import Users from "./Users";

const Left = () => {
  return (
    <>
      <div className="w-full bg-white">
        <Search />
        <Users />
        <Logout />
      </div>
    </>
  );
};

export default Left;
