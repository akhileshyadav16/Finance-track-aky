import { NavLink,Link } from "react-router-dom";
import { TfiAlignCenter } from "react-icons/tfi";
import { LuLayoutDashboard } from "react-icons/lu";
import "./Nav.css";

function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <div className="w-full h-14 border-b-2 border-richblack-700">
      <nav className="flex h-full w-full px-2 sm:w-11/12  mx-auto gap-2 items-center justify-between sm:justify-around">
        <div className="flex items-center gap-1 sm:gap-2">
          <Link to={"/"} className="text-sm sm:text-xl font-serif md:text-3xl whitespace-nowrap font-medium sm:font-bold">
            Personal Finance Tracker
          </Link>
        </div>
        {token && (
          <div className="flex gap-2 items-center">
            <NavLink
              to="/"
              className="flex items-center text-sm px-1 sm:px-2 py-1 bg-blue-100 hover:bg-blue-200 rounded-md gap-2"
            >
              <LuLayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/expenses"
              className="flex items-center text-sm px-1 sm:px-2 py-1 bg-blue-100 hover:bg-blue-200 rounded-md gap-2"
            >
              <TfiAlignCenter className="w-5 h-5" />
              <span>Expenses</span>
            </NavLink>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
