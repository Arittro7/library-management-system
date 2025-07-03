import { Outlet } from "react-router";
import Navbar from "../Pages/share/Navbar";

const Root = () => {
  return (
    <div>
      <Navbar/>
      <div>
      <Outlet></Outlet>
    </div>
    </div>
  );
};

export default Root;