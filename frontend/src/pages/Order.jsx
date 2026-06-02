import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/AuthContext";
import Title from "../component/Title";
import { toast } from "react-toastify";

function Order() {
  let [orderData, setOrderData] = useState([]);

  let { currency } = useContext(shopDataContext);
  let { serverUrl } = useContext(authDataContext);

  const loadOrderData = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/order/userorder",
        {},
        { withCredentials: true },
      );

      if (result.data) {
        let allOrdersItem = [];

        result.data.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);

      t;
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className="w-full min-h-[100vh] p-[20px] pb-[150px] overflow-x-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]">
      {/* TITLE */}
      <div className="text-center mt-[80px] mb-10">
        <Title text1={"MY"} text2={"ORDER"} />
      </div>

      {/* ORDERS CONTAINER */}
      <div className="w-full flex flex-col gap-5">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="w-full border-t border-b border-gray-700 py-4"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#51808048] p-5 rounded-2xl">
              <div className="flex items-start gap-6 text-sm md:text-base">
                <img
                  src={item.image1}
                  alt=""
                  className="w-20 md:w-32 rounded-md"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-lg md:text-xl font-medium text-[#f3f9fc]">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-[#aaf4e7]">
                    <p>
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-1 text-[#aaf4e7]">
                    Date:{" "}
                    <span className="text-[#e4fbff]">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  <p className="text-[#aaf4e7]">
                    Payment Method:{" "}
                    <span className="text-[#e4fbff] uppercase">
                      {item.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE: Status and Button */}

              <div className="md:w-1/2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base text-[#f3f9fc]">
                    {item.status}
                  </p>
                </div>
                <button
                  onClick={loadOrderData}
                  className="border border-gray-500 px-4 py-2 text-sm font-medium rounded-md text-[#f3f9fc] bg-[#101919] hover:bg-slate-700 transition-all"
                >
                  Track Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
