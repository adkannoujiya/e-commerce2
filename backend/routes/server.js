import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import paymentRoute from "./routes/paymentRoute.js"
import cors from "cors"
import Razorpay from "razorpay";
import path from "path"
import {fileURLToPath} from "url"

const app = express();


//configure env`
dotenv.config();

//fix es module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//database confic
connectDB();
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './clint/build')))

//routes
app.use('/api/v1/auth',authRoute );
app.use('/api/v1/category',categoryRoute );
app.use('/api/v1/product',productRoute );
app.use('/api',paymentRoute );

// app.use('*', function(req, res){
  res.sendFile(path.join(__dirname, './clint/build/indexedDB.html'))
// })


//for getting key
app.get("/api/get-razorpay-key", async(req, res) =>{
  try {
      res.status(200).json({
        key:process.env.RAZORPAY_API_KEY
    })
    
  } catch (e) {
    console.log(e)
    console.log("ket not obtaind :", e)
  }
})


export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const port = process.env.PORT || 8080;

app.listen(port, () =>{
    console.log(`server is running at port ${port}`);
})
