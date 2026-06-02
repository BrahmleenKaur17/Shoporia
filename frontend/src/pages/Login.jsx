import React, { useContext, useState } from "react";
import Logo4 from "../assets/logo4.png";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import google from "../assets/Google-logo.png";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { userDataContext } from "../context/UserContext";
import { toast } from "react-toastify";

function Login() {
  let [show, setShow] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { serverUrl } = useContext(authDataContext);
  let { getCurrentUser } = useContext(userDataContext);

  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true },
      );

      console.log(result.data);

      toast.success("Login Successful ");

      await getCurrentUser();

      setTimeout(() => {
        navigate("/");
      }, 1000); // ⬅️ important
    } catch (error) {
      console.log(error.response?.data);

      toast.error(error.response?.data?.message || "Login Failed ❌");
    }
  };

  const googlelogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      const result = await axios.post(
        serverUrl + "/api/auth/googlelogin",
        { name, email },
        { withCredentials: true },
      );

      console.log(result.data);

      toast.success("Google Login Successful ");

      await getCurrentUser();

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log("GOOGLE ERROR:", error);

      toast.error("Google Login Failed ");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
      <div
        className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
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

          <p className="text-[16px] text-gray-400 mt-1">
            Your shopping journey starts here.
          </p>
        </span>
      </div>

      <div
        className="max-w-[600px] w-[90%] 
          bg-[#00000025] border border-[#96969635] 
          backdrop-blur-2xl rounded-lg shadow-lg 
          flex items-center justify-center py-[30px]"
      >
        <form
          action=""
          onSubmit={handleLogin}
          className="w-[80%] h-[90%] flex flex-col items-center justify-start gap-[20px] "
        >
          <div
            className="w-[90%] h-[45px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] cursor-pointer "
            onClick={googlelogin}
          >
            <img
              src={google}
              alt=""
              className="w-[20px] h-[20px] object-contain rounded-full bg-white p-[2px]"
            />

            <span>Login account with Google</span>
          </div>
          <div className="w-[100%] h-[20px] flex items-center justify-center gap-[10px] ">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
            OR
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>
          <div
            className="w-[90%] h-[300px] flex flex-col items-center justify-center 
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
                className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[57%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
            {show && (
              <IoEye
                className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[57%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
            <button
              className="w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center
            justify-center mt-[20px] text-[17px] font-semibold"
            >
              Login
            </button>

            <p className="flex gap-[10px]">
              Don't have an account?{" "}
              <span
                className="text-[#5555f6cf]
            text-[17px] font-semibold cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Create New Account
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
