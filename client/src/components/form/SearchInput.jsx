import React from "react";
import { useSearch } from "../../context/search";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import s from "../../AllCssFile/SearchBox.module.css";

const SearchInput = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("btn clicked", values.keyword);
      console.log("keywords check", values.keyword);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, result: data });
      navigate("/search");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className={`form-control ${s.inputBar}`}
          type="search"
          placeholder="Search Your Product"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button
          className={`btn btn-outline-success ${s.searchBTN}`}
          type="submit"
        >
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
