import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState();

  useEffect(() => {
    if (params.slug) {
      getProductByCategory();
    }
  }, [params.slug]);

  const getProductByCategory = async (req, res) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-category/${params.slug}`
      );
      if (data?.success) {
        console.log("check check ", data?.product);
        setProduct(data?.product);
        setCategory(data?.cat);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container">
      <h2>{product.length} : Result Found</h2>
      <hr />
      <br />
      <div className="row">
        <div className="d-flex flex-wrap">
          {product.map((p) => (
            <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 60)}</p>
                <p className="card-text">${p.price}</p>
                <button
                  className="btn btn-primary m-1"
                  onClick={() => navigate(`/product-details/${p.slug}`)}
                >
                  More Details
                </button>
                <button className="btn btn-secondary m-1">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
