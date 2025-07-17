import React, { useEffect, useState } from "react";
import s from "../AllCssFile/Home.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Prices } from "../components/Prices";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/Cart";
import img1 from "../assets/img1.png";
import img3 from "../assets/electrical.jpg";
import img2 from "../assets/rightArrow.jpg";
import img6 from "../assets/kids.webp";
import img5 from "../assets/mens.jpg";
import img7 from "../assets/musical.jpg";
import img4 from "../assets/phone.jpg";
import img9 from "../assets/women.webp";
import img8 from "../assets/watch.jpg";
import ImagaSlider from "../components/ImagaSlider";

const Home = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setchecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  const image = [img2, img3, img4, img5, img6, img7, img8, img9];

  //LoadMore
  useEffect(() => {
    if (page === 1) return;
    LoadMore();
  }, [page]);

  const LoadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);

      if (data?.success) {
        setProduct([...product, ...data?.product]);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/product-filter",
        { checked, radio }
      );

      if (data?.success) {
        setProduct(data?.product);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked.length, radio.length]);

  // get total count of product
  const getTotal = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/product-count"
      );
      setLoading(false);

      if (data?.success) {
        setTotal(data?.total);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //get all products
  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);

      if (data?.success) {
        setProduct(data?.product);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    getAllProduct();
    getTotal();
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
    if (!checked.length || !radio.length) getAllCategory();
  }, [checked, radio]);

  //handle category filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c != id);
    }
    setchecked(all);
  };

  return (
    <>
      {/* category ad card */}
      <div className={s.category}>
        <div className={s.innerCat}>
          {categories?.map((c, i) => {
            return (
              <>
                <div
                  key={i}
                  className={`${s.catCard}`}
                  onClick={() => navigate(`/category/${c.slug}`)}
                >
                  <div className={s.imgDiv}>
                    <img
                      src={image[i]}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
                  <div className={s.catNamDiv}>{c.name}</div>
                </div>
              </>
            );
          })}
        </div>
      </div>

      {/* hero big image */}
      <div>
        <ImagaSlider />

        {/* filters */}
        <div className="row">
          <div className={`col-md-3 ${s.filterBox}`}>
            <div className="d-flex flex-column mt-2">
              <div className={`${s.CatHeading}`}>
                <h4>Filter By Ctergory</h4>
              </div>
              {categories?.map((c) => (
                <div key={c._id}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue
                      id="checkDefault"
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                    />
                    <label className="form-check-label" htmlFor="checkDefault">
                      <h6>{c.name}</h6>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex flex-column mt-2">
              <div className={`${s.CatHeading}`}>
                <h4>Filter By Prices</h4>
              </div>

              {Prices?.map((p) => (
                <div key={p._id}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="radioDefault"
                      id="radioDefault1"
                      onChange={(e) => setRadio(p.array)}
                      value={p.array}
                    />
                    <label className="form-check-label" htmlFor="radioDefault1">
                      {p.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex flex-column">
              <button
                className="btn btn-danger w-50 mt-5"
                onClick={() => window.location.reload()}
              >
                RESET FILTER
              </button>
            </div>
          </div>

          {/* All products */}

          <div className="col-md-9">
            <div className={`d-flex flex-wrap ${s.ProductCardRespo}`}>
              {product.map((p) => (
                <>
                  {/* <Link to={`/product-details/${p.slug}`}> */}
                  <div
                    key={p._id}
                    className={`card m-2 ${s.productCard}`}
                    style={{ width: "18rem" }}
                  >
                    <div
                      className={`${s.cardImage}`}
                      onClick={() => navigate(`/product-details/${p.slug}`)}
                    >
                      <img
                        src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                        className={`card-img-top ${s.cardImage}`}
                        alt={p.name}
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description.substring(0, 60)}
                      </p>
                      <p className="card-text">₹{p.price}</p>
                      <button
                        className="btn btn-primary m-1"
                        onClick={() => navigate(`/product-details/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-secondary m-1"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          alert("Item added to cart successfully");
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  {/* </Link> */}
                </>
              ))}
            </div>
            <div className="m-2 p-3">
              {product && product.length < total && (
                <button
                  className="btn btn-warning "
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loadeing..." : "LoadMore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
