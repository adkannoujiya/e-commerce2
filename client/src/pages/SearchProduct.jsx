import React from "react";
import { useSearch } from "../context/search";

const SearchProduct = () => {
  const [values, setValues] = useSearch();
  return (
    <>
      <div className="container" style={{ width: "100%", display: "flex" }}>
        <div>
          <h1>Search result</h1>
          <h6>
            {values.result.length < 1
              ? "No Result Found"
              : `Found ${values.result.length}`}
          </h6>
          <div
            className="d-flex flex-wrap justify-content-start "
            style={{
              rowGap: "20px",
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "start",
            }}
          >
            {values?.result.map((p) => (
              <div key={p._id} className="card m-2">
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{
                    height: "300px",
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 60)}</p>
                  <p className="card-text">₹{p.price}</p>
                  <button className="btn btn-primary m-1">More Details</button>
                  <button className="btn btn-secondary m-1">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchProduct;
