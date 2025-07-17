import express from "express"
import { isAdmin, requireSignIn } from "../Middleweres/authMiddleweres.js";
import { createCtegoryController, deleteCtegoryController, getCtegoryController, getSingleCtegoryController, updateCtegoryController } from "../controllers/categoryController.js";

//router onject
const router = express.Router();


router.post("/create-category",requireSignIn, isAdmin, createCtegoryController);

router.put("/update-category/:id",requireSignIn, isAdmin, updateCtegoryController);

router.get("/get-category",getCtegoryController);

router.get("/getSingle-category/:slug",getSingleCtegoryController);

router.delete("/delete-category/:id",requireSignIn, isAdmin, deleteCtegoryController);




export default router;