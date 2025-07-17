import express from "express"
import {registerController, loginController, forgotPasswordController, updateprofileController, getUserController} from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../Middleweres/authMiddleweres.js";


//router object
const router = express.Router();


//register  || method post

router.post('/register',registerController)
router.post('/login',loginController)

//forgot psswprd
router.post('/forgot-password',forgotPasswordController)



//for user dashboard
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ok:true});
})


//for admin dashboard


router.get("/admin-auth", requireSignIn, isAdmin,(req, res) => {
    res.status(200).send({ok:true});
})

//update profile
router.put("/update-profile",requireSignIn, updateprofileController);


//get all user
router.get('/get-users',getUserController)





export default router;