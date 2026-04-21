import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo4 from "../assets/logo4.png";
import axios from "axios";
import { adminDataContext } from "../context/AdminContext";
import { authDataContext } from "../context/AuthContext";

function Nav() {
  let navigate = useNavigate();
  let { serverUrl } = useContext(authDataContext);
  let { getAdmin } = useContext(adminDataContext);

  const logOut = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });

      console.log(result.data);

      getAdmin();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[70px] bg-[#dcdbdbf8] fixed top-0 left-0 z-50 flex items-center justify-between px-[30px] shadow-md shadow-black">
      <div
        className="w-[30%] flex items-center justify-start gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo4} alt="" className="w-[40px]" />
        <h1 className="text-[25px] text-[black] font-sans">Shoporia</h1>
      </div>
      <button
        className="text-[15px] hover:border-[2px] border-[#89daea] cursor-pointer bg-[#000000ca] py-[10px] px-[20px] rounded-2xl text-white"
        onClick={logOut}
      >
        LogOut
      </button>
    </div>
  );
}

export default Nav;
