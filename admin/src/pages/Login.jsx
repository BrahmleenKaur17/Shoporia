import React, { useState } from "react";
import Logo4 from "../assets/logo4.png";
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import axios from "axios";
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext.jsx";
import { adminDataContext } from "../context/AdminContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  let [show, setShow] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const context = useContext(authDataContext);
  const serverUrl = context?.serverUrl;
  let { adminData, getAdmin } = useContext(adminDataContext);
  let navigate = useNavigate();

  const AdminLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/adminlogin",
        { email, password },
        { withCredentials: true },
      );
      console.log(result.data);
      toast.success("AdminLogin Successfully");
      getAdmin();
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("AdminLogin Failed");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
      <div className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer">
        <img
          className="w-[50px] h-[50px] object-contain rounded-md"
          src={Logo4}
          alt=""
        />
        <h1 className="text-[22px] font-sans">Shoporia</h1>
      </div>

      <div className="flex flex-col items-start gap-[5px] mb-[20px]">
        <span className="text-[25px] font-semibold ">Login Page</span>
        <span>
          <h1 className="text-[20px] font-semibold">Welcome to Shoporia!</h1>

          <p className="text-[16px] text-gray-400 mt-1">Apply to Admin Login</p>
        </span>
      </div>

      <div
        className="max-w-[600px] w-[90%] h-[400px] 
          bg-[#00000025] border border-[#96969635] 
          backdrop-blur-2xl rounded-lg shadow-lg 
          flex items-center justify-center py-[30px]"
      >
        <form
          action=""
          onSubmit={AdminLogin}
          className="w-[80%] h-[90%] flex flex-col items-center justify-start gap-[20px] "
        >
          <div
            className="w-[90%] h-[400px] flex flex-col items-center justify-center 
          gap-[15px] relative "
          >
            <input
              type="text"
              className="w-[100%] h-[50px] border-[2px] border-[#96969635]
            backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7]
            px-[20px] font-semibold"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <input
              type={show ? "text" : "password"}
              className="w-[100%] h-[50px] border-[2px] border-[#96969635]
            backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7]
            px-[20px] font-semibold"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            {!show && (
              <IoEyeOutline
                className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
            {show && (
              <IoEye
                className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
            <button
              className="w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center
            justify-center mt-[20px] text-[17px] font-semibold"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
