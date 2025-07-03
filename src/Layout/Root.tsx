import { Outlet } from "react-router";
import Navbar from "../Pages/share/Navbar";
import Footer from "../Pages/share/Footer";

const Root = () => {
  return (
    <div>
      <Navbar />
      <div className="lg:w-7xl mx-auto p-4">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
