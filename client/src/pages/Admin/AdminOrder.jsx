import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import s from "../../AllCssFile/AdminOrder.module.css";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const status = [
    "Not Process",
    "Proccessing",
    "Shipped",
    "Delivered",
    "Cancel",
  ];

  const getOrder = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth?.token]);

  const handleChangeStatus = async (orderId, value) => {
    try {
      await axios.put(`http://localhost:8080/api/update-status/${orderId}`, {
        status: value,
      });
      getOrder();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="row">
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <div className="col-md-9">
        <h2 className={s.heading}>All Orders</h2>
        <div className={s.orderContainer}>
          {orders?.map((o, i) => (
            <div key={o._id} className={s.orderCard}>
              <div className={s.orderInfo}>
                <p>
                  <strong>Status:</strong>
                  <select
                    className={s.statusSelect}
                    onChange={(e) => handleChangeStatus(o?._id, e.target.value)}
                    defaultValue={o?.status}
                  >
                    {status.map((s, i) => (
                      <option key={i} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </p>
                <p>
                  <strong>Buyer:</strong> {o?.buyer?.name}
                </p>
                <p>
                  <strong>Date:</strong> {moment(o?.createdAt).fromNow()}
                </p>
                <p>
                  <strong>Payment:</strong>{" "}
                  {o?.payment?.razorpay_payment_id ? "Success" : "Failed"}
                </p>
                <p>
                  <strong>Quantity:</strong> {o?.product.length}
                </p>
              </div>

              <div className={s.productWrapper}>
                {o?.product?.map((p) => (
                  <div key={p._id} className={s.productCard}>
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className={s.productImg}
                    />
                    <div>
                      <h6>Name: {p.name}</h6>
                      <p>Description: {p.description.substring(0, 40)}...</p>
                      <h6>Price: ₹{p.price}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrder;
