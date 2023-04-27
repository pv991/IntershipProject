import React from "react";
import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import styles from "./styles.module.css";
import useRazorpay from "react-razorpay";
import axios from "axios";
const Swal = require("sweetalert2");

const Cart = () => {
  const Razorpay = useRazorpay();

  const { items, removeFromCart } = useCart();

  const subtotal = items
    .reduce((acc, obj) => Number(acc) + Number(obj.ProductPrice), 0)
    .toFixed(1);
  const addOrder = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 5) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    items.forEach((element, i) => {
      const formData = new FormData();
      // formData.append("ProductId", PoductId);
      formData.append("ProductName", element.ProductName);
      formData.append("ProductPhoto", element.ProductImage);
      formData.append("ProductPrice", element.ProductPrice);
      formData.append("Total", parseFloat(subtotal) + 10);
      formData.append("CustomerId", localStorage.getItem("id"));
      formData.append("uniqueId", result);

      const AddUserUrl = `http://localhost:5000/add/order`;
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
            const price = `${Number(subtotal) + 10}00`;
            // const order_id=login.result[0].id.toString();
            if (i + 1 == items.length) {


              const options = {
                key: "rzp_test_qDwTmKnksUVsaC", // Enter the Key ID generated from the Dashboard
                amount: Number(price), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: localStorage.getItem("email"),
                description: "Test Transaction",
                // order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
                handler: function (response) {
                  console.log(response);
                  const PostData = {
                    payment_gateway: "Razorpay",
                    uniqueId: result,
                    razorpay_payment_id: response.razorpay_payment_id,
                  };
                  const SignUpURL = `http://localhost:5000/update/serviceStatus`;


                  axios
                    .post(SignUpURL, PostData, {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    })
                    .then((res) => {
                      localStorage.setItem("cart", JSON.stringify([]));
                      window.location.href = window.location.href;

                    });

                },
                notes: {
                  address: "Razorpay Corporate Office",
                },
                theme: {
                  color: "#3399cc",
                },
              };

              const rzp1 = new Razorpay(options);

              rzp1.open();
            }
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "warning",
            title: err.response.data.message,
            showConfirmButton: true,
          });
        });
    });

  };
  return (
    <div>
      {items.length < 1 && (
        <div className="flex flex-wrap max-w-7xl mx-auto my-4">
          <div className="w-full sm:w-2/2 md:w-2/2 xl:w-5/5 p-4 h-[500px] my-auto">
            <div className={styles.cardBg}>
              <ShoppingCartIcon className="h-40 w-40 mx-auto mt-10" />
              <p className="text-xl font-extralight tracking-widest text-center pt-6">
                There are no products in your cart.
              </p>
              <p className="text-center mt-2 font-bold tracking-wide">
                Add the products you like to the cart and buy.
              </p>
              <Link to="/">
                <div className={styles.continueButton}>
                  <button className={styles.button}>
                    <div className="flex flex-col self-center">
                      <span className={styles.buttonText}>
                        Continue Shopping
                      </span>
                    </div>
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div className="flex flex-wrap max-w-7xl mx-auto my-4">
          <div className="flex flex-col flex-1">
            {items.map((item) => {
              return (
                <div
                  className="w-full sm:w-2/2 md:w-2/2 xl:w-5/5 p-4 my-auto"
                  key={item.Id}
                >
                  <div className={styles.bgCart}>
                    <div className="flex flex-row h-48">
                      <img
                        className="w-32 my-auto p-4 object-contain"
                        src={`http://localhost:5000/${item.ProductImage}`}
                        alt="Cart Item"
                      />
                      <div className="flex flex-col ml-2 mt-2">
                        <Link to={`/product/${item.Id}`}>
                          <h2 className="text-sm title-font text-zinc-900 tracking-widest hover:text-blue-600 mt-2">
                            Brand
                          </h2>
                          <p className="font-extralight">{item.ProductName}</p>
                        </Link>
                        <p className="mt-auto mb-4 font-extralight text-xl">
                        &#8377; {item.ProductPrice}
                        </p>
                      </div>
                      <div className="flex flex-row ml-auto">
                        <button
                          className="w-5 h-5 ml-auto m-4 hover:text-red-500"
                          onClick={() => removeFromCart(item.Id)}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full h-full sm:w-2/2 md:w-2/2 xl:w-1/5 p-4">
            <div className={styles.bgCart}>
              <div className="flex flex-col p-4">
                <span className="text-xl mb-4 font-semibold">
                  Order Summary
                </span>
                <span className="text-sm my-2 font-extralight flex">
                  Subtotal{" "}
                  <span className="ml-auto font-normal"> &#8377;  {subtotal}</span>
                </span>
                <span className="text-sm my-2 font-extralight flex">
                  Shipping Estimate{" "}
                  <span className="ml-auto font-normal"> &#8377;  5</span>
                </span>
                <span className="text-sm my-2 font-extralight flex">
                  Tax Estimate <span className="ml-auto font-normal"> &#8377;  5</span>
                </span>
                <span className="text-md my-2 font-normal flex">
                  Order Total{" "}
                  <span className="ml-auto"> &#8377;  {parseFloat(subtotal) + 10}</span>
                </span>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={addOrder}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
