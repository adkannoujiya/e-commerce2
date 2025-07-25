import React, { useEffect, useState } from "react";
import { NavLink, Link, Navigate } from "react-router-dom";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";

const Product = () => {
  const [product, setProduct] = useState();

  //get all products
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );

      if (data?.success) {
        setProduct(data?.allProduct);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Product List</h1>

          <div className="d-flex flex-wrap">
            {product?.map((p) => (
              <Link to={`/dashboard/admin/product/${p.slug}`}>
                <div
                  key={p._id}
                  className="card m-2"
                  style={{ width: "18rem" }}
                >
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
