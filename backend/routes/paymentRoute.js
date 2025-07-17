import express from "express"
import { allOedersController, checkoutController,ordersController,paymentVerification, updateOrderStatus } from "../controllers/paymentController.js";
import { isAdmin, requireSignIn } from "../Middleweres/authMiddleweres.js";



//router onject
const router = express.Router();


router.post("/checkout",requireSignIn, checkoutController);

router.post("/payment-verification", requireSignIn,paymentVerification );

//orders
router.get("/orders", requireSignIn, ordersController );

//all orders
router.get("/all-orders", requireSignIn, isAdmin, allOedersController );
//update order staus

router.put("/update-status/:orderId", requireSignIn, isAdmin, updateOrderStatus );






export default router;