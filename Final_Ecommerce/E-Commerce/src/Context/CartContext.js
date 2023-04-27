import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
const Swal = require("sweetalert2");

const CartContext = createContext();

const defaultCart = JSON.parse(localStorage.getItem("cart")) || [];

const CartProvider = ({ children }) => {
  const [items, setItems] = useState(defaultCart);
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState();
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addQuantity = (data, type, quantity) => {
    setData([data]);
    // setQuantity(1);
    switch (type) {
      case "ADD":
        setQuantity(quantity + 1);
        break;
      case "REMOVE":
        if (quantity <= 1) {
          setQuantity(1);
        } else {
          setQuantity(quantity - 1);
        }
        break;
      default:
        console.log(data, quantity);
    }
  };

  const addToCart = (data, findCartItem, quantity) => {
    if (!findCartItem) {
      const formData = new FormData();
      formData.append("ProductPhoto", data.ProductImage);
      formData.append("ProductName", data.ProductName);
      formData.append("ProductPrice", data.ProductPrice);
      formData.append("ProductId", data.Id);
      formData.append("ProductQuantity", quantity); //ADDED quantity
      formData.append("CustomerId", localStorage.getItem("id"));
      const AddUserUrl = `http://localhost:5000/add/cart`;
      axios
        .post(AddUserUrl, formData, {
          headers: {
            Accept: "auth",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const login = response.data;
          if (login.success === true) {
            console.log(data);
            return setItems((items) => [data, ...items]);
            // return setItems((items) => [data, ...items] )
          }
        });
    } else {
      const formData = new FormData();
      formData.append("id", findCartItem.Id);
      // formData.append("CustomerId", "1");
      formData.append("CustomerId", localStorage.getItem("id"));
      const AddUserUrl = `http://localhost:5000/remove/cart`;
      axios
        .post(AddUserUrl, formData, {
          headers: {
            Accept: "auth",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const filtered = items.filter((item) => item.Id !== findCartItem.Id); //changed id to ID
          setItems(filtered);
        });
    }
    if (findCartItem !== undefined) {
      const filtered = items.filter((item) => item.Id !== findCartItem.Id); //changed id to ID
      setQuantity(1);
      setItems(filtered);
    }
  };

  const removeFromCart = (item_id) => {
    const formData = new FormData();
    formData.append("id", item_id);
    formData.append("CustomerId", localStorage.getItem("id"));
    const AddUserUrl = `http://localhost:5000/remove/cart`;
    axios
      .post(AddUserUrl, formData, {
        headers: {
          Accept: "auth",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
// alert(item_id)

        const filtered = items.filter((item) => item.Id !== item_id);
        setItems(filtered);
      });
  };

  const values = {
    items,
    setItems,
    addToCart,
    removeFromCart,
    quantity,
    setQuantity,
    addQuantity,
    data,
  };
  console.log("values", values);
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
