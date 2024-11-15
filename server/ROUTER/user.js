const express=require('express');
const router=express.Router();
const {Signup,Login,getUser,UpdateUser}=require('../CONTROLLER/UserController');
const {addAddress, getAddress,updateAddress,deleteAddress}=require('../CONTROLLER/AddressController');
const{allProduct,productSingleView,productLoad,subCategoryLoad,getCategory}=require('../CONTROLLER/ProductController');
const{productAddToWishlist,removeWishlistProduct,getWishlist}=require('../CONTROLLER/wishlistController');
const {addToCart, deleteFromCart,getCart,updateCart}=require('../CONTROLLER/CartController');
const {createOrder,verifyOrder,getUserOrders}=require('../CONTROLLER/OrderController');
const {protect}=require('../MIDDLEWARE/AuthMiddleware');


router.route('/signup').post(Signup); //--------------------------------------------===| RENDERING SIGNUP PAGE(REGRISTRATION)
router.route('/login').post(Login);  //--------------------------------------------===| RENDERING Login PAGE
router.route('/userData').get(protect,getUser); //--------------------------------------------===| RENDERING User Data
router.route('/updateUser').put(protect,UpdateUser);  //--------------------------------------------===| RENDERING Updating user data

router.route('/allProduct').get(allProduct); //-------------------------------------------------------===| ALL PRODUCTS
router.route('/productSinglePage/:id').get(productSingleView); //------------------------------===| SINGLE PAGE WITH PRODUCT DETAILS
router.route('/category/:categoryName').get(productLoad); //---------------------------------------------===| LOADING PRODUCT COLLECTION ACCORDING TO THE CATEGORY
router.route('/products/:categoryName/:subCategoryName').get(subCategoryLoad); //---------------------------------------------===| LOADING PRODUCT ACCORDING TO THE subCATEGORY
router.route('/allCategory').get(getCategory);//---------------------------------------------===| ALL CATEGORY

router.route('/getwishlist').get(protect,getWishlist); //-------------------------------------------------------===| GET WISHLIST PRODUCT
router.route('/addwishlist/:id').post(protect,productAddToWishlist); //-------------------------------------------------------===| ADD PRODUCT TO WISHLIST
router.route('/removewishlist/:id').delete(protect,removeWishlistProduct); //-------------------------------------------------------===| REMOVE PRODUCT FROM WISHLIST

router.route('/address').get(protect,getAddress); //-------------------------------------------------------===|  RENDERING ADDRESS
router.route('/addAddress').post(protect,addAddress); //-------------------------------------------------------===| ADD NEW ADDRESS
router.route('/updateAddress/:id').put(protect,updateAddress); //-------------------------------------------------------===| UPDATE ADDRESS
router.route('/deleteAddress/:id').delete(protect,deleteAddress); //-------------------------------------------------------===| DELETE ADDRESS

router.route('/cart').get(protect,getCart); //-------------------------------------------------------===|  RENDERING CART
router.route('/addCart').post(protect,addToCart); //-------------------------------------------------------===| ADDING PRODUCT TO CART
router.route('/updateCart').put(protect,updateCart); //-------------------------------------------------------===| UPDATE PRODUCT TO CART
router.route('/deleteCart/:id').delete(protect,deleteFromCart);//-------------------------------------------------------===|DELETE PRODUCT FROM CART


router.route('/order/create').post(protect,createOrder);
router.route('/order/verify').post(protect,verifyOrder);
router.route('/getUserOrders').get(protect,getUserOrders);//-----------------------------------===|GETTING USER ORDER


module.exports=router;