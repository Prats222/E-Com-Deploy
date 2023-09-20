import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController=async(req,res) =>{
try {
    const {name}=req.body
    if(!name){
        return res.status(401).send({message:'Name is Required'})
    }
    const existingCategory = await categoryModel.findOne({name})
    if(existingCategory){
        return res.status(200).send({
            success:true,
            message:'Category Already Exists' 
        })
    }
     
    //if category exists to create new model
    const category = await new categoryModel({name,slug:slugify(name)}).save()
    res.status(201).send({
        success:true,
        message:'New Category Created',
        category
    })

} catch (error) {
    console.log(error)
    res.status(500).send({
     success:false,
     error,
     message:'Error in category'
    });
}
};

//update category
export const updateCategoryController =async(req,res) =>{
    try {
        const {name}=req.body
        const {id}=req.params
       const category= await categoryModel.findByIdAndUpdate(
            id,
            {name,slug:slugify(name)},
            {new:true}
            );
        res.status(200).send({
            success:true,
            message:"category updated ",
            category,
        });
    }
     catch (error) {
        console.log(error)
        res.status(500).send({
        success:false,
        error,
        message:'Error while updating category'
        });
    }
};

//get all types of category
export const categoryController =async(req,res)=>{
    try {
        const category= await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:'all categories list',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting all categories'
        });
    }
};

//to get single category
export const singleCategoryController =async(req,res)=>{
    try {
        const category=await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:'single categories list',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting single categories'
        });
    }
};

//delete category
export const deleteCategoryController =async(req,res) =>{
    try {
        const {id}=req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'Category is deleted',
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'cant delete category'
        });
    }
};