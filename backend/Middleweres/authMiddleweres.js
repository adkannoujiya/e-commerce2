import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

//token base protected routes 
//varify is a method of jwt to check whather user hah token or not
export const requireSignIn = async(req, res, next) =>{
  try {
    const decode = jwt.verify(
        req.headers.authorization,
        process.env.JWT_secret
    );

    req.user = decode;
    next()
    
  } catch (error) {
    console.log(error)
    
  }
}


//checking user is an admin or not

export const isAdmin = async(req, res, next) =>{
    try {
        const user = await userModel.findById(req.user._id);
        console.log(user);
      
        if(user.role !==1){
                   return res.status(401).send({
                    success:false,
                    message:"unothorized access"
                   });
        }
        else{
            next();
        }

       
        
    } catch (error) {
        console.log(error);
        res.send({
            success:false,
            message:"user is not an admin",
            error
        })
        
    }
}