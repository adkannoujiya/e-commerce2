import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import UserMenu from "../../components/UserMenu";
import { useAuth } from "../../context/auth";
import s from "../../AllCssFile/UserOrders.module.css";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrder = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/orders");
      setOrders(data.order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth?.token]);

  return (
    <div className="container-fluid row p-3">
      <div className="col-md-3">
        <UserMenu />
      </div>

      <div className="col-md-9">
        <h2 className="mb-3">All Orders</h2>

        {orders?.map((o, i) => (
          <div key={o._id} className={`mb-4 p-3 ${s.orderCard}`}>
            <div className={s.orderHeader}>
              <span>#{i + 1}</span>
              <span>
                Status: <strong>{o?.status}</strong>
              </span>
              <span>
                Buyer: <strong>{o?.buyer.name}</strong>
              </span>
              <span>
                Date: <strong>{moment(o?.createdAt).fromNow()}</strong>
              </span>
              <span>
                Payment:{" "}
                <strong>
                  {o?.payment.razorpay_payment_id ? "success" : "failed"}
                </strong>
              </span>
              <span>
                Quantity: <strong>{o?.product.length}</strong>
              </span>
            </div>

            {o?.product?.map((p) => (
              <div key={p._id} className={`row mb-2 p-2 ${s.productCard}`}>
                <div className="col-md-4">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className={`img-fluid ${s.productImage}`}
                  />
                </div>
                <div className="col-md-8">
                  <h5>Name: {p.name}</h5>
                  <p>Description: {p.description.substring(0, 50)}...</p>
                  <h6>Price: ${p.price}</h6>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;
