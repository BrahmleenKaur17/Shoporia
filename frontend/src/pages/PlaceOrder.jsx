import React, { useContext, useState } from "react";
import Title from "../component/Title";
import CartTotal from "../component/CartTotal";
import razorpay from "../assets/Razorpay.jpg";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PlaceOrder() {
  let [method, setMethod] = useState("cod");
  let navigate = useNavigate();

  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } =
    useContext(shopDataContext);

  let { serverUrl } = useContext(authDataContext);

  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            serverUrl + "/api/order/verifyrazorpay",
            response,
            { withCredentials: true },
          );

          if (data) {
            toast.success("Payment successful");
            setCartItem({});
            setTimeout(() => {
              navigate("/order");
            }, 1000);
          }
        } catch (error) {
          console.log(error);
          toast.error("Payment verification failed");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );

            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const result = await axios.post(
            serverUrl + "/api/order/placeorder",
            orderData,
            { withCredentials: true },
          );

          if (result.data) {
            toast.success("Order placed successfully");
            setCartItem({});
            setTimeout(() => {
              navigate("/order");
            }, 1000);
          }
          break;

        case "razorpay":
          const resultRazorpay = await axios.post(
            serverUrl + "/api/order/razorpay",
            orderData,
            { withCredentials: true },
          );

          if (resultRazorpay.data) {
            toast.info("Opening payment gateway");
            initPay(resultRazorpay.data);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <div className="w-full min-h-screen pt-[100px] pb-[120px] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row gap-[50px] relative items-start">
      {/* LEFT SIDE */}
      <div className="lg:w-[50%] w-full h-auto flex items-center justify-center lg:mt-[0px] mt-[20px]">
        <form
          id="orderForm"
          onSubmit={onSubmitHandler}
          className="lg:w-[70%] w-[95%] lg:h-[70%]"
        >
          <div className="py-[10px]">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>

          <div className="w-full h-[70px] flex items-center justify-between px-[10px]">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              placeholder="First name"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 text-white placeholder:text-white px-[20px] shadow-sm shadow-[#343434] focus:bg-slate-700 outline-none"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              placeholder="Last name"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 text-white placeholder:text-white px-[20px] shadow-sm shadow-[#343434] focus:bg-slate-700 outline-none"
              required
            />
          </div>

          <div className="w-full h-[70px] px-[10px]">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              placeholder="Email address"
              className="w-full h-[50px] rounded-md bg-slate-700 text-white placeholder:text-white px-[20px] shadow-sm shadow-[#343434] focus:bg-slate-700 outline-none"
              required
            />
          </div>

          <div className="w-full h-[70px] px-[10px]">
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={onChangeHandler}
              placeholder="Street"
              className="w-full h-[50px] rounded-md bg-slate-700 text-white placeholder:text-white px-[20px] shadow-sm shadow-[#343434] focus:bg-slate-700 outline-none"
              required
            />
          </div>

          <div className="w-full h-[70px] flex justify-between px-[10px]">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              placeholder="City"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 text-white placeholder:text-white px-[20px] shadow-sm shadow-[#343434] focus:bg-slate-700 outline-none"
              required
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              placeholder="State"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 text-white placeholder:text-white px-[20px] shadow-sm shadow-[#343434] focus:bg-slate-700 outline-none"
              required
            />
          </div>

          <div className="w-full h-[70px] flex justify-between px-[10px]">
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={onChangeHandler}
              placeholder="Pincode"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 text-white placeholder:text-white px-[20px] shadow-sm shadow-[#343434] focus:bg-slate-700 outline-none"
              required
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              placeholder="Country"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 text-white placeholder:text-white px-[20px] shadow-sm shadow-[#343434] focus:bg-slate-700 outline-none"
              required
            />
          </div>

          <div className="w-full h-[70px] px-[10px]">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={onChangeHandler}
              placeholder="Phone"
              className="w-full h-[50px] rounded-md bg-slate-700 text-white placeholder:text-white px-[20px] shadow-sm shadow-[#343434] focus:bg-slate-700 outline-none"
              required
            />
          </div>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="lg:w-[50%] w-full h-auto flex items-center justify-center lg:mt-[0px] mt-[20px]">
        <div className="lg:w-[70%] w-[90%] flex flex-col items-center gap-[10px]">
          <CartTotal />

          <div className="py-[10px]">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
          </div>

          <div className="flex flex-col items-center gap-[20px] mt-[20px]">
            <div className="flex gap-[20px]">
              <button
                type="button"
                onClick={() => setMethod("razorpay")}
                className={`w-[120px] h-[45px] bg-white rounded-sm ${method === "razorpay" ? "border-[3px] border-blue-900" : ""}`}
              >
                <img
                  src={razorpay}
                  className="w-[80%] h-[80%] object-contain"
                  alt=""
                />
              </button>

              <button
                type="button"
                onClick={() => setMethod("cod")}
                className={`w-[200px] h-[45px] bg-gradient-to-t from-[#95b3f8] to-white text-[13px] px-[10px] rounded-sm text-[#332f6f] font-bold ${method === "cod" ? "border-[3px] border-blue-900" : ""}`}
              >
                CASH ON DELIVERY
              </button>
            </div>

            <div className="w-full flex justify-center mt-6">
              <button
                form="orderForm"
                type="submit"
                className="text-[16px] bg-[#2f6f73] hover:bg-[#285e61] py-[10px] px-[40px] rounded-2xl text-white"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
