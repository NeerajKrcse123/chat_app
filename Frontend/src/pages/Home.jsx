import Left from "../components/left/Left.jsx";
import Right from "../components/right/Right";

const Home = () => {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <Right />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu w-80 min-h-full bg-white text-base-content">
            <Left />
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
