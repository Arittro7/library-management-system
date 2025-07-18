import { Link } from "react-router";
import logo from "../../assets/logo.jpg";

const Navbar = () => {
  const navLinks = (
    <>
      <li>
        {" "}
        <Link to="/">Home</Link>{" "}
      </li>
      <li>
        {" "}
        <Link to="/books">Books</Link>{" "}
      </li>
      <li>
        {" "}
        <Link to="/add-books">Add Book</Link>{" "}
      </li>
      <li>
        {" "}
        <Link to="/edit-book">Edit Book</Link>{" "}
      </li>
      <li>
        {" "}
        <Link to="/borrow-summary">Borrow Book</Link>{" "}
      </li>
      <li>
        {" "}
        <Link to="/blog">Blog</Link>{" "}
      </li>
      <li>
        {" "}
        <Link to="/about">About</Link>{" "}
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-gray-300">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <button>
             <img className="w-12 rounded-full" src={logo} alt="" />
          </button>
          {/* <a className="btn">
           
          </a> */}
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
