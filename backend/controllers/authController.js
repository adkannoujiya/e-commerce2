import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";


//register  ||POST  _______________________________________________________________________________________________________________
export const registerController = async(req, res) =>{
   try {
    const {name, email, password, phone, address, answer} = req.body;
    if(!name){
        return res.send({message:"name is required"});
    }
    if(!email){
        return res.send({message:"email is required"});
    }
    if(!password){
        return res.send({message:"password is required"});
    }
    if(!phone){
        return res.send({message:"phone is required"});
    }
    if(!address){
        return res.send({message:"address is required"});    
    }
    if(!answer){
        return res.send({message:"answer is required"});    
    }
     
    //checking user is exist or not
    const isUserExist = await userModel.findOne({email});

    if(isUserExist){
        return res.status(400).send({
            success:false,
            message:"email already exist"
        });
    }

    //hashing the password
    const hashedPassword = await hashPassword(password);

    //now we will  save the data in  our database
    const user = await new userModel({name,email, phone,address,answer, password:hashedPassword}).save();

    //sending response if data saved succesfully
    res.status(201).send({
        success:true,
        message:"User Register Successfully",
        user
    })
    
   } catch (error) {
    console.log(error)

    res.status(500).send({
        success:false,
        message:"error in registration",
        error
    })
    
   }
};


//login  ||POST________________________________________________________________________________________________

export const loginController = async(req, res) =>{
    try {
        const { email, password} = req.body;
        //server side validation
        if(!email ||!password){
            return res.send({
                success:false,
                message:"Invalid email or password"
            });
        };
        
        //finding user on the basis of email
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"email is not registered"
            })
        }
                       
        //comparing the password

        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            })
        }
       
        //generating token using sign method of jwt on the basis of user id

       const token = await jwt.sign(
        //on the basis on id
        {_id:user._id},
        //secred key
        process.env.JWT_secret,

        {
            expiresIn:"7d"
        });

        //sending responce
        console.log(user);
        res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token
        })

        
    } catch (error) {
        console.log(error)

        res.status(500).send({
            success:false,
            message:"error in login",
            error
        })
        
    }
}

// FORGOT PASSWORD    ||POST

export const forgotPasswordController = async(req,res) =>{
    try {
        const {email, answer, newPassword} = req.body;
        if(!email){
            res.status(500).send({message:"email is required"})
        }
        if(!answer){
            res.status(500).send({message:"answer is required"})
        }
        if(!newPassword){
            res.status(500).send({message:"newPassword is required"})
        }

        const user = await userModel.findOne({email, answer});

        if(!user){
            res.status(404).send({
                success:false, message:"Invalid email or answer"
            });
        }

        const hashPass = await hashPassword(newPassword);

        await userModel.findByIdAndUpdate(user._id, {password : hashPass});
        
        if(user){
            res.status(200).send({message:"reset successfully", success:true,})
        }
        
    } catch (e) {
        console.log("error in forgot password controller")
        console.log(e);
        res.status(500)
        .send({success:false,  message:"somthing went wrong in forgot password controller"});
        e
       
        
    }

}


export const adminController = async (req, res) => {
   try {
       res.status(200).send({ok:true});
   } catch (error) {
    res.status(500).send({message:"token must be provided"})
    
   }
}


//update profile
export const updateprofileController = async(req, res) => {
    try {
       

        const {name, email, password, phone, address} = req.body;
        const user = await userModel.findById(req.user._id);

        if(password && password.length <6){
            return res.json({error:"password must be at least 6 charector"})
        }


        //agar password milta h to use pahle hash kra do save karne se pahle
        const hashedPass = password ? await hashPassword(password) : undefined;
        const updateUser = await userModel.findByIdAndUpdate(req.user._id, {
            name:name || user.name,
            email:email || user.email,
            phone:phone || user.phone,
            address:address || user.address,
            password:hashedPass || user.password

            },{new:true})

             res.status(200).send({
            success:true,
            message:"Updated successfully",
           updateUser
          
        })
    } catch (e) {
         console.log("error in update profile controller")
        console.log(e);
        res.status(500)
        .send({success:false,  message:"somthing went wrong in update profile controller"});
        e
    }
}


export const getUserController =async(req, res) =>{
    try {

        const allUsers = await userModel.find({});

        if(allUsers){
            res.status(200).send({
                message:"users get successfully",
            success:true,
            allUsers
        })

        }
        else{
            res.status(500).send({
                message:"users not get successfully",
            success:false,
            allUsers
        }) 
        }
        
    } catch (e) {
          console.log("error in get users controller")
        console.log(e);
        res.status(500)
        .send({success:false,  message:"somthing went wrong in get users controller"});
        e
    }
}