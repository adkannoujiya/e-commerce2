
import productModel from "../models/productModel.js";
import slugify from "slugify";
import fs from "fs"
import categoryModel from "../models/categoryModel.js";
import dotenv from 'dotenv'

dotenv.config();


//create product  ||POST  _______________________________________________________________________________________________________________
export const createProductController = async(req, res) =>{
   try {
    const {name, slug,description, price,quantity,category,shiping} = req.fields;
    const {photo} = req.files;

    if(!name){
        return res.send({message:"name is required"});
    }
    if(!description){
        return res.send({message:"description is required"});
    }
    if(!price){
        return res.send({message:"price is required"});
    }
    if(!category){
        return res.send({message:"category is required"});
    }
    if(!quantity){
        return res.send({message:"quantity is required"});
    }
    if(!photo && photo.size>1000000){
        return res.send({message:"photo is required"});
    }
   
    
 //checking category is exist or not
    const products = await new productModel({...req.fields, slug:slugify(name)});
    if(photo){
        products.photo.data = fs.readFileSync(photo.path)
        products.photo.contentType =  photo.type
    }

    await products.save()

   
    //sending response if data saved succesfully
    res.status(201).send({
        success:true,
        message:"product created Successfully",
        products
    })
    
   } catch (error) {
    console.log(error)

    res.status(500).send({
        success:false,
        message:"error during creating produc in controller",
        error
    })
    
   }
};

//get all product

export const getProductController =  async(req,res) =>{
     try {
       
        const allProduct = await productModel.find({}).select("-photo").limit(12).sort({createdAt:-1})

         res.status(200)
       .send({success:true, 
        totalProduct:allProduct.length,
        message:"product get successfully", 
        allProduct
    })

        
    } catch (e) {
        console.log("error in get product controller")
        console.log(e);
        res.status(500)
        .send({success:false,  
            message:"somthing went wrong in get product controller"});
        e
       
        
    }

}

//get single product

export const getSingleProductController =  async(req,res) =>{
     try {
        console.log("slug checking",req.params.slug)
       
        const singleProduct = await productModel.find({slug:req.params.slug}).select("-photo").populate("category");

         res.status(200)
       .send({success:true, 
        message:"single product get successfully", 
        singleProduct
    })

        
    } catch (e) {
        console.log("error in get single product ")
        console.log(e);
        res.status(500)
        .send({success:false,  
            message:"somthing went wrong in get single  product controller"});
        e
       
        
    }

}

//product photo

export const productPhototController = async(req, res) =>{
    try {

        const product = await productModel.findById(req.params.pid).select("photo");

        if(product.photo.data){
            res.set('Content-type',product.photo.contentType)
            return res.status(200).send(product.photo.data);
        }
        
    } catch (e) {
         console.log("error in product photo ")
        console.log(e);
        res.status(500)
        .send({success:false,  
            message:"somthing went wrong inproduct photo controller"});
        e
        
    }

}


//update product  ||POST  _______________________________________________________________________________________________________________
export const updateProductController = async(req, res) =>{
   try {
    const {name,description, price,quantity,category} = req.fields;
    const {photo} = req.files;

    if(!name){
        return res.send({message:"name is required"});
    }
    if(!description){
        return res.send({message:"description is required"});
    }
    if(!price){
        return res.send({message:"price is required"});
    }
    if(!category){
        return res.send({message:"category is required"});
    }
    if(!quantity){
        return res.send({message:"quantity is required"});
    }
    if(!photo && photo.size>1000000){
        return res.send({message:"photo is required"});
    }
   
    
 //checking category is exist or not
 const id = req.params.pid;

    const products = await  productModel.findByIdAndUpdate(id ,{...req.fields, slug:slugify(name)},{new:true});
    if(photo){
        products.photo.data = fs.readFileSync(photo.path)
        products.photo.contentType =  photo.type
    }

    await products.save()

   
    //sending response if data saved succesfully
    res.status(201).send({
        success:true,
        message:"product updated Successfully",
        products
    })
    
   } catch (error) {
    console.log(error)

    res.status(500).send({
        success:false,
        message:"error during updating produc in controller",
        error
    })
    
   }
};

//delete product

//delete category

export const deleteProductController =  async(req,res) =>{
     try {
       
      const {id} = req.params;
      

      const deleted = await productModel.findByIdAndDelete(id);

         res.status(200)
       .send({success:true, 
        message:"product deleted successfully", 
        deleted
    });

     
      

        
    } catch (e) {
        console.log("error during product deletion ")
        console.log(e);
        res.status(500)
        .send({success:false,  
            message:"somthing went wrong during deleting product in controller"});
        e
       
        
    }

}

// product filter
export const productFilters = async(req,res) =>{
    try {
        const {checked, radio} = req.body;
        
        let args = {};
        if(checked.length >0) args.category = checked;
        if(radio.length) args.price = {$gte:radio[0], $lte:radio[1]};
        const product = await productModel.find(args);

            if ((!checked || checked.length === 0) && (!radio || radio.length === 0)) {
      return res.status(200).send({
        success: true,
        product: [], // or you can send a message
        message: "No filters applied",
      });
    }
    else{
         res.status(200).send({
            success:true,
            product
        });
    }

       
    } catch (e) {
         console.log("error during product filter ")
        console.log(e);
        res.status(500)
        .send({success:false,  
            message:"somthing went wrong during product filter in controller"});
        e
       
    }
}


//product count
export const productCount =async(req, res) =>{
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success:true,
            total
        })
        
    } catch (e) {
         console.log("error during product count ")
        console.log(e);
        res.status(500)
        .send({success:false,  
            message:"somthing went wrong during product count in controller"});
        e
    }
    
}
//product list per page________________________________________________________________________
export const productListController =async(req, res) =>{
    try {
       const perpage = 8;
       const page = req.params.page ? req.params.page :1
       const product = await productModel
       .find({})
       .select("-photo")
       .skip((page-1) * perpage)
       .limit(perpage)
       .sort({createdAt:-1});

       res.status(200).send({
        success:true,
        product
       })
        
    } catch (e) {
         console.log("error during product list per page ")
        console.log(e);
        res.status(500)
        .send({success:false,  
            message:"somthing went wrong during product list per page in controller"});
        e
    }
    

}
//search product 
export const searchController =async(req, res) =>{
    try {
    const keyword = req.params.keyword
    console.log("cheking ckewords", keyword);
      const result = await productModel.find({
        $or:[
            {name:{$regex: keyword, $options:"i"}},
            {description:{$regex: keyword, $options:"i"}}
        ]
      }).select("-photo")
      

      res.json(result)
        
    } catch (e) {
         console.log("error during product sarching")
        console.log(e);
        res.status(500)
        .send({success:false,  
            message:"somthing went wrong during product searching in controller"});
        e
    }
    
}

//relared product
export const relatedProductController =async(req, res) =>{
    try {
   const {pid, cid} = req.params;
   console.log("whole id",pid, cid)
   const product = await productModel.find({
    category:cid,
    _id:{$ne: pid}
   })
   .select("-photo")
   .limit(3)
   
   console.log(product)
   res.status(200)
   .send({
    success:true,
    product
   })
;
    } catch (e) {
         console.log("error during realted product")
        console.log(e);
        res.status(500)
        .send({success:false,  
            message:"somthing went wrong during related product in controller"});
        e
    }
    
}

//product based on category id 
export const productCategoryController =async(req, res) =>{
    try {
const cat = await categoryModel.find({slug: req.params.slug});

const product = await productModel.find({category:cat}).populate('category').select("-photo")

   console.log(product)
   res.status(200)
   .send({
    success:true,
    cat,
    product
   })
   console.log("category is ",cat)
;
    } catch (e) {
         console.log("error during product Category Controller")
        console.log(e);
        res.status(500)
        .send({success:false,  
            message:"somthing went wrong during product Category Controller"});
        e
    }
    
}


