import React, { useContext, useEffect, useState } from "react";
import Title from "../component/Title";
import Card from "../component/Card";
import { shopDataContext } from "../context/ShopContext";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";

function Collections() {
  const [showFilter, setShowFilter] = useState(false);
  const { products, search, showSearch } = useContext(shopDataContext);

  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  // ================= CATEGORY TOGGLE =================
  const toggleCategory = (e) => {
    const value = e.target.value.toLowerCase();

    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  // ================= SUBCATEGORY TOGGLE =================
  const toggleSubCategory = (e) => {
    const value = e.target.value.toLowerCase();

    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  // ================= FILTER + SORT =================
  useEffect(() => {
    let filtered = products.slice();

    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // CATEGORY FILTER
    if (category.length > 0) {
      filtered = filtered.filter((item) =>
        category.includes(item.category.toLowerCase()),
      );
    }

    // SUBCATEGORY FILTER
    if (subCategory.length > 0) {
      filtered = filtered.filter((item) =>
        subCategory.includes(item.subCategory.toLowerCase()),
      );
    }

    // SORTING
    if (sortType === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilterProduct(filtered);
  }, [products, category, subCategory, sortType, search, showSearch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row pt-[70px] overflow-x-hidden pb-[90px] md:pb-[50px]"
    >
      {/* ================= LEFT FILTER ================= */}
      <div
        className={`md:w-[30vw] lg:w-[20vw] w-full md:min-h-[100vh]
      ${showFilter ? "h-auto" : "h-[8vh]"}
      p-[20px] border-r border-[#3a4a57] text-[#aaf5fa]
      overflow-y-auto transition-all duration-300`}
      >
        <p
          className="text-[24px] font-semibold flex gap-[8px] items-center cursor-pointer hover:text-white transition"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          FILTERS
          {!showFilter && <FaChevronRight className="text-[16px] md:hidden" />}
          {showFilter && <FaChevronDown className="text-[16px] md:hidden" />}
        </p>

        {/* CATEGORY */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-xl mb-6 shadow-lg mt-4"
        >
          <p className="text-[15px] text-[#dbe5ec] mb-3 font-medium">
            CATEGORIES
          </p>

          {["men", "women", "kids"].map((item) => (
            <p key={item} className="flex items-center gap-3 mb-2 text-[14px]">
              <input
                type="checkbox"
                value={item}
                onChange={toggleCategory}
                className="accent-[#4fd1c5]"
              />
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </p>
          ))}
        </motion.div>

        {/* SUB CATEGORY */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-xl shadow-lg"
        >
          <p className="text-[15px] text-[#dbe5ec] mb-3 font-medium">
            SUB-CATEGORIES
          </p>

          {["topwear", "bottomwear", "winterwear"].map((item) => (
            <p key={item} className="flex items-center gap-3 mb-2 text-[14px]">
              <input
                type="checkbox"
                value={item}
                onChange={toggleSubCategory}
                className="accent-[#4fd1c5]"
              />
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </p>
          ))}
        </motion.div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="lg:pl-[5%] md:py-[10px] w-full">
        {/* TITLE + SORT */}
        <div className="w-full p-[20px] flex justify-between items-center flex-col md:flex-row gap-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          <select
            className="bg-black/10 backdrop-blur-md text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none hover:bg-black/20 transition"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* PRODUCTS */}
        <motion.div
          layout
          className="w-full min-h-[70vh] flex items-center justify-center flex-wrap gap-[25px]"
        >
          {filterProduct.length > 0 ? (
            filterProduct.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image1}
                />
              </motion.div>
            ))
          ) : (
            <p className="text-white text-xl mt-10">No Products Found</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Collections;
