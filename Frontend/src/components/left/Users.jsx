import User from "./User";

const Users = () => {
  return (
    <>
      <div>
        <h1 className="px-8 py-2 text-white font-semibold bg-[#000046] rounded-md">
          Messages
        </h1>
        <div
          className="py-2 overflow-y-auto  flex-1"
          style={{ height: "calc(77vh - 10vh)" }}
        >
          <User />
        </div>
      </div>
    </>
  );
};

export default Users;
