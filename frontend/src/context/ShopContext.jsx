import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./authContext";
import { userDataContext } from "./UserContext";
import axios from "axios";

export const shopDataContext = createContext();

function ShopContext({ children }) {
  let [products, setProducts] = useState([]);
  let [search, setSearch] = useState("");
  let [showSearch, setShowSearch] = useState(false);

  let { serverUrl } = useContext(authDataContext);
  let { userData } = useContext(userDataContext);

  // CART STATE
  let [cartItem, setCartItem] = useState({});
  let [loading, setLoading] = useState(false);

  let currency = "₹";
  let delivery_fee = 40;

  // FETCH PRODUCTS
  const getProducts = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list");
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ADD TO CART
  const addtoCart = async (itemId, size) => {
    if (!size) {
      alert("Please select size");
      return;
    }

    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItem(cartData);

    if (userData) {
      setLoading(true);
      try {
        await axios.post(
          serverUrl + "/api/cart/add",
          { itemId, size },
          { withCredentials: true },
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  // GET USER CART
  const getUserCart = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/cart/get",
        {},
        { withCredentials: true },
      );

      setCartItem(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE QUANTITY
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);

    cartData[itemId][size] = quantity;
    setCartItem(cartData);

    if (userData) {
      try {
        await axios.post(
          serverUrl + "/api/cart/update",
          { itemId, size, quantity },
          { withCredentials: true },
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  // CART COUNT
  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item];
          }
        } catch (error) {}
      }
    }

    return totalCount;
  };

  // CART AMOUNT
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);

      for (const item in cartItem[items]) {
        try {
          if (itemInfo && cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    return totalAmount;
  };

  // LOAD PRODUCTS
  useEffect(() => {
    getProducts();
  }, []);

  // LOAD CART AFTER LOGIN
  useEffect(() => {
    if (userData) {
      getUserCart();
    }
  }, [userData]);

  let value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,

    cartItem,
    setCartItem,
    addtoCart,
    getCartCount,
    getCartAmount,
    loading,
    updateQuantity,
  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
}

export default ShopContext;
