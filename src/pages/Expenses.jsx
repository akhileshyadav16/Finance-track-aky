import { useState , useEffect} from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import {toast} from "react-hot-toast"

function Expenses(){

    const token = localStorage.getItem("token");
    const [formData,setFormData] = useState({title:"", amount:null, category:"",date:""});
    const [expenses,setExpenses] = useState([]);

    function changeHandler(event){
        const {name, value} = event.target;
        setFormData(prevData=>{
            return{
                ...prevData,
                [name] : value
            }
        })
    }


    const submitHandler = async (e) => {
        e.preventDefault();
            try {
                const token = localStorage.getItem('token');
              const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/create-expense`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                 },
                body: JSON.stringify(formData),
                credentials: 'include'
              });
              const resData = await response.json();
              if (response.ok) {
                toast.success("Expense created successfully");
                setExpenses(resData.data.expenses || []);
              } else {
                toast.error("Something went wrong");
              }
            } catch (error) {
              console.log("onsubmit", error.message);
        
            }
          };

          const deleteHandler = async (_id) => {
            try {
              const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/api/v1/delete-expense/${_id}`,
                {
                  method: "DELETE",
                  headers: { 
                    "Content-Type": "application/json" ,
                    Authorization: `Bearer ${token}`
                  },
                  
                }
              );
        
              if (response.ok) {
                setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== _id));
                toast.success("Expense Deleted successfully");
              } else {
                toast.error("Something went wrong");
              }
            } catch (err) {
              console.log("Something went wrong in deleting :" + err.message);
            }
          };

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
          }, [token,expenses?.length]);



          const formatDate = (dateString) => {
            const [year, month, day] = dateString.split("T")[0].split("-");
            return `${day}-${month}-${year}`;
          };

    return(
        <div className="h-full w-full py-4 sm:py-8">
            <div className="w-11/12 flex flex-col gap-10 h-full sm:w-4/5 md:w-3/4 mx-auto">
                <div className="w-full h-fit px-3 rounded-md py-6 mx-auto shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
                    <div className="flex gap-2 text-2xl px-4 items-center font-semibold">
                        <MdOutlineAddCircleOutline />
                        <span>Add New Expense</span>
                    </div>
                    <form onSubmit={submitHandler} className="flex flex-col gap-4 sm:gap-6 w-full py-4 px-4">
                        <div className=" w-full flex flex-col gap-6 sm:flex-row">
                            <div className="flex flex-col w-full gap-2">
                                <label htmlFor="title">Title :</label>
                                <input className=" h-10 rounded-md border border-slate-300 px-2" name="title" id="title" placeholder="max length : 20" value={formData.title} type="text" onChange={changeHandler} />
                            </div>
                            <div className="flex flex-col w-full gap-2">
                                <label htmlFor="amount">Amount :</label>
                                <input className=" h-10 rounded-md border border-slate-300 px-2" name="amount" id="amount" value={formData.amount} type="number" onChange={changeHandler} />
                            </div>
                        </div>
                        <div className="flex flex-col w-full sm:flex-row gap-4">
                            <div className="flex flex-col w-full gap-2">
                                <label htmlFor="category">Category :</label>
                                <select className=" h-10 w-full px-2 rounded-md border border-slate-300" name="category" id="category" onChange={changeHandler}>
                                    <option value="Food">Food</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Bills">Bills</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="flex flex-col w-full gap-2">
                                <label htmlFor="date">Date :</label>
                                <input className=" h-10 rounded-md border px-2 border-slate-300" type="date" name="date" id="date" value={formData.date} onChange={changeHandler}/>
                            </div>
                        </div>
                        <button className=" h-10 mt-4 rounded-md bg-blue-600 w-full text-white font-semibold">Add Expense</button>
                    </form>
                </div>
                <div className="w-full mx-auto h-fit shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-md">
                    <ul className="flex justify-between text-sm border-b border-slate-300 rounded-b-md text-gray-600 font-bold text-center h-10 items-center">
                        <li className="w-full ">DATE</li>
                        <li className="w-full">TITLE</li>
                        <li className="w-full">CATEGORY</li>
                        <li className="w-full">AMOUNT</li>
                        <li className="w-full">DELETE</li>
                        {/* <li className="w-full">EDIT</li> */}
                    </ul>
                    <div className="w-full">
                        {
                            expenses.map((expense,index)=>{
                                return <ul key={index} className="flex justify-between text-slate-600 border-b border-slate-200 text-center h-12 items-center">
                                    <li className="w-full">{formatDate(expense.date)}</li>
                                    <li className="w-full text-slate-950 font-semibold">{expense.title}</li>
                                    <li className="w-full">{expense.category}</li>
                                    <li className="w-full flex gap-[1px] justify-center items-center"><MdOutlineCurrencyRupee className="w-5 h-5"/> {expense.amount}</li>
                                    <li onClick={()=>deleteHandler(expense._id)} className="w-full"><MdDelete  className=" text-red-400 mx-auto cursor-pointer w-5 h-5"/></li>
                                    {/* <li className="w-full"><FaEdit className="w-5 cursor-pointer h-5 mx-auto"/></li> */}
                                </ul>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Expenses;