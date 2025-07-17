import React from "react";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <div className="container">
      <div className="row">
        {categories?.map((c) => (
          <div key={c._id} className="col-md-6 mt-5 mb-5 gx-3 gy-3">
            <Link to={`/category/${c.slug}`}>{c.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
