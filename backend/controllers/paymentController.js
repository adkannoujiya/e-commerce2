
import dotenv from 'dotenv'
import { instance } from "../server.js";
import crypto from "crypto";
import paymentModel from '../models/paymentModel.js';
import orderModel from '../models/orderModel.js';
import productModel from '../models/productModel.js';

dotenv.config();


export const checkoutController = async(req, res) =>{

  try {
    const {amount, cart} = req.body;
    console.log("amount is :",amount);

      const options = {
  amount: Number(req.body.amount *100), 
  currency: "INR",

};
const order = await instance.orders.create(options);

console.log(order);

res.status(200).json({
    success:true,
    order
})
    
  } catch (error) {
       console.log(error)

    res.status(500).send({
        success:false,
        message:"error during checkout in its controller",
        error
    })
  }

};


export const paymentVerification = async(req, res) =>{

  try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cart, userId } = req.body;

      console.log("buyer checking",userId)
      console.log("buyer checking",userId)

      
      if(!cart){
        console.log("cart is empty in verify");
      }
      else{
        console.log("Cart data in veryfi:", cart);
      }
    

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");
      console.log("sign recieved :",razorpay_signature)
      console.log("sign generated :",expectedSignature)

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {



      // // saving in database

      const PaymentDetails = await paymentModel.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        
       });
       if(PaymentDetails){
        console.log("details is :",PaymentDetails)
       }
       else{
        console.log("PaymentDetails not saved in DB")
       }

     //savr order in database
        const productIds = cart.map((item) => item._id);
        const order = await orderModel.create({
      product: productIds,
      payment: PaymentDetails,
      buyer: req.user?._id, 
    
    });
    if(order){
      console.log("order save successfully")
    }
    else{
      console.log("order not dave")
    }
     

 res.status(200).json({ success: true, message: " signature matched" });
     
    }


    
  } catch (error) {
       console.log(error)

    res.status(500).send({
        success:false,
        message:"error during paymentVerification in its controller",
        error
    })
  }

};




//ordersController


export const ordersController = async(req, res) =>{

  try {
    const order = await orderModel.find({buyer:req.user?._id}).populate("product", "-photo").populate("buyer","name");
    console.log("orders", order)
   if(order){
     res.status(200).send({
      message:"order get successfully",
      order
     })
   }
   else{
     res.status(500).send({
      mesage:"order not get"
     })
   }
  
  } catch (error) {
       console.log(error)

    res.status(500).send({
        success:false,
        message:"error during order in its controller",
        error
    })
  }

};


//all orders

export const allOedersController = async(req, res) =>{

  try {
    const order = await orderModel.find({}).populate("product", "-photo").populate("buyer","name").sort({createdAt:-1});
    console.log("orders", order)
    res.status(200).json(order)
  
  } catch (error) {
       console.log(error)

    res.status(500).send({
        success:false,
        message:"error during order in its controller",
        error
    })
  }

};

//update order status
export const updateOrderStatus = async(req, res) =>{

  try {
    const {orderId} = req.params;
    const{status} = req.body;

    const orders = await orderModel.findByIdAndUpdate(orderId,{status}, {new:true})

    console.log("updated status", orders)

   res.json(orders)

  
  } catch (error) {
       console.log(error)

    res.status(500).send({
        success:false,
        message:"error during order status change in its controller",
        error
    })
  }

};


