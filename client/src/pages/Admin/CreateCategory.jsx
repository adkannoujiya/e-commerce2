import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link, Navigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import AdminMenu from "../../components/AdminMenu";

import CategoryForm from "../../components/form/CategoryForm";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState(" ");

  //handle create CAtegory form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        { name }
      );

      if (data?.success) {
        alert("category created successfully");
        getAllCategory();
      }
    } catch (e) {
      console.log(e);
    }
  };

  //handle delete category
  const handleDelete = async (e) => {
    try {
      const id = e;
      const { data } = await axios.delete(
        "http://localhost:8080/api/v1/category/delete-category/" + id
      );
      if (data?.success) {
        alert("category deleted successfully");
        navigate("/dashboard/admin/create-category");
        getAllCategory();
      }
      console.log(deleted);
    } catch (error) {
      console.log(error);
    }
  };

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );

      if (data?.success) {
        setCategories(data?.allCategory);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 card">
          <h1>Manage Category</h1>
          <div className="p-3 w-50">
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          <div className="w-75">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((c) => (
                  <>
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <NavLink
                          to={`/dashboard/admin/update-category/${c._id}`}
                          className="nav-link "
                          aria-current="page"
                        >
                          <button className="btn btn-primary m-3">Edit</button>
                        </NavLink>
                        <button
                          className="btn btn-danger 3"
                          onClick={(e) => handleDelete(c._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCategory;
