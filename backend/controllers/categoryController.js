
import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";



//create product  ||POST  _______________________________________________________________________________________________________________
export const createCtegoryController = async(req, res) =>{
   try {
    const {name} = req.body;
    if(!name){
        return res.send({message:"name is required"});
    }
    
 //checking category is exist or not
    const isCtegoryExist = await categoryModel.findOne({name});

    if(isCtegoryExist){
        return res.status(200).send({
            success:true,
            message:"category already exist"
        });
    }

    const category = await new categoryModel({name, slug:slugify(name),}).save();

    //sending response if data saved succesfully
    res.status(201).send({
        success:true,
        message:"category created Successfully",
        category
    })
    
   } catch (error) {
    console.log(error)

    res.status(500).send({
        success:false,
        message:"error during creating categoty",
        error
    })
    
   }
};


//update category

export const updateCtegoryController = async(req,res) =>{
    try {
        const {name} = req.body;

        const {id} = req.params

        if(!name){
            res.status(500).send({message:"email is required"})
        }
       
        const category = await categoryModel.findOne({name});

        if(category){
            res.status(200).send({
                success:true,
                 message:"category already exist"
            });
        }

       const updateCat =  await categoryModel.findByIdAndUpdate(id,{name, slug:slugify(name)}, {new:true})
       res.status(200)
       .send({success:true, 
        message:"categoru updated successfully", 
        updateCat})

       
        
    } catch (e) {
        console.log("error in update category controller")
        console.log(e);
        res.status(500)
        .send({success:false,  
            message:"somthing went wrong in update category controller"});
        e
       
        
    }

}

//get all category

export const getCtegoryController =  async(req,res) =>{
     try {
       
        const allCategory = await categoryModel.find({})

         res.status(200)
       .send({success:true, 
        message:"category get successfully", 
        allCategory
    })
   
        
    } catch (e) {
        console.log("error in get category controller")
        console.log(e);
        res.status(500)
        .send({success:false,  
            message:"somthing went wrong in get category controller"});
        e
       
        
    }

}


//get single category

export const getSingleCtegoryController =  async(req,res) =>{
     try {
       
        const singleCategory = await categoryModel.find({slug:req.params.slug})

         res.status(200)
       .send({success:true, 
        message:"category get successfully", 
        singleCategory
    })

        
    } catch (e) {
        console.log("error in get single category ")
        console.log(e);
        res.status(500)
        .send({success:false,  
            message:"somthing went wrong in get single  category controller"});
        e
       
        
    }

}


//delete category

export const deleteCtegoryController =  async(req,res) =>{
     try {
       
      const {id} = req.params;

      const deleted = await categoryModel.findByIdAndDelete(id);

         res.status(200)
       .send({success:true, 
        message:"category deleted successfully", 
        deleted
    })

        
    } catch (e) {
        console.log("error in get single category ")
        console.log(e);
        res.status(500)
        .send({success:false,  
            message:"somthing went wrong during deleting in controller"});
        e
       
        
    }

}