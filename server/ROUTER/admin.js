const express = require('express');
const router = express.Router();
const multerMiddleware=require('../MIDDLEWARE/multer');
const { addCategory, addProduct,updateCategory ,deleteCategory,updateProduct,deleteProduct} = require('../CONTROLLER/ProductController');
const {getAllOrders,updateOrderStatus}=require('../CONTROLLER/OrderController');
const { isAdmin, protect } = require('../MIDDLEWARE/AuthMiddleware');


router.route('/addCategory').post(protect, isAdmin, addCategory);//---------------===| ADDING CART
router.route('/updateCategory/:id').put(updateCategory);//---------------===| UPDATE CART
router.route('/deleteCategory/:id').delete(deleteCategory);//---------------===| DELETE CART

router.route('/addProduct').post(multerMiddleware, addProduct);//---------------===| ADDING PRODUCT
router.route('/updateProduct/:id').put(updateProduct);//---------------===| UPDATE PRODUCT
router.route('/deleteProduct/:id').delete( deleteProduct);//---------------===| DELETE PRODUCT

router.route('/getAllOrders').get(protect,getAllOrders);//---------------===| GET ALL  ORDER 
router.route('/updateOrderStatus').post(protect,updateOrderStatus);//---------------===| UPDATING ORDER STATUS

module.exports = router;
