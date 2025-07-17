import express from "express"
import { isAdmin, requireSignIn } from "../Middleweres/authMiddleweres.js";
import {  createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCount, productFilters, productListController, productPhototController, relatedProductController, searchController, updateProductController } from "../controllers/productController.js";
import formidable from 'express-formidable';


//router onject
const router = express.Router();


router.post("/create-product",requireSignIn, isAdmin,formidable(), createProductController);

router.get("/get-product",formidable(), getProductController);

router.get("/single-product/:slug",formidable(), getSingleProductController);

router.get("/product-photo/:pid",formidable(), productPhototController);

//update product
router.put("/update-product/:pid",requireSignIn, isAdmin,formidable(), updateProductController);

router.delete("/delete-product/:id",requireSignIn, isAdmin,formidable(), deleteProductController);

//route for filter
router.post("/product-filter",productFilters);

//product count
router.get("/product-count",productCount);

//product per page
router.get("/product-list/:page",productListController);

//roure for saerching product
router.get("/search/:keyword",searchController);

//related product
router.get("/related-product/:pid/:cid",relatedProductController);

//product bases on category
router.get("/product-category/:slug",productCategoryController);



//payment getway
//for token
// router.get("/braintree/token", braintreeTokenController)

// payment
// router.put("/braintree/payment",requireSignIn, braintreePaymentController)





export default router;