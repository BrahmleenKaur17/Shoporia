import React from "react";
import Title from "../component/Title";
import about from "../assets/about.png";
import { motion } from "framer-motion";
import NewLetterBox from "../component/NewLetterBox";

function About() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0c2025] via-[#0f2a32] to-[#141414] gap-12 pt-24 pb-16">
      {/* Title Animation */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title text1={"ABOUT"} text2={"US"} />
      </motion.div>

      {/* Main Section */}
      <div className="w-[90%] max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 w-full flex justify-center"
        >
          <img
            src={about}
            alt=""
            className="w-[100%] lg:w-[95%] rounded-xl shadow-2xl hover:scale-105 transition duration-500 ease-in-out"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 w-full flex flex-col gap-5 text-white"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-300">
            Welcome to Shoporia
          </h2>

          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            Shoporia is built for smart, seamless shopping—bringing you trending
            styles, premium quality, and everyday essentials in one place. With
            fast delivery, reliable service, and great value, we make your
            shopping experience effortless.
          </p>

          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            Whether it's fashion or daily essentials, Shoporia blends style,
            convenience, and affordability into one powerful platform designed
            for modern shoppers.
          </p>

          {/* Mission Card */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/20 hover:scale-105 transition duration-300">
            <h3 className="text-lg font-bold text-blue-200 mb-2">
              Our Mission
            </h3>

            <p className="text-sm text-gray-300 leading-relaxed">
              Our mission is to redefine online shopping by delivering quality,
              affordability, and convenience. We connect users with trusted
              products while ensuring a seamless and enjoyable experience.
            </p>
          </div>
        </motion.div>
      </div>
      {/* WHY CHOOSE US */}
      <motion.div
        className="w-full flex items-center justify-center flex-col gap-6 mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Title text1={"WHY"} text2={"CHOOSE US"} />

        <motion.div
          className="w-[90%] max-w-6xl flex items-center justify-center lg:flex-row flex-col gap-6 py-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {/* Card 1 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.07 }}
            className="lg:w-1/3 w-full h-[260px] border border-white/20 flex flex-col items-center justify-center gap-4 px-6 text-white bg-white/10 backdrop-blur-md rounded-xl shadow-lg hover:shadow-blue-500/30 transition duration-300"
          >
            <h3 className="text-lg font-semibold text-blue-300">
              Quality Assurance
            </h3>
            <p className="text-sm text-center text-gray-300">
              We guarantee quality through strict checks, reliable sourcing, and
              a commitment to customer satisfaction always.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.07 }}
            className="lg:w-1/3 w-full h-[260px] border border-white/20 flex flex-col items-center justify-center gap-4 px-6 text-white bg-white/10 backdrop-blur-md rounded-xl shadow-lg hover:shadow-blue-500/30 transition duration-300"
          >
            <h3 className="text-lg font-semibold text-blue-300">Convenience</h3>
            <p className="text-sm text-center text-gray-300">
              Shop easily with fast delivery, simple navigation, secure
              checkout, and everything you need in one place.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.07 }}
            className="lg:w-1/3 w-full h-[260px] border border-white/20 flex flex-col items-center justify-center gap-4 px-6 text-white bg-white/10 backdrop-blur-md rounded-xl shadow-lg hover:shadow-blue-500/30 transition duration-300"
          >
            <h3 className="text-lg font-semibold text-blue-300">
              Exceptional Customer Service
            </h3>
            <p className="text-sm text-center text-gray-300">
              Our dedicated support team ensures quick responses, helpful
              solutions, and a smooth shopping experience every time.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
      <NewLetterBox />
    </div>
  );
}

export default About;
