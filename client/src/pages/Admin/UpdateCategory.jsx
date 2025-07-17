import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:8080/api/v1/category/update-category/" + id,
        { name }
      );

      if (data?.success) {
        alert("category updated successfully");
        navigate("/dashboard/admin/create-category");
        getAllCategory();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h3>Update Category</h3>
      <hr />
      <br />
      <br />
      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter New Category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <br />
      <br />
      <br />
    </>
  );
};

export default UpdateCategory;
