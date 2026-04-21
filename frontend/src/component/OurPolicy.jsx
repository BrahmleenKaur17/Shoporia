import React from "react";
import Title from "./Title";
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <div className="w-[100vw] md:min-h-[70vh] py-[80px] flex items-center justify-start flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px]">
      {/* TITLE */}
      <div className="w-[100%] text-center">
        <Title text1={"OUR"} text2={"POLICY"} />
        <p className="w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100">
          Customer-Friendly Policies – Committed to Your Satisfaction and
          Safety.
        </p>
      </div>

      {/* POLICY CARDS */}
      <div className="w-[100%] flex items-center justify-center flex-col md:flex-row gap-[30px]">
        {/* CARD 1 */}
        <div className="w-[400px] max-w-[90%] flex items-center justify-center flex-col gap-[10px]">
          <RiExchangeFundsLine className="text-[50px] md:text-[60px] text-[#90b9ff]" />
          <p className="font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]">
            Easy Exchange Policy
          </p>
          <p className="font-semibold md:text-[18px] text-[12px] text-[aliceblue] text-center">
            Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="w-[400px] max-w-[90%] flex items-center justify-center flex-col gap-[10px]">
          <TbRosetteDiscountCheckFilled className="text-[50px] md:text-[60px] text-[#90b9ff]" />
          <p className="font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]">
            7 Days Return Policy
          </p>
          <p className="font-semibold md:text-[18px] text-[12px] text-[aliceblue] text-center">
            Shop with Confidence – 7 Days Easy Return Guarantee.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="w-[400px] max-w-[90%] flex items-center justify-center flex-col gap-[10px]">
          <BiSupport className="text-[50px] md:text-[60px] text-[#90b9ff]" />
          <p className="font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]">
            Best Customer Support
          </p>
          <p className="font-semibold md:text-[18px] text-[12px] text-[aliceblue] text-center">
            Trusted Customer Support – Your Satisfaction Is Our Priority.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OurPolicy;
