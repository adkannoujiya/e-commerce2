import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/Cart";
import s from "../AllCssFile/ProductDetails.module.css";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    getProduct();
  }, [params.slug]);

  const getProduct = async () => {
    try {
      const { slug } = params;
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/single-product/${slug}`
      );
      if (data?.success) {
        setProduct(data?.singleProduct[0]);
        getSimilarproduct(
          data?.singleProduct[0]?._id,
          data?.singleProduct[0].category._id
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getSimilarproduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      if (data?.success) {
        setRelatedProduct(data?.product);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={s.pageContainer}>
      <div className={s.productContainer}>
        <div className={s.productImageSection}>
          <img
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            className={s.productImage}
          />
        </div>
        <div className={s.productInfoSection}>
          <h2 className={s.title}>{product.name}</h2>
          <p className={s.description}>{product.description}</p>
          <h4 className={s.price}>Price: ${product.price}</h4>
          <p className={s.category}>Category: {product.category?.name}</p>
          <div className={s.buttonRow}>
            <button
              className={s.cartBtn}
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                alert("Item added to cart successfully");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className={s.relatedContainer}>
        <h3 className={s.relatedTitle}>Similar Products</h3>
        {relatedProduct.length < 1 ? (
          <p className={s.noRelated}>No Similar Product Found</p>
        ) : (
          <div className={s.relatedList}>
            {relatedProduct.map((p) => (
              <div key={p._id} className={s.relatedCard}>
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  className={s.relatedImg}
                />
                <div className={s.relatedBody}>
                  <h5>{p.name}</h5>
                  <p>{p.description.substring(0, 60)}</p>
                  <p>₹{p.price}</p>
                  <button
                    className={s.detailsBtn}
                    onClick={() => navigate(`/product-details/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className={s.cartBtn}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
