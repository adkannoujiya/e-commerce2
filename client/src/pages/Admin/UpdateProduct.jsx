import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const [prevPhoto, serPrevPhoto] = useState("");

  //get single products
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/single-product/${params.slug}`
      );

      if (data?.success) {
        setName(data?.singleProduct[0].name);
        setId(data?.singleProduct[0]._id);
        setDescription(data?.singleProduct[0].description);
        setPrice(data?.singleProduct[0].price);
        setQuantity(data?.singleProduct[0].quantity);
        setCategory(data?.singleProduct[0].category);
        serPrevPhoto(data?.singleProduct[0].photo);
        // console.log("category check", category.name);
        // console.log("checkind data", data);
        // console.log("checkind name position", data?.singleProduct[0].name);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

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
  const handleupdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      photo && productData.append("photo", photo);
      // productData.append("shipping", shipping);
      // // FormData() it is convert the value in json (in string)  but we need shipping in boolean thats why we send it manually instead of formData()

      const { data } = await axios.put(
        "http://localhost:8080/api/v1/product/update-product/" + id,
        productData,
        { shipping: shipping }
      );
      if (data?.success) {
        alert("product updated successfully");
        navigate("/dashboard/admin/product");
      } else {
        console.log("product not updated");
      }
    } catch (e) {
      console.log(e);
      console.log("error in update product function");
    }
  };

  //handleDelete
  //handle delete category
  const handledelete = async (e) => {
    try {
      // let ans = window.prompt("Are you sure want to delete this product");
      // if (!ans) return;
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/product/delete-product/${id}`
      );

      if (data?.success) {
        alert("product deleted successfully");
        navigate("/dashboard/admin/product");
      } else {
        console, log("no deleted");
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 card">
          <h1> Update Product</h1>

          <div>
            <label className="btn btn-secondary w-10">Choose a Category</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="btn btn-secondary m-3 w-50"
            >
              {categories.map((c) => (
                <option value={c._id} key={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo : "Upload Photo"}
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
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${id}`}
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
              value={shipping ? "yes" : "NO"}
              className="btn btn-secondary m-3 w-50"
              required
            >
              <option value="0">NO</option>
              <option value="1">YES</option>
            </select>
            <button
              className="btn btn-primary"
              onClick={handleupdate}
              type="button"
            >
              Update Product
            </button>
            <button
              className="btn btn-danger m-3"
              onClick={handledelete}
              type="button"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
