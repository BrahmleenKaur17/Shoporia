import React from "react";
import logo4 from "../assets/logo4.png";

function Footer() {
  return (
    <div className="w-[100%] md:h-[36vh] h-[21vh] mb-[77px] md:mb-[0px]">
      {/* TOP SECTION */}
      <div className="w-[100%] md:h-[30vh] h-[15vh] bg-[#dbfcfcec] flex items-center justify-center md:px-[50px] px-[5px]">
        {/* LOGO SECTION */}
        <div className="md:w-[30%] w-[35%] h-[100%] flex items-start justify-center flex-col gap-[5px]">
          <div className="flex items-start justify-start gap-[5px] mt-[10px] md:mt-[40px]">
            <img
              src={logo4}
              alt=""
              className="md:w-[50px] md:h-[40px] w-[40px] h-[30px]"
            />
            <p className="text-[19px] md:text-[20px] text-black">Shoporia</p>
          </div>

          <p className="text-[15px] text-[#1e2223] hidden md:block">
            Shoporia is your all-in-one online shopping destination, offering
            top-quality products, unbeatable deals, and fast delivery—all backed
            by trusted service designed to make your life easier every day.
          </p>

          <p className="text-[15px] text-[#1e2223] flex md:hidden">
            Fast. Easy. Reliable. OneCart Shopping
          </p>
        </div>

        {/* COMPANY */}
        <div className="md:w-[25%] w-[30%] h-[100%] flex items-center justify-center flex-col text-center">
          <div className="flex items-center justify-center gap-[5px] mt-[10px] md:mt-[40px]">
            <p className="text-[19px] md:text-[20px] text-[#1e2223] font-sans">
              COMPANY
            </p>
          </div>

          <ul>
            <li className="text-[15px] text-[#1e2223] hidden md:block cursor-pointer">
              Home
            </li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer">
              About us
            </li>
            <li className="text-[15px] text-[#1e2223] hidden md:block cursor-pointer">
              Delivery
            </li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="w-[40%] h-[100%] flex items-center justify-center flex-col text-center">
          <div className="flex items-center justify-center gap-[5px] mt-[10px] md:mt-[40px]">
            <p className="text-[19px] md:text-[20px] text-[#1e2223] font-sans">
              GET IN TOUCH
            </p>
          </div>

          <ul>
            <li className="text-[15px] text-[#1e2223]">+91-9876543210</li>
            <li className="text-[15px] text-[#1e2223]">contact@shoporia.com</li>
            <li className="text-[15px] text-[#1e2223] hidden md:block">
              +1-123-456-7890
            </li>
            <li className="text-[15px] text-[#1e2223] hidden md:block">
              admin@shoporia.com
            </li>
          </ul>
        </div>
      </div>

      {/* LINE */}
      <div className="w-[100%] h-[1px] bg-slate-400"></div>

      {/* BOTTOM */}
      <div className="w-[100%] h-[5vh] bg-[#dbfcfcec] flex items-center justify-center text-[14px]">
        Copyright 2025@Shoporia.com - All Rights Reserved
      </div>
    </div>
  );
}

export default Footer;
