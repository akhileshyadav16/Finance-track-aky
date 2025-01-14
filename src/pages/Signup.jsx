import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { FiLayout } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast'

function Signup(){

    const [formData, setFormData] = useState({name:"",email:"",password:"",cnfPassword:""});
    const [passwordVisibility , setpasswordVisibility] = useState(true);
    const [pwdType,setPwdType] = useState(true);

    const [cnfPasswordVisibility , setCnfPasswordVisibility] = useState(true);
    const [cnfPwdType,setCnfPwdType] = useState(true);
    const navigate = useNavigate();


    function changeHandler(event){
        const {name, value} = event.target;
        setFormData(prevData=>{
            return{
                ...prevData,
                [name] : value
            }
        })
    }

    function passwordHandler(){
        setpasswordVisibility(!passwordVisibility);
        setPwdType(!pwdType);

    }

    function cnfPasswordHandler(){
        setCnfPasswordVisibility(!cnfPasswordVisibility);
        setCnfPwdType(!cnfPwdType);

    }


    const submitHandler = async (e) => {
    e.preventDefault();
        try {
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          if (response.ok) {
            navigate("/login");
            toast.success("Sign up successfully");
          } else {
            toast.error("Something went wrong");
          }
        } catch (error) {
          console.log("onsubmit", error.message);
    
        }
      };

    return(
        <div className="w-full h-full  text-black py-10">
            <div className="w-11/12 h-full mx-auto flex flex-col items-center gap-4 justify-center">
                <div className="flex flex-col gap-2 text-center mb-2">
                    <FiLayout className="w-10 h-10 mx-auto text-blue-600"/>
                    <h1 className="text-4xl font-bold ">
                        Create your account
                    </h1>       
                    <p>
                        Start managing your finances today
                    </p>
                </div>
                <form onSubmit={submitHandler} className="w-11/12 sm:w-3/4 md:w-2/5 py-8 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-md lg:w-1/3 h-fit flex mx-auto flex-col gap-4 px-4 sm:px-8">
                <div className="flex flex-col w-full gap-2">
                        <label className="text-[14px] font-medium" htmlFor="name">Full Name :</label>
                        <input className="outline-none h-10 text-[14px] rounded-md pl-3 border-b-2 border-richblack-600 bg-opacity-35" type="text" id="name" name="name" onChange={changeHandler} value={formData.name} placeholder="Enter full name" />
                    </div>
                <div className="w-full flex flex-col gap-2">
                    <label className="text-[14px] font-medium" htmlFor="email">Email Address <sup className="text-yellow-400">*</sup></label>
                    <input className="outline-none h-10 text-[14px] rounded-md pl-3 border-b-2 border-richblack-600 bg-opacity-35" type="email" id="email" name="email" onChange={changeHandler} value={formData.email} placeholder="Enter email address" />
                </div>
                <div className="flex flex-col w-full gap-2">
                        <label className="text-[14px] font-medium" htmlFor="password">Create password <sup className="text-yellow-400">*</sup></label>
                        <div className="flex">
                            <input className="outline-none w-full h-10 text-[14px] rounded-l-md pl-3 border-b-2 border-richblack-600 bg-richblack-500 bg-opacity-35"  type={pwdType ?"password" : "text"  } id="password" name="password" onChange={changeHandler} value={formData.password} placeholder="Enter password" />
                            <div onClick={()=>{passwordHandler()}} className=" text-richblack-50 hover:cursor-pointer flex items-center rounded-r-md pr-2 bg-white text-lg w-fit px-1 border-b-2 border-richblack-600">
                                {
                                    passwordVisibility ? <LuEyeOff/> : <LuEye/>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full flex-col  gap-2">
                        <label className="text-[14px] font-medium" htmlFor="cnfPassword">Confirm password <sup className="text-yellow-400">*</sup></label>
                        <div className="flex">
                            <input className="outline-none w-full h-10 text-[14px] rounded-l-md pl-3 border-b-2 border-richblack-600 bg-richblack-500 bg-opacity-35"  type={cnfPwdType ?"password" : "text"  } id="cnfPassword" name="cnfPassword" onChange={changeHandler} value={formData.cnfPassword} placeholder="Enter confirm password" />
                            <div onClick={()=>{cnfPasswordHandler()}} className=" text-richblack-50 hover:cursor-pointer flex items-center rounded-r-md pr-2 text-lg bg-white w-fit px-1 border-b-2 border-richblack-600">
                                {
                                    cnfPasswordVisibility ? <LuEyeOff/> : <LuEye/>
                                }
                            </div>
                        </div>
                    </div>
                <button className="mt-4 w-full h-10 px-1 py-1 text-white font-semibold text-center mx-2 rounded-md bg-blue-600">
                    Sign up
                </button> 
                <Link className="text-blue-600 font-semibold text-center" to="/login">Already have an account? Login</Link>
            </form>
            </div>
        </div>
    );
}

export default Signup;


