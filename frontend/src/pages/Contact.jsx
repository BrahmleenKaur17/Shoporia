import React from "react";
import { motion } from "framer-motion";
import Title from "../component/Title";
import contact from "../assets/contact.png";
import NewLetterBox from "../component/NewLetterBox";

function Contact() {
  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[80px] px-4">
      {/* TITLE */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title text1={"CONTACT"} text2={"US"} />
      </motion.div>

      {/* MAIN SECTION */}
      <div className="w-full flex items-center justify-center flex-col lg:flex-row gap-[40px]">
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full lg:w-[50%] flex justify-center"
        >
          <img
            src={contact}
            alt=""
            className="w-[85%] lg:w-[70%] rounded-lg shadow-lg hover:scale-105 transition duration-500"
          />
        </motion.div>

        {/* TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full lg:w-[50%] flex flex-col gap-[20px] text-white"
        >
          <p className="text-[18px] lg:text-[20px] font-semibold text-[#88d9ee]">
            Our Store
          </p>

          <p className="text-[14px] lg:text-[16px] text-gray-300">
            123 Fashion Street, New Delhi, India <br />
            Phone: +91 9876543210 <br />
            Email: support@shoporia.com
          </p>

          <p className="text-[18px] lg:text-[20px] font-semibold text-[#88d9ee] mt-[10px]">
            Careers at Shoporia
          </p>

          <p className="text-[14px] lg:text-[16px] text-gray-300">
            Learn more about our team and job openings.
          </p>

          <button className="mt-[10px] px-[25px] py-[12px] border border-white rounded-md hover:bg-white hover:text-black transition duration-300 w-fit">
            Explore Jobs
          </button>
        </motion.div>
      </div>

      {/* NEWSLETTER */}
      <NewLetterBox />
    </div>
  );
}

export default Contact;
