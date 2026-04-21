import React, { useEffect, useState, useContext } from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { SiEbox } from "react-icons/si";

function Orders() {
  let [orders, setOrders] = useState([]);
  let { serverUrl } = useContext(authDataContext);

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/order/list",
        {},
        { withCredentials: true },
      );
      if (result.data) {
        setOrders(result.data.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(
        serverUrl + "/api/order/status",
        {
          orderId,
          status: e.target.value,
        },
        { withCredentials: true },
      );

      if (result.data) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white overflow-x-hidden">
      <Nav />

      {/* LAYOUT WRAPPER 
          - ml-[80px]: This creates a permanent gap on mobile so the fixed sidebar doesn't hide text.
          - lg:ml-0: Resets for desktop if your Sidebar handles its own spacing there.
          - lg:pl-[250px]: Ensures desktop content is positioned correctly.
      */}
      <div className="w-full flex flex-col lg:flex-row ml-[60px] md:ml-[80px] lg:ml-0 lg:pl-[250px]">
        <Sidebar />

        {/* MAIN CONTENT
            - Added 'pr-[70px]' on mobile to ensure the right side of the card isn't cut off.
        */}
        <div className="flex-1 mt-[80px] lg:mt-[100px] pb-10 pr-[70px] md:pr-10 lg:pr-10 flex flex-col items-center lg:items-start">
          <div className="w-full max-w-[1000px]">
            <h2 className="text-[24px] md:text-[34px] font-bold mb-8 text-center lg:text-left">
              All Orders List
            </h2>

            <div className="flex flex-col gap-6 w-full">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="w-full bg-[#ffffff0a] border border-gray-800 rounded-2xl p-4 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6"
                >
                  {/* ICON */}
                  <div className="bg-white p-3 rounded-xl flex items-center justify-center shrink-0">
                    <SiEbox className="text-black text-[30px] md:text-[40px]" />
                  </div>

                  {/* INFO */}
                  <div className="flex-1 flex flex-col items-center lg:items-start gap-1 text-center lg:text-left">
                    <div className="text-[#56dbfc] font-medium text-[14px] md:text-[18px]">
                      {order.items.map((item, i) => (
                        <span key={i}>
                          {item.name.toUpperCase()} x {item.quantity}
                          <span className="text-gray-400 text-[12px]">
                            {" "}
                            ({item.size})
                          </span>
                          {i !== order.items.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>

                    <div className="text-gray-300 text-[13px] md:text-[16px]">
                      <p className="font-bold text-white">
                        {order.address.firstName} {order.address.lastName}
                      </p>
                      <p className="leading-tight">
                        {order.address.street}, {order.address.city}
                      </p>
                      <p className="text-[#aaf4e7]">{order.address.phone}</p>
                    </div>
                  </div>

                  {/* STATS */}
                  <div className="flex flex-col items-center lg:items-start text-[13px] text-gray-400 border-y lg:border-none border-gray-800 py-3 lg:py-0 w-full lg:w-auto">
                    <p>
                      Method:{" "}
                      <span className="text-white">{order.paymentMethod}</span>
                    </p>
                    <p>
                      Payment:{" "}
                      <span
                        className={
                          order.payment ? "text-green-400" : "text-yellow-400"
                        }
                      >
                        {order.payment ? "Done" : "Pending"}
                      </span>
                    </p>
                    <p>
                      Date:{" "}
                      <span className="text-white">
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                    </p>
                  </div>

                  {/* PRICE */}
                  <div className="text-[20px] md:text-[26px] font-black">
                    ₹{order.amount}
                  </div>

                  {/* DROPDOWN - Fixed width to prevent shrinking */}
                  <div className="w-full lg:w-auto flex justify-center">
                    <select
                      onChange={(e) => statusHandler(e, order._id)}
                      value={order.status}
                      className="w-full max-w-[200px] lg:w-[160px] px-2 py-3 bg-[#111] rounded-lg border border-gray-700 text-white text-xs font-bold outline-none"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
