import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderList, setOrderList] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getOrderData = async () => {
      await axios
        .post(`http://localhost:5000/detail/recentOrder`,{id:localStorage.getItem('id'),admin:localStorage.getItem('admin')})
        .then((res) => {
          console.log("res.data.result",res.data.result)
          setOrderList(res.data.result);
          setLoading(false);
        });
    };
    getOrderData();
  }, []);

  const values = { orderList };
  // console.log(values);
  return (
    <OrderContext.Provider value={values}>{children}</OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
