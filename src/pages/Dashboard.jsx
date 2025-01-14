import { useState, useEffect } from "react";
import { CiWallet } from "react-icons/ci";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { RiPieChartLine } from "react-icons/ri";
import MyPieChart from "../components/MyPiechart";
import MyBarChart from "../components/MyBarChart";
import { IoIosTrendingUp } from "react-icons/io";

function Dashboard(){

    const [expenses, setExpenses] = useState([]);
    const token = localStorage.getItem("token")

    useEffect(() => {
                const fetchExpenses = async () => {
                  try {
                    const response = await fetch(
                      `${process.env.REACT_APP_BASE_URL}/api/v1/get-expenses`,
                      {
                        method: "GET",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );
            
                    const resData = await response.json();
            
                    if (response.ok) {
                      setExpenses(resData.data.expenses || []);
                    } else {
                      console.error("Failed to fetch expenses:", resData.message);
                      setExpenses([]);
                    }
                  } catch (err) {
                    console.error("Something went wrong fetching expenses:", err.message);
                    setExpenses([]);
                  }
                };
            
                fetchExpenses();
              }, [token,expenses.length]);
    

            const groupedData = expenses.reduce((acc, curr) => {
                const category = curr.category;
                const amount = curr.amount;
                
                const existingCategory = acc.find(item => item.category === category);
                if (existingCategory) {
                  existingCategory.amount += amount;
                } else {
                  acc.push({ category, amount });
                }
              
                return acc;
              }, []);

              const totalAmount = groupedData.reduce((sum, item) => sum + item.amount, 0);

    return(
        <div className="h-full flex flex-col gap-8 w-full py-4 overflow-x-hidden sm:py-8">
            <div className="w-11/12 sm:w-4/5 mx-auto flex flex-col sm:flex-row sm:gap-4 md:gap-6">
                <div className="w-full h-96 rounded-md pl-4 sm:pl-6 py-4 sm:py-6 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
                    <div className="flex text-2xl font-semibold items-center gap-2">
                        <CiWallet className="w-8 h-8"/>
                        <div>Total Expenses</div>
                    </div>
                    <div className="flex text-4xl py-4 px-1 text-blue-600 font-bold items-center gap-1">
                        <MdOutlineCurrencyRupee/>
                        <span>{totalAmount}</span>
                    </div>
                </div>
                <div className="w-full px-4 sm:px-6  py-4 sm:py-6 h-fit sm:h-96  rounded-md shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
                    <div className="flex text-2xl font-semibold items-center gap-2">
                        <RiPieChartLine className="w-8 h-8"/>
                        <div>Expenses by Category</div>
                    </div>
                    <div className="w-full flex justify-center items-center mx-auto ">
                        <MyPieChart groupedData={groupedData}/>
                    </div>
                </div>
            </div>
            <div className="w-11/12 flex flex-col h-fit sm:w-4/5 px-4 sm:px-6 py-4 sm:py-6 gap-4 rounded-md mx-auto shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] ">
                <div className="flex text-2xl font-semibold items-center gap-2">
                <IoIosTrendingUp />
                    Monthly Expenses
                </div>
                <MyBarChart expenses={expenses}/>
            </div>
            
        </div>
    );
}

export default Dashboard