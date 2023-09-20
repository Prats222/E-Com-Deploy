import express from 'express'
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const router= express.Router()

//routes
//create-category
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

//update category || PUT METHOD
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//getAll category ||GET method
router.get('/get-category',categoryController)

//single category ||get
router.get('/single-category/:slug',singleCategoryController)

//delete category ||delete
router.delete('/delete-category/:id', requireSignIn,isAdmin, deleteCategoryController)

export default router;