const express = require('express')
const {addUser,getUsers, getUser, updateUser, deleteUser} =require('../controllers/user')
const { register, login, checkAuth } = require('../controllers/auth')
const { Route } = require('express')
const { getProducts, addProduct, updateProduct, deleteProduct, getProduct } = require('../controllers/product')
const { route } = require('express/lib/application')
const{auth} =require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile')
const { getCategories, getCategory, updateCategory, deleteCategory, addCategory } = require('../controllers/categories')
const { getTransactions, addTransaction, notification } = require('../controllers/transaction')
const { updateProfile, deleteProfile, getProfiles, getProfile, addProfile } = require('../controllers/profile')
const { getWishList, getWishLists, deleteWishList, addWhishList, addWhisList } = require('../controllers/wishlist')
require("dotenv").config()

const router = express.Router()

//import controllers
router.post('/user', addUser)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

router.post('/product',auth,uploadFile('iamge'),addProduct)
router.get('/products',auth, getProducts)
router.get('/product/:id',auth, getProduct)
router.patch('/product/:id',auth,uploadFile('iamge'),updateProduct)
router.delete('/product/:id',auth, deleteProduct)

router.post('/category',auth,addCategory)
router.get('/categories', getCategories)
router.get('/category/:id', getCategory)
router.patch('/category/:id', auth,updateCategory)
router.delete('/category/:id', deleteCategory)

router.patch('/profile/:id', updateProfile)
router.delete('/profile/:id', deleteProfile)
router.get('/profiles', getProfiles)
router.get('/profile/:id', getProfile)
router.post('/profile', addProfile)

router.get('/transactions', auth, getTransactions)
router.post('/transaction', auth, addTransaction);

router.get('/wishlists', auth, getWishLists)
router.delete('/wishlist/:id',auth,  deleteWishList)
router.get('/wishlist/:id', auth, getWishList)
router.post('/whislist', auth, addWhisList)

router.post('/register', register)
router.post('/login', login)
router.get("/check-auth", auth, checkAuth);

router.post("/notification", notification);

module.exports= router