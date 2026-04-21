import React from "react";
import { FaCircle } from "react-icons/fa";

function Hero({ heroData, heroCount, setHeroCount }) {
  return (
    <div className="w-full lg:w-[50%] flex flex-col justify-center px-[5%] lg:pl-[10%] py-10">
      {/* TEXT */}
      <div className="text-[#88d9ee] font-semibold leading-tight transition-all duration-300">
        <p className="text-[18px] sm:text-[24px] md:text-[40px] lg:text-[55px]">
          {heroData.text1}
        </p>
        <p className="text-[18px] sm:text-[24px] md:text-[40px] lg:text-[55px]">
          {heroData.text2}
        </p>
      </div>

      {/* DOTS */}
      <div className="flex gap-[10px] mt-[30px]">
        {[0, 1, 2, 3].map((i) => (
          <FaCircle
            key={i}
            onClick={() => setHeroCount(i)}
            className={`w-[10px] sm:w-[12px] cursor-pointer transition-all duration-300 ${
              heroCount === i
                ? "fill-orange-400 scale-125"
                : "fill-white/50 hover:fill-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;
