import React from "react";
import back1 from "../assets/back1.jpg";
import back2 from "../assets/back2.jpg";
import back3 from "../assets/back3.jpg";
import back5 from "../assets/back5.jpeg";

function Background({ heroCount }) {
  let images = [back1, back2, back3, back5];

  return (
    <div className="w-full lg:w-[50%] h-[300px] sm:h-[400px] md:h-[500px] lg:h-auto relative overflow-hidden">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt=""
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
            heroCount === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

export default Background;
