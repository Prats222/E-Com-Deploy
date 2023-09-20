import express from 'express';

import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { brainTreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhototController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';
const router = express.Router()
//routes

//create product||POST
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)

//get products
router.get('/get-product', getProductController)

//single product
router.get('/get-product/:slug', getSingleProductController)

//get photo
router.get('/product-photo/:pid', productPhototController)

//delete product
router.delete('/product-delete/:pid',deleteProductController)

//update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

//Filter Product
router.post('/product-filters',productFiltersController)

//product count
router.get('/product-count',productCountController)

//product per page
router.get('/product-list/:page',productListController)

//search product
router.get('/search/:keyword',searchProductController)

//similar products
router.get('/related-product/:pid/:cid',relatedProductController)

//category wise product show from dropdown
router.get('/product-category/:slug',productCategoryController)

//payments routes

//to get token
router.get('/braintree/token',braintreeTokenController)

//payments
router.post('/braintree/payment',requireSignIn,brainTreePaymentController)

export default router;