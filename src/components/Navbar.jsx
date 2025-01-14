import { NavLink} from "react-router-dom";
import { TfiBarChartAlt } from "react-icons/tfi";
import { TfiAlignCenter } from "react-icons/tfi";
import { LuLayoutDashboard } from "react-icons/lu";
import "./Nav.css"


function Navbar(){
    const token = localStorage.getItem("token");


    return(
        <div className="w-full h-14 border-b-2 border-richblack-700">
            <nav className="flex h-full w-11/12 gap-1 sm:gap-2 items-center justify-between sm:justify-around px-[1px]">
                <div className="flex w-fit gap-[2px] sm:gap-2">
                    <TfiBarChartAlt className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                    <div className="text-lg sm:text-2xl whitespace-nowrap font-medium sm:font-bold">Personal Finance Tracker</div>
                </div>
                {
                    token && 
                    <div className="flex gap-1 w-fit sm:gap-2 md:gap-4 lg:gap-6">
                     <NavLink to={"/"} className="flex items-center font-semibold px-1 sm:px-2 py-1 bg-blue-100 rounded-md gap-[2px] sm:gap-2">
                        <LuLayoutDashboard />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to={"/expenses"} className="flex items-center font-semibold gap-[2px] sm:gap-2 px-1 sm:px-2 py-1 bg-blue-100 rounded-md">
                        <TfiAlignCenter />
                        <span>Expenses</span>
                    </NavLink>
                </div>
                }
            </nav>
        </div>
    );
}

export default Navbar;