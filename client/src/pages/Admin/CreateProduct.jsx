import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

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

  //handle craete function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("photo", photo);
      // productData.append("shipping", shipping);
      // // FormData() it is convert the value in json (in string)  but we need shipping in boolean thats why we send it manually instead of formData()

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product//create-product",
        productData,
        { shipping: shipping }
      );
      if (data?.success) {
        alert("product created successfully");
        navigate("/dashboard/admin/product");
      } else {
        console.log("product not created");
      }
    } catch (e) {
      console.log(e);
      console.log("error in create product function");
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 card">
          <h1> Create Product</h1>
          <form onSubmit={handleCreate}>
            <div>
              <label className="btn btn-secondary w-10">
                Choose a Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="btn btn-secondary m-3 w-50"
              >
                <option>Choose Category</option>
                {categories.map((c) => (
                  <option value={c._id} key={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a Name"
                  className="form-control"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <textarea
                  type="area"
                  value={description}
                  placeholder="Write a Description"
                  className="form-control"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Write a Price"
                  className="form-control"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  required
                  type="number"
                  value={quantity}
                  placeholder="Write a Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <label className="btn btn-secondary w-10">Select Shiping</label>
              <select
                onChange={(e) => {
                  setShipping(e.target.value === "1");
                }}
                className="btn btn-secondary m-3 w-50"
                required
              >
                <option value="0">NO</option>
                <option value="1">YES</option>
              </select>
              <button className="btn btn-primary">Create Product</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
