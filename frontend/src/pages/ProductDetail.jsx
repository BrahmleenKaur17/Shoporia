import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { shopDataContext } from "../context/ShopContext";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from "../component/RelatedProduct";
import { toast } from "react-toastify";

function ProductDetail() {
  const { productId } = useParams();
  const { products, currency, addtoCart } = useContext(shopDataContext);
  const navigate = useNavigate(); // Initialized navigate

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [tab, setTab] = useState("description");
  const [fade, setFade] = useState(true);
  const [isAdding, setIsAdding] = useState(false); // State for button highlight

  useEffect(() => {
    if (products.length > 0) {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image1);
      }
    }
  }, [productId, products]);

  if (!productData) return <div className="text-white">Loading...</div>;

  const handleImageChange = (img) => {
    setFade(false);
    setTimeout(() => {
      setImage(img);
      setFade(true);
    }, 150);
  };

  // Logic to handle Add to Cart, highlight, and navigation
  const handleAddToCart = async () => {
    if (!size) {
      toast.error("Please select a size first ❌");
      return;
    }

    try {
      setIsAdding(true);

      await addtoCart(productData._id, size);

      toast.success("Added to cart ");

      setTimeout(() => {
        setIsAdding(false);
        navigate("/cart");
      }, 800);
    } catch (error) {
      console.log(error);
      toast.error("Failed to add to cart ");
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen pt-[100px] pb-20 bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT SIDE */}
          <div className="flex gap-5 lg:w-[45%] items-start">
            {/* THUMBNAILS */}
            <div className="flex flex-col gap-3 justify-between h-[460px]">
              {[
                productData.image1,
                productData.image2,
                productData.image3,
                productData.image4,
                productData.image5, // Ensure your model supports image5 if mapping 5 items
              ]
                .filter(Boolean)
                .map((img, index) => (
                  <div
                    key={index}
                    onClick={() => handleImageChange(img)}
                    className={`w-[100px] h-[90px] border rounded overflow-hidden cursor-pointer bg-white flex items-center justify-center transition-all duration-300
                  ${
                    image === img
                      ? "border-white shadow-[0_0_12px_#ffffff]"
                      : "border-gray-400 hover:border-white hover:shadow-[0_0_10px_#ffffff]"
                  }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>

            {/* MAIN IMAGE */}
            <div className="flex-1 flex items-center justify-center bg-white rounded p-4">
              <img
                src={image}
                alt=""
                className={`max-h-[460px] object-contain transition-opacity duration-300 ${
                  fade ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:w-[55%] flex flex-col gap-4">
            <h1 className="text-3xl font-semibold">{productData.name}</h1>

            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStarHalfAlt className="text-yellow-400" />
              <span className="ml-2">(124)</span>
            </div>

            <p className="text-2xl font-bold">
              {currency} {productData.price}
            </p>

            <p className="text-gray-300 leading-relaxed max-w-[500px]">
              {productData.description}
            </p>

            {/* SIZE */}
            <div>
              <p className="mb-2">Select Size</p>
              <div className="flex gap-3">
                {productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`px-4 py-2 border rounded transition-all duration-200 ${
                      size === item
                        ? "bg-white text-black"
                        : "text-white hover:bg-white hover:text-black"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              className={`px-6 py-2 rounded w-fit mt-3 transition-all duration-200 border ${
                isAdding
                  ? "bg-white text-black scale-95 shadow-[0_0_15px_#ffffff] border-white"
                  : "bg-[#3b4554] text-white hover:bg-[#4b5563] border-transparent"
              }`}
            >
              {isAdding ? "Adding..." : "Add To Cart"}
            </button>

            <div className="text-sm text-gray-300 mt-3 leading-6">
              <p>100% Original Product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange within 7 days.</p>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-12">
          <div className="flex gap-4">
            <button
              onClick={() => setTab("description")}
              className={`px-5 py-2 border ${
                tab === "description" && "bg-white text-black"
              }`}
            >
              Description
            </button>

            <button
              onClick={() => setTab("reviews")}
              className={`px-5 py-2 border ${
                tab === "reviews" && "bg-white text-black"
              }`}
            >
              Reviews (124)
            </button>
          </div>

          <div className="border mt-5 px-6 py-6 text-gray-300 leading-relaxed w-full mb-20">
            {tab === "description" ? (
              <p>
                Upgrade your wardrobe with this stylish slim-fit cotton shirt,
                available now on Shoporia. Crafted from breathable, high-quality
                fabric, it offers all-day comfort and effortless style. Easy to
                maintain and perfect for any setting, this shirt is a must-have
                essential for those who value both fashion and function.
              </p>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </div>

      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
        currentProductId={productData._id}
      />
    </div>
  );
}

export default ProductDetail;
