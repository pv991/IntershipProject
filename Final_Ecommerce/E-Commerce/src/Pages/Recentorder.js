import React, { useEffect, useState } from "react";
import { useOrder } from "../Context/OrderContext";

function Recentorder() {
  const { orderList } = useOrder();
  const [orderArray, setOrderArray] = useState(orderList);
  
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")).admin === "1") {
      //user is admin

      setOrderArray(orderList);
    } else {
      console.log("orderArray", orderList);
      //user is normal user
      setOrderArray(
        orderList.filter(
          (item) =>
            item.CustomerId === `${JSON.parse(localStorage.getItem("user")).id}`
        )
      );
      console.log("orderArray", orderArray);
    }
  }, [orderList]);

  //function to change the date format
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  return (
    <div>
      <div className="container">
        <section className="gradient-custom-2">
          <div className="container py-5 h-100">
            {orderArray.length > 0 && orderArray[0].CustomerId ? (
              orderArray?.map((items1, index) => {
                var jsDate = formatDate(orderArray[0].created_at);
                return (
                  <div className="row h-100 mt-2">
                    <div className="col-md-12 col-lg-12 col-xl-12" key={index}>
                      <div
                        className="card card-stepper"
                        style={{ borderRadius: "16px" }}>
                        <div className="card-header p-4">
                          <div className="row">
                            <div className="col-6">
                              <p className="text-muted mb-2">
                                FirstName :
                                <span className="fw-bold text-body">
                                  {items1.FirstName}
                                </span>
                              </p>
                              <p className="text-muted mb-2">
                                Order ID :
                                <span className="fw-bold text-body">
                                  {items1.uniqueId}
                                </span>
                              </p>
                            </div>
                            <div className="col-6">
                              <div className="ms-auto col-6">
                                <p className="text-muted mb-2">
                                  Place On :
                                  <span className="fw-bold text-body">
                                    {jsDate}
                                  </span>
                                </p>
                              </div>
                              <div className="ms-auto col-6">
                                <p className="text-muted mb-2">
                                  Payment Gateway :
                                  <span className="fw-bold text-body">
                                    {items1.payment_gateway}
                                  </span>
                                </p>
                              </div>
                              <div className="ms-auto col-6">
                                <p className="text-muted mb-2">
                                  Payment Id :
                                  <span className="fw-bold text-body">
                                    {items1.razorpay_payment_id}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-body p-4">
                          {items1.ProductName?.map((items, index) => {
                            return (
                              <div className="mt-1">
                                <div className="row">
                                  <div className="col-4">
                                    <img
                                      className="align-self-center img-fluid orderimage"
                                      src={`http://localhost:5000/${items1.ProductPhoto[index]}`}
                                      alt="ProductImage"
                                    />
                                  </div>
                                  <div className="col-5">
                                    <p className="text-muted mb-2">
                                      Product Name :
                                      <span className="fw-bold text-body">
                                        {items}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="col-3">
                                    <p className="text-muted mb-2">
                                      Product Price :
                                      <span className="fw-bold text-body">
                                        {items1.ProductPrice[index]}
                                      </span>
                                    </p>
                                    <p className="text-muted mb-2">
                                      Product Quntity:
                                      <span className="fw-bold text-body">
                                        1 item
                                      </span>
                                    </p>
                                    <p className="text-muted mb-2">
                                      Shipping Charge:
                                      <span className="fw-bold text-body">
                                        &#8377; 5
                                      </span>
                                    </p>
                                    <p className="text-muted mb-2">
                                      Tax :
                                      <span className="fw-bold text-body">
                                        &#8377; 5
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          <div className="col-3 ms-auto mb-2">
                            <p className="text-muted mb-2">
                              Total:
                              <span className="fw-bold text-body">
                                &#8377; {items1.Total[0]}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2>No Orders Yet</h2>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Recentorder;
