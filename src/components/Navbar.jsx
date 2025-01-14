import { NavLink} from "react-router-dom";
import { TfiBarChartAlt } from "react-icons/tfi";
import { TfiAlignCenter } from "react-icons/tfi";
import { LuLayoutDashboard } from "react-icons/lu";
import "./Nav.css"


function Navbar(){
    const token = localStorage.getItem("token");


    return(
        <div className="w-full h-14 border-b-2 border-richblack-700">
            <nav className="flex h-full items-center justify-around">
                <div className="flex gap-2">
                    <TfiBarChartAlt className="w-8 h-8 text-blue-600" />
                    <div className="text-2xl font-bold">Personal Finance Tracker</div>
                </div>
                {
                    token && 
                    <div className="flex gap-6">
                     <NavLink to={"/"} className="flex items-center font-semibold px-2 py-1 bg-blue-100 rounded-md gap-2">
                        <LuLayoutDashboard />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to={"/expenses"} className="flex items-center font-semibold gap-2 px-2 py-1 bg-blue-100 rounded-md">
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