import React, { useContext, useState } from "react";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import open from "../assets/open.wav";
import { FaMicrophone } from "react-icons/fa";

function Ai() {
  let { showSearch, setShowSearch } = useContext(shopDataContext);
  let navigate = useNavigate();
  let [activeAi, setActiveAi] = useState(false);
  let openingSound = new Audio(open);

  function speak(message) {
    let utterence = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterence);
  }

  const speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new speechRecognition();

  if (!recognition) {
    console.log("not supported");
  }

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim().toLowerCase();

    // ===== YOUR SAME LOGIC (UNCHANGED) =====

    if (
      transcript.includes("search") &&
      transcript.includes("open") &&
      !showSearch
    ) {
      speak("opening search");
      setShowSearch(true);
      navigate("/collection");
    } else if (
      transcript.includes("search") &&
      transcript.includes("close") &&
      showSearch
    ) {
      speak("closing search");
      setShowSearch(false);
    } else if (
      transcript.includes("collection") ||
      transcript.includes("collections") ||
      transcript.includes("product") ||
      transcript.includes("products")
    ) {
      speak("opening collection page");
      navigate("/collection");
    } else if (transcript.includes("home") || transcript.includes("homepage")) {
      speak("opening home page");
      navigate("/");
    } else if (
      transcript.includes("cart") ||
      transcript.includes("kaat") ||
      transcript.includes("caat")
    ) {
      speak("opening your cart");
      navigate("/cart");
    } else if (transcript.includes("about")) {
      speak("opening about page");
      navigate("/about");
    } else if (transcript.includes("contact")) {
      speak("opening contact page");
      navigate("/contact");
    } else if (
      transcript.includes("order") ||
      transcript.includes("orders") ||
      transcript.includes("my order")
    ) {
      speak("opening your orders page");
      navigate("/order");
    } else {
      toast.error("Try Again");
    }
  };

  recognition.onend = () => {
    setActiveAi(false);
  };

  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] z-50"
      onClick={() => {
        recognition.start();
        openingSound.play();
        setActiveAi(true);
      }}
    >
      {/* MIC BUTTON */}
      <div className="relative flex items-center justify-center">
        {/* 🔵 Siri Glow Layers */}
        <div
          className={`absolute w-[90px] h-[90px] rounded-full bg-blue-500 blur-2xl transition-all duration-500 ${
            activeAi ? "opacity-60 scale-125 animate-pulse" : "opacity-0"
          }`}
        ></div>

        <div
          className={`absolute w-[120px] h-[120px] rounded-full bg-purple-500 blur-3xl transition-all duration-500 ${
            activeAi ? "opacity-40 scale-150 animate-pulse" : "opacity-0"
          }`}
        ></div>

        {/* 🌊 Waveform */}
        {activeAi && (
          <div className="absolute flex gap-[3px]">
            <span className="w-[3px] h-6 bg-white animate-bounce"></span>
            <span className="w-[3px] h-10 bg-white animate-bounce delay-75"></span>
            <span className="w-[3px] h-14 bg-white animate-bounce delay-150"></span>
            <span className="w-[3px] h-10 bg-white animate-bounce delay-200"></span>
            <span className="w-[3px] h-6 bg-white animate-bounce delay-300"></span>
          </div>
        )}

        {/* 🎤 Button */}
        <div
          className={`w-[70px] h-[70px] flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ${
            activeAi
              ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 scale-110"
              : "bg-black"
          }`}
        >
          <FaMicrophone className="text-white text-2xl" />
        </div>

        {/* 💬 Listening Text */}
        {activeAi && (
          <div className="absolute -top-10 px-3 py-1 text-sm bg-black text-white rounded-full shadow-lg animate-pulse">
            Listening...
          </div>
        )}
      </div>
    </div>
  );
}

export default Ai;
